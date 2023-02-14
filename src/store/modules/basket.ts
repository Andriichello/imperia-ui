class BasketState {
  /** True, if basket should be shown in Marketplace */
  public showing: boolean;

  constructor() {
    this.showing = false;
  }
}

const state = new BasketState();

const getters = {
  showing(state: BasketState) {
    return state.showing;
  },
};

const actions = {
  setShowing({ commit }, showing) {
    commit('setShowing', showing);
  },
};

const mutations = {
  setShowing(state: BasketState, showing) {
    state.showing = showing;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
