interface ErrorState {
  code: number | null,
  message: string | null,
  errors: object | null,
  response: object | null,
}

const state: ErrorState = {
  code: null,
  message: null,
  errors: null,
  response: null,
};

const getters = {
  present(state: ErrorState) {
    return state.code || state.message || state.errors || state.response;
  },
  code(state: ErrorState): number | null {
    return state.code;
  },
  message(state: ErrorState): string | null {
    return state.message;
  },
  errors(state: ErrorState): object | null {
    return state.errors;
  },
  response(state: ErrorState): object | null {
    return state.errors;
  },
};

const actions = {
  clear({commit}) {
    commit('setCode', null);
    commit('setMessage', null);
    commit('setErrors', null);
    commit('setResponse', null);
  },
  setCode({commit}, code: number | null) {
    commit('setCode', code);
  },
  setMessage({commit}, message: string | null) {
    commit('setMessage', message);
  },
  setErrors({commit}, errors: object | null) {
    commit('setErrors', errors);
  },
  setResponse({commit}, response: object | null) {
    commit('setResponse', response);
  },
};

const mutations = {
  setCode(state: ErrorState, code: number | null): void {
    state.code = code;
  },
  setMessage(state: ErrorState, message: string | null): void {
    state.message = message;
  },
  setErrors(state: ErrorState, errors: object | null): void {
    state.errors = errors;
  },
  setResponse(state: ErrorState, response: object | null): void {
    state.response = response;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
