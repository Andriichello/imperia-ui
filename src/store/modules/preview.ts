import {
  Category,
  IndexMenuResponse,
  IndexMenusRequest,
  IndexProductResponse,
  IndexProductsRequest,
  Menu,
  MenusApi,
  Product,
  ProductsApi
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
  public menus: Menu[] | null;
  public menusResponse: IndexMenuResponse | null;

  public products: Product[] | null;
  public productsResponse: IndexProductResponse;
  public productsMoreResponse: IndexProductResponse;

  constructor() {
    this.selections = new PreviewSelections();

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
  menu(state: PreviewState) {
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
  menusResponse(state: PreviewState) {
    return state.menusResponse;
  },
  products(state: PreviewState) {
    return state.menu ? state.menu['products'] : [];
  },
  productsResponse(state: PreviewState) {
    return state.productsResponse;
  },
  productsMoreResponse(state: PreviewState) {
    return state.productsMoreResponse;
  },
};

const actions = {
  async selectMenu({ commit, dispatch }, menu: Menu | null) {
    commit('selectMenu', menu);

    if (menu && (!menu.products || !menu.products.length)) {
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

    commit('setMenusResponse', response);
    commit('setMenus', response.data);
  },
  async loadMenusIfMissing({ state, dispatch }) {
    if (state.menusResponse) {
      return;
    }

    dispatch('loadMenus');
  },
  async loadProducts({ commit, rootGetters }, menu: Menu | null) {
    const request : IndexProductsRequest = {};
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
    const request : IndexProductsRequest = {};
    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (menu) {
      request.filterMenus = String(menu.id);
    }

    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    if (!state.productsMoreResponse) {
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
  setMenus(state: PreviewState, menus) {
    state.menus = menus;
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
