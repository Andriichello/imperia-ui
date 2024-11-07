<template>
  <div class="edit-restaurant-page">
    <template v-if="isLoadingRestaurant">
      <Preloader :title="$t('preview.restaurant.loading')"
                 class="p-2"/>
    </template>

    <Divider v-if="restaurant"
             class="mb-1"
             :lines="false"
             :title="$t('preview.restaurant.restaurant')"/>

    <div class="container max-w-xl" v-if="restaurant">

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">{{ $t("restaurant.name") }}</span>
        </label>
        <input v-model="name" name="name" type="text" required placeholder="..."
               class="input input-bordered w-full max-w-xl"
               :class="{ 'input-error' : nameErrors }"/>
        <label class="label flex-col items-start" v-if="nameErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in nameErrors" :key="error">
            {{ error }}
          </span>
        </label>
      </div>

      <div class="w-full flex flex-col justify-center items-center mt-4">
        <div class="w-full flex justify-center items-start gap-2">
          <div class="form-control w-full flex-1">
            <label class="label">
              <span class="label-text">{{ $t("restaurant.country") }}</span>
            </label>
            <input v-model="country" name="country" type="text" required placeholder="..."
                   class="input input-bordered w-full max-w-xl"
                   :class="{ 'input-error' : countryErrors }"/>
            <label class="label flex-col items-start" v-if="countryErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in countryErrors" :key="error">
            {{ error }}
          </span>
            </label>
          </div>

          <div class="form-control w-full flex-1">
            <label class="label">
              <span class="label-text">{{ $t("restaurant.city") }}</span>
            </label>
            <input v-model="city" name="city" type="text" required placeholder="..."
                   class="input input-bordered w-full max-w-xl"
                   :class="{ 'input-error' : cityErrors }"/>
            <label class="label flex-col items-start" v-if="cityErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in cityErrors" :key="error">
            {{ error }}
          </span>
            </label>
          </div>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ $t("restaurant.street") }}</span>
          </label>
          <input v-model="place" name="street" type="text" required placeholder="..."
                 class="input input-bordered w-full max-w-xl"
                 :class="{ 'input-error' : placeErrors }"/>
          <label class="label flex-col items-start" v-if="placeErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in placeErrors" :key="error">
            {{ error }}
          </span>
          </label>
        </div>
      </div>

      <div class="w-full flex flex-col justify-center items-center mt-4">
        <div class="w-full flex justify-center items-start gap-2">
          <div class="form-control w-full flex-1">
            <label class="label">
              <span class="label-text">{{ $t("restaurant.phone") }}</span>
            </label>
            <input v-model="phone" name="phone" type="tel" required placeholder="..."
                   class="input input-bordered w-full max-w-xl"
                   :class="{ 'input-error' : phoneErrors }"/>
            <label class="label flex-col items-start" v-if="phoneErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in phoneErrors" :key="error">
            {{ error }}
          </span>
            </label>
          </div>

          <div class="form-control w-full flex-1">
            <label class="label">
              <span class="label-text">{{ $t("restaurant.email") }}</span>
            </label>
            <input v-model="email" name="city" type="text" required placeholder="..."
                   class="input input-bordered w-full max-w-xl"
                   :class="{ 'input-error' : emailErrors }"/>
            <label class="label flex-col items-start" v-if="emailErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in emailErrors" :key="error">
            {{ error }}
          </span>
            </label>
          </div>
        </div>
      </div>

    </div>

    <div class="w-full max-w-xl flex justify-between mt-4 mb-4 gap-4" v-if="form && form.hasRealChanges()">
      <button class="btn btn-ghost btn-md flex-1" @click="cancelForm">
        {{ $t('restaurant.cancel_changes') }}
      </button>
      <button class="btn btn-neutral btn-md flex-1" @click="updateForm">
        {{ $t('restaurant.save_changes') }}
      </button>
    </div>

    <Divider v-if="restaurant"
             class="mt-4 mb-1"
             :lines="false"
             :title="$t('schedule.working_schedule')"/>

    <div class="container max-w-xl" v-if="restaurant">

      <div class="w-full flex flex-col justify-center items-center">
        <div class="w-full flex flex-col justify-start items-start">
          <div class="w-full overflow-x-auto">
            <table class="table table-md w-full">
              <tbody class="w-full">

              <template v-for="schedule in scheduling" :key="schedule.weekday">
                <tr>
                  <td class="p-2 w-[32px] text-end">
                    <input type="checkbox" class="toggle toggle-success toggle-sm align-center mt-1.5" :checked="schedule.active"/>
                  </td>
                  <td class="p-2 text-md grow">
                    <span>{{ $t(`weekday.${schedule.weekday}`) }}</span>
                  </td>
                  <td class="p-2 w-[60px] text-end">
                    <input class="w-[60px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           :value="time(schedule.begHour, schedule.begMinute)"
                           placeholder="11:00"/>
                  </td>
                  <td class="p-2 w-[60px] text-end">
                    <input class="w-[60px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           :value="time(schedule.endHour, schedule.endMinute)"
                           placeholder="15:00"/>
                  </td>
                </tr>
              </template>

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

<!--    <div class="w-full max-w-xl flex justify-between mt-4 mb-4 gap-4" v-if="restaurant">-->
<!--      <button class="btn btn-ghost btn-md flex-1">-->
<!--        {{ $t('restaurant.cancel_changes') }}-->
<!--      </button>-->
<!--      <button class="btn btn-neutral btn-md flex-1">-->
<!--        {{ $t('restaurant.save_changes') }}-->
<!--      </button>-->
<!--    </div>-->

  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import Divider from "@/layouts/divider/Divider.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";

export default defineComponent({
  name: "EditRestaurantPage",
  components: {
    Preloader,
    Divider,
  },
  data() {
    return {
      scheduling: this.calculateSchedules(),
      errors: {},
    };
  },
  computed: {
    ...mapGetters({
      form: 'restaurants/form',
      properties: 'restaurants/properties',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/resources',
      restaurantsResponse: 'restaurants/index',
      restaurantResponse: 'restaurants/show',
      restaurantUpdateResponse: 'restaurants/update',
      restaurantUpdateResponseErrors: 'restaurants/updateErrors',
      isLoadingRestaurant: 'restaurants/isLoadingShow',
    }),
    restaurantId() {
      return this.restaurant?.id ?? null;
    },
    slug: {
      get() { return this.properties?.slug; },
      set(value) { this.setOnForm({name: 'slug', value: value}); },
    },
    name: {
      get() { return this.properties?.name; },
      set(value) { this.setOnForm({name: 'name', value: value}); },
    },
    country: {
      get() { return this.properties?.country; },
      set(value) { this.setOnForm({name: 'country', value: value}); },
    },
    city: {
      get() { return this.properties?.city; },
      set(value) { this.setOnForm({name: 'city', value: value}); },
    },
    place: {
      get() { return this.properties?.place; },
      set(value) { this.setOnForm({name: 'place', value: value}); },
    },
    phone: {
      get() { return this.properties?.phone; },
      set(value) { this.setOnForm({name: 'phone', value: value}); },
    },
    email: {
      get() { return this.properties?.email; },
      set(value) { this.setOnForm({name: 'email', value: value}); },
    },
    nameErrors() { return this.restaurantUpdateResponseErrors?.name ?? this.errors?.name; },
    countryErrors() { return this.restaurantUpdateResponseErrors?.country ?? this.errors?.country; },
    cityErrors() { return this.restaurantUpdateResponseErrors?.city ?? this.errors?.city; },
    placeErrors() { return this.restaurantUpdateResponseErrors?.place ?? this.errors?.place; },
    phoneErrors() { return this.restaurantUpdateResponseErrors?.phone ?? this.errors?.phone; },
    emailErrors() { return this.restaurantUpdateResponseErrors?.email ?? this.errors?.email; },
  },
  watch: {
    restaurant: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.populateForm(newVal);
          this.scheduling = this.calculateSchedules();
        }
      },
    },
  },
  methods: {
    ...mapActions({
      setOnForm: "restaurants/setOnForm",
      populateForm: "restaurants/populateForm",
      rollbackForm: "restaurants/rollbackForm",
      selectRestaurant: "restaurants/setSelected",
      updateRestaurant: "restaurants/updateResource",
      loadAndSelectRestaurant: "restaurants/loadAndSelectResource",
    }),
    cancelForm() {
      this.errors = {};
      this.rollbackForm();
    },
    validateForm() {
      const errors = {};

      const name = this.name;
      if (!name) {
        errors.name = [this.$t('restaurant.errors.required.name')];
      } else if (name.trim().length < 2) {
        errors.name = [this.$t('restaurant.errors.min.name')];
      }

      const country = this.country;
      if (!country) {
        errors.country = [this.$t('restaurant.errors.required.country')];
      } else if (country.trim().length < 2) {
        errors.country = [this.$t('restaurant.errors.min.country')];
      }

      const city = this.city;
      if (!city) {
        errors.city = [this.$t('restaurant.errors.required.city')];
      } else if (city.trim().length < 2) {
        errors.city = [this.$t('restaurant.errors.min.city')];
      }

      const place = this.place;
      if (!place) {
        errors.place = [this.$t('restaurant.errors.required.place')];
      } else if (place.trim().length < 2) {
        errors.place = [this.$t('restaurant.errors.min.place')];
      }

      const phone = this.phone;
      if (phone && (!phone.startsWith('+') || phone.trim().length < 10)) {
        errors.phone = [this.$t('restaurant.errors.phone_rules')];
      }

      const email = this.email;
      if (email && (!email.includes('@') || email.trim().startsWith('@') || email.trim().endsWith('@') || email.trim().includes(' '))) {
        errors.email = [this.$t('restaurant.errors.email_rules', {sign: '@'})];
      }

      this.errors = errors;

      return Object.keys(errors).length === 0;
    },
    updateForm() {
      if (!this.validateForm()) {
        return;
      }

      // validate first

      const request = this.form.asUpdate();

      this.updateRestaurant({
        id: this.restaurantId,
        request: request,
      })
    },
    time(hour, minute) {
      let time = '';

      time += hour < 10 ? '0' + hour : hour;

      time += ':'

      time += minute < 10 ? '0' + minute : minute;

      return time;
    },
    calculateSchedules() {
      if (this.restaurant === undefined || this.restaurant === null || !this.restaurant.schedules || !this.restaurant.schedules.length) {
        return [];
      }

      const schedules = this.restaurant.schedules.map(function (schedule) {
        return {
          weekday: schedule.weekday,
          begHour: schedule.begHour,
          begMinute: schedule.begMinute,
          endHour: schedule.endHour,
          endMinute: schedule.endMinute,
          archived: schedule.archived,
          active: !schedule.archived,
        };
      });

      const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

      schedules.sort(function(a, b) {
        return weekdays.indexOf(a.weekday) - weekdays.indexOf(b.weekday);
      });

      return schedules;
    },
  },
  async mounted() {
    const restaurantId = +this.$route.params['restaurantId'];

    if (restaurantId < 1) {
      this.$router.replace(`/preview`);
      return;
    }

    if (!this.restaurant || (this.restaurant && this.restaurant.id !== restaurantId)) {
      const target = (this.restaurants ?? []).find(r => r.id === restaurantId);

      if (target) {
        await this.selectRestaurant(target);
      } else {
        await this.loadAndSelectRestaurant({ id: restaurantId, params: { include: 'schedules' } });
      }
    }

    if (this.form) {
      const formId = this.form.getProperty('id');

      if (!formId || this.restaurant.id !== formId) {
        this.populateForm(this.restaurant);
      }
    }

    this.scheduling = this.calculateSchedules();
  },
});
</script>

<style scoped>
.edit-restaurant-page {
  @apply flex flex-col w-full gap-0 pt-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}


.container {
  @apply card shadow-xl flex flex-row flex-wrap justify-center items-start gap-3 p-4 bg-base-100;

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}
</style>
