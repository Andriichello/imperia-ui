import {authHeaders} from "@/helpers";
import {
  IndexWaiterResponse,
  IndexWaitersRequest,
  ShowWaiterRequest,
  ShowWaiterResponse,
  Waiter,
  WaitersApi
} from "@/openapi";

class WaitersState {
  /** Current search string */
  public search: string | null;
  /** Loaded waiter */
  public waiter: Waiter | null;

  /** Loaded waiters */
  public waiters: Waiter[] | null;

  /** Selected waiter */
  public selected: Waiter | null;

  /** Last index waiters response */
  public indexResponse: IndexWaiterResponse | Response | null;

  /** Last index more waiters response */
  public moreResponse: IndexWaiterResponse | Response | null;

  /** Last show waiter response */
  public showResponse: ShowWaiterResponse | Response | null;

  constructor() {
    this.waiter = null;
    this.waiters = null;
    this.selected = null;

    this.indexResponse = null;
    this.moreResponse = null;
    this.showResponse = null;
  }
}

const state = new WaitersState();

const getters = {
  waiter(state: WaitersState) {
    return state.waiter;
  },
  waiters(state: WaitersState) {
    return state.waiters;
  },
  selected(state: WaitersState) {
    return state.selected;
  },
  isLoadingWaiters(state: WaitersState) {
    return !state.waiters && !state.indexResponse;
  },
  getIndexResponse(state: WaitersState) {
    return state.indexResponse;
  },
  getMoreResponse(state: WaitersState) {
    return state.moreResponse;
  },
  getShowResponse(state: WaitersState) {
    return state.showResponse;
  },
};

const actions = {
  clear({ commit }) {
    commit('setWaiter', null);
    commit('setWaiters', null);
    commit('setSelected', null);

    commit('setIndexResponse', null);
    commit('setMoreResponse', null);
    commit('setShowResponse', null);

    commit('applySearch', null);
  },
  setSelected({ commit }, waiter: Waiter | null) {
    commit('setSelected', waiter);
  },
  setWaiter({ commit }, waiter: Waiter | null) {
    commit('setWaiter', waiter);
  },
  setWaiters({ commit }, waiters: Waiter[] | null) {
    commit('setWaiters', waiters);
  },
  prependWaiters({ commit }, waiters: Waiter[] | null) {
    commit('prependWaiters', waiters);
  },
  appendWaiters({ commit }, waiters: Waiter[] | null) {
    commit('appendWaiters', waiters);
  },
  async loadWaiter({ commit, rootGetters }, { id }) {
    const request: ShowWaiterRequest = {
      id,
    };

    const response = await (new WaitersApi())
      .showWaiter(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setShowResponse', response);
  },
  async loadWaiters({ state, commit, dispatch, rootGetters }) {
    const request: IndexWaitersRequest = {pageSize: 50};

    const restaurantId = rootGetters['restaurants/restaurantId'];
    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    if (state.search && state.search.length > 0) {
      request.filterSearch = state.search;
    }

    const response = await (new WaitersApi())
        .indexWaiters(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => {
          if (error.response.status !== 404) {
            dispatch('error/setResponse', error.response, {root:true});
          }

          return error.response;
        });

    commit('setIndexResponse', response);
    dispatch('setWaiters', response.data);
  },
  async loadWaitersIfMissing({ state, dispatch }) {
    if (state.indexResponse) {
      return;
    }

    dispatch('loadWaiters');
  },
  async loadMoreWaiters({ state, dispatch, commit, rootGetters }) {
    const request: IndexWaitersRequest = {pageSize: 50};

    const restaurantId = rootGetters['restaurants/restaurantId'];
    if (restaurantId) {
      request.filterRestaurants = restaurantId;
    }

    if (state.search && state.search.length > 0) {
      request.filterSearch = state.search;
    }

    if (!state.moreResponse) {
      request.pageNumber = 2;
    } else {
      request.pageNumber = state.moreResponse.meta.currentPage + 1;
    }

    const response = await (new WaitersApi())
        .indexWaiters(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => {
          if (error.response.status !== 404) {
            dispatch('error/setResponse', error.response, {root:true});
          }

          return error.response;
        });

    commit('setMoreResponse', response);
    commit('appendWaiters', response.data);
  },
  applySearch({ commit, dispatch }, { search }) {
    commit('setIndexResponse', null);
    commit('setMoreResponse', null);
    commit('setWaiters', null)

    commit('applySearch', search);
    dispatch('loadWaiters');
  },
  setIndexResponse({ commit }, response) {
    commit('setIndexResponse', response);
  },
  setMoreResponse({ commit }, response) {
    commit('setMoreResponse', response);
  },
  setShowResponse({ commit }, response) {
    commit('setShowResponse', response);
  },
};

const mutations = {
  setWaiter(state: WaitersState, waiter: Waiter | null) {
    state.waiter = waiter;
  },
  setWaiters(state: WaitersState, waiters: Waiter[] | null) {
    state.waiters = waiters;
  },
  setSelected(state: WaitersState, selected: Waiter | null) {
    state.selected = selected;
  },
  prependWaiters(state: WaitersState, waiters: Waiter[] | null) {
    state.waiters = (waiters ?? []).concat(state.waiters ?? []);
  },
  appendWaiters(state: WaitersState, waiters: Waiter[] | null) {
    state.waiters = (state.waiters ?? []).concat(waiters);
  },
  setShowResponse(state: WaitersState, response) {
    state.showResponse = response;
  },
  setIndexResponse(state: WaitersState, response) {
    state.indexResponse = response;
  },
  setMoreResponse(state: WaitersState, response) {
    state.moreResponse = response;
  },
  applySearch(state: WaitersState, search) {
    state.search = search;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
