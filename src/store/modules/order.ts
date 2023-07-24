import {
  BanquetsApi,
  Comment,
  IndexOrderResponse,
  IndexProductsRequest,
  Order,
  OrderTotals,
  Product,
  ProductOrderField,
  ProductsApi,
  ShowOrderByBanquetIdRequest,
  ShowOrderResponse,
  StoreOrderRequest,
  StoreOrderRequestProductField,
  UpdateOrderRequest
} from "@/openapi";
import {authHeaders} from "@/helpers";
import router from "@/router";

class OrderForm {
  /** Values that were set after constructor */
  protected changes: object;
  protected order: Order | null;

  public id: number | null;
  public totals: OrderTotals | null;
  public banquetId: number | null;
  public products: StoreOrderRequestProductField[];
  public comments: Comment[];

  constructor(order: Order = null) {
    this.changes = {};
    this.order = order;
    this.products = [];
  }

  public static fromOrder(order: Order) {
    const form = new OrderForm(order);

    form.id = order.id;
    form.totals = order.totals;
    form.banquetId = order.banquetId;
    form.setProducts(order.products);
    form.comments = order.comments ?? null;

    return form;
  }

  public setProducts(products: ProductOrderField[]): void {
    const fields: StoreOrderRequestProductField[] = [];

    products.forEach((p) => {
      const field: StoreOrderRequestProductField = {
        productId: p.productId,
        variantId: p.variantId,
        amount: p.amount,
      };

      fields.push(field);
    });

    this.products = fields;
  }

  public setProduct(productId: number, amount: number | null, variantId: number = null) {
    const field: StoreOrderRequestProductField = {
      productId,
      variantId,
      amount,
    };

    const product = this.products.find((p) => {
      return p.productId === productId && p.variantId === variantId;
    });

    if (product) {
      product.amount = field.amount;
    } else {
      if (!this.products) {
        this.products = [];
      }
      this.products.push(field);
    }
  }

  public unsetProduct(productId: number, variantId: number = null) {
    this.products = this.products.filter((p) => {
      return p.productId !== productId || p.variantId !== variantId;
    });
  }

  public getChanges() {
    return this.changes;
  }

  public getChange(name: string, defaultValue = undefined) {
    if (Object.prototype.hasOwnProperty.call(this.changes, name)) {
      return this.changes[name];
    }

    return defaultValue;
  }

  public setChange(name: string, value: any) {
    if (value === undefined) {
      this.clearChange(name);
    } else {
      this.changes[name] = value;
    }
  }

  public clearChange(name: string) {
    return delete this.changes[name];
  }

  public hasChanges() {
    return Object.keys(this.getChanges()).length > 0;
  }

  public hasRealChanges() {
    if (!this.order) {
      return this.hasChanges();
    }

    let result = false;

    Object.keys(this.getChanges())
      .forEach(name => {
        if (name.startsWith('products-')) {
          const field = this.order.products.find((p) => {
            return `${p.productId}-${p.variantId}` === name.replace('products-', '');
          });

          const change = this.getChange(name);

          if (field.amount !== change.amount) {
            result = true;
            return;
          }
        }

        if (this.order[name] !== this.getChange(name)) {
          result = true;
          return;
        }
      });

    return result;
  }

  public asCreate(): StoreOrderRequest {


    const request = {
      banquetId: this.banquetId,
      products: this.products,
    };

    return request as StoreOrderRequest;
  }

  public asUpdate(): UpdateOrderRequest {
    return this.asCreate();
  }
}

class OrderState {
  /** True, if order should be shown on page */
  public showing: boolean;
  /** Selected order's form */
  public form: OrderForm | null;
  /** Selected order */
  public order: Order | null;

  /** List of ordered products */
  public orderedProducts: Product[] | null;

  /** Latest show order response */
  public showOrderResponse: ShowOrderResponse | null;
  /** Latest ordered products response */
  public orderedProductsResponse: IndexOrderResponse | null;

  constructor() {
    this.form = new OrderForm();

    this.showing = false;
    this.order = null;
    this.orderedProducts = null;

    this.showOrderResponse = null;
    this.orderedProductsResponse = null;
  }
}

const state = new OrderState();

const getters = {
  showing(state: OrderState) {
    return state.showing;
  },
  order(state: OrderState) {
    return state.order;
  },
  orderId(state: OrderState) {
    return state.order?.id;
  },
  banquetId(state: OrderState) {
    return state.order?.banquetId ?? router.currentRoute.value.params['banquetId'];
  },
  products(state: OrderState) {
    return state.form.products ?? [];
  },
  productsCount(state: OrderState, getters) {
    let count = 0;

    getters.products.forEach((p) => {
      if (p.amount) {
        count += p.amount;
      }
    });

    return count;
  },
  product(state: OrderState, getters) {
    return (productId: number, variantId: number = null) => {
      return getters.products.find((p) => {
        return p.productId === productId && p.variantId === variantId;
      }) ?? null;
    };
  },
  orderedProducts(state: OrderState) {
    return state.orderedProducts ?? [];
  },
  orderedProduct(state: OrderState, getters) {
    return (productId: number) => {
      return getters.orderedProducts.find((p) => {
        return p.id === productId;
      }) ?? null;
    };
  },
  total(state: OrderState) {
    return state.form?.totals?.products ?? 0;
  },
  getShowOrderResponse(state: OrderState) {
    return state.showOrderResponse;
  },
};

const actions = {
  clear({ commit }) {
    commit('clear');
  },
  setOrder({ commit }, order: Order) {
    commit('setOrder', order);
  },
  setShowing({ commit }, showing) {
    commit('setShowing', showing);
  },
  setProducts({ commit }, products) {
    commit('setProducts', products);
  },
  setProduct({ commit, dispatch }, {productId, amount, variantId}) {
    commit('setProduct', {productId, amount, variantId});
    dispatch('recalculate');
  },
  unsetProduct({ commit, dispatch }, {productId, variantId}) {
    commit('unsetProduct', {productId, variantId});
    dispatch('recalculate');
  },
  recalculate({ state, getters, rootGetters}) {
    const totals: OrderTotals = state?.order?.totals
      ?? {
        spaces: null,
        tickets: null,
        services: null,
        products: 0,
        all: null,
      };

    totals.products = 0;

    state.form.products.forEach((p) => {
      if (p.amount) {
        const product = getters['orderedProduct'](p.productId)
          ?? rootGetters['preview/product'](p.productId);

        if (product) {
          const variant = (product.variants ?? []).find((v) => {
            return v.id === p.variantId;
          });

          totals.products += (variant?.price ?? product.price) * p.amount;
        }
      }
    });

    totals.all = totals.products + totals.spaces + totals.services + totals.tickets;
    state.form.totals = totals;
  },
  async loadOrderForBanquet({dispatch, commit, rootGetters}, {banquetId}) {
    const request: ShowOrderByBanquetIdRequest = {
      id: banquetId,
      include: 'products',
    };

    const response = await (new BanquetsApi())
      .showOrderByBanquetId(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        dispatch('error/setResponse', error.response, {root:true});

        return error.response;
      });

    commit('setShowOrderResponse', response);
    commit('setOrder', response.data);
  },
  async loadOrderForBanquetIfMissing({dispatch}, {banquetId}) {
    if (state.showOrderResponse) {
      return;
    }

    dispatch('loadOrderForBanquet', { banquetId })
  },
  async loadProductsForOrder({dispatch, commit, rootGetters}, {order}) {
    const ids = (order?.products ?? []).map((p) => {
      return p.productId;
    });

    const request: IndexProductsRequest = {
      filterIds: ids.join(','),
      pageSize: 200,
    };

    const response = await (new ProductsApi())
      .indexProducts(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        dispatch('error/setResponse', error.response, {root:true});

        return error.response;
      });

    commit('setOrderedProductsResponse', response);
    commit('setOrderedProducts', response.data);
  },
  async loadProductsForOrderIfMissing({ state, dispatch }, { order }) {
    if (state.orderedProductsResponse) {
      return;
    }

    dispatch('loadProductsForOrder', { order })
  },
};

const mutations = {
  clear(state: OrderState) {
    state.order = null;
    state.form = new OrderForm();
  },
  setOrder(state: OrderState, order) {
    state.order = order;
    state.form = OrderForm.fromOrder(order);
  },
  setShowing(state: OrderState, showing) {
    state.showing = showing;
  },
  setProducts(state: OrderState, products) {
    state.form.products = products;
  },
  setProduct(state: OrderState, {productId, amount, variantId}) {
    state.form.setProduct(productId, amount, variantId);
    state.form.setChange(`products-${productId}-${variantId}`, {productId, amount, variantId});
  },
  unsetProduct(state: OrderState, {productId, variantId}) {
    state.form.unsetProduct(productId, variantId);
    state.form.setChange(`products-${productId}-${variantId}`, {productId, amount: null, variantId});
  },
  setOrderedProducts(state: OrderState, products) {
    state.orderedProducts = products;
  },
  setShowOrderResponse(state: OrderState, response) {
    state.showOrderResponse = response;
  },
  setOrderedProductsResponse(state: OrderState, response) {
    state.orderedProductsResponse = response;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
