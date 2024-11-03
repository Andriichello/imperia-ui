import {authHeaders} from "@/helpers";
import {
  IndexRestaurantResponse,
  Restaurant,
  RestaurantsApi,
  ShowRestaurantResponse,
  StoreRestaurantResponse,
  UpdateRestaurantResponse
} from "@/openapi";
import router from "@/router";
import BaseForm from "@/store/BaseForm";
import CrudState from "@/store/CrudState";
import {crudActions, crudGetters, crudMutations} from "@/store/utils";

class RestaurantForm extends BaseForm<Restaurant> {
  /**
   * RestaurantForm's constructor.
   */
  constructor() {
    super();
  }
}

class RestaurantsState extends CrudState<
  Restaurant,
  RestaurantForm,
  IndexRestaurantResponse,
  ShowRestaurantResponse,
  StoreRestaurantResponse,
  UpdateRestaurantResponse
> {
  /**
   * RestaurantsState's constructor.
   */
  constructor() {
    super(RestaurantForm);
  }
}

const state = new RestaurantsState();

const getters = {
  ...crudGetters<
    RestaurantsState,
    Restaurant,
    RestaurantForm,
    IndexRestaurantResponse,
    ShowRestaurantResponse,
    StoreRestaurantResponse,
    UpdateRestaurantResponse
  >(),

  timezoneOffset(state: RestaurantsState) {
    return state.selected?.timezoneOffset;
  },
  restaurantId(state: RestaurantsState) {
    return state.selected?.id ?? router.currentRoute.value.params['restaurantId'] ?? null;
  },
};

const actions = {
  ...crudActions<
    Restaurant,
    RestaurantForm
  >(
    {
      api: new RestaurantsApi(),
      index: 'indexRestaurants',
      show: 'showRestaurant',
      store: 'storeRestaurant',
      update: 'updateRestaurant',
    }
  ),
};

const mutations = {
  ...crudMutations<
    RestaurantsState,
    Restaurant,
    RestaurantForm,
    IndexRestaurantResponse,
    ShowRestaurantResponse,
    StoreRestaurantResponse,
    UpdateRestaurantResponse
  >(),
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
