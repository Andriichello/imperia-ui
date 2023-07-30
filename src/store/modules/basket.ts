import {
  Banquet, BanquetsApi,
  Customer,
  Restaurant, ShowBanquetResponse,
  StoreBanquetRequest,
  StoreBanquetRequestStateEnum, StoreBanquetResponse,
  UpdateBanquetRequest, UpdateBanquetResponse,
  User
} from "@/openapi";
import {authHeaders, jsonHeaders} from "@/helpers";

class BanquetForm {
  /** Values that were set after constructor */
  protected changes: object;
  protected banquet: Banquet | null;

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

  constructor(banquet: Banquet = null) {
    this.changes = {};
    this.state = StoreBanquetRequestStateEnum.Draft; 
    
    this.banquet = banquet;
  }

  public static fromBanquet(banquet: Banquet) {
    const form = new BanquetForm(banquet);

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
    if (value === undefined) {
      this.clearChange(name);
    } else {
      this.changes[name] = value;
    }
  }

  public clearChange(name: string) {
    return delete this.changes[name];
  }

  public hasChanges() {
    return Object.keys(this.getChanges()).length > 0;
  }

  public hasRealChanges() {
    if (!this.banquet) {
      return this.hasChanges();
    }

    let result = false;

    Object.keys(this.getChanges())
      .forEach(name => {
        if (this.banquet[name] !== this.getChange(name)) {
          result = true;
          return;
        }
      });

    return result;
  }

  public asCreate(): StoreBanquetRequest {
    const request = {
      state: this.state,
      title: this.title,
      description: this.description,
      customerId: this.customer ? this.customer['id'] : null,
      advanceAmount: this.advanceAmount,
      startAt: this.startAt,
      endAt: this.endAt,
    };

    return request as StoreBanquetRequest;
  }

  public asUpdate(): UpdateBanquetRequest {
    return this.asCreate();
  }
}

class BasketState {
  /** True, if basket should be shown in Marketplace */
  public showing: boolean;
  /** Banquet form in Marketplace */
  public form: BanquetForm | null;
  /** Selected banquet in Marketplace */
  public banquet: Banquet | null;

  /** Last show banquet response */
  public showResponse: ShowBanquetResponse | Response | null;
  /** Last create banquet response */
  public createResponse: StoreBanquetResponse | Response | null;
  /** Last update banquet response */
  public updateResponse: UpdateBanquetResponse | Response | null;

  constructor() {
    this.form = new BanquetForm();

    this.banquet = null;
    this.showing = false;

    this.showResponse = null;
    this.createResponse = null;
    this.updateResponse = null;
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
  date(state: BasketState) {
    return state.form.date;
  },
  startAt(state: BasketState) {
    return state.form.startAt;
  },
  endAt(state: BasketState) {
    return state.form.endAt;
  },
  availableStates(state: BasketState) {
    return state.banquet.availableStates;
  },
  hasChanges(state: BasketState) {
    return state.form.hasChanges();
  },
  hasRealChanges(state: BasketState) {
    return state.form.hasRealChanges();
  },
  getShowResponse(state: BasketState) {
    return state.showResponse;
  },
  getCreateResponse(state: BasketState) {
    return state.createResponse;
  },
  getUpdateResponse(state: BasketState) {
    return state.updateResponse;
  },
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
  setState({ commit }, value: string | null) {
    commit('setState', value);
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
  setDate({ commit, state }, value: Date | string | null) {
    commit('setDate', value);
    if (state.form?.startAt) {
      commit('setStartAt', state.form.startAt);
    }
    if (state.form?.endAt) {
      commit('setEndAt', state.form.endAt);
    }
  },
  setStartAt({ commit }, value: Date | string | null) {
    commit('setStartAt', value);
  },
  setEndAt({ commit }, value: Date | string | null) {
    commit('setEndAt', value);
  },
  async loadBanquet({ commit, rootGetters }, { id }) {
    const response = await (new BanquetsApi())
      .showBanquet({ id, include: 'creator,customer,comments' }, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setShowResponse', response);
    commit('setBanquet', response.data);
  },
  async loadBanquetIfMissing({ dispatch }, { id }) {
    if (state.showResponse) {
      return;
    }

    dispatch('loadBanquet', { id })
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
  clear(state: BasketState) {
    state.banquet = null;
    state.form = new BanquetForm();
  },
  setForm(state: BasketState, form: BanquetForm) {
    state.form = form;
  },
  setBanquet(state: BasketState, banquet: Banquet) {
    state.banquet = banquet;
    state.form = BanquetForm.fromBanquet(banquet);
  },
  setShowing(state: BasketState, showing) {
    state.showing = showing;
  },
  setState(state: BasketState, value) {
    state.form.state = value;
    state.form.setChange('state', value);
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
  setDate(state: BasketState, value: Date) {
    state.form.date = value;
    state.form.setChange('date', value);
  },
  setStartAt(state: BasketState, value: Date) {
    const date = state.form?.date;

    if (date) {
      const startAt = new Date((date as Date).getTime());
     
      startAt.setHours(value.getHours());
      startAt.setMinutes(value.getMinutes());
      startAt.setMilliseconds(value.getMilliseconds());
     
      state.form.startAt = startAt;
      state.form.setChange('startAt', startAt);
    } else {
      state.form.startAt = value;
      state.form.setChange('startAt', value);
    }
  },
  setEndAt(state: BasketState, value: Date) {
    const date = state.form?.date;

    if (date) {
      const endAt = new Date((date as Date).getTime());
     
      endAt.setHours(value.getHours());
      endAt.setMinutes(value.getMinutes());
      endAt.setMilliseconds(value.getMilliseconds());

      state.form.endAt = endAt;
      state.form.setChange('endAt', endAt);
    } else {
      state.form.endAt = value;
      state.form.setChange('endAt', value);
    }
  },
  setShowResponse(state: BasketState, response) {
    state.showResponse = response;
  },
  setCreateResponse(state: BasketState, response) {
    state.createResponse = response;
  },
  setUpdateResponse(state: BasketState, response) {
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
