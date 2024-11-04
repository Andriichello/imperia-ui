import CrudState from "@/store/CrudState";
import BaseForm from "@/store/BaseForm";
import {authHeaders} from "@/helpers";
import * as runtime from "@/openapi/runtime";
import {instanceOfUpdateRestaurantResponse} from "@/openapi";

export interface ActionMapping {
  api: runtime.BaseAPI;
  index?: string;
  show?: string;
  store?: string;
  update?: string;
  destroy?: string;
}

export function crudGetters<
  State extends CrudState<T, F, I, S, C, U, D>,
  T extends object = object,
  F extends BaseForm<T> = BaseForm<T>,
  I = Response,
  S = Response,
  C = Response,
  U = Response,
  D = Response,
> () {
  return {
    form(state: State) {
      return state.form as F;
    },
    properties(state: State) {
      return state.form.getProperties();
    },
    selected(state: State) {
      return state.selected;
    },
    resource(state: State) {
      return state.resource;
    },
    resources(state: State) {
      return state.resources;
    },
    index(state: State) {
      return state.index;
    },
    indexMore(state: State) {
      return state.indexMore;
    },
    show(state: State) {
      return state.show;
    },
    store(state: State) {
      return state.store;
    },
    update(state: State) {
      return state.update;
    },
    destroy(state: State) {
      return state.destroy;
    },
    isLoadingIndex(state: State) {
      return state.isLoadingIndex;
    },
    isLoadingIndexMore(state: State) {
      return state.isLoadingIndexMore;
    },
    isLoadingShow(state: State) {
      return state.isLoadingShow;
    },
    isLoadingStore(state: State) {
      return state.isLoadingStore;
    },
    isLoadingUpdate(state: State) {
      return state.isLoadingUpdate;
    },
    isLoadingDestroy(state: State) {
      return state.isLoadingDestroy;
    },
  };
}

export function crudActions<
  T extends object = object,
  F extends BaseForm<T> = BaseForm<T>,
> (actions: ActionMapping) {
  return {
    setForm({ commit }, form: F | null) {
      commit('setForm', form);
    },
    setOnForm({ commit }, {name, value}) {
      commit('setOnForm', {name, value});
    },
    populateForm({ commit }, resource: T | null) {
      commit('populateForm', resource);
    },
    rollbackForm({ commit }) {
      commit('rollbackForm');
    },
    setSelected({ commit }, selected: T | null) {
      commit('setSelected', selected);
    },
    setResource({ commit }, resource: T | null) {
      commit('setResource', resource);
    },
    setResources({ commit }, resources: T[] | null) {
      commit('setResources', resources);
    },
    async loadResource({ commit, dispatch, rootGetters }, { id, params }) {
      if (!actions.show) {
        throw new Error('There is no show action present for ' + actions.api.constructor.name)
      }

      const request = { id, ...(params ?? {}) };
      const options = { headers: { ...authHeaders(rootGetters['auth/token']) } };

      commit('setIsLoadingShow', true);

      const response = await actions.api[actions.show](request, options)
        .then(response => response)
        .catch(error => {
          dispatch('error/setResponse', error.response, {root:true});
          return error.response;
        });

      commit('setShow', response);
      commit('setResource', response?.data ?? null);
      commit('setIsLoadingShow', false);
    },
    async loadAndSelectResource({ commit, dispatch, getters }, { id, params }) {
      await dispatch('loadResource', {id, params});

      commit('setSelected', getters.resource);
    },
    async loadResources({ commit, dispatch, rootGetters }, { params }) {
      if (!actions.index) {
        throw new Error('There is no index action present for ' + actions.api.constructor.name)
      }

      const request = { ...(params ?? {}) };
      const options = { headers: { ...authHeaders(rootGetters['auth/token']) } };

      commit('setIsLoadingIndex', true);

      const response = await actions.api[actions.index](request, options)
        .then(response => response)
        .catch(error => {
          dispatch('error/setResponse', error.response, {root:true});
          return error.response;
        });

      commit('setIndex', response);
      dispatch('setResources', response?.data ?? []);
      commit('setIsLoadingIndex', false);
    },
    async loadResourcesIfMissing({ state, dispatch }, { params }) {
      if (state.index) {
        return;
      }

      dispatch('loadResources', { params });
    },
    async loadMoreResources({state, dispatch, commit, rootGetters}, { params }) {
      if (!actions.index) {
        throw new Error('There is no index action present for ' + actions.api.constructor.name)
      }

      const request = {...(params ?? {})};
      const options = { headers: { ...authHeaders(rootGetters['auth/token']) } };

      if (!state.indexMore) {
        const perPage = state.index?.meta?.perPage ?? null;

        if (perPage) {
          request.pageSize =  perPage;
        }

        request.pageNumber = 2;
      } else {
        request.pageNumber = state.indexMore.meta.currentPage + 1;
      }

      commit('setIsLoadingIndexMore', true);

      const response = await actions.api[actions.index](request, options)
        .then(response => response)
        .catch(error => {
          if (error.response.status !== 404) {
            dispatch('error/setResponse', error.response, {root:true});
          }
          return error.response;
        });

      commit('setIndexMore', response);
      commit('appendResources', response.data);
      commit('setIsLoadingIndexMore', false);
    },
    async storeResource({ commit, rootGetters }, {request, params}) {
      if (!actions.store) {
        throw new Error('There is no store action present for ' + actions.api.constructor.name)
      }

      const options = { headers: { ...authHeaders(rootGetters['auth/token']) } };
      const req = { ...params };
      req[actions.store + 'Request'] = request

      commit('setIsLoadingStore', true);

      const response = await actions.api[actions.store](req, options)
        .then(response => response)
        .catch(error => error.response);

      commit('setStore', response);
      commit('setIsLoadingStore', false);
    },
    async updateResource({ commit, rootGetters }, { id, request, params }) {
      if (!actions.update) {
        throw new Error('There is no update action present for ' + actions.api.constructor.name)
      }

      const options = { headers: { ...authHeaders(rootGetters['auth/token']) } };
      const req = { id, ...params };
      req[actions.update + 'Request'] = request

      commit('setIsLoadingUpdate', true);

      const response = await actions.api[actions.update](req, options)
        .then(response => response)
        .catch(error => error.response);

      commit('setUpdate', response);
      commit('setIsLoadingUpdate', false);
    },
  };
}

export function crudMutations<
  State extends CrudState<T, F, I, S, C, U, D>,
  T extends object = object,
  F extends BaseForm<T> = BaseForm<T>,
  I = Response,
  S = Response,
  C = Response,
  U = Response,
  D = Response,
> () {
  return {
    setForm(state: State, form: F | null) {
      state.form = form;
    },
    populateForm(state: State, resource: T | null) {
      state.form.populate(resource);
    },
    rollbackForm(state: State) {
      state.form.rollback();
    },
    setOnForm(state: State, { name, value }) {
      state.form.setProperty(name, value);
    },
    setSelected(state: State, selected: T | null) {
      state.selected = selected;
    },
    setResource(state: State, resource: T | null) {
      state.resource = resource;
    },
    setResources(state: State, resources: T[] | null) {
      state.resources = resources;
    },
    appendResources(state: State, resources: T[] | null) {
      state.resources = (state.resources ?? []).concat(resources);
    },
    setIndex(state: State, response: I | Response | null) {
      state.index = response;
    },
    setIndexMore(state: State, response: I | Response | null) {
      state.indexMore = response;
    },
    setShow(state: State, response: S | Response | null) {
      state.show = response;
    },
    setStore(state: State, response: C | Response | null) {
      state.store = response;

      if (response?.['data']) {
        state.form.populate(response?.['data'])
      }
    },
    setUpdate(state: State, response: U | Response | null) {
      state.update = response;

      if (response?.['data']) {
        state.form.populate(response?.['data'])
      }
    },
    setDestroy(state: State, response: D | Response | null) {
      state.destroy = response;
    },
    setIsLoadingIndex(state: State, loading: boolean) {
      state.isLoadingIndex = loading;
    },
    setIsLoadingIndexMore(state: State, loading: boolean) {
      state.isLoadingIndexMore = loading;
    },
    setIsLoadingShow(state: State, loading: boolean) {
      state.isLoadingShow = loading;
    },
    setIsLoadingStore(state: State, loading: boolean) {
      state.isLoadingStore = loading;
    },
    setIsLoadingUpdate(state: State, loading: boolean) {
      state.isLoadingUpdate = loading;
    },
    setIsLoadingDestroy(state: State, loading: boolean) {
      state.isLoadingDestroy = loading;
    },
  };
}