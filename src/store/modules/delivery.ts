import {
  AttachingComment,
  IndexOrderResponse,
  IndexProductResponse,
  Order,
  OrdersApi,
  Product,
  ProductOrderField,
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

/**
 *
 */
class DeliveryForm extends BaseForm<Order> {
  /** Product fields that were set on order */
  public products: StoreOrderRequestProductField[];

  public productFields: StoreOrderRequestProductField[];

  /**
   * Dynamically populate properties from the given data object.
   *
   * @param resource
   */
  public populate(resource: Order) {
    super.populate(resource);

    this.setProductFields(resource.products ?? []);
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


    return {...request, products} as StoreOrderRequest;
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
  productsTotal(state: DeliveryState) {
    return state.form?.getProperty('totals') ?? 0;
  },
  productsCount(state: DeliveryState, getters) {
    let count = 0;

    getters.products.forEach((p) => {
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
    if (!state.resource) {
      return false;
    }

    if (!state.resource.products || !state.resource.products.length) {
      return false;
    }

    let isMissing = false;

    (state.resource.products ?? []).forEach((f) => {
      if (!getters['orderedProduct'](f.productId)) {
        isMissing = true;
        return;
      }
    });

    return isMissing;
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
  recalculate({state, getters, rootGetters}) {
    let productsTotal = 0;

    state.form.productFields.forEach((p) => {
      if (p.amount) {
        const product = getters['orderedProduct'](p.productId)
          ?? rootGetters['preview/product'](p.productId);

        if (product) {
          const variant = (product.variants ?? []).find((v) => {
            return v.id === p.variantId;
          });

          productsTotal += (variant?.price ?? product.price) * p.amount;
        }
      }
    });

    state.form.setProperty('totals', {
      productsTotal: productsTotal,
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
  setProductFields(state: DeliveryState, products) {
    state.form.products = products;
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
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
