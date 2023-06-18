import {authHeaders, jsonHeaders} from "@/helpers";
import {
  IndexRestaurantReviewsRequest,
  instanceOfStoreRestaurantReviewResponse,
  RestaurantReviewsApi,
  ShowRestaurantReviewRequest
} from "@/openapi";
import {RestaurantReview} from "@/openapi/models/RestaurantReview";
import {ShowRestaurantReviewResponse} from "@/openapi/models/ShowRestaurantReviewResponse";
import {IndexRestaurantReviewResponse} from "@/openapi/models/IndexRestaurantReviewResponse";

class ReviewsState {
  /** Selected restaurant review */
  public selected: RestaurantReview | null;

  public review: RestaurantReview | null;

  public reviews: RestaurantReview[] | null;

  public myReviews: RestaurantReview[] | null;


  /** Last show restaurant review response */
  public showResponse: ShowRestaurantReviewResponse | Response | null;

  /** Last index restaurant reviews response */
  public indexResponse: IndexRestaurantReviewResponse | Response | null;

  /** Last index restaurant reviews by ip response */
  public myResponse: IndexRestaurantReviewResponse | Response | null;

  /** Last index more restaurant reviews response */
  public moreResponse: IndexRestaurantReviewResponse | Response | null;

  /** Last index more restaurant reviews response */
  public createResponse: IndexRestaurantReviewResponse | Response | null;

  constructor() {
    this.selected = null;
    this.reviews = null;
    this.showResponse = null;
    this.indexResponse = null;
    this.moreResponse = null;
    this.createResponse = null;
  }
}

const state = new ReviewsState();

const getters = {
  selected(state: ReviewsState) {
    return state.selected;
  },
  review(state: ReviewsState) {
    return state.review;
  },
  reviews(state: ReviewsState) {
    return state.reviews;
  },
  myReviews(state: ReviewsState) {
    return state.myReviews;
  },
  getShowResponse(state: ReviewsState) {
    return state.showResponse;
  },
  getIndexResponse(state: ReviewsState) {
    return state.indexResponse;
  },
  getMyResponse(state: ReviewsState) {
    return state.myResponse;
  },
  getMoreResponse(state: ReviewsState) {
    return state.moreResponse;
  },
  getCreateResponse(state: ReviewsState) {
    return state.moreResponse;
  },
};

const actions = {
  setSelected({ commit }, review: RestaurantReview | null) {
    commit('setSelected', review);
  },
  setReview({ commit }, review: RestaurantReview | null) {
    commit('setReview', review);
  },
  setReviews({ commit }, reviews: RestaurantReview[] | null) {
    commit('setReviews', reviews);
  },
  setMyReviews({ commit }, reviews: RestaurantReview[] | null) {
    commit('setMyReviews', reviews);
  },
  prependReviews({ commit }, reviews: RestaurantReview[] | null) {
    commit('prependReviews', reviews);
  },
  appendReviews({ commit }, reviews: RestaurantReview[] | null) {
    commit('appendReviews', reviews);
  },
  async loadReview({ commit, rootGetters }, { id }) {
    const request: ShowRestaurantReviewRequest = {
      id,
    };

    const response = await (new RestaurantReviewsApi())
      .showRestaurantReview(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
      .then(response => response)
      .catch(error => error.response);

    commit('setShowResponse', response);
  },
  async loadMyReviews({ commit, dispatch, rootGetters }, { ip, restaurantId }) {
    console.log('loading my reviews...');
    const request: IndexRestaurantReviewsRequest = {
      filterIp: ip,
      pageSize: 10,
    };

    if (restaurantId) {
      request.filterRestaurantId = restaurantId;
    }

    const response = await (new RestaurantReviewsApi())
        .indexRestaurantReviews(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);

    commit('setMyResponse', response);
    dispatch('setMyReviews', response.data);
  },
  async loadMyReviewsIfMissing({ state, dispatch }, { ip, restaurantId }) {
    if (state.myReviews) {
      return;
    }

    dispatch('loadMyReviews', {ip, restaurantId});
  },
  async loadReviews({ commit, dispatch, rootGetters }) {
    const request :IndexRestaurantReviewsRequest = {pageSize: 10};

    const restaurantId = rootGetters['restaurants/restaurantId'];
    if (restaurantId) {
      request.filterRestaurantId = restaurantId;
    }

    const response = await (new RestaurantReviewsApi())
        .indexRestaurantReviews(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);

    commit('setIndexResponse', response);
    dispatch('setReviews', response.data);
  },
  async loadReviewsIfMissing({ state, dispatch }) {
    if (state.indexResponse) {
      return;
    }

    dispatch('loadReviews');
  },
  async loadMoreReviews({ state, commit, rootGetters }) {
    const request :IndexRestaurantReviewsRequest = {pageSize: 10};

    const restaurantId = rootGetters['restaurants/restaurantId'];
    if (restaurantId) {
      request.filterRestaurantId = restaurantId;
    }

    if (!state.moreResponse) {
      request.pageNumber = 2;
    } else {
      request.pageNumber = state.productsMoreResponse.meta.currentPage + 1;
    }

    const response = await (new RestaurantReviewsApi())
        .indexRestaurantReviews(request, { headers: { ...authHeaders(rootGetters['auth/token']) } })
        .then(response => response)
        .catch(error => error.response);

    commit('setMoreResponse', response);
    commit('appendReviews', response.data);
  },
  async storeReview({ commit, dispatch, rootGetters }, { request }) {
    const response = await (new RestaurantReviewsApi())
        .storeRestaurantReview({ storeRestaurantReviewRequest: request }, { headers: { ...authHeaders(rootGetters['auth/token']), ...jsonHeaders() } })
        .then(response => response)
        .catch(error => error.response);

    commit('setCreateResponse', response);

    if (instanceOfStoreRestaurantReviewResponse(response)) {
      commit('setIndexResponse', null);
      commit('setMyResponse', null);
      commit('setMoreResponse', null);
      commit('setReviews', null);
      commit('setMyReviews', null);

      dispatch('loadReviews');
      dispatch('loadMyReviews', { ip: request.ip, restaurantId: request.restaurantId});
    }
  },
};

const mutations = {
  setSelected(state: ReviewsState, selected: RestaurantReview | null) {
    state.selected = selected;
  },
  setReview(state: ReviewsState, review: RestaurantReview | null) {
    state.review = review;
  },
  setReviews(state: ReviewsState, reviews: RestaurantReview[] | null) {
    state.reviews = reviews;
  },
  setMyReviews(state: ReviewsState, reviews: RestaurantReview[] | null) {
    state.myReviews = reviews;
  },
  prependReviews(state: ReviewsState, reviews: RestaurantReview[] | null) {
    state.reviews = (reviews ?? []).concat(state.reviews ?? []);
  },
  appendReviews(state: ReviewsState, reviews: RestaurantReview[] | null) {
    state.reviews = (state.reviews ?? []).concat(reviews);
  },
  setShowResponse(state: ReviewsState, response) {
    state.showResponse = response;
  },
  setIndexResponse(state: ReviewsState, response) {
    state.indexResponse = response;
  },
  setMyResponse(state: ReviewsState, response) {
    state.myResponse = response;
  },
  setMoreResponse(state: ReviewsState, response) {
    state.moreResponse = response;
  },
  setCreateResponse(state: ReviewsState, response) {
    state.createResponse = response;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
