import {authHeaders} from "@/helpers";
import {
  IndexProductsRequest,
  IndexRestaurantReviewsRequest,
  Menu, ProductsApi,
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

  /** Last show restaurant review response */
  public showResponse: ShowRestaurantReviewResponse | Response | null;

  /** Last index restaurant reviews response */
  public indexResponse: IndexRestaurantReviewResponse | Response | null;

  /** Last index more restaurant reviews response */
  public moreResponse: IndexRestaurantReviewResponse | Response | null;

  constructor() {
    this.selected = null;
    this.reviews = null;
    this.showResponse = null;
    this.indexResponse = null;
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
  getShowResponse(state: ReviewsState) {
    return state.showResponse;
  },
  getIndexResponse(state: ReviewsState) {
    return state.indexResponse;
  },
  getMoreResponse(state: ReviewsState) {
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
  async loadReviews({ commit, dispatch, rootGetters }) {
    const request :IndexRestaurantReviewsRequest = {};

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
    const request :IndexRestaurantReviewsRequest = {pageSize: 1};

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
  appendReviews(state: ReviewsState, reviews: RestaurantReview[] | null) {
    state.reviews = (state.reviews ?? []).concat(reviews);
  },
  setShowResponse(state: ReviewsState, response) {
    state.showResponse = response;
  },
  setIndexResponse(state: ReviewsState, response) {
    state.indexResponse = response;
  },
  setMoreResponse(state: ReviewsState, response) {
    state.moreResponse = response;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
