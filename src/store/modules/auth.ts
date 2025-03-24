import {authHeaders} from "@/helpers";
import {
  AuthApi,
  instanceOfLoginResponse,
  instanceOfLogoutResponse,
  instanceOfMeResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  UsersApi
} from "@/openapi";
import {setTokenGlobally} from "@/store/utils";

interface AuthState {
  ip: string | null,
  user: User | null,
  token: string | null,
  me: MeResponse | Response | null,
  login: LoginResponse | Response | null,
  logout: LogoutResponse | Response | null,
  register: RegisterResponse | Response | null,
}

const state: AuthState = {
  ip: null,
  user: null,
  token: localStorage.getItem('access-token') === "null"
    ? null : (localStorage.getItem('access-token') ?? null),
  me: null,
  login: null,
  logout: null,
  register: null,
};

setTokenGlobally(state.token);

const getters = {
  ip(state: AuthState) {
    return state.ip;
  },
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
  logout(state: AuthState) {
    return state.logout;
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
  ip({ commit }, ip: string | null) {
    commit('ip', ip);
  },
  user({ commit }, user: User | null) {
    commit('user', user);
  },
  token({ commit }, token: string | null) {
    localStorage.setItem('access-token', token);
    setTokenGlobally(token);
    commit('token', token);
  },
  async me({ state, commit, dispatch }) {
    const me = await (new UsersApi())
      .me({ include: 'customer' }, { headers: { ...authHeaders(state.token) } })
      .then(response => response)
      .catch(error => error.response);

    commit('me', me);
  
    if (instanceOfMeResponse(me)) {
      dispatch('user', me.data);
    } 

    if (me instanceof Response) {
      if (me.status === 401) {
        dispatch('user', null);
        dispatch('token', null);
      }
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

      dispatch('me');
    }
  },
  async logout({ commit, dispatch }) {
    const logout = await (new AuthApi())
      .logout({ headers: { ...authHeaders(state.token) } })
      .then(response => response)
      .catch(error => error.response);
    
    commit('logout', logout);

    if (instanceOfLogoutResponse(logout)) {
      dispatch('token', null);
      dispatch('user', null);
      dispatch('me', null);
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
  ip(state: AuthState, ip: string | null) {
    state.ip = ip;
  },
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
  logout(state: AuthState, logout: LogoutResponse | Response | null) {
    state.logout = logout;
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
