import {
  IndexRestaurantResponse,
  Restaurant,
  RestaurantsApi, Schedule, ScheduleWeekdayEnum,
  ShowRestaurantResponse,
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
   * Dynamically populate properties from the given data object.
   *
   * @param resource
   */
  public populate(resource: Restaurant) {
    super.populate(resource);

    const schedules = (resource['schedules'] ?? [])
      .map((s) => { return { ...s }; });

    if (!schedules || schedules.length !== 7) {
      let missing = false;

      for (const scheduleWeekdayEnumKey in ScheduleWeekdayEnum) {
        const weekday = ScheduleWeekdayEnum[scheduleWeekdayEnumKey];
        const schedule = schedules.find((s) => s.weekday === weekday);


        if (!schedule) {
          missing = true;

          schedules.push(
            {
              archived: true,
              weekday,
              begHour: 9,
              begMinute: 0,
              endHour: 21,
              endMinute: 0,
            } as Schedule
          );
        }
      }

      if (missing) {
        this.setProperty('schedules', schedules);
      }
    } else {
      const schedules = [];

      for (const scheduleWeekdayEnumKey in ScheduleWeekdayEnum) {
        const weekday = ScheduleWeekdayEnum[scheduleWeekdayEnumKey];
        const schedule = this.getProperty('schedules', [])
          .find((s) => s.weekday === weekday);

        schedules.push(schedule);
      }

      this.setProperty('schedules', schedules, true);
    }
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
      const oldSchedules = this.resource['schedules'];
      const newSchedules = this.getChange('schedules');

      if (!oldSchedules || !oldSchedules.length) {
        return !!newSchedules || newSchedules.length > 0;
      }

      if (!newSchedules || !newSchedules.length) {
        return !!oldSchedules || oldSchedules.length > 0;
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
  public asCreate(): UpdateRestaurantRequest {
    const request = super.asCreate();

    delete request['type'];
    delete request['fullAddress'];
    delete request['timezoneOffset'];

    delete request['media'];

    this.getProperty('schedules', [])
      .forEach((schedule) => {
        schedule.archived = !!schedule.archived;
      });

    return request as UpdateRestaurantRequest;
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
