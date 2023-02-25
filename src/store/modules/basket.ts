import { authHeaders } from "@/helpers";
import { Banquet, BanquetsApi, Customer, Restaurant, ShowBanquetResponse, StoreBanquetRequest, User } from "@/openapi";

class BanquetForm {
  public id: number | null;
  public title: string | null;
  public description: string | null;
  public state: string | null;
  public creator: number | User | null;
  public customer: number | Customer | null;
  public restaurant: number | Restaurant | null;
  public advanceAmount: number | null;
  public startAt: Date | string | null;
  public endAt: Date | string | null;

  public static fromBanquet(banquet: Banquet) {
    const form = new BanquetForm();

    form.id = banquet.id;
    form.title = banquet.title;
    form.description = banquet.description;
    form.state = banquet.state;
    form.creator = banquet.creator;
    form.customer = banquet.customer;
    form.restaurant = banquet.restaurantId;
    form.advanceAmount = banquet.advanceAmount;
    form.startAt = banquet.startAt;
    form.endAt = banquet.endAt;

    return form;
  }
}

class BasketState {
  /** Banquet form in Marketplace */
  public form: BanquetForm;
  /** Selected banquet in Marketplace */
  public banquet: Banquet | null;

  /** Current banquet in Marketplace */
  public banquetResponse: ShowBanquetResponse | null;

  /** True, if basket should be shown in Marketplace */
  public showing: boolean;

  constructor() {
    this.form = new BanquetForm();
    this.banquet = null;
    this.showing = false;
  }
}

const state = new BasketState();

const getters = {
  form(state: BasketState) {
    return state.form;
  },
  banquet(state: BasketState) {
    return state.banquet;
  },
  showing(state: BasketState) {
    return state.showing;
  },
  title(state: BasketState) {
    return state.form.title;
  },
  description(state: BasketState) {
    return state.form.description;
  },
};

const actions = {
  setForm({ commit }, form: BanquetForm) {
    commit('setForm', form);
  },
  newBanquet({ commit }) {
    commit('setBanquet', {});
  },
  setBanquet({ commit }, banquet: Banquet) {
    commit('setBanquet', banquet);
    commit('setForm', BanquetForm.fromBanquet(banquet));
  },
  setShowing({ commit }, showing) {
    commit('setShowing', showing);
  },
  async loadBanquet({ commit, rootGetters }, { id }) {
    const response = await (new BanquetsApi())
      .showBanquet({ id, include: 'creator,customer,comments' }, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setBanquetResponse', response);
    commit('setBanquet', response.data);
  },
  setTitle({ commit }, value: string | null) {
    commit('setTitle', value);
  },
  setDescription({ commit }, value: string | null) {
    commit('setDescription', value);
  },
};

const mutations = {
  setForm(state: BasketState, form: BanquetForm) {
    state.form = form;
  },
  setBanquet(state: BasketState, banquet: Banquet) {
    state.banquet = banquet;
  },
  setBanquetResponse(state: BasketState, response) {
    state.banquetResponse = response;
  },
  setToBanquet(state: BasketState, { key, value }) {
    state.banquet[key] = value;
  },
  setShowing(state: BasketState, showing) {
    state.showing = showing;
  },
  setTitle(state: BasketState, value) {
    state.form.title = value;
  },
  setDescription(state: BasketState, value) {
    state.form.description = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
