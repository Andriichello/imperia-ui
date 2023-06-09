import { authHeaders, jsonHeaders } from "@/helpers";
import { Customer, CustomersApi, IndexCustomerResponse, IndexCustomersRequest, StoreCustomerRequest, StoreCustomerResponse, UpdateCustomerRequest, UpdateCustomerResponse } from "@/openapi";

class CustomersFilters {
  /** Applied search query */
  public search: string | null;

  constructor() {
    this.search = null;
  }
}

class CustomerForm {
  protected changes: object;
  protected customer: Customer | null;

  public id: number | null;
  public name: string | null;
  public surname: string | null;
  public phone: string | null;
  public email: string | null;
  public birthdate: string | Date | null;

  constructor(customer: Customer = null) {
    this.changes = {};
    this.customer = customer;
  }

  public static fromCustomer(customer: Customer) {
    const form = new CustomerForm(customer);

    form.id = customer.id;
    form.name = customer.name;
    form.surname = customer.surname;
    form.phone = customer.phone;
    form.email = customer.email;
    form.birthdate = customer.birthdate;

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

  public hasChanges() {
    return Object.keys(this.getChanges()).length > 0;
  }

  public hasRealChanges() {
    if (!this.customer) {
      return this.hasChanges();
    }

    let result = false;

    Object.keys(this.getChanges())
      .forEach(name => {
        if (this.customer[name] !== this.getChange(name)) {
          result = true;
          return;
        }
      });

    return result;
  }

  public asCreate(): StoreCustomerRequest {
    const request = {
      name: this.name,
      surname: this.surname,
      phone: this.phone,
      email: this.email,
      birthdate: this.birthdate ?? null,
    };

    return request as StoreCustomerRequest;
  }

  public asUpdate(): UpdateCustomerRequest {
    return this.getChanges();
  }
}

class CustomersState {
  /** Applied filters */
  public filters: CustomersFilters | null;
  /** Customer form */
  public form: CustomerForm | null;
  /** Selected customer */
  public selected: Customer | null;
  /** Form customer */
  public formCustomer: Customer | null;
  /** Current list of customers */
  public customers: Customer[] | null;

  public indexResponse: IndexCustomerResponse | null;
  public indexMoreResponse: IndexCustomerResponse | null;
  public createResponse: StoreCustomerResponse | null;
  public updateResponse: UpdateCustomerResponse | null;

  constructor() {
    this.filters = new CustomersFilters();
    this.form = new CustomerForm();
    this.selected = null;
    this.formCustomer = null;
    this.customers = null;
    this.indexResponse = null;
    this.indexMoreResponse = null;
    this.createResponse = null;
    this.updateResponse = null;
  }
}

const state = new CustomersState();

const getters = {
  form(state: CustomersState) {
    return state.form;
  },
  filters(state: CustomersState) {
    return state.filters;
  },
  selected(state: CustomersState) {
    return state.selected;
  },
  formCustomer(state: CustomersState) {
    return state.formCustomer;
  },
  customers(state: CustomersState) {
    return state.customers;
  },
  customersTotal(state: CustomersState) {
    const response = state.indexResponse;
      if (!response || !response.meta || !response.meta.total) {
        return null;
      }
  
    return response.meta.total;
  },
  getIndexResponse(state: CustomersState) {
    return state.indexResponse;
  },
  getIndexMoreResponse(state: CustomersState) {
    return state.indexMoreResponse;
  },
  getCreateResponse(state: CustomersState) {
    return state.createResponse;
  },
  getUpdateResponse(state: CustomersState) {
    return state.updateResponse;
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
  hasChanges(state: CustomersState) {
    return state.form.hasChanges();
  },
  hasRealChanges(state: CustomersState) {
    return state.form.hasRealChanges();
  },
};

const actions = {
  setForm({ commit }, form: CustomerForm) {
    commit('setForm', form);
  },
  setSelected({ commit }, customer: Customer) {
    commit('setSelected', customer);
  },
  setFormCustomer({ commit }, customer: Customer) {
    commit('setFormCustomer', customer);
    commit('setForm', customer ? CustomerForm.fromCustomer(customer) : new CustomerForm());
  },
  setCustomers({ commit }, customers) {
    commit('setCustomers', customers);
  },
  prependCustomers({ commit }, customers) {
    commit('prependCustomers', customers);
  },
  appendCustomers({ commit }, customers) {
    commit('appendCustomers', customers);
  },
  async loadCustomersIfMissing({ state, dispatch }) {
    if (state.customersResponse) {
      return;
    }

    dispatch('loadCustomers');
  },
  async loadCustomers({ dispatch, commit, getters, rootGetters }) {
    const request: IndexCustomersRequest = {
      include: 'comments',
    };

    const filters = getters.filters;
    if (filters.search && filters.search.length > 0) {
      request.filterSearch = filters.search;
    }

    const response = await (new CustomersApi())
      .indexCustomers(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setIndexResponse', response);
    dispatch('setCustomers', response.data);
  },
  async loadMoreCustomers({ state, commit, getters, rootGetters }) {
    let customers = null;
    let page = null;

    const response = state.indexMoreResponse;
    if (!response) {
      page = 2;
    } else {
      page = response.meta.currentPage + 1;
    }

    const request: IndexCustomersRequest = {
      pageNumber: page,
      include: 'comments'
    };

    const filters = getters.filters;
    if (filters.search && filters.search.length > 0) {
      request.filterSearch = filters.search;
    }

    customers = await (new CustomersApi())
      .indexCustomers(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setIndexMoreResponse', customers);
    commit('appendCustomers', customers.data ?? []);
  },
  async storeCustomer({ commit, rootGetters }, { request }) {
    const response = await (new CustomersApi())
      .storeCustomer({ storeCustomerRequest: request }, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
      .then(response => response)
      .catch(error => error.response);

    commit('setCreateResponse', response);
  },
  async updateCustomer({ commit, rootGetters }, { id, request }) {
    const response = await (new CustomersApi())
      .updateCustomer({ id, updateCustomerRequest: request }, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
      .then(response => response)
      .catch(error => error.response);

    commit('setUpdateResponse', response);
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
  setFormCustomer(state: CustomersState, customer: Customer) {
    state.formCustomer = customer;
  },
  setCustomers(state: CustomersState, customers: Customer[]) {
    state.customers = customers;
  },
  prependCustomers(state: CustomersState, customers: Customer[]) {
    const oldCustomers = state.customers ?? [];
    const newCustomers = [...oldCustomers]
      .filter((c) => {
        let present = false;

        customers.forEach(e => {
          if (e.id === c.id) {
            present = true;
            return
          }
        });

        return !present;
      });

    newCustomers.unshift(...customers);
    state.customers = newCustomers;
  },
  appendCustomers(state: CustomersState, customers: Customer[]) {
    const oldCustomers = state.customers ?? [];
    const newCustomers = [...oldCustomers]
      .filter((c) => {
        let present = false;

        customers.forEach(e => {
          if (e.id === c.id) {
            present = true;
            return
          }
        });

        return !present;
      });

    state.customers = newCustomers.concat(customers);
  },
  setIndexResponse(state: CustomersState, response) {
    state.indexResponse = response;
  },
  setIndexMoreResponse(state: CustomersState, response) {
    state.indexMoreResponse = response;
  },
  setCreateResponse(state: CustomersState, response) {
    state.createResponse = response;
  },
  setUpdateResponse(state: CustomersState, response) {
    state.updateResponse = response;
  },
  setName(state: CustomersState, value) {
    state.form.name = value;
    state.form.setChange('name', value);
  },
  setSurname(state: CustomersState, value) {
    state.form.surname = value;
    state.form.setChange('surname', value);
  },
  setPhone(state: CustomersState, value) {
    state.form.phone = value;
    state.form.setChange('phone', value);
  },
  setEmail(state: CustomersState, value) {
    state.form.email = value;
    state.form.setChange('email', value);
  },
  setBirthdate(state: CustomersState, value) {
    state.form.birthdate = value;
    state.form.setChange('birthdate', value);
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
