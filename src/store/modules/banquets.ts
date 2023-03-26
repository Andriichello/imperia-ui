import { authHeaders, jsonHeaders } from "@/helpers";
import { BanquetsApi, ShowBanquetResponse, StoreBanquetRequest, StoreBanquetResponse, UpdateBanquetResponse } from "@/openapi";

class BanquetsState {
  /** Last show banquet response */
  public showResponse: ShowBanquetResponse | Response | null;

  /** Last create banquet response */
  public createResponse: StoreBanquetResponse | Response | null;
  
  /** Last update banquet response */
  public updateResponse: UpdateBanquetResponse | Response | null;

  constructor() {
    this.showResponse = null;
    this.createResponse = null;
    this.updateResponse = null;
  }
}

const state = new BanquetsState();

const getters = {
  getShowResponse(state: BanquetsState) {
    return state.showResponse;
  },
  getCreateResponse(state: BanquetsState) {
    return state.createResponse;
  },
  getUpdateResponse(state: BanquetsState) {
    return state.updateResponse;
  },
};

const actions = {
  async loadBanquet({ commit, rootGetters }, { id }) {
    const response = await (new BanquetsApi())
      .showBanquet({ id, include: 'creator,customer,comments' }, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setShowResponse', response);
  },
  async createBanquet({ commit, rootGetters }, request: StoreBanquetRequest) {
    const response = await (new BanquetsApi())
      .storeBanquet({ storeBanquetRequest: request }, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
      .then(response => response)
      .catch(error => error.response);

    commit('setCreateResponse', response);
  },
  async updateBanquet({ commit, rootGetters }, { id, request }) {
    const response = await (new BanquetsApi())
      .updateBanquet({ id, updateBanquetRequest: request }, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
      .then(response => response)
      .catch(error => error.response);

    commit('setUpdateResponse', response);
  },
};

const mutations = {
  setShowResponse(state: BanquetsState, response) {
    state.showResponse = response;
  },
  setCreateResponse(state: BanquetsState, response) {
    state.createResponse = response;
  },
  setUpdateResponse(state: BanquetsState, response) {
    state.updateResponse = response;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
