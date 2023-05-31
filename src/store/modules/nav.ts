import router from '@/router';

interface NavState {
  page: string|null,
}

const state: NavState = {
    page: null,
};

const getters = {
  get(state: NavState): string|null {
    return state.page;
  },
};

const actions = {
  set({ commit }, page: string|null): void {
    commit('set', page);
  },
  /** Is called after each router navigation */
  resolve({ commit }): void {
    commit('set', router.currentRoute.value['name']);
  },
};

const mutations = {
  set(state: NavState, page: string|null): void {
    state.page = page;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
