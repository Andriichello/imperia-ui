import CrudState from "@/store/CrudState";
import BaseForm from "@/store/BaseForm";
import {authHeaders} from "@/helpers";
import * as runtime from "@/openapi/runtime";
import {Restaurant} from "@/openapi";

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

      const response = await actions.api[actions.show](request, options)
        .then(response => response)
        .catch(error => {
          dispatch('error/setResponse', error.response, {root:true});
          return error.response;
        });

      commit('setShow', response);
      commit('setResource', response?.data ?? null);
    },
    async loadAndSelectResource({ commit, dispatch, getters }, { id, params }) {
      await dispatch('loadResource', {id, params});

      commit('setSelected', getters.resource);
    },
    async loadResources({ commit, dispatch, rootGetters }, { params}) {
      if (!actions.index) {
        throw new Error('There is no index action present for ' + actions.api.constructor.name)
      }

      const request = { ...(params ?? {}) };
      const options = { headers: { ...authHeaders(rootGetters['auth/token']) } };

      const response = await actions.api[actions.index](request, options)
        .then(response => response)
        .catch(error => {
          dispatch('error/setResponse', error.response, {root:true});
          return error.response;
        });

      commit('setIndex', response);
      dispatch('setResources', response?.data ?? []);
    },
    async loadResourcesIfMissing({ state, dispatch }, { params }) {
      if (state.index) {
        return;
      }

      dispatch('loadResources', { params });
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
    setSelected(state: State, selected: T | null) {
      state.selected = selected;
    },
    setResource(state: State, resource: T | null) {
      state.resource = resource;
    },
    setResources(state: State, resources: T[] | null) {
      state.resources = resources;
    },
    setIndex(state: State, response: I | Response | null) {
      state.index = response;
    },
    setShow(state: State, response: S | Response | null) {
      state.show = response;
    },
    setStore(state: State, response: C | Response | null) {
      state.store = response;
    },
    setUpdate(state: State, response: U | Response | null) {
      state.update = response;
    },
    setDestroy(state: State, response: D | Response | null) {
      state.destroy = response;
    },
  };
}