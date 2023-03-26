import { Banquet, Customer, Restaurant, StoreBanquetRequestStateEnum, User } from "@/openapi";

class BanquetForm {
  /** Values that were set after constructor */
  protected changes: object;

  public id: number | null;
  public title: string | null;
  public description: string | null;
  public state: string | null;
  public creator: number | User | null;
  public customer: number | Customer | null;
  public restaurant: number | Restaurant | null;
  public advanceAmount: number | null;
  public date: Date | string | null;
  public startAt: Date | string | null;
  public endAt: Date | string | null;

  constructor() {
    this.changes = {};
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
    form.date = banquet.startAt;
    form.startAt = banquet.startAt;
    form.endAt = banquet.endAt;

    return form;
  }

  public getChanges() {
    return this.changes;
  }

  public getChange(name: string, defaultValue = undefined) {
    if (Object.prototype.hasOwnProperty.call(this.changes, name)) {
      return this.changes[name];
    }

    return defaultValue;
  }

  public setChange(name: string, value: any) {
    this.changes[name] = value;
  }

  public clearChange(name: string) {
    return delete this.changes[name];
  }
}

class BasketState {
  /** True, if basket should be shown in Marketplace */
  public showing: boolean;
  /** Picker that should be shown in Basket */
  public picker: string | null;
  /** Banquet form in Marketplace */
  public form: BanquetForm | null;
  /** Selected banquet in Marketplace */
  public banquet: Banquet | null;

  constructor() {
    this.form = new BanquetForm();
    this.picker = null;
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
  picker(state: BasketState) {
    return state.picker;
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
  date(state: BasketState) {
    return state.form.date;
  },
  startAt(state: BasketState) {
    return state.form.startAt;
  },
  endAt(state: BasketState) {
    return state.form.endAt;
  },
  isBanquetChanged(state: BasketState) {
    return Object.keys(state.form.getChanges()).length > 0;
  }
};

const actions = {
  clear({ commit, dispatch }) {
    commit('clear');
    dispatch('resolveCustomer');
  },
  setForm({ commit }, form: BanquetForm) {
    commit('setForm', form);
  },
  setBanquet({ commit }, banquet: Banquet) {
    commit('setBanquet', banquet);
    commit('setForm', BanquetForm.fromBanquet(banquet));
  },
  resolveCustomer({ getters, commit, rootGetters }) {
    if (getters['customer']) {
      return;
    }

    const me = rootGetters['auth/user'];
    commit('setCustomer', me.customer);
  },
  setShowing({ commit }, showing) {
    commit('setShowing', showing);
  },
  setPicker({ commit }, picker) {
    commit('setPicker', picker);
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
  setDate({ commit }, value: Date | string | null) {
    commit('setDate', value);
  },
  setStartAt({ commit }, value: Date | string | null) {
    commit('setStartAt', value);
  },
  setEndAt({ commit }, value: Date | string | null) {
    commit('setEndAt', value);
  },
};

const mutations = {
  clear(state: BasketState) {
    state.picker = null;
    state.banquet = null;
    state.form = new BanquetForm();
  },
  setForm(state: BasketState, form: BanquetForm) {
    state.form = form;
  },
  setBanquet(state: BasketState, banquet: Banquet) {
    state.banquet = banquet;
  },
  setShowing(state: BasketState, showing) {
    state.showing = showing;
  },
  setPicker(state: BasketState, picker) {
    state.picker = picker;
  },
  setTitle(state: BasketState, value) {
    state.form.title = value;
    state.form.setChange('title', value);
  },
  setDescription(state: BasketState, value) {
    state.form.description = value;
    state.form.setChange('description', value);
  },
  setCustomer(state: BasketState, value) {
    state.form.customer = value;
    state.form.setChange('customer', value);
  },
  setDate(state: BasketState, value) {
    state.form.date = value;
    state.form.setChange('date', value);
  },
  setStartAt(state: BasketState, value) {
    state.form.startAt = value;
    state.form.setChange('startAt', value);
  },
  setEndAt(state: BasketState, value) {
    state.form.endAt = value;
    state.form.setChange('endAt', value);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
