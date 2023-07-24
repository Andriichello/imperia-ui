import {authHeaders} from "@/helpers";
import {IndexRestaurantResponse, Restaurant, RestaurantsApi, ShowRestaurantResponse} from "@/openapi";
import router from "@/router";

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
  timezoneOffset(state: RestaurantsState) {
    return state.selected?.timezoneOffset;
  },
  restaurantId(state: RestaurantsState) {
    return state.selected?.id ?? router.currentRoute.value.params['restaurantId'] ?? null;
  },
  restaurants(state: RestaurantsState) {
    return state.restaurants;
  },
  isLoadingRestaurants(state: RestaurantsState) {
    return !state.indexResponse;
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
    commit('setSelected', restaurant);
  },
  setRestaurants({ commit }, restaurants: Restaurant[] | null) {
    commit('setRestaurants', restaurants);
  },
  async loadRestaurant({ commit, dispatch, rootGetters }, { id }) {
    const request = {
      id,
      include: 'schedules',
    };

    const response = await (new RestaurantsApi())
      .showRestaurant(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => {
        dispatch('error/setResponse', error.response, {root:true});
        return error.response;
      });

    commit('setShowResponse', response);
  },
  async loadAndSelectRestaurant({ commit, dispatch, rootGetters }, { id }) {
    const request = {
      id,
      include: 'schedules',
    };

    const response = await (new RestaurantsApi())
        .showRestaurant(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => {
          dispatch('error/setResponse', error.response, {root:true});
          return error.response;
        });

    commit('setShowResponse', response);
    commit('setSelected', response.data);
  },
  async loadRestaurants({ commit, dispatch, rootGetters }) {
    const request = {
      include: 'schedules',
    };
    const response = await (new RestaurantsApi())
        .indexRestaurants(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => {
          dispatch('error/setResponse', error.response, {root:true});
          return error.response;
        });

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
