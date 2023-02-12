import { authHeaders } from "@/helpers";
import { CategoriesApi, Category, IndexCategoriesRequest, IndexCategoryResponse, IndexMenuResponse, IndexProductResponse, IndexProductsRequest, IndexServiceResponse, IndexServicesRequest, IndexSpaceResponse, IndexSpacesRequest, IndexTicketResponse, IndexTicketsRequest, Menu, MenusApi, Product, ProductsApi, Service, ServicesApi, Space, SpacesApi, Ticket, TicketsApi } from "@/openapi";

class ResourceGroup <I, R> {
  public menus?: Menu[] | null;
  public categories: Category[] | null;
  public items: I[] | null;
  
  public menusResponse?: IndexMenuResponse | null; 
  public categoriesResponse: IndexCategoryResponse | null; 
  public itemsResponse: R | null; 
  public moreItemsResponse: R | null; 

  constructor() {
    this.categories = null;
    this.items = null;

    this.categoriesResponse = null;
    this.itemsResponse = null;
    this.moreItemsResponse = null;
  }

  public areMenusDefined(): boolean {
    return this.menus !== undefined
  }
}

class MarketplaceGroup {
  /** Filters for `spaces` resource */
  public spaces: ResourceGroup<Space, IndexSpaceResponse>; 
  /** Filters for `tickets` resource */
  public tickets: ResourceGroup<Ticket, IndexTicketResponse>; 
  /** Filters for `products` resource */
  public products: ResourceGroup<Product, IndexProductResponse>; 
  /** Filters for `services` resource */
  public services: ResourceGroup<Service, IndexServiceResponse>; 

  constructor() {
    this.spaces = new ResourceGroup();
    this.tickets = new ResourceGroup();
    this.services = new ResourceGroup();
    this.products = new ResourceGroup();
    this.products.menus = null;
  }
}

class ResourceFilters { 
  /** Selected menu */
  public menu?: Menu | null;
  /** Applied search query */
  public search: string | null;
  /** Selected category */
  public category: Category | null;

  constructor() {
    this.search = null;
    this.category = null;
  }
}

class MarketplaceFilters {
  /** Filters for `spaces` resource */
  public spaces: ResourceFilters; 
  /** Filters for `tickets` resource */
  public tickets: ResourceFilters; 
  /** Filters for `products` resource */
  public products: ResourceFilters; 
  /** Filters for `services` resource */
  public services: ResourceFilters; 

  constructor() {
    this.spaces = new ResourceFilters();
    this.tickets = new ResourceFilters();
    this.services = new ResourceFilters();
    this.products = new ResourceFilters();
    this.products.menu = null;
  }
}

class MarketplaceState {
  /** Opened tab name */
  public tab: string;
  /** Resource groups */
  public groups: MarketplaceGroup;
  /** Applied filters */
  public filters: MarketplaceFilters;

  constructor() {
    this.tab;
    this.groups = new MarketplaceGroup();
    this.filters = new MarketplaceFilters();
  }
}

const state = new MarketplaceState();

const getters = {
  tab(state: MarketplaceState) {
    return state.tab;
  },
  groups(state: MarketplaceState) {
    return (resource: string = null) => {
      return resource ? state.groups[resource] : state.groups;
    };
  },
  menus(state, getters) {
    return (resource: string = null) => {
      return getters.groups(resource).menus;
    };
  },
  categories(state, getters) {
    return (resource: string = null) => {
      return getters.groups(resource).categories;
    };
  },
  items(state, getters) {
    return (resource: string = null) => {
      return getters.groups(resource).items;
    };
  },
  itemsTotal(state, getters) {
    return (resource: string = null) => {
      if (!resource) {
        return null;
      }
  
      const response = getters.groups(resource).itemsResponse;
      if (!response || !response.meta || !response.meta.total) {
        return null;
      }
  
      return response.meta.total;
    };
  },
  filters(state: MarketplaceState) {
    return (resource: string = null) => {
      return resource ? state.filters[resource] : state.filters;
    };
  },
  menu(state, getters) {
    return (resource: string = null) => {
      return getters.filters(resource).menu;
    };
  },
  search(state, getters) {
    return (resource: string = null) => {
      return getters.filters(resource).search;
    };
  },
  category(state, getters) {
    return (resource: string = null) => {
      return getters.filters(resource).category;
    };
  },
};

const actions = {
  selectTab({ commit, dispatch }, tab: string) {
    commit('selectTab', tab);

    if (tab === 'products') {
      dispatch('loadMenusIfMissing', { resource: tab });
    }

    dispatch('loadCategoriesIfMissing', { resource: tab });
    dispatch('loadItemsIfMissing', { resource: tab });
  },
  async loadMenus({ commit, rootGetters }, { resource }) {
    const menus = await (new MenusApi())
      .indexMenus({}, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setMenusResponse', { response: menus, resource });
    commit('setMenus', { menus: menus.data ?? [], resource });
  },
  async loadMenusIfMissing({ state, dispatch }, { resource }) {
    if (state.groups[resource].menusResponse) {
      return;
    }

    dispatch('loadMenus', { resource })
  },
  async loadCategories({ commit, getters, rootGetters }, {resource}) {
    const categories = await (new CategoriesApi())
      .indexCategories({ filterTarget: resource }, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setCategoriesResponse', { response: categories, resource });
    commit('setCategories', { categories: categories.data ?? [], resource });
  },
  async loadCategoriesIfMissing({ state, dispatch }, { resource }) {
    if (state.groups[resource].categoriesResponse) {
      return;
    }

    dispatch('loadCategories', { resource })
  },
  async loadItems({ commit, getters, rootGetters }, { resource }) {
    let items = null;

    if (resource === 'products') {
      const filters : ResourceFilters = getters['filters'](resource);
      const request : IndexProductsRequest = {};

      if (filters.menu) {
        request.filterMenus = String(filters.menu.id);
      }
      if (filters.category) {
        request.filterCategories = String(filters.category.id);
      }

      items = await (new ProductsApi())
        .indexProducts(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);  
    } else if (resource === 'spaces') {
      const filters : ResourceFilters = getters['filters'](resource);
      const request : IndexSpacesRequest = {};

      if (filters.category) {
        request.filterCategories = String(filters.category.id);
      }

      items = await (new SpacesApi())
        .indexSpaces(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);  
    } else if (resource === 'tickets') {
      const filters : ResourceFilters = getters['filters'](resource);
      const request : IndexTicketsRequest = {};

      if (filters.category) {
        request.filterCategories = String(filters.category.id);
      }

      items = await (new TicketsApi())
        .indexTickets(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);  
    } else if (resource === 'services') {
      const filters : ResourceFilters = getters['filters'](resource);
      const request : IndexServicesRequest = {};

      if (filters.category) {
        request.filterCategories = String(filters.category.id);
      }

      items = await (new ServicesApi())
        .indexServices(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);  
    }

    commit('setItemsResponse', { response: items, resource });
    commit('setItems', { items: items.data ?? [], resource });
  },
  async loadItemsIfMissing({ state, dispatch }, { resource }) {
    if (state.groups[resource].itemsResponse) {
      return;
    }

    dispatch('loadItems', { resource })
  },
  async loadMoreItems({ state, commit, getters, rootGetters }, { resource }) {
    let items = null;
    let page = null;

    const response = state.groups[resource].moreItemsResponse;
    if (!response) {
      page = 2;
    } else {
      page = response.meta.currentPage + 1;
    }

    if (resource === 'products') {
      const filters : ResourceFilters = getters['filters'](resource);
      const request : IndexProductsRequest = { pageNumber: page };

      if (filters.menu) {
        request.filterMenus = String(filters.menu.id);
      }
      if (filters.category) {
        request.filterCategories = String(filters.category.id);
      }

      items = await (new ProductsApi())
        .indexProducts(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);  
    } else if (resource === 'spaces') {
      const filters : ResourceFilters = getters['filters'](resource);
      const request : IndexSpacesRequest = { pageNumber: page };

      if (filters.category) {
        request.filterCategories = String(filters.category.id);
      }

      items = await (new SpacesApi())
        .indexSpaces(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);  
    } else if (resource === 'tickets') {
      const filters : ResourceFilters = getters['filters'](resource);
      const request : IndexTicketsRequest = { pageNumber: page };

      if (filters.category) {
        request.filterCategories = String(filters.category.id);
      }

      items = await (new TicketsApi())
        .indexTickets(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);  
    } else if (resource === 'services') {
      const filters : ResourceFilters = getters['filters'](resource);
      const request : IndexServicesRequest = { pageNumber: page };

      if (filters.category) {
        request.filterCategories = String(filters.category.id);
      }

      items = await (new ServicesApi())
        .indexServices(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);  
    }

    commit('setMoreItemsResponse', { response: items, resource });
    commit('appendItems', { items: items.data ?? [], resource });
  },
  selectMenu({ commit, dispatch }, { menu, resource }) {
    commit('selectMenu', { menu, resource });
    commit('selectCategory', { category: null, resource });
    commit('setCategories', { categories: menu.categories ?? null, resource });
    dispatch('loadItems', { resource });
  },
  applySearch({ commit, dispatch }, { search, resource }) {
    commit('applySearch', { search, resource });
    dispatch('loadItems', { resource });
  },
  selectCategory({ commit, dispatch }, { category, resource }) {
    commit('selectCategory', { category, resource });
    dispatch('loadItems', { resource });
  },
};

const mutations = {
  selectTab(state: MarketplaceState, tab) {
    state.tab = tab;
  },
  setMenus(state: MarketplaceState, { menus, resource }) {
    state.groups[resource].menus = menus;
  },
  setMenusResponse(state: MarketplaceState, { response, resource }) {
    state.groups[resource].menusResponse = response;
  },
  setCategories(state: MarketplaceState, { categories, resource }) {
    state.groups[resource].categories = categories;
  },
  setCategoriesResponse(state: MarketplaceState, { response, resource }) {
    state.groups[resource].categoriesResponse = response;
  },
  setItems(state: MarketplaceState, { items, resource }) {
    state.groups[resource].items = items;
  },
  appendItems(state: MarketplaceState, { items, resource }) {
    state.groups[resource].items = state.groups[resource].items.concat(items);
  },
  setItemsResponse(state: MarketplaceState, { response, resource }) {
    state.groups[resource].itemsResponse = response;
    state.groups[resource].moreItemsResponse = null;
  },
  setMoreItemsResponse(state: MarketplaceState, { response, resource }) {
    state.groups[resource].moreItemsResponse = response;
  },
  selectMenu(state: MarketplaceState, { menu, resource }) {
    state.filters[resource].menu = menu;
  },
  applySearch(state: MarketplaceState, { search, resource }) {
    state.filters[resource].search = search;
  },
  selectCategory(state: MarketplaceState, { category, resource }) {
    state.filters[resource].category = category;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
