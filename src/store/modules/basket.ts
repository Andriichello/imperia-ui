import { Banquet } from "@/openapi";

class BasketState {
  /** Current banquet in Marketplace */
  public banquet: Banquet | null;

  /** True, if basket should be shown in Marketplace */
  public showing: boolean;

  constructor() {
    this.banquet = null;
    this.showing = false;
  }
}

const state = new BasketState();

const getters = {
  banquet(state: BasketState) {
    return state.banquet;
  },
  showing(state: BasketState) {
    return state.showing;
  },
};

const actions = {
  newBanquet({ commit }) {
    commit('setBanquet', {});
  },
  setBanquet({ commit }, banquet: Banquet) {
    commit('setBanquet', banquet);
  },
  setToInfo({ commit }, { key, value }) {
    commit('setToBanquet', { key, value });
  },
  setShowing({ commit }, showing) {
    commit('setShowing', showing);
  },
};

const mutations = {
  setBanquet(state: BasketState, banquet: Banquet) {
    state.banquet = banquet;
  },
  setToBanquet(state: BasketState, { key, value }) {
    state.banquet[key] = value;
  },
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
