import {
  Category,
  IndexMenuResponse,
  IndexMenusRequest,
  IndexProductResponse,
  IndexProductsRequest,
  Menu,
  MenusApi,
  Product,
  ProductsApi, Restaurant, RestaurantsApi, ShowMenuRequest, ShowMenuResponse
} from "@/openapi";
import {authHeaders} from "@/helpers";

class PreviewSelections {
  public menu: Menu | null;
  public search: string | null;
  public category: Category | null;

  constructor() {
    this.menu = null;
    this.search = null;
    this.category = null;
  }
}

class PreviewState {
  public selections: PreviewSelections;

  public menu: Menu[] | null;
  public showMenuResponse: ShowMenuResponse | null;

  public menus: Menu[] | null;
  public menusRequest: IndexMenusRequest | null;
  public menusResponse: IndexMenuResponse | null;

  public products: Product[] | null;
  public productsResponse: IndexProductResponse;

  public productsMoreResponse: IndexProductResponse;

  constructor() {
    this.selections = new PreviewSelections();

    this.menu = null;
    this.showMenuResponse = null;

    this.menus = null;
    this.menusResponse = null;

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
  isLoadingProducts(state: PreviewState) {
    return !state.products && !state.productsResponse;
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
  clear({ commit }) {
    commit('selectMenu', null);
    commit('selectCategory', null);
    commit('setMenus', null);
    commit('setProducts', null);
    commit('setShowMenuResponse', null);
    commit('setMenusResponse', null);
    commit('setProductsResponse', null);
    commit('setMoreProductsResponse', null);
  },
  async selectMenu({ commit, dispatch }, menu: Menu | null) {
    commit('selectMenu', menu);

    if (menu && (!menu.products || !menu.products.length)) {
      commit('setProducts', null);
      commit('setProductsResponse', null);
      dispatch('loadProducts', menu);
    }
  },
  selectCategory({ commit }, category: Category | null) {
    commit('selectCategory', category);
  },
  async loadMenus({ commit, rootGetters }) {
    const request: IndexMenusRequest = {};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    const response = await (new MenusApi())
        .indexMenus(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);

    commit('setMenusRequest', request);
    commit('setMenusResponse', response);
    commit('setMenus', response.data);
  },
  async loadMenusIfMissing({ state, dispatch, rootGetters }) {
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
  async loadMenusAndSelect({ dispatch, getters, commit }, { id }) {
    await dispatch('loadMenus');

    if (getters.menus) {
      dispatch('selectMenu', getters.menus.find(m => m.id === id));
    }
  },
  async loadAndSelectMenu({ dispatch, commit, rootGetters }, { id }) {
    const request: ShowMenuRequest = { id };

    const response = await (new MenusApi())
        .showMenu(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);

    commit('setShowMenuResponse', response);
    commit('setMenu', response.data);
    dispatch('selectMenu', response.data);
  },
  async loadProducts({ commit, rootGetters }, menu: Menu | null) {
    const request : IndexProductsRequest = {pageSize: 200};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (menu) {
      request.filterMenus = String(menu.id);
    }

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    const response = await (new ProductsApi())
        .indexProducts(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);

    commit('setProductsResponse', response);
    commit('setProducts', response.data);

    if (menu) {
      menu.products = response.data;
    }
  },
  async loadMoreProducts({ state, commit, rootGetters }, menu: Menu | null) {
    const request : IndexProductsRequest = {pageSize: 200};
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
        .indexProducts(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);

    commit('setMoreProductsResponse', response);
    commit('appendProducts', response.data);

    if (menu) {
      menu.products = (menu.products ?? []).concat(response.data);
    }
  },
  async loadProductsIfMissing({ state, dispatch }, menu: Menu | null) {
    if (state.productsResponse) {
      return;
    }

    dispatch('loadProducts', menu);
  },
};

const mutations = {
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
  setProducts(state: PreviewState, products) {
    state.products = products;
  },
  appendProducts(state: PreviewState, products) {
    state.products = (state.products ?? []).concat(products);
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
