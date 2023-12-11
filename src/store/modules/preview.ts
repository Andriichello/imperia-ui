import {
  CategoriesApi,
  Category,
  IndexCategoriesRequest,
  IndexCategoryResponse,
  IndexMenuResponse,
  IndexMenusRequest,
  IndexProductResponse,
  IndexProductsRequest,
  IndexServiceResponse, IndexServicesRequest,
  IndexSpaceResponse,
  IndexSpacesRequest,
  IndexTagResponse,
  IndexTagsRequest,
  Menu,
  MenusApi,
  Product,
  ProductsApi, Service, ServicesApi,
  ShowMenuRequest,
  ShowMenuResponse,
  Space,
  SpacesApi,
  Tag,
  TagsApi
} from "@/openapi";
import {authHeaders} from "@/helpers";

class PreviewSelections {
  public tab: 'products' | 'spaces' | 'ticket' | 'services';
  public menu: Menu | null;
  public search: string | null;
  public category: Category | null;
  constructor() {
    this.tab = 'products';
    this.menu = null;
    this.search = null;
    this.category = null;
  }
}

class PreviewState {
  public selections: PreviewSelections;

  public tags: Tag[] | null;
  public tagsResponse: IndexTagResponse;

  public menu: Menu[] | null;
  public showMenuResponse: ShowMenuResponse | null;
  public isShowingMenusModal: boolean | null;

  public menus: Menu[] | null;
  public menusRequest: IndexMenusRequest | null;
  public menusResponse: IndexMenuResponse | null;

  public spaces: Space[] | null;
  public spacesResponse: IndexSpaceResponse;
  public spacesMoreResponse: IndexSpaceResponse;

  public spaceCategories: Category[] | null;
  public spaceCategoriesResponse: IndexCategoryResponse | null;

  public services: Service[] | null;
  public servicesResponse: IndexServiceResponse;
  public servicesMoreResponse: IndexServiceResponse;

  public serviceCategories: Category[] | null;
  public serviceCategoriesResponse: IndexCategoryResponse | null;

  public products: Product[] | null;
  public productsResponse: IndexProductResponse;
  public productsMoreResponse: IndexProductResponse;

  constructor() {
    this.selections = new PreviewSelections();

    this.tags = null;
    this.tagsResponse = null;

    this.menu = null;
    this.showMenuResponse = null;
    this.isShowingMenusModal = false;

    this.menus = null;
    this.menusResponse = null;

    this.spaces = null;
    this.spacesResponse = null;
    this.spacesMoreResponse = null;

    this.spaceCategories = null;
    this.spaceCategoriesResponse = null;

    this.services = null;
    this.servicesResponse = null;
    this.servicesMoreResponse = null;

    this.serviceCategories = null;
    this.serviceCategoriesResponse = null;

    this.products = null;
    this.productsResponse = null;
    this.productsMoreResponse = null;
  }
}

const state = new PreviewState();

const getters = {
  selections(state: PreviewState) {
    return state.selections;
  },
  selected(state: PreviewState) {
    return state.selections.menu;
  },
  tab(state: PreviewState) {
    return state.selections.tab;
  },
  category(state: PreviewState) {
    return state.selections.category;
  },
  categories(state: PreviewState) {
    return state.selections.menu ? state.selections.menu.categories : [];
  },
  menus(state: PreviewState) {
    return state.menus;
  },
  isLoadingMenus(state: PreviewState) {
    return !state.menus && !state.menusResponse;
  },
  isLoadingSpaceCategories(state: PreviewState) {
    return !state.spaceCategories && !state.spaceCategoriesResponse;
  },
  isLoadingSpaces(state: PreviewState) {
    return !state.spaces && !state.spacesResponse;
  },
  isLoadingServiceCategories(state: PreviewState) {
    return !state.serviceCategories && !state.serviceCategoriesResponse;
  },
  isLoadingServices(state: PreviewState) {
    return !state.services && !state.servicesResponse;
  },
  isLoadingProducts(state: PreviewState) {
    return !state.products && !state.productsResponse;
  },
  isShowingMenusModal(state: PreviewState) {
    return state.isShowingMenusModal;
  },
  tags(state: PreviewState) {
    return state.tags;
  },
  tagsResponse(state: PreviewState) {
    return state.tagsResponse;
  },
  menu(state: PreviewState) {
    return state.menu;
  },
  showMenuResponse(state: PreviewState) {
    return state.showMenuResponse;
  },
  menusResponse(state: PreviewState) {
    return state.menusResponse;
  },
  spaceCategories(state: PreviewState) {
    return state.spaceCategories;
  },
  spaceCategoriesResponse(state: PreviewState) {
    return state.spacesMoreResponse;
  },
  space(state: PreviewState) {
    return (spaceId: number) => {
      return (state.spaces ?? []).find((s) => {
        return s.id === spaceId;
      });
    };
  },
  spaces(state: PreviewState) {
    return state.spaces ? state.spaces : [];
  },
  spacesResponse(state: PreviewState) {
    return state.spacesResponse;
  },
  spacesMoreResponse(state: PreviewState) {
    return state.spacesMoreResponse;
  },
  serviceCategories(state: PreviewState) {
    return state.serviceCategories;
  },
  serviceCategoriesResponse(state: PreviewState) {
    return state.serviceCategoriesResponse;
  },
  service(state: PreviewState) {
    return (serviceId: number) => {
      return (state.services ?? []).find((s) => {
        return s.id === serviceId;
      });
    };
  },
  services(state: PreviewState) {
    return state.services ? state.services : [];
  },
  servicesResponse(state: PreviewState) {
    return state.servicesResponse;
  },
  servicesMoreResponse(state: PreviewState) {
    return state.servicesMoreResponse;
  },
  product(state: PreviewState) {
    return (productId: number) => {
      let product = null;

      (state.menus ?? []).forEach((m) => {
        if (product) {
          return;
        }

        product = (m.products ?? []).find((p) => {
          return p.id === productId;
        });
      });

      return product;
    };
  },
  products(state: PreviewState) {
    return state.selections.menu ? state.selections.menu.products : [];
  },
  productsResponse(state: PreviewState) {
    return state.productsResponse;
  },
  productsMoreResponse(state: PreviewState) {
    return state.productsMoreResponse;
  },
};

const actions = {
  clear({commit}) {
    commit('selectTab', 'products');
    commit('selectMenu', null);
    commit('selectCategory', null);
    commit('setMenus', null);
    commit('setSpaceCategories', null);
    commit('setServiceCategories', null);
    commit('setSpaces', null);
    commit('setProducts', null);
    commit('setShowMenuResponse', null);
    commit('setMenusResponse', null);
    commit('setSpaceCategoriesResponse', null);
    commit('setSpacesResponse', null);
    commit('setMoreSpacesResponse', null);
    commit('setServicesResponse', null);
    commit('setMoreServicesResponse', null);
    commit('setProductsResponse', null);
    commit('setMoreProductsResponse', null);
  },
  selectTab({commit}, tab: 'products' | 'spaces' | 'ticket' | 'services') {
    commit('selectTab', tab);
  },
  async selectMenu({commit, dispatch}, menu: Menu | null) {
    commit('selectMenu', menu);

    if (menu && (!menu.products || !menu.products.length)) {
      commit('setProducts', null);
      commit('setProductsResponse', null);
      dispatch('loadProducts', menu);
    }
  },
  selectCategory({commit}, category: Category | null) {
    commit('selectCategory', category);
  },
  setIsShowingMenusModal({commit}, isShowing: boolean | null) {
    commit('setIsShowingMenusModal', isShowing);
  },
  async loadMenus({commit, dispatch, rootGetters}) {
    const request: IndexMenusRequest = {};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    const response = await (new MenusApi())
      .indexMenus(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setMenusRequest', request);
    commit('setMenusResponse', response);
    commit('setMenus', response.data);
  },
  async loadMenusIfMissing({state, dispatch, rootGetters}) {
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (state.menusResponse) {
      if (state.menusRequest && state.menusRequest.filterRestaurants) {
        if (state.menusRequest.filterRestaurants == restaurantId) {
          return;
        }
      }
    }

    dispatch('loadMenus');
  },
  async loadMenusAndSelect({dispatch, getters, commit}, {id}) {
    await dispatch('loadMenus');

    if (getters.menus) {
      dispatch('selectMenu', getters.menus.find(m => m.id === id));
    }
  },
  async loadMenusAndSelectFirst({dispatch, getters, commit}) {
    await dispatch('loadMenus');

    if (getters.menus) {
      dispatch('selectMenu', getters.menus && getters.menus.length ? getters.menus[0] : null);
    }
  },
  async loadAndSelectMenu({dispatch, commit, rootGetters}, {id}) {
    const request: ShowMenuRequest = {id};

    const response = await (new MenusApi())
      .showMenu(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setShowMenuResponse', response);
    commit('setMenu', response.data);
    dispatch('selectMenu', response.data);
  },
  async loadTags({commit, dispatch, rootGetters}) {
    const request: IndexTagsRequest = {pageSize: 300};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
      request.filterTarget = 'products';
    }

    const response = await (new TagsApi())
      .indexTags(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => error);

    commit('setTagsResponse', response);
    commit('setTags', response.data);
  },
  async loadTagsIfMissing({state, dispatch}) {
    if (state.tagsResponse) {
      return;
    }

    dispatch('loadTags');
  },
  async loadSpaceCategories({commit, dispatch, rootGetters}) {
    const request: IndexCategoriesRequest = {pageSize: 300, filterTarget: 'spaces'};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    const response = await (new CategoriesApi())
      .indexCategories(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setSpaceCategoriesResponse', response);
    commit('setSpaceCategories', response.data);
  },
  async loadSpaceCategoriesIfMissing({state, dispatch}) {
    if (state.spaceCategoriesResponse) {
      return;
    }

    dispatch('loadSpaceCategories');
  },
  async loadSpaces({commit, dispatch, rootGetters}) {
    const request: IndexSpacesRequest = {pageSize: 300};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    const response = await (new SpacesApi())
      .indexSpaces(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setSpacesResponse', response);
    commit('setSpaces', response.data);
  },
  async loadMoreSpaces({state, dispatch, commit, rootGetters}) {
    const request: IndexSpacesRequest = {pageSize: 300};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    if (!state.spacesMoreResponse) {
      request.pageSize = state.spacesResponse.meta.perPage ?? 200;
      request.pageNumber = 2;
    } else {
      request.pageNumber = state.spacesMoreResponse.meta.currentPage + 1;
    }

    const response = await (new SpacesApi())
      .indexSpaces(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setMoreSpacesResponse', response);
    commit('appendSpaces', response.data);
  },
  async loadSpacesIfMissing({state, dispatch}) {
    if (state.spacesResponse) {
      return;
    }

    dispatch('loadSpaces');
  },
  async loadServiceCategories({commit, dispatch, rootGetters}) {
    const request: IndexCategoriesRequest = {pageSize: 300, filterTarget: 'services'};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    const response = await (new CategoriesApi())
      .indexCategories(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setServiceCategoriesResponse', response);
    commit('setServiceCategories', response.data);
  },
  async loadServiceCategoriesIfMissing({state, dispatch}) {
    if (state.serviceCategoriesResponse) {
      return;
    }

    dispatch('loadServiceCategories');
  },
  async loadServices({commit, dispatch, rootGetters}) {
    const request: IndexServicesRequest = {pageSize: 300};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    const response = await (new ServicesApi())
      .indexServices(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setServicesResponse', response);
    commit('setServices', response.data);
  },
  async loadMoreServices({state, dispatch, commit, rootGetters}) {
    const request: IndexServicesRequest = {pageSize: 300};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    if (!state.servicesMoreResponse) {
      request.pageSize = state.servicesResponse.meta.perPage ?? 200;
      request.pageNumber = 2;
    } else {
      request.pageNumber = state.servicesMoreResponse.meta.currentPage + 1;
    }

    const response = await (new ServicesApi())
      .indexServices(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setMoreServicesResponse', response);
    commit('appendServices', response.data);
  },
  async loadServicesIfMissing({state, dispatch}) {
    if (state.servicesResponse) {
      return;
    }

    dispatch('loadServices');
  },
  async loadProducts({commit, dispatch, rootGetters}, menu: Menu | null) {
    const request: IndexProductsRequest = {pageSize: 300};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    // todo: replace with a flag, so that alterations are only loaded when alterations preview is on
    if (rootGetters['auth/authorized']) {
      request.include = 'pendingAlterations,variants.pendingAlterations';
    }

    if (menu) {
      request.filterMenus = String(menu.id);
    }

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    const response = await (new ProductsApi())
      .indexProducts(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setProductsResponse', response);
    commit('setProducts', response.data);

    if (menu) {
      menu.products = response.data;
    }
  },
  async loadMoreProducts({state, dispatch, commit, rootGetters}, menu: Menu | null) {
    const request: IndexProductsRequest = {pageSize: 300};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (menu) {
      request.filterMenus = String(menu.id);
    }

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    if (!state.productsMoreResponse) {
      request.pageSize = state.productsMoreResponse.meta.perPage ?? 200;
      request.pageNumber = 2;
    } else {
      request.pageNumber = state.productsMoreResponse.meta.currentPage + 1;
    }

    const response = await (new ProductsApi())
      .indexProducts(request, {headers: {...authHeaders(rootGetters['auth/token'])}})
      .then(response => response)
      .catch(error => {
        if (error.response.status !== 404) {
          dispatch('error/setResponse', error.response, {root:true});
        }

        return error.response;
      });

    commit('setMoreProductsResponse', response);
    commit('appendProducts', response.data);

    if (menu) {
      menu.products = (menu.products ?? []).concat(response.data);
    }
  },
  async loadProductsIfMissing({state, dispatch}, menu: Menu | null) {
    if (state.productsResponse) {
      return;
    }

    dispatch('loadProducts', menu);
  },
};

const mutations = {
  selectTab(state: PreviewState, tab: 'products' | 'spaces' | 'ticket' | 'services') {
    state.selections.tab = tab;
  },
  selectMenu(state: PreviewState, menu) {
    state.selections.menu = menu;
  },
  selectCategory(state: PreviewState, category) {
    state.selections.category = category;
  },
  setMenu(state: PreviewState, menu) {
    state.menu = menu;
  },
  setShowMenuResponse(state: PreviewState, response) {
    state.showMenuResponse = response;
  },
  setMenus(state: PreviewState, menus) {
    state.menus = menus;
  },
  setMenusRequest(state: PreviewState, request) {
    state.menusRequest = request;
  },
  setMenusResponse(state: PreviewState, response) {
    state.menusResponse = response;
  },
  setIsShowingMenusModal(state: PreviewState, isShowing) {
    state.isShowingMenusModal = isShowing;
  },
  setTags(state: PreviewState, tags) {
    state.tags = tags;
  },
  setTagsResponse(state: PreviewState, response) {
    state.tagsResponse = response;
  },
  setSpaceCategories(state: PreviewState, categories) {
    state.spaceCategories = categories;
  },
  setSpaceCategoriesResponse(state: PreviewState, response) {
    state.spaceCategoriesResponse = response;
  },
  setSpaces(state: PreviewState, spaces) {
    state.spaces = spaces;
  },
  appendSpaces(state: PreviewState, spaces) {
    state.spaces = (state.spaces ?? []).concat(spaces);
  },
  setProducts(state: PreviewState, products) {
    state.products = products;
  },
  setServiceCategories(state: PreviewState, categories) {
    state.serviceCategories = categories;
  },
  setServiceCategoriesResponse(state: PreviewState, response) {
    state.serviceCategoriesResponse = response;
  },
  setServices: (state: PreviewState, services) => {
    state.services = services;
  },
  setServicesResponse(state: PreviewState, response) {
    state.servicesResponse = response;
  },
  setMoreServicesResponse(state: PreviewState, response) {
    state.servicesMoreResponse = response;
  },
  appendProducts(state: PreviewState, products) {
    state.products = (state.products ?? []).concat(products);
  },
  appendServices(state: PreviewState, services) {
    state.services = (state.services ?? []).concat(services);
  },
  setSpacesResponse(state: PreviewState, response) {
    state.spacesResponse = response;
  },
  setMoreSpacesResponse(state: PreviewState, response) {
    state.spacesMoreResponse = response;
  },
  setProductsResponse(state: PreviewState, response) {
    state.productsResponse = response;
  },
  setMoreProductsResponse(state: PreviewState, response) {
    state.productsMoreResponse = response;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
