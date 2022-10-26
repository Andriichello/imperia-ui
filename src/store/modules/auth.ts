import { authHeaders } from "@/helpers";
import { instanceOfLoginResponse, instanceOfMeResponse, LoginRequest, LoginResponse, MeResponse, RegisterRequest, RegisterResponse, User } from "@/openapi";
import { AuthApi, UsersApi } from "@/openapi"

interface AuthState {
  user: User | null
  token: string | null,
  me: MeResponse | Response | null,
  login: LoginResponse | Response | null,
  register: RegisterResponse | Response | null,
}

const state: AuthState = {
  user: null,
  token: localStorage.getItem('access-token'),
  me: null,
  login: null,
  register: null,
};

const getters = {
  user(state: AuthState) {
    return state.user;
  },
  token(state: AuthState) {
    return state.token;
  },
  me(state: AuthState) {
    return state.me;
  },
  login(state: AuthState) {
    return state.login;
  },
  register(state: AuthState) {
    return state.register;
  },
  authorized(state: AuthState) {
    if (state.token === null) {
      return false;
    }

    if (state.me && instanceOfMeResponse(state.me)) {
      return true;
    }

    if (state.login && instanceOfLoginResponse(state.login)) {
      return true;
    }

    return false;
  }
};

const actions = {
  user({ commit }, user: User | null) {
    commit('user', user);
  },
  token({ commit }, token: string | null) {
    localStorage.setItem('access-token', token);
    commit('token', token);
  },
  async me({ state, commit, dispatch }) {
    const me = await (new UsersApi())
      .me({ headers: { ...authHeaders(state.token) } })
      .then(response => response)
      .catch(error => error.response);

    commit('me', me);
  
    if (instanceOfMeResponse(me)) {
      dispatch('user', me.data);
    }

    if (me instanceof Response && me.status === 401) {
      dispatch('user', null);
      dispatch('token', null);
    }
  },
  async login({ commit, dispatch }, request: LoginRequest) {
    const login = await (new AuthApi())
      .login({ loginRequest: request })
      .then(response => response)
      .catch(error => error.response);
    
    commit('login', login);

    if (instanceOfLoginResponse(login)) {
      dispatch('token', login.data.token);
      dispatch('user', login.data.user);
    }
  },
  async register({ commit }, request: RegisterRequest) {
    const register = await (new AuthApi())
      .register({ registerRequest: request })
      .then(response => response)
      .catch(error => error.response);

    commit('register', register);
  },
  async resolve({ state, dispatch }) {
    if (state.token !== null) {
      dispatch('me');
    }
  },
};

const mutations = {
  user(state: AuthState, user: User | null) {
    state.user = user;
  },
  token(state: AuthState, token: string | null) {
    state.token = token;
  },
  me(state: AuthState, me: MeResponse | Response | null) {
    state.me = me;
  },
  login(state: AuthState, login: LoginResponse | Response | null) {
    state.login = login;
  },
  register(state: AuthState, register: RegisterResponse | Response | null) {
    state.register = register;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
