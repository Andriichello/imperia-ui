import router from '@/router';

interface NavState {
  page: string|null,
  scrolled: boolean|null,
}

const state: NavState = {
    page: null,
    scrolled: null,
};

const getters = {
  get(state: NavState): string|null {
    return state.page;
  },
  scrolled(state: NavState): boolean|null {
    return state.scrolled;
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
  setScrolled({ commit }, scrolled: boolean|null): void {
    commit('setScrolled', scrolled);
  },
};

const mutations = {
  set(state: NavState, page: string|null): void {
    state.page = page;
  },
  setScrolled(state: NavState, scrolled: boolean|null): void {
    state.scrolled = scrolled;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
