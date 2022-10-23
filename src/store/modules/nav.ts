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
  set({ commit }, page: string): void {
    commit('set', page);
  },
};

const mutations = {
  set(state: NavState, page: string): void {
    state.page = page;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
