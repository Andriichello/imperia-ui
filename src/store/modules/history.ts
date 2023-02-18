import { authHeaders } from "@/helpers";
import { Banquet, BanquetsApi, IndexBanquetResponse, IndexBanquetsRequest } from "@/openapi";

class HistoryFilters {
  /** Applied search query */
  public search: string | null;

  constructor() {
    this.search = null;
  }
}

class HistoryState {
  public filters: HistoryFilters;
  public banquets: Banquet[] | null;
  public banquetsResponse: IndexBanquetResponse | null;
  public moreBanquetsResponse: IndexBanquetResponse | null;

  constructor() {
    this.filters = new HistoryFilters();
    this.banquets = null;
    this.banquetsResponse = null;
    this.moreBanquetsResponse = null;
  }
}

const state = new HistoryState();

const getters = {
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
};

const actions = {
  async loadBanquets({ commit, rootGetters }) {
    const banquets = await (new BanquetsApi())
      .indexBanquets({ include: 'creator,customer,comments' }, { headers: { ...authHeaders(rootGetters['auth/token']) } })
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

    const response = state.moreBanquetsResponse;
    if (!response) {
      page = 2;
    } else {
      page = response.meta.currentPage + 1;
    }

    const filters: HistoryFilters = getters['filters'];
    const request: IndexBanquetsRequest = { 
      pageNumber: page,
       include: 'creator,customer,comments'
    };

    banquets = await (new BanquetsApi())
      .indexBanquets(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setMoreBanquetsResponse', { response: banquets });
    commit('appendBanquets', { banquets: banquets.data ?? [] });
  },
  applySearch({ commit, dispatch }, { search }) {
    commit('applySearch', { search });
    dispatch('loadBanquets');
  },
};

const mutations = {
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
  applySearch(state: HistoryState, { search }) {
    state.filters.search = search;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
