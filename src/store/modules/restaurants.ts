import {
  IndexRestaurantResponse,
  Restaurant,
  RestaurantsApi,
  ShowRestaurantResponse,
  StoreRestaurantRequest,
  StoreRestaurantResponse,
  UpdateRestaurantRequest,
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

  /**
   * Determines if specific property has a record about
   * properties being changed and at the same time the
   * resource property's value differs from the new one.
   *
   * @return boolean
   */
  public hasRealChange(name: keyof Restaurant): boolean {
    if (name === 'schedules') {
      const oldSchedules = this.resource['schedules'] ?? [];
      const newSchedules = this.getChange('schedules');

      if (!oldSchedules || !oldSchedules.length) {
        return !newSchedules || !newSchedules.length;
      }

      if (!newSchedules || !newSchedules.length) {
        return !oldSchedules || !oldSchedules.length;
      }

      if (oldSchedules.length !== newSchedules.length) {
        return true;
      }

      let result = false;

      newSchedules.forEach((newSchedule) => {
        const oldSchedule = oldSchedules.find(
          (schedule) => schedule.weekday === newSchedule.weekday
        );

        const isSame = oldSchedule
          && (
            oldSchedule.archived === newSchedule.archived
            && oldSchedule.begHour === newSchedule.begHour
            && oldSchedule.begMinute === newSchedule.begMinute
            && oldSchedule.endHour === newSchedule.endHour
            && oldSchedule.endMinute === newSchedule.endMinute
          );

        if (!isSame) {
          result = true;
          return;
        }
      });

      return result;
    }

    return super.hasRealChange(name);
  }

  /**
   * Transforms the form into a `store` request.
   *
   * @return object
   */
  public asCreate(): StoreRestaurantRequest {
    const request = super.asCreate();

    delete request['type'];
    delete request['fullAddress'];
    delete request['timezoneOffset'];

    delete request['media'];

    return request as StoreRestaurantRequest;
  }

  /**
   * Transforms the form into an `update` request.
   *
   * @return object
   */
  public asUpdate(): UpdateRestaurantRequest {
    const request = this.asCreate();
    const changed = {};

    Object.keys(this.getChanges())
      .forEach((name) => {
        changed[name] = request?.[name];
      });

    return changed as UpdateRestaurantRequest;
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
  setOnSchedules({ state, commit }, { weekday, properties }) {
    const schedules = (state.form.getProperty('schedules') ?? [])
      .map((schedule) => {
        if (schedule.weekday === weekday) {
          return {
            ...schedule,
            ...properties
          };
        }

        return { ...schedule };
      });

    commit('setOnForm', { name: 'schedules', value: schedules });
  },
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
