import { ThemeConfig } from '../../configs';

interface ThemeState {
  theme: string|null,
}

const state: ThemeState = {
  theme: null,
};

const getters = {
  get(state: ThemeState): string|null {
    return state.theme;
  },
  list(): string[] {
    return ThemeConfig.list();
  }
};

const actions = {
  apply({ commit }, theme: string): void {
    document.body.setAttribute(ThemeConfig.attribute, theme);
    localStorage.setItem(ThemeConfig.storage, theme);

    commit('set', theme);
  },
  resolve({ dispatch }): void {
    let theme = localStorage.getItem(ThemeConfig.storage);

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark' : 'lofi';
    }

    dispatch('apply', theme ?? ThemeConfig.default());
  }
};

const mutations = {
  set(state: ThemeState, theme: string): void {
    state.theme = theme;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
