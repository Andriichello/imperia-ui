import {
  AttachingComment,
  BanquetsApi,
  Comment,
  IndexOrderResponse, IndexProductResponse,
  IndexProductsRequest, IndexServiceResponse, IndexServicesRequest,
  IndexSpaceResponse,
  IndexSpacesRequest,
  Order,
  OrdersApi,
  OrderTotals,
  Product,
  ProductOrderField,
  ProductsApi, Service, ServiceOrderField, ServicesApi,
  ShowOrderByBanquetIdRequest, ShowOrderRequest,
  ShowOrderResponse, Space,
  SpaceOrderField,
  SpacesApi,
  StoreOrderRequest,
  StoreOrderRequestProductField, StoreOrderRequestServiceField,
  StoreOrderRequestSpaceField,
  StoreOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse
} from "@/openapi";
import {authHeaders, jsonHeaders} from "@/helpers";
import router from "@/router";

class OrderForm {
  /** Values that were set after constructor */
  protected changes: object;
  protected order: Order | null;

  public id: number | null;
  public totals: OrderTotals | null;
  public banquetId: number | null;
  public spaces: StoreOrderRequestSpaceField[];
  public products: StoreOrderRequestProductField[];
  public services: StoreOrderRequestServiceField[];
  public comments: Comment[] | object[];

  constructor(order: Order = null) {
    this.changes = {};
    this.order = order;
    this.spaces = [];
    this.products = [];
    this.services = [];
    this.comments = [];
  }

  public static fromOrder(order: Order) {
    const form = new OrderForm(order);

    form.id = order?.id;
    form.totals = order?.totals;
    form.banquetId = order?.banquetId;
    form.setSpaces(order?.spaces ?? []);
    form.setProducts(order?.products ?? []);
    form.setServices(order?.services ?? []);
    form.comments = order?.comments ?? [];

    return form;
  }

  public setSpaces(spaces: SpaceOrderField[]): void {
    const fields: StoreOrderRequestSpaceField[] = [];

    spaces.sort((s1, s2) => {
      if (s1.id < s2.id) {
        return -1;
      }
      if (s1.id > s1.id) {
        return 1;
      }
      return 0;
    })

    spaces.forEach((s) => {
      const field: StoreOrderRequestSpaceField = {
        spaceId: s.spaceId,
        comments: s.comments,
      };

      fields.push(field);
    });

    this.spaces = fields;
  }

  public setSpace(spaceId: number, comments: AttachingComment[] = []) {
    const field: StoreOrderRequestSpaceField = {
      spaceId,
      comments,
    };

    const space = this.spaces.find((s) => {
      return s.spaceId === spaceId;
    });

    if (space) {
      space.spaceId = field.spaceId;
      space.comments = field.comments;
    } else {
      if (!this.spaces) {
        this.spaces = [];
      }
      this.spaces.push(field);
    }
  }

  public unsetSpace(spaceId: number) {
    this.spaces = this.spaces.filter((s) => {
      return s.spaceId !== spaceId;
    });
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

  public setServices(services: ServiceOrderField[]): void {
    const fields: StoreOrderRequestServiceField[] = [];

    services.sort((s1, s2) => {
      if (s1.id < s2.id) {
        return -1;
      }
      if (s1.id > s2.id) {
        return 1;
      }
      return 0;
    });

    services.forEach((s) => {
      const field: StoreOrderRequestServiceField = {
        serviceId: s.serviceId,
        amount: s.amount,
        duration: s.duration ?? 0,
        comments: s.comments, // replace with your actual ServiceOrderField properties
      };
      fields.push(field);
    });

    this.services = fields;
  }

  public setService(serviceId: number, amount: number, duration: number, comments: AttachingComment[] = []) {
    const field: StoreOrderRequestServiceField = {
      serviceId,
      amount,
      duration,
      comments,
    };

    const service = this.services.find((s) => s.serviceId === serviceId);

    if (service) {
      service.serviceId = field.serviceId;
      service.amount = field.amount;
      service.duration = field.duration ?? 0;
      service.comments = field.comments;
    } else {
      if (!this.services) {
        this.services = [];
      }
      this.services.push(field);
    }
  }

  public unsetService(serviceId: number) {
    this.services = this.services.filter((s) => s.serviceId !== serviceId);
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

        if (name.startsWith('spaces-')) {
          const field = (this.order.spaces ?? []).find((s) => {
            return `${s.spaceId}` === name.replace('spaces-', '');
          });

          const change = this.getChange(name);

          if (field?.comments !== change?.comments) {
            result = true;
          }

          return;
        }

        if (name.startsWith('services-')) {
          const field = (this.order.services ?? []).find((s) => {
            return `${s.serviceId}` === name.replace('services-', '');
          });

          const change = this.getChange(name);

          if (field?.amount !== change?.comments) {
            result = true;
          }

          if (field?.duration !== change?.duration) {
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

    const spaces = (this.spaces ?? [])
      .map((f) => {
        const comments = (f?.comments ?? [])
          .filter((c) => c?.text?.length);

        return {
          ...f,
          comments
        }
      });

    const services = (this.services ?? [])
      .filter((f) => {
        return f.amount;
      })
      .map((f) => {
        const comments = (f?.comments ?? [])
          .filter((c) => c?.text?.length);

        return {
          ...f,
          duration: f?.duration ?? 0,
          comments
        }
      });

    const request = {
      banquetId: this.banquetId,
      spaces,
      products,
      services,
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
  /** Selected order's tab */
  public tab: 'products' | 'spaces' | 'tickets' | 'services';
  /** Selected order's form */
  public form: OrderForm | null;
  /** Selected order */
  public order: Order | null;

  /** List of ordered spaces */
  public orderedSpaces: Space[] | null;
  /** List of ordered products */
  public orderedProducts: Product[] | null;
  /** List of ordered services */
  public orderedServices: Service[] | null;

  /** Latest show order response */
  public showOrderResponse: ShowOrderResponse | null;
  /** Latest ordered products response */
  public orderedSpacesResponse: IndexSpaceResponse | null;
  /** Latest ordered products response */
  public orderedProductsResponse: IndexProductResponse | null;
  /** Latest ordered services response */
  public orderedServicesResponse: IndexServiceResponse | null;
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
    this.tab = 'products';
    this.order = null;
    this.orderedSpaces = null;
    this.orderedProducts = null;

    this.showOrderResponse = null;
    this.createOrderResponse = null;
    this.updateOrderResponse = null;
    this.orderedSpacesResponse = null;
    this.orderedProductsResponse = null;
    this.orderedServicesResponse = null;

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
  tab(state: OrderState) {
    return state.tab;
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
  spaces(state: OrderState) {
    return state.form.spaces ?? [];
  },
  services(state: OrderState) {
    return state.form.services ?? [];
  },
  servicesCount(state: OrderState, getters) {
    let count = 0;

    getters.services.forEach((s) => {
      if (s.amount) {
        count += s.amount;
      }
    });

    return count;
  },
  products(state: OrderState) {
    return state.form.products ?? [];
  },
  ticketsCount(state: OrderState, rootGetters) {
    return (rootGetters['basket/adultsAmount'] ?? 0)
      + (rootGetters['basket/childrenAmount'] ?? 0);
  },
  spacesCount(state: OrderState, getters) {
    return getters.spaces?.length ?? 0;
  },
  orderedSpaces(state: OrderState) {
    return state.orderedSpaces ?? [];
  },
  orderedSpace(state: OrderState, getters) {
    return (spaceId: number) => {
      return getters.orderedSpaces.find((s) => {
        return s.id === spaceId;
      }) ?? null;
    };
  },
  isMissingOrderedSpaces(state: OrderState, getters) {
    if (!state.order) {
      return false;
    }

    if (!state.order.spaces || !state.order.spaces.length) {
      return false;
    }

    let isMissing = false;

    (state.order.spaces ?? []).forEach((f) => {
      if (!getters['orderedSpace'](f.spaceId)) {
        isMissing = true;
        return;
      }
    });

    return isMissing;
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
  orderedServices(state: OrderState) {
    return state.orderedServices ?? [];
  },
  orderedService(state: OrderState, getters) {
    return (serviceId: number) => {
      return getters.orderedServices.find((s) => {
        return s.id === serviceId;
      }) ?? null;
    };
  },
  isMissingOrderedServices(state: OrderState, getters) {
    if (!state.order) {
      return false;
    }

    if (!state.order.services || !state.order.services.length) {
      return false;
    }

    let isMissing = false;

    (state.order.services ?? []).forEach((f) => {
      if (!getters['orderedService'](f.serviceId)) {
        isMissing = true;
        return;
      }
    });

    return isMissing;
  },
  isMissingOrderedProducts(state: OrderState, getters) {
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
  spacesTotal(state: OrderState) {
    return state.form?.totals?.spaces ?? 0;
  },
  servicesTotal(state: OrderState) {
    return state.form?.totals?.services ?? 0;
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
  getOrderedSpacesResponse(state: OrderState) {
    return state.orderedSpacesResponse;
  },
  isLoadingOrderedSpaces(state: OrderState) {
    return !state.orderedSpacesResponse && !state.orderedSpaces;
  },
  getOrderedProductsResponse(state: OrderState) {
    return state.orderedProductsResponse;
  },
  isLoadingOrderedProducts(state: OrderState) {
    return !state.orderedProductsResponse && !state.orderedProducts;
  },
  getOrderedServicesResponse(state: OrderState) {
    return state.orderedServicesResponse;
  },
  isLoadingOrderedServices(state: OrderState) {
    return !state.orderedServicesResponse && !state.orderedServices;
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
  setTab({ commit }, tab: 'products' | 'spaces' | 'tickets' | 'services') {
    commit('setTab', tab);
  },
  setSpaces({ commit }, spaces) {
    commit('setSpaces', spaces);
  },
  setSpace({ commit, dispatch }, {spaceId, comments}) {
    commit('setSpace', {spaceId, comments});
    dispatch('recalculate');
  },
  unsetSpace({ commit, dispatch }, {spaceId}) {
    commit('unsetSpace', {spaceId});
    dispatch('recalculate');
  },
  setProducts({ commit }, products) {
    commit('setProducts', products);
  },
  setProduct({ commit, dispatch }, {productId, amount, variantId, batch, serveAt, comments}) {
    commit('setProduct', {productId, amount, variantId, batch, serveAt, comments});
    dispatch('recalculate');
  },
  unsetProduct({ commit, dispatch }, {productId, variantId, batch}) {
    commit('unsetProduct', {productId, variantId, batch});
    dispatch('recalculate');
  },
  setService({ commit, dispatch }, {serviceId, amount, duration, comments}) {
    commit('setService', {serviceId, amount, duration, comments});
    dispatch('recalculate');
  },
  unsetService({ commit, dispatch }, {serviceId}) {
    commit('unsetService', {serviceId});
    dispatch('recalculate');
  },
  addComment({ commit }, {text}) {
    commit('addComment', {text});
  },
  updateComment({ commit }, {comment, index}) {
    commit('updateComment', {comment, index});
  },
  deleteComment({ commit }, {comment, index}) {
    commit('deleteComment', {comment, index});
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

    totals.spaces = 0;

    state.form.spaces.forEach((s) => {
      const space = getters['orderedSpace'](s.spaceId)
        ?? rootGetters['preview/space'](s.spaceId);

      if (space) {
        totals.spaces += (space?.price);
      }
    });

    totals.services = 0;

    state.form.services.forEach((s) => {
      if (s.amount) {
        const service = getters['orderedService'](s.serviceId)
          ?? rootGetters['preview/service'](s.serviceId);

        if (service) {
          totals.services += (service?.oncePaidPrice + service?.hourlyPaidPrice * (s?.duration ?? 0) / 60.0)
            * s.amount;
        }
      }
    });

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
  async loadOrder({dispatch, commit, rootGetters}, {orderId, fields}) {
    const request: ShowOrderRequest = {
      id: orderId,
      include: 'comments,products,products.comments',
    };

    commit('setIsLoadingShowResponse', true);

    const response = await (new OrdersApi())
      .showOrder(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        dispatch('error/setResponse', error.response, {root:true});

        return error.response;
      });

    commit('setShowOrderResponse', response);
    commit('setOrder', {order: response.data, fields});
    commit('setIsLoadingShowResponse', false);
  },
  async loadOrderIfMissing({dispatch, commit}, {orderId, fields}) {
    if (state.showOrderResponse || state.order) {
      if (state.showOrderResponse && state.showOrderResponse['data'] && state.showOrderResponse['data']['orderId'] === orderId) {
        return;
      }

      if (state.order && state.order.id === orderId) {
        return;
      }
    }

    dispatch('loadOrder', { orderId, fields })
  },
  async loadOrderForBanquet({dispatch, commit, rootGetters}, {banquetId, fields}) {
    const request: ShowOrderByBanquetIdRequest = {
      id: banquetId,
      include: 'comments,services,services.comments,spaces,spaces.comments,products,products.comments',
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
  async loadSpacesForOrder({dispatch, commit, rootGetters}, {order}) {
    const original = (order?.spaces ?? []).map((s) => {
      return s.spaceId;
    });

    const ids = [...new Set(original)];

    if (!ids.length) {
      commit('setOrderedSpacesResponse', null);
      commit('setOrderedSpaces', []);

      return;
    }

    const request: IndexSpacesRequest = {
      filterIds: ids.join(','),
      pageSize: 200,
    };

    const response = await (new SpacesApi())
      .indexSpaces(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        dispatch('error/setResponse', error.response, {root:true});

        return error.response;
      });

    commit('setOrderedSpacesResponse', response);
    commit('setOrderedSpaces', response.data);
  },
  async loadSpacesForOrderIfMissing({ state, commit, dispatch, getters, rootGetters }, { order }) {
    if (state.orderedSpacesResponse && !getters['isMissingOrderedSpaces']) {
      return;
    }

    if (!state.order || !state.order.products || !state.order.products.length) {
      commit('setOrderedSpacesResponse', null);
      commit('setOrderedSpaces', []);

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
      dispatch('loadSpacesForOrder', { order });
    } else {
      commit('setOrderedSpacesResponse', null);
      commit('setOrderedSpaces', []);
    }
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
  async loadServicesForOrder({dispatch, commit, rootGetters}, {order}) {
    const original = (order?.services ?? []).map((s) => {
      return s.serviceId;
    });

    const ids = [...new Set(original)];

    if (!ids.length) {
      commit('setOrderedServicesResponse', null);
      commit('setOrderedServices', []);

      return;
    }

    const request: IndexServicesRequest = {
      filterIds: ids.join(','),
      pageSize: 200,
    };

    const response = await (new ServicesApi())
      .indexServices(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        dispatch('error/setResponse', error.response, {root:true});

        return error.response;
      });

    commit('setOrderedServicesResponse', response);
    commit('setOrderedServices', response.data);
  },
  async loadServicesForOrderIfMissing({ state, commit, dispatch, getters, rootGetters }, { order }) {
    if (state.orderedServicesResponse && !getters['isMissingOrderedServices']) {
      return;
    }

    if (!state.order || !state.order.services || !state.order.services.length) {
      commit('setOrderedServicesResponse', null);
      commit('setOrderedServices', []);

      return;
    }

    let isMissing = false;

    (state.order.services ?? []).forEach((f) => {
      if (!rootGetters['preview/service'](f.serviceId)) {
        isMissing = true;
        return;
      }
    });

    if (isMissing) {
      dispatch('loadServicesForOrder', { order });
    } else {
      commit('setOrderedServicesResponse', null);
      commit('setOrderedServices', []);
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
    state.form = new OrderForm();

    state.showOrderResponse = null;
    state.createOrderResponse = null;
    state.updateOrderResponse = null;

    state.isLoadingShowResponse = null;
    state.isLoadingCreateResponse = null;
    state.isLoadingUpdateResponse = null;

    state.isSavedSuccessfully = null;
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
  setTab(state: OrderState, tab: 'products' | 'spaces' | 'tickets' | 'services') {
    state.tab = tab;
  },
  setSpaces(state: OrderState, spaces) {
    state.form.spaces = spaces;
  },
  setSpace(state: OrderState, {spaceId, comments}) {
    state.form.setSpace(spaceId, comments);
    state.form.setChange(`spaces-${spaceId}`, {spaceId, comments});
  },
  unsetSpace(state: OrderState, {spaceId}) {
    state.form.unsetSpace(spaceId);
    state.form.setChange(`spaces-${spaceId}`, {spaceId});
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
  setService(state: OrderState, {serviceId, amount, duration, comments}) {
    state.form.setService(serviceId, amount, duration, comments);
    state.form.setChange(`services-${serviceId}`, {serviceId, amount, duration, comments});
  },
  unsetService(state: OrderState, {serviceId}) {
    state.form.unsetService(serviceId);
    state.form.setChange(`services-${serviceId}}`, {serviceId, amount: null});
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
  deleteComment(state: OrderState, {index}) {
    state.form.setChange(`comments`, state.form.comments.splice(index, 1));
  },
  setOrderedSpaces(state: OrderState, spaces) {
    state.orderedSpaces = spaces;
  },
  setOrderedProducts(state: OrderState, products) {
    state.orderedProducts = products;
  },
  setOrderedServices(state: OrderState, services) {
    state.orderedServices = services;
  },
  setShowOrderResponse(state: OrderState, response) {
    state.showOrderResponse = response;
  },
  setOrderedSpacesResponse(state: OrderState, response) {
    state.orderedSpacesResponse = response;
  },
  setOrderedProductsResponse(state: OrderState, response) {
    state.orderedProductsResponse = response;
  },
  setOrderedServicesResponse(state: OrderState, response) {
    state.orderedServicesResponse = response;
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
