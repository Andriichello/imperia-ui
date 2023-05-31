import { authHeaders } from "@/helpers";
import {IndexRestaurantResponse, Restaurant, RestaurantsApi, ShowRestaurantResponse} from "@/openapi";
import {RestaurantConfig, ThemeConfig} from "@/configs";
import resetAllMocks = jest.resetAllMocks;

class RestaurantsState {
  /** Selected restaurant */
  public selected: Restaurant | null;

  public restaurants: Restaurant[] | null;

  /** Last show restaurant response */
  public showResponse: ShowRestaurantResponse | Response | null;

  /** Last index restaurants response */
  public indexResponse: IndexRestaurantResponse | Response | null;
  constructor() {
    this.selected = null;
    this.showResponse = null;
    this.indexResponse = null;
  }
}

const state = new RestaurantsState();

const getters = {
  selected(state: RestaurantsState) {
    return state.selected;
  },
  restaurants(state: RestaurantsState) {
    return state.restaurants;
  },
  getShowResponse(state: RestaurantsState) {
    return state.showResponse;
  },
  getIndexResponse(state: RestaurantsState) {
    return state.indexResponse;
  },
};

const actions = {
  setSelected({ commit }, restaurant: Restaurant | null) {
    localStorage.setItem(RestaurantConfig.storage, restaurant ? restaurant.id.toString() : null);

    commit('setSelected', restaurant);
  },
  setRestaurants({ commit }, restaurants: Restaurant[] | null) {
    commit('setRestaurants', restaurants);
  },
  async loadRestaurant({ commit, rootGetters }, { id }) {
    const response = await (new RestaurantsApi())
      .showRestaurant({ id }, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setShowResponse', response);
  },
  async loadRestaurants({ commit, dispatch, rootGetters }) {
    const response = await (new RestaurantsApi())
        .indexRestaurants({}, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);

    commit('setIndexResponse', response);
    dispatch('setRestaurants', response.data);
  },
  async loadRestaurantsIfMissing({ state, dispatch }) {
    if (state.indexResponse) {
      return;
    }

    dispatch('loadRestaurants');
  },
  async resolve({ dispatch }) {
    dispatch('loadRestaurantsIfMissing');
  },
};

const mutations = {
  setSelected(state: RestaurantsState, selected: Restaurant | null) {
    state.selected = selected;
  },
  setRestaurants(state: RestaurantsState, restaurants: Restaurant[] | null) {
    state.restaurants = restaurants;

    if (localStorage.getItem(RestaurantConfig.storage)) {
      const id = +localStorage.getItem(RestaurantConfig.storage);
      state.selected = restaurants.find(r => r.id === id);
    }
  },
  setShowResponse(state: RestaurantsState, response) {
    state.showResponse = response;
  },
  setIndexResponse(state: RestaurantsState, response) {
    state.indexResponse = response;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
