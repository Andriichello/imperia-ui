import {
  AttachingComment,
  IndexOrderResponse,
  IndexProductResponse,
  IndexProductsRequest,
  Order,
  OrdersApi,
  Product,
  ProductOrderField,
  ProductsApi,
  ShowOrderResponse,
  StoreOrderRequest,
  StoreOrderRequestProductField,
  StoreOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse
} from "@/openapi";
import BaseForm from "@/store/BaseForm";
import {crudActions, crudGetters, crudMutations} from "@/store/utils";
import router from "@/router";
import CrudState from "@/store/CrudState";
import {authHeaders} from "@/helpers";

class DeliveryForm extends BaseForm<Order> {
  /** Comments that were set on order */
  public comments: AttachingComment[] = [];
  /** Product fields that were set on order */
  public productFields: StoreOrderRequestProductField[] = [];

  /**
   * Dynamically populate properties from the given data object.
   *
   * @param resource
   */
  public populate(resource: Order | null) {
    super.populate(resource);

    this.setComments(
      (resource?.comments ?? [])
        .map((c) => {
          return {
            id: c.id,
            commentableId: c.commentableId,
            commentableType: c.commentableType,
            text: c.text,
          } as AttachingComment;
        })
    );

    this.setProductFields(resource?.products ?? []);
  }

  /**
   * Set comments on order.
   *
   * @param comments
   */
  public setComments(comments: AttachingComment[]): void {
    this.comments = [...comments];
    this.setChange(`comments`, [...comments]);
  }

  /**
   * Add comment to order.
   *
   * @param comment
   */
  public addComment(comment: AttachingComment): void {
    this.setComments([...this.comments, comment]);
  }

  /**
   * Update comment by its index on order.
   *
   * @param comment
   * @param index
   */
  public updateComment(comment: AttachingComment, index: number): void {
    this.comments[index]['text'] = comment.text;
    this.setChange(`comments`, this.comments);
  }

  /**
   * Delete comment by its index on order.
   *
   * @param index
   */
  public deleteComment(index: number): void {
    this.setChange(`comments`, this.comments.splice(index, 1));
  }

  /**
   * Set product fields on order.
   *
   * @param products
   */
  public setProductFields(products: ProductOrderField[]): void {
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

    this.productFields = fields;
  }

  /**
   * Add or update (if present) order's product field.
   *
   * @param productId
   * @param amount
   * @param variantId
   * @param batch
   * @param serveAt
   * @param comments
   */
  public setProductField(productId: number, amount: number | null, variantId: number = null, batch: string = null, serveAt: string = null, comments: AttachingComment[] = []) {
    const field: StoreOrderRequestProductField = {
      productId,
      variantId,
      amount,
      batch,
      serveAt,
      comments,
    };

    const product = this.productFields?.find((p) => {
        return p.productId === productId && p.variantId === variantId && p.batch === batch;
      });

    if (product) {
      product.batch = field.batch;
      product.amount = field.amount;
      product.serveAt = field.serveAt;
      product.comments = field.comments as AttachingComment[];
    } else {
      if (!this.productFields) {
        this.productFields = [];
      }

      this.productFields.push(field);
    }
  }

  /**
   * Remove product fields from order.
   *
   * @param productId
   * @param variantId
   * @param batch
   */
  public unsetProductField(productId: number, variantId: number = null, batch: string = null) {
    this.productFields = this.productFields.filter((p) => {
      return p.productId !== productId || p.variantId !== variantId || p.batch !== batch;
    });
  }

  /**
   * Transforms the form into a `store` request.
   *
   * @return object
   */
  public asCreate(): StoreOrderRequest {
    const request = super.asCreate();

    const comments = (this.comments ?? [])
      .filter((c) => c?.text?.length);

    const products = (this.productFields ?? [])
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

    return {...request, comments, products} as StoreOrderRequest;
  }

  /**
   * Transforms the form into an `update` request.
   *
   * @return object
   */
  public asUpdate(): UpdateOrderRequest {
    const request = this.asCreate();
    const changed = {};

    Object.keys(this.getChanges())
      .forEach((name) => {
        changed[name] = request?.[name];
      });

    changed['comments'] = request?.comments;
    changed['products'] = request.products;

    return changed as UpdateOrderRequest;
  }
}

class DeliveryState extends CrudState<
  Order,
  DeliveryForm,
  IndexOrderResponse,
  ShowOrderResponse,
  StoreOrderResponse,
  UpdateOrderResponse
> {
  /** True, if order should be shown on page */
  public showing: boolean;

  /** List of ordered products */
  public orderedProducts: Product[] | null;
  /** Latest ordered products response */
  public orderedProductsResponse: IndexProductResponse | null;

  /** Determines if create/update order response was successful */
  public isSavedSuccessfully: boolean | null;

  /**
   * DeliveryState's constructor.
   */
  constructor() {
    super(DeliveryForm);

    this.orderedProducts = null;
    this.orderedProductsResponse = null;

    this.isSavedSuccessfully = null;
  }
}

const state = new DeliveryState();

const getters = {
  ...crudGetters<
    DeliveryState,
    Order,
    DeliveryForm,
    IndexOrderResponse,
    ShowOrderResponse,
    StoreOrderResponse,
    UpdateOrderResponse
  >(),
  showing(state: DeliveryState) {
    return state.showing;
  },
  restaurantId() {
    return router.currentRoute.value.params['restaurantId'] ?? null;
  },
  comments(state: DeliveryState) {
    return state.form?.comments ?? [];
  },
  products(state: DeliveryState) {
    return state.form?.getProperty('products') ?? [] as ProductOrderField[];
  },
  productFields(state: DeliveryState) {
    return state.form?.productFields ?? [] as StoreOrderRequestProductField[];
  },
  productsTotal(state: DeliveryState) {
    return state.form?.getProperty('totals')?.['products'] ?? 0;
  },
  productsCount(state: DeliveryState, getters) {
    let count = 0;

    getters.productFields.forEach((p) => {
      if (p.amount) {
        count += p.amount;
      }
    });

    return count;
  },
  product(state: DeliveryState, getters) {
    return (productId: number, variantId: number = null) => {
      return getters.products.find((p) => {
        return p.productId === productId && p.variantId === variantId;
      }) ?? null;
    };
  },
  orderedProducts(state: DeliveryState) {
    return state.orderedProducts ?? [];
  },
  orderedProduct(state: DeliveryState, getters) {
    return (productId: number) => {
      return getters.orderedProducts.find((p) => {
        return p.id === productId;
      }) ?? null;
    };
  },
  isMissingOrderedProducts(state: DeliveryState, getters) {
    if (!state.selected) {
      return false;
    }

    if (!state.selected.products || !state.selected.products.length) {
      return false;
    }

    let isMissing = false;

    (state.selected.products ?? []).forEach((f) => {
      if (!getters['orderedProduct'](f.productId)) {
        isMissing = true;
        return;
      }
    });

    return isMissing;
  },
  orderedProductsResponse(state: DeliveryState) {
    return state.orderedProductsResponse;
  },
  isLoadingOrderedProducts(state: DeliveryState) {
    return !state.orderedProductsResponse && !state.orderedProducts;
  },
  isSavedSuccessfully(state: DeliveryState) {
    return state.isSavedSuccessfully;
  },
};

const actions = {
  ...crudActions<
    Order,
    DeliveryForm
  >(
    {
      api: new OrdersApi(),
      index: 'indexOrders',
      show: 'showOrder',
      store: 'storeOrder',
      update: 'updateOrder',
    }
  ),
  setShowing({ commit }, showing: boolean) {
    commit('setShowing', showing);
  },
  addComment({ state }: { state: DeliveryState }, comment: AttachingComment) {
    state.form?.addComment(comment);
  },
  updateComment({ state }: { state: DeliveryState }, {comment, index}: {comment: AttachingComment, index: number}) {
    state.form?.updateComment(comment, index);
  },
  deleteComment({ state }: { state: DeliveryState }, {index}: {index: number}) {
    state.form?.deleteComment(index);
  },
  recalculate({state, getters, rootGetters}) {
    let productsTotal = 0;

    state.form.productFields?.forEach((p) => {
      if (p.amount) {
        const product = rootGetters['preview/product'](p.productId)
          ?? rootGetters['order/orderedProduct'](p.productId)
          ?? getters['orderedProduct'](p.productId);

        if (product) {
          const variant = (product.variants ?? []).find((v) => {
            return v.id === p.variantId;
          });

          productsTotal += (variant?.price ?? product.price) * p.amount;
        }
      }
    });

    state.form.setProperty('totals', {
      products: productsTotal,
      all: productsTotal,
    })
  },
  setProductFields({ commit }, products) {
    commit('setProductFields', products);
  },
  setProductField({ commit, dispatch }, {productId, amount, variantId, batch, serveAt, comments}) {
    commit('setProductField', {productId, amount, variantId, batch, serveAt, comments});
    dispatch('recalculate');
  },
  unsetProductField({ commit, dispatch }, {productId, variantId, batch}) {
    commit('unsetProductField', {productId, variantId, batch});
    dispatch('recalculate');
  },
  setIsSavedSuccessfully({ commit }, isSavedSuccessfully: boolean|null) {
    commit('setIsSavedSuccessfully', isSavedSuccessfully);
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

    if (!state.selected || !state.selected.products || !state.selected.products.length) {
      commit('setOrderedProductsResponse', null);
      commit('setOrderedProducts', []);

      return;
    }

    let isMissing = false;

    (state.selected.products ?? []).forEach((f) => {
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
};

const mutations = {
  ...crudMutations<
    DeliveryState,
    Order,
    DeliveryForm,
    IndexOrderResponse,
    ShowOrderResponse,
    StoreOrderResponse,
    UpdateOrderResponse
  >(),
  setSelected(state: DeliveryState, selected: Order | null) {
    state.selected = selected;

    if (!state.form) {
       state.form = new DeliveryForm();
    }

    state.form.populate(selected);
  },
  setShowing(state: DeliveryState, showing) {
    state.showing = showing;
  },
  setProductFields(state: DeliveryState, products) {
    state.form.setProductFields(products);
  },
  setProductField(state: DeliveryState, {productId, amount, variantId, batch, serveAt, comments}) {
    variantId = variantId ?? null;

    state.form.setProductField(productId, amount, variantId, batch, serveAt, comments);
    // state.form.setChange(`products-${productId}-${variantId}-${batch}`, {productId, amount, variantId, batch, serveAt, comments});
  },
  unsetProductField(state: DeliveryState, {productId, variantId, batch}) {
    variantId = variantId ?? null;
    batch = batch ?? null;

    state.form.unsetProductField(productId, variantId, batch);
    // state.form.setChange(`products-${productId}-${variantId ?? null}-${batch}`, {productId, amount: null, variantId, batch});
  },
  setIsSavedSuccessfully(state: DeliveryState, isSavedSuccessfully) {
    state.isSavedSuccessfully = isSavedSuccessfully;
  },
  setOrderedProducts(state: DeliveryState, products) {
    state.orderedProducts = products;
  },
  setOrderedProductsResponse(state: DeliveryState, response) {
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
