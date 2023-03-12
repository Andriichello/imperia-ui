import { authHeaders } from "@/helpers";
import { Banquet, BanquetsApi, Customer, CustomersApi, IndexCustomerResponse, IndexCustomersRequest, Restaurant, ShowBanquetResponse, StoreBanquetRequest, StoreBanquetRequestStateEnum, StoreCustomerResponse, User } from "@/openapi";

class CustomersFilters {
  /** Applied search query */
  public search: string | null;

  constructor() {
    this.search = null;
  }
}

class CustomerForm {
  public id: number | null;
  public name: string | null;
  public surname: string | null;
  public phone: string | null;
  public email: string | null;
  public birthdate: string | Date | null;

  public static fromCustomer(customer: Customer) {
    const form = new CustomerForm();

    form.id = customer.id;
    form.name = customer.name;
    form.surname = customer.surname;
    form.phone = customer.phone;
    form.email = customer.email;
    form.birthdate = customer.birthdate;

    return form;
  }
}

class CustomersState {
  /** Applied filters */
  public filters: CustomersFilters | null;
  /** Customer form */
  public form: CustomerForm | null;
  /** Selected customer */
  public selected: Customer | null;
  /** Current list of customers */
  public customers: Customer[] | null;

  public customersResponse: IndexCustomerResponse | null;
  public moreCustomersResponse: IndexCustomerResponse | null;

  constructor() {
    this.filters = new CustomersFilters();
    this.form = new CustomerForm();
    this.selected = null;
    this.customers = null;
    this.customersResponse = null;
    this.moreCustomersResponse = null;
  }
}

const state = new CustomersState();

const getters = {
  form(state: CustomersState) {
    return state.form;
  },
  filters(state: CustomersState) {
    return state.form;
  },
  selected(state: CustomersState) {
    return state.selected;
  },
  customers(state: CustomersState) {
    return state.customers;
  },
  customersTotal(state: CustomersState) {
    const response = state.customersResponse;
      if (!response || !response.meta || !response.meta.total) {
        return null;
      }
  
    return response.meta.total;
  },
  name(state: CustomersState) {
    return state.form.name;
  },
  surname(state: CustomersState) {
    return state.form.surname;
  },
  phone(state: CustomersState) {
    return state.form.phone;
  },
  email(state: CustomersState) {
    return state.form.email;
  },
  birthdate(state: CustomersState) {
    return state.form.birthdate;
  },
};

const actions = {
  setForm({ commit }, form: CustomerForm) {
    commit('setForm', form);
  },
  setSelected({ commit }, customer: Customer) {
    commit('setSelected', customer);
    commit('setForm', CustomerForm.fromCustomer(customer));
  },
  setCustomers({ commit }, customers) {
    commit('setCustomers', customers);
  },
  async loadCustomersIfMissing({ state, dispatch }) {
    if (state.customersResponse) {
      return;
    }

    dispatch('loadCustomers');
  },
  async loadCustomers({ dispatch, commit, rootGetters }) {
    const response = await (new CustomersApi())
      .indexCustomers({ include: 'comments' }, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setCustomersResponse', response);
    dispatch('setCustomers', response.data);
  },
  async loadMoreCustomers({ state, commit, getters, rootGetters }) {
    let customers = null;
    let page = null;

    const response = state.moreCustomersResponse;
    if (!response) {
      page = 2;
    } else {
      page = response.meta.currentPage + 1;
    }

    const filters: CustomersFilters = getters['filters'];
    const request: IndexCustomersRequest = { 
      pageNumber: page,
      include: 'comments'
    };

    customers = await (new CustomersApi())
      .indexCustomers(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setMoreCustomersResponse', { response: customers });
    commit('appendCustomers', { customers: customers.data ?? [] });
  },
  setName({ commit }, name: string | null) {
    commit('setName', name);
  },
  setSurname({ commit }, value: string | null) {
    commit('setSurname', value);
  },
  setPhone({ commit }, value: string | null) {
    commit('setPhone', value);
  },
  setEmail({ commit }, value: string | null) {
    commit('setEmail', value);
  },
  setBirthdate({ commit }, value: string | null) {
    commit('setBirthdate', value);
  },
  applySearch({ commit, dispatch }, { search }) {
    commit('applySearch', { search });
    dispatch('loadCustomers');
  },
};

const mutations = {
  setForm(state: CustomersState, form: CustomerForm) {
    state.form = form;
  },
  setSelected(state: CustomersState, customer: Customer) {
    state.selected = customer;
  },
  setCustomers(state: CustomersState, customers: Customer[]) {
    state.customers = customers;
  },
  appendCustomers(state: CustomersState, { customers }) {
    state.customers = state.customers.concat(customers);
  },
  setCustomersResponse(state: CustomersState, response) {
    state.customersResponse = response;
  },
  setMoreCustomersResponse(state: CustomersState, { response }) {
    state.moreCustomersResponse = response;
  },
  setName(state: CustomersState, value) {
    state.form.name = value;
  },
  setSurname(state: CustomersState, value) {
    state.form.surname = value;
  },
  setPhone(state: CustomersState, value) {
    state.form.phone = value;
  },
  setEmail(state: CustomersState, value) {
    state.form.email = value;
  },
  setBirthdate(state: CustomersState, value) {
    state.form.birthdate = value;
  },
  applySearch(state: CustomersState, { search }) {
    state.filters.search = search;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
