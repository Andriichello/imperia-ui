import { authHeaders } from "@/helpers";
import { Banquet, BanquetsApi, Customer, Restaurant, ShowBanquetResponse, StoreBanquetRequest, StoreBanquetRequestStateEnum, User } from "@/openapi";

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

  constructor() {
    this.state = StoreBanquetRequestStateEnum.Draft; 
  }

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
  public form: BanquetForm | null;
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
  state(state: BasketState) {
    return state.form.state;
  },
  customer(state: BasketState) {
    return state.form.customer;
  }, 
  totals(state: BasketState) {
    return state.banquet ? state.banquet.totals : null;
  },
  advanceAmount(state: BasketState) {
    return state.form.advanceAmount;
  },
  startAt(state: BasketState) {
    return state.form.startAt;
  },
  endAt(state: BasketState) {
    return state.form.endAt;
  },
};

const actions = {
  setForm({ commit }, form: BanquetForm) {
    commit('setForm', form);
  },
  resolveCustomer({ commit, state, rootGetters }) {
    if (state.form.customer) {
      return;
    }

    const me = rootGetters['auth/user'];
    commit('setCustomer', me.customer);
  },
  setBanquet({ commit }, banquet: Banquet) {
    commit('setBanquet', banquet);
    commit('setForm', BanquetForm.fromBanquet(banquet));
  },
  setShowing({ commit }, showing) {
    commit('setShowing', showing);
  },
  async loadBanquet({ dispatch, commit, rootGetters }, { id }) {
    const response = await (new BanquetsApi())
      .showBanquet({ id, include: 'creator,customer,comments' }, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setBanquetResponse', response);
    dispatch('setBanquet', response.data);
  },
  setTitle({ commit }, value: string | null) {
    commit('setTitle', value);
  },
  setDescription({ commit }, value: string | null) {
    commit('setDescription', value);
  },
  setCustomer({ commit }, value: Customer | null) {
    commit('setCustomer', value);
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
  setCustomer(state: BasketState, value) {
    state.form.customer = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
