import {authHeaders, jsonHeaders} from "@/helpers";
import {
  Banquet,
  BanquetMultipleInvoiceUrlResponse,
  BanquetsApi,
  IndexBanquetResponse,
  IndexBanquetsRequest,
  InvoicesApi,
  MultipleInvoiceUrlRequest,
  ShowBanquetResponse
} from "@/openapi";

class HistoryFilters {
  /** Applied search query */
  public search: string | null ;

  /** Banquet states */
  public states: string[];

  /** Banquet starting or active from */
  public from: Date | null;

  /** Banquet ending or active until */
  public until: Date | null;

  constructor() {
    this.search = null;
    this.states = [];
    this.from = null;
    this.until = null;
  }
}

class HistoryState {
  public mode: string | null;
  public selected: Banquet[] | null;
  public filters: HistoryFilters;
  public banquet: Banquet | null;
  public banquets: Banquet[] | null;
  public banquetResponse: ShowBanquetResponse | null;
  public banquetsResponse: IndexBanquetResponse | null;
  public moreBanquetsResponse: IndexBanquetResponse | null;
  public pdfUrlResponse: BanquetMultipleInvoiceUrlResponse | null;

  constructor() {
    this.mode = null;
    this.selected = null;
    this.filters = new HistoryFilters();
    this.banquet = null;
    this.banquets = null;
    this.banquetResponse = null;
    this.banquetsResponse = null;
    this.moreBanquetsResponse = null;
    this.pdfUrlResponse = null;
  }
}

const state = new HistoryState();

const getters = {
  mode(state: HistoryState) {
    return state.mode;
  },
  selected(state: HistoryState) {
    return state.selected;
  },
  selections(state: HistoryState) {
    return state.filters;
  },
  filters(state: HistoryState) {
    return state.filters;
  },
  banquets(state: HistoryState) {
    return state.banquets;
  },
  banquetsTotal(state: HistoryState) {
    const response = state.banquetsResponse;
      if (!response || !response.meta || !response.meta.total) {
        return null;
      }
  
    return response.meta.total;
  },
  getShowResponse(state: HistoryState) {
    return state.banquetResponse;
  },
  getIndexResponse(state: HistoryState) {
    return state.banquetsResponse;
  },
  getIndexMoreResponse(state: HistoryState) {
    return state.moreBanquetsResponse;
  },
  getPdfUrlResponse(state: HistoryState) {
    return state.pdfUrlResponse;
  },
};

const actions = {
  setMode({ commit }, { mode }) {
    commit('setMode', { mode });
  },
  setSelected({ commit }, { selected }) {
    commit('setSelected', { selected });
  },
  async loadBanquets({ commit, getters, rootGetters}) {
    const request: IndexBanquetsRequest = {
      include: 'creator,customer,comments',
      pageSize: 20,
    };

    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurantId = restaurantId;
    }

    const filters = getters.filters;
    if (filters?.states && filters.states.length > 0) {
      request.filterState = filters.states.join(',');
    }
    if (filters?.search && filters.search.length > 0) {
      request.filterSearch = filters.search;
    }
    if (filters?.from) {
      request.filterFrom = filters.from;
    }
    if (filters?.until) {
      request.filterUntil = filters.until;
    }

    const banquets = await (new BanquetsApi())
      .indexBanquets(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setBanquetsResponse', { response: banquets });
    commit('setBanquets', { banquets: banquets.data ?? [] });
  },
  async loadBanquetsIfMissing({ state, dispatch }) {
    if (state.banquetsResponse) {
      return;
    }

    dispatch('loadBanquets');
  },
  async loadMoreBanquets({ state, commit, getters, rootGetters }) {
    let banquets = null;
    let page = null;
    let size = 20;

    const response = state.moreBanquetsResponse ?? state.banquetsResponse;
    if (!response) {
      page = 2;
    } else {
      page = response.meta.currentPage + 1;
      size = response.meta.perPage;
    }

    const request: IndexBanquetsRequest = {
      pageNumber: page,
      pageSize: size,
      include: 'creator,customer,comments',
    };

    const restaurantId = rootGetters['restaurants/restaurantId'];

    if (restaurantId) {
      request.filterRestaurantId = restaurantId;
    }

    const filters = getters['filters'];
    if (filters?.states && filters.states.length > 0) {
      request.filterState = filters.states.join(',');
    }
    if (filters?.search && filters.search.length > 0) {
      request.filterSearch = filters.search;
    }
    if (filters?.from) {
      request.filterFrom = filters.from;
    }
    if (filters?.until) {
      request.filterUntil = filters.until;
    }

    banquets = await (new BanquetsApi())
      .indexBanquets(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setMoreBanquetsResponse', { response: banquets });
    commit('appendBanquets', { banquets: banquets.data ?? [] });
  },
  async loadBanquetsPdfUrl({ commit, rootGetters }, { ids }) {
    const request: MultipleInvoiceUrlRequest = {
      ids: ids.join(','),
      endpoint: "pdfMultiple",
    }

    const response = await (new InvoicesApi())
      .banquetMultipleInvoiceUrl({multipleInvoiceUrlRequest: request}, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
      .then(response => response)
      .catch(error => error.response);

    commit('setPdfUrlResponse', { response });
  },
  applySearch({ commit, dispatch }, { search }) {
    commit('applySearch', { search });
    dispatch('loadBanquets');
  },
  applyStates({ commit, dispatch }, { states }) {
    commit('applyStates', { states });
    dispatch('loadBanquets');
  },
  applyFrom({ commit, dispatch }, { from }) {
    commit('applyFrom', { from });
    dispatch('loadBanquets');
  },
  applyUntil({ commit, dispatch }, { until }) {
    commit('applyUntil', { until });
    dispatch('loadBanquets');
  },
  setBanquetsResponse({ commit }, { response }) {
    commit('setBanquetsResponse', { response });
  },
  setMoreBanquetsResponse({ commit }, { response }) {
    commit('setMoreBanquetsResponse', { response });
  },
};

const mutations = {
  setMode(state: HistoryState, { mode }) {
    state.mode = mode;
  },
  setSelected(state: HistoryState, { selected }) {
    state.selected = selected;
  },
  setBanquetsResponse(state: HistoryState, { response }) {
    state.banquetsResponse = response;
  },
  setMoreBanquetsResponse(state: HistoryState, { response }) {
    state.moreBanquetsResponse = response;
  },
  setBanquets(state: HistoryState, { banquets }) {
    state.banquets = banquets;
  },
  appendBanquets(state: HistoryState, { banquets }) {
    state.banquets = state.banquets.concat(banquets);
  },
  setPdfUrlResponse(state: HistoryState, { response }) {
    state.pdfUrlResponse = response;
  },
  applySearch(state: HistoryState, { search }) {
    state.filters.search = search;
  },
  applyStates(state: HistoryState, { states }) {
    state.filters.states = states;
  },
  applyFrom(state: HistoryState, { from }) {
    state.filters.from = from;
  },
  applyUntil(state: HistoryState, { until }) {
    state.filters.until = until;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
