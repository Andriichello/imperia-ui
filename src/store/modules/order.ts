import {
  AttachingComment,
  BanquetsApi,
  Comment,
  IndexOrderResponse,
  IndexProductsRequest,
  Order,
  OrdersApi,
  OrderTotals,
  Product,
  ProductOrderField,
  ProductsApi,
  ShowOrderByBanquetIdRequest,
  ShowOrderResponse,
  StoreOrderRequest,
  StoreOrderRequestProductField, StoreOrderRequestTicketField, StoreOrderResponse,
  UpdateOrderRequest, UpdateOrderResponse
} from "@/openapi";
import {authHeaders, jsonHeaders} from "@/helpers";
import router from "@/router";
import {forEach} from "lodash";

class OrderForm {
  /** Values that were set after constructor */
  protected changes: object;
  protected order: Order | null;

  public id: number | null;
  public totals: OrderTotals | null;
  public banquetId: number | null;
  public products: StoreOrderRequestProductField[];
  public comments: Comment[] | object[];

  constructor(order: Order = null) {
    this.changes = {};
    this.order = order;
    this.products = [];
    this.comments = [];
  }

  public static fromOrder(order: Order) {
    const form = new OrderForm(order);

    form.id = order?.id;
    form.totals = order?.totals;
    form.banquetId = order?.banquetId;
    form.setProducts(order?.products ?? []);
    form.comments = order?.comments ?? [];

    return form;
  }

  public setProducts(products: ProductOrderField[]): void {
    const fields: StoreOrderRequestProductField[] = [];

    products.sort((p1, p2) => {
      if (p1.id < p2.id) {
        return -1;
      }
      if (p1.id > p1.id) {
        return 1;
      }
      return 0;
    })

    products.forEach((p) => {
      const field: StoreOrderRequestProductField = {
        productId: p.productId,
        variantId: p.variantId ?? null,
        batch: p.batch,
        amount: p.amount,
        serveAt: p.serveAt,
        comments: p.comments,
      };

      fields.push(field);
    });

    this.products = fields;
  }

  public setProduct(productId: number, amount: number | null, variantId: number = null, batch: string = null, serveAt: string = null, comments: AttachingComment[] = []) {
    const field: StoreOrderRequestProductField = {
      productId,
      variantId,
      amount,
      batch,
      serveAt,
      comments,
    };

    const product = this.products.find((p) => {
      return p.productId === productId && p.variantId === variantId && p.batch === batch;
    });

    if (product) {
      product.batch = field.batch;
      product.amount = field.amount;
      product.serveAt = field.serveAt;
      product.comments = field.comments;
    } else {
      if (!this.products) {
        this.products = [];
      }
      this.products.push(field);
    }
  }

  public unsetProduct(productId: number, variantId: number = null, batch: string = null) {
    this.products = this.products.filter((p) => {
      return p.productId !== productId || p.variantId !== variantId || p.batch !== batch;
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
        if (name === 'comments') {
          result = true;
          return;
        }

        if (name.startsWith('products-')) {
          const field = (this.order.products ?? []).find((p) => {
            return `${p.productId}-${p.variantId}` === name.replace('products-', '');
          });

          const change = this.getChange(name);

          if (field?.amount !== change?.amount) {
            result = true;
          }

          if (field?.serveAt !== change?.serveAt) {
            result = true;
          }

          if (field?.comments !== change?.comments) {
            result = true;
          }

          return;
        }

        if (this.order[name] !== this.getChange(name)) {
          result = true;
          return;
        }
      });

    return result;
  }

  public asCreate(): StoreOrderRequest {
    const comments = [];

    (this.comments ?? []).forEach((c) => {
      if (c['text'] && c['text'].length) {
        comments.push(c);
      }
    });

    const products = (this.products ?? [])
      .filter((f) => {
        return f.amount;
      })
      .map((f) => {
        const comments = (f?.comments ?? [])
          .filter((c) => c?.text?.length);

        return {
          ...f,
          comments
        }
      });

    const request = {
      banquetId: this.banquetId,
      products,
      comments,
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
  /** Latest create order response */
  public createOrderResponse: StoreOrderResponse | null;
  /** Latest update order response */
  public updateOrderResponse: UpdateOrderResponse | null;

  /** Determines if show order response is now loading */
  public isLoadingShowResponse: boolean | null;
  /** Determines if create order response is now loading */
  public isLoadingCreateResponse: boolean | null;
  /** Determines if update order response is now loading */
  public isLoadingUpdateResponse: boolean | null;

  /** Determines if create/update order response was successful */
  public isSavedSuccessfully: boolean | null;

  constructor() {
    this.form = new OrderForm();

    this.showing = false;
    this.order = null;
    this.orderedProducts = null;

    this.showOrderResponse = null;
    this.createOrderResponse = null;
    this.updateOrderResponse = null;
    this.orderedProductsResponse = null;

    this.isLoadingShowResponse = null;
    this.isLoadingCreateResponse = null;
    this.isLoadingUpdateResponse = null;

    this.isSavedSuccessfully = null;
  }
}

const state = new OrderState();

const getters = {
  showing(state: OrderState) {
    return state.showing;
  },
  form(state: OrderState) {
    return state.form;
  },
  order(state: OrderState) {
    return state.order;
  },
  orderId(state: OrderState) {
    return state.order?.id;
  },
  banquetId(state: OrderState) {
    const param = +router.currentRoute.value.params['banquetId'];
    const value = state.order?.banquetId;

    return value ?? param;
  },
  comments(state: OrderState) {
    return state.form.comments ?? [];
  },
  products(state: OrderState) {
    return state.form.products ?? [];
  },
  ticketsCount(state: OrderState, rootGetters) {
    return (rootGetters['basket/adultsAmount'] ?? 0)
      + (rootGetters['basket/childrenAmount'] ?? 0);
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
  isMissingOrderedProducts(state: OrderState, getters, rootGetters) {
    if (!state.order) {
      return false;
    }

    if (!state.order.products || !state.order.products.length) {
      return false;
    }

    let isMissing = false;

    (state.order.products ?? []).forEach((f) => {
      if (!getters['orderedProduct'](f.productId)) {
        isMissing = true;
        return;
      }
    });

    return isMissing;
  },
  allTotal(state: OrderState) {
    return state.form?.totals?.all ?? 0;
  },
  ticketsTotal(state: OrderState, rootGetters) {
    let total = 0;

    total += (rootGetters['basket/adultsAmount'] ?? 0)
      * (rootGetters['basket/adultTicketPrice'] ?? 0);
    total += (rootGetters['basket/childrenAmount'] ?? 0)
      * (rootGetters['basket/childTicketPrice'] ?? 0);

    return total;
  },
  productsTotal(state: OrderState) {
    return state.form?.totals?.products ?? 0;
  },
  hasChanges(state: OrderState) {
    return state.form.hasChanges();
  },
  hasRealChanges(state: OrderState) {
    return state.form.hasRealChanges();
  },
  getShowOrderResponse(state: OrderState) {
    return state.showOrderResponse;
  },
  isLoadingOrder(state: OrderState) {
    return !state.showOrderResponse;
  },
  getOrderedProductsResponse(state: OrderState) {
    return state.orderedProductsResponse;
  },
  isLoadingOrderedProducts(state: OrderState) {
    return !state.orderedProductsResponse && !state.orderedProducts;
  },
  getCreateOrderResponse(state: OrderState) {
    return state.createOrderResponse;
  },
  getUpdateOrderResponse(state: OrderState) {
    return state.updateOrderResponse;
  },
  isLoadingShowResponse(state: OrderState) {
    return state.isLoadingShowResponse;
  },
  isLoadingCreateResponse(state: OrderState) {
    return state.isLoadingCreateResponse;
  },
  isLoadingUpdateResponse(state: OrderState) {
    return state.isLoadingUpdateResponse;
  },
  isSavedSuccessfully(state: OrderState) {
    return state.isSavedSuccessfully;
  },
};

const actions = {
  clear({ commit }) {
    commit('clear');
  },
  setOrder({ commit, dispatch }, {order, fields}) {
    commit('setOrder', {order, fields});

    if (fields && fields.length) {
      dispatch('recalculate');
    }

    dispatch('loadProductsForOrderIfMissing', {order});
  },
  setShowing({ commit }, showing) {
    commit('setShowing', showing);
  },
  setProducts({ commit }, products) {
    commit('setProducts', products);
  },
  setProduct({ commit, dispatch }, {productId, amount, variantId, batch, serveAt, comments}) {
    commit('setProduct', {productId, amount, variantId, batch, serveAt, comments});
    dispatch('recalculate');
  },
  unsetProduct({ commit, dispatch }, {productId, variantId, batch}) {
    console.log('unsetProduct: ', {productId, variantId, batch});

    commit('unsetProduct', {productId, variantId, batch});
    dispatch('recalculate');
  },
  addComment({ commit }, {text}) {
    commit('addComment', {text});
  },
  updateComment({ commit }, {comment, index}) {
    commit('updateComment', {comment, index});
  },
  recalculate({state, getters, rootGetters}) {
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
  async loadOrderForBanquet({dispatch, commit, rootGetters}, {banquetId, fields}) {
    const request: ShowOrderByBanquetIdRequest = {
      id: banquetId,
      include: 'comments,products,products.comments',
    };

    commit('setIsLoadingShowResponse', true);

    const response = await (new BanquetsApi())
      .showOrderByBanquetId(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        dispatch('error/setResponse', error.response, {root:true});

        return error.response;
      });

    commit('setShowOrderResponse', response);
    commit('setOrder', {order: response.data, fields});
    commit('setIsLoadingShowResponse', false);
  },
  async loadOrderForBanquetIfMissing({dispatch, commit}, {banquetId, fields}) {
    if (state.showOrderResponse || state.order) {
      if (state.showOrderResponse && state.showOrderResponse['data'] && state.showOrderResponse['data']['banquetId'] === banquetId) {
        return;
      }

      if (state.order && state.order.banquetId === banquetId) {
        return;
      }
    }

    dispatch('loadOrderForBanquet', { banquetId, fields })
  },
  async loadProductsForOrder({dispatch, commit, rootGetters}, {order}) {
    const original = (order?.products ?? []).map((p) => {
      return p.productId;
    });

    const ids = [...new Set(original)];

    if (!ids.length) {
      commit('setOrderedProductsResponse', null);
      commit('setOrderedProducts', []);

      return;
    }

    const request: IndexProductsRequest = {
      filterIds: ids.join(','),
      pageSize: 200,
    };

    // todo: replace with a flag, so that alterations are only loaded when alterations preview is on
    if (rootGetters['auth/authorized']) {
      request.include = 'pendingAlterations,variants.pendingAlterations';
    }

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
  async loadProductsForOrderIfMissing({ state, commit, dispatch, getters, rootGetters }, { order }) {
    if (state.orderedProductsResponse && !getters['isMissingOrderedProducts']) {
      return;
    }

    if (!state.order || !state.order.products || !state.order.products.length) {
      commit('setOrderedProductsResponse', null);
      commit('setOrderedProducts', []);

      return;
    }

    let isMissing = false;

    (state.order.products ?? []).forEach((f) => {
      if (!rootGetters['preview/product'](f.productId)) {
        isMissing = true;
        return;
      }
    });

    if (isMissing) {
      dispatch('loadProductsForOrder', { order });
    } else {
      commit('setOrderedProductsResponse', null);
      commit('setOrderedProducts', []);
    }
  },
  async createOrder({ commit, rootGetters }, request: StoreOrderRequest) {
    commit('setIsLoadingCreateResponse', true);

    const response = await (new OrdersApi())
      .storeOrder({ storeOrderRequest: request }, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
      .then(response => response)
      .catch(error => error.response);

    commit('setCreateOrderResponse', response);
    commit('setIsLoadingCreateResponse', false);
  },
  async updateOrder({ dispatch, commit, rootGetters }, { id, request }) {
    commit('setIsLoadingUpdateResponse', true);

    const response = await (new OrdersApi())
      .updateOrder({ id, updateOrderRequest: request }, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
      .then(response => response)
      .catch(error => error.response);

    commit('setUpdateOrderResponse', response);
    commit('setIsLoadingUpdateResponse', false);

    if (response?.data?.banquetId) {
      dispatch('loadOrderForBanquet', { banquetId: response.data.banquetId });
    }
  },
  setIsSavedSuccessfully({ commit }, isSavedSuccessfully: boolean|null) {
    commit('setIsSavedSuccessfully', isSavedSuccessfully);
  },
};

const mutations = {
  clear(state: OrderState) {
    state.order = null;
    state.isSavedSuccessfully = null;
    state.form = new OrderForm();
  },
  setOrder(state: OrderState, {order, fields}) {
    state.order = order;
    state.form = OrderForm.fromOrder(order);

    if (fields && fields.length) {
      fields.forEach((f) => {
        const variantId = f.variantId ?? null;

        state.form.setProduct(f.productId, f.amount, variantId, f.batch, f.serveAt, f.comments);
        state.form.setChange(`products-${f.productId}-${variantId}-${f.batch}`, {
          batch: f.batch,
          productId: f.productId,
          amount: f.amount,
          serveAt: f.serveAt,
          variantId: variantId
        });
      });
    }
  },
  setShowing(state: OrderState, showing) {
    state.showing = showing;
  },
  setProducts(state: OrderState, products) {
    state.form.products = products;
  },
  setProduct(state: OrderState, {productId, amount, variantId, batch, serveAt, comments}) {
    variantId = variantId ?? null;

    state.form.setProduct(productId, amount, variantId, batch, serveAt, comments);
    state.form.setChange(`products-${productId}-${variantId}-${batch}`, {productId, amount, variantId, batch, serveAt, comments});
  },
  unsetProduct(state: OrderState, {productId, variantId, batch}) {
    variantId = variantId ?? null;
    batch = batch ?? null;

    state.form.unsetProduct(productId, variantId, batch);
    state.form.setChange(`products-${productId}-${variantId ?? null}-${batch}`, {productId, amount: null, variantId, batch});
  },
  addComment(state: OrderState, comment) {
    const comments = [...state.form.comments];
    comments.push(comment);

    state.form.comments = comments;
    state.form.setChange(`comments`, comments);
  },
  updateComment(state: OrderState, {comment, index}) {
    state.form.comments[index]['text'] = comment.text;
    state.form.setChange(`comments`, state.form.comments);
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
  setCreateOrderResponse(state: OrderState, response) {
    state.createOrderResponse = response;
  },
  setUpdateOrderResponse(state: OrderState, response) {
    state.updateOrderResponse = response;
  },
  setIsLoadingShowResponse(state: OrderState, isLoading) {
    state.isLoadingShowResponse = isLoading;
  },
  setIsLoadingCreateResponse(state: OrderState, isLoading) {
    state.isLoadingCreateResponse = isLoading;
  },
  setIsLoadingUpdateResponse(state: OrderState, isLoading) {
    state.isLoadingUpdateResponse = isLoading;
  },
  setIsSavedSuccessfully(state: OrderState, isSavedSuccessfully) {
    state.isSavedSuccessfully = isSavedSuccessfully;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
