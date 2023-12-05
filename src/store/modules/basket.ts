import {
  Banquet, BanquetsApi,
  Customer, instanceOfStoreBanquetResponse,
  Restaurant, ShowBanquetResponse,
  StoreBanquetRequest,
  StoreBanquetRequestStateEnum, StoreBanquetResponse,
  UpdateBanquetRequest, UpdateBanquetResponse,
  User
} from "@/openapi";
import {authHeaders, jsonHeaders, ResponseErrors} from "@/helpers";

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
  public advanceAmountPaymentMethod: string | null;
  public adultsAmount: number | null;
  public adultTicketPrice: number | null;
  public childrenAmount: number | null;
  public childTicketPrice: number | null;
  public date: Date | string | null;
  public startAt: Date | string | null;
  public endAt: Date | string | null;
  public isBirthdayClub: boolean | null;
  public withPhotographer: boolean | null;
  public actualTotal: number | null;
  public invoiceUrl: string | null;

  constructor(banquet: Banquet = null) {
    this.changes = {};
    this.state = StoreBanquetRequestStateEnum.New;
    
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
    form.advanceAmountPaymentMethod = banquet.advanceAmountPaymentMethod;
    form.adultsAmount = banquet.adultsAmount;
    form.adultTicketPrice = banquet.adultTicketPrice;
    form.childrenAmount = banquet.childrenAmount;
    form.childTicketPrice = banquet.childTicketPrice;
    form.date = banquet.startAt;
    form.startAt = banquet.startAt;
    form.endAt = banquet.endAt;
    form.isBirthdayClub = banquet.isBirthdayClub;
    form.withPhotographer = banquet.withPhotographer;
    form.actualTotal = banquet.actualTotal;
    form.invoiceUrl = banquet.invoiceUrl;

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
      advanceAmount: this.advanceAmount ?? 0,
      advanceAmountPaymentMethod: this.advanceAmountPaymentMethod,
      startAt: this.startAt,
      endAt: this.endAt,
      isBirthdayClub: this.isBirthdayClub,
      withPhotographer: this.withPhotographer,
      actualTotal: this.actualTotal,
      adultsAmount: this.adultsAmount,
      adultTicketPrice: this.adultTicketPrice,
      childrenAmount: this.childrenAmount,
      childTicketPrice: this.childTicketPrice,
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

  /** Determines if show banquet response is now loading */
  public isLoadingShowResponse: boolean | null;
  /** Determines if create banquet response is now loading */
  public isLoadingCreateResponse: boolean | null;
  /** Determines if update banquet response is now loading */
  public isLoadingUpdateResponse: boolean | null;

  /** Determines if create/update banquet response was successful */
  public isSavedSuccessfully: boolean | null;

  constructor() {
    this.form = new BanquetForm();

    this.banquet = null;
    this.showing = false;

    this.showResponse = null;
    this.createResponse = null;
    this.updateResponse = null;

    this.isLoadingShowResponse = null;
    this.isLoadingCreateResponse = null;
    this.isLoadingUpdateResponse = null;

    this.isSavedSuccessfully = null;
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
  advanceAmountPaymentMethod(state: BasketState) {
    return state.form.advanceAmountPaymentMethod;
  },
  actualTotal(state: BasketState) {
    return state.form.actualTotal;
  },
  isBirthdayClub(state: BasketState) {
    return state.form.isBirthdayClub;
  },
  withPhotographer(state: BasketState) {
    return state.form.withPhotographer;
  },
  childrenAmount(state: BasketState) {
    return state.form.childrenAmount;
  },
  childTicketPrice(state: BasketState) {
    return state.form.childTicketPrice;
  },
  adultsAmount(state: BasketState) {
    return state.form.adultsAmount;
  },
  adultTicketPrice(state: BasketState) {
    return state.form.adultTicketPrice;
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
  isLoadingShowResponse(state: BasketState) {
    return state.isLoadingShowResponse;
  },
  isLoadingCreateResponse(state: BasketState) {
    return state.isLoadingCreateResponse;
  },
  isLoadingUpdateResponse(state: BasketState) {
    return state.isLoadingUpdateResponse;
  },
  isSavedSuccessfully(state: BasketState) {
    return state.isSavedSuccessfully;
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
  setActualTotal({ commit }, value: number | null) {
    commit('setActualTotal', value);
  },
  setAdvanceAmount({ commit }, value: number | null) {
    commit('setAdvanceAmount', value);
  },
  setAdvanceAmountPaymentMethod({ commit }, value: string | null) {
    commit('setAdvanceAmountPaymentMethod', value);
  },
  setIsBirthdayClub({ commit }, value: boolean | null) {
    commit('setIsBirthdayClub', value);
  },
  setWithPhotographer({ commit }, value: boolean | null) {
    commit('setWithPhotographer', value);
  },
  setAdultsAmount({ commit }, value: number | null) {
    commit('setAdultsAmount', value);
  },
  setAdultTicketPrice({ commit }, value: number | null) {
    commit('setAdultTicketPrice', value);
  },
  setChildrenAmount({ commit }, value: number | null) {
    commit('setChildrenAmount', value);
  },
  setChildTicketPrice({ commit }, value: number | null) {
    commit('setChildTicketPrice', value);
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
    commit('setIsLoadingShowResponse', true);

    const response = await (new BanquetsApi())
      .showBanquet({ id, include: 'creator,customer,comments' }, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setShowResponse', response);
    commit('setBanquet', response.data);
    commit('setIsLoadingShowResponse', false);
  },
  async loadBanquetIfMissing({ dispatch }, { id }) {
    if (state.showResponse && (state.showResponse['data']['id'] ?? null) === id) {
      return;
    }

    dispatch('loadBanquet', { id })
  },
  async createBanquet({ commit, rootGetters }, request: StoreBanquetRequest) {
    commit('setIsLoadingCreateResponse', true);

    const response = await (new BanquetsApi())
      .storeBanquet({ storeBanquetRequest: request, include: 'order' }, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
      .then(response => response)
      .catch(error => error.response);

    commit('setCreateResponse', response);
    commit('setIsLoadingCreateResponse', false);
  },
  async updateBanquet({ commit, rootGetters }, { id, request }) {
    commit('setIsLoadingUpdateResponse', true);

    const response = await (new BanquetsApi())
      .updateBanquet({ id, updateBanquetRequest: request }, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
      .then(response => response)
      .catch(error => error.response);

    commit('setUpdateResponse', response);
    commit('setIsLoadingUpdateResponse', false);
  },
  setIsSavedSuccessfully({ commit }, isSavedSuccessfully: boolean|null) {
    commit('setIsSavedSuccessfully', isSavedSuccessfully);
  },
};

const mutations = {
  clear(state: BasketState) {
    state.banquet = null;
    state.isSavedSuccessfully = null;
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
  setActualTotal(state: BasketState, value) {
    state.form.actualTotal = value;
    state.form.setChange('actualTotal', value);
  },
  setAdvanceAmount(state: BasketState, value) {
    state.form.advanceAmount = value;
    state.form.setChange('advanceAmount', value);
  },
  setAdvanceAmountPaymentMethod(state: BasketState, value) {
    state.form.advanceAmountPaymentMethod = value;
    state.form.setChange('advanceAmountPaymentMethod', value);
  },
  setIsBirthdayClub(state: BasketState, value) {
    state.form.isBirthdayClub = value;
    state.form.setChange('isBirthdayClub', value);
  },
  setWithPhotographer(state: BasketState, value) {
    state.form.withPhotographer = value;
    state.form.setChange('withPhotographer', value);
  },
  setAdultsAmount(state: BasketState, value) {
    state.form.adultsAmount = value;
    state.form.setChange('adultsAmount', value);
  },
  setAdultTicketPrice(state: BasketState, value) {
    state.form.adultTicketPrice = value;
    state.form.setChange('adultTicketPrice', value);
  },
  setChildrenAmount(state: BasketState, value) {
    state.form.childrenAmount = value;
    state.form.setChange('childrenAmount', value);
  },
  setChildTicketPrice(state: BasketState, value) {
    state.form.childTicketPrice = value;
    state.form.setChange('childTicketPrice', value);
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

    value = value ?? Date.now();

    const startAt = state.form?.startAt as Date|any;
    const endAt = state.form?.endAt  as Date|any;

    let diff = 0;
    if (startAt) {
      value.setHours(startAt.getHours());
      value.setMinutes(startAt.getMinutes());
      value.setMilliseconds(startAt.getMilliseconds());

      diff = startAt - value;
    } else if (endAt) {
      value.setHours(endAt.getHours());
      value.setMinutes(endAt.getMinutes());
      value.setMilliseconds(endAt.getMilliseconds());

      diff = endAt - value;
    }

    if (diff) {
      if (startAt) {
        startAt.setTime(startAt.getTime() - diff);

        state.form.startAt = startAt;
        state.form.setChange('startAt', startAt);
      }
      if (endAt) {
        endAt.setTime(endAt.getTime() - diff);

        state.form.endAt = endAt;
        state.form.setChange('endAt', endAt);
      }
    }
  },
  setStartAt(state: BasketState, value: Date) {
    state.form.startAt = value;
    state.form.setChange('startAt', value);
  },
  setEndAt(state: BasketState, value: Date) {
    state.form.endAt = value;
    state.form.setChange('endAt', value);
  },
  setShowResponse(state: BasketState, response) {
    state.showResponse = response;
  },
  setCreateResponse(state: BasketState, response) {
    state.createResponse = response;

    if (instanceOfStoreBanquetResponse(response)) {
      state.banquet = response.data;
    }
  },
  setUpdateResponse(state: BasketState, response) {
    state.updateResponse = response;
  },
  setIsLoadingShowResponse(state: BasketState, isLoading) {
    state.isLoadingShowResponse = isLoading;
  },
  setIsLoadingCreateResponse(state: BasketState, isLoading) {
    state.isLoadingCreateResponse = isLoading;
  },
  setIsLoadingUpdateResponse(state: BasketState, isLoading) {
    state.isLoadingUpdateResponse = isLoading;
  },
  setIsSavedSuccessfully(state: BasketState, isSavedSuccessfully) {
    state.isSavedSuccessfully = isSavedSuccessfully;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
