<template>
  <div class="edit-restaurant-page">
    <Divider v-if="restaurant"
             class="mb-1"
             :lines="false"
             :title="$t('preview.restaurant.restaurant')"/>

    <div class="container max-w-xl">

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input v-model="title" name="title" type="text" required placeholder="Type here"
               class="input input-bordered w-full max-w-xl"
               :class="{ 'input-error' : titleErrors !== null }"/>
        <label class="label flex-col items-start" v-if="titleErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in titleErrors" :key="error">
            {{ error }}
          </span>
        </label>
      </div>

      <div class="w-full flex flex-col justify-center items-center mt-4">
        <div class="w-full flex justify-center items-center gap-2">
          <div class="form-control w-full flex-1">
            <label class="label">
              <span class="label-text">Country</span>
            </label>
            <input v-model="country" name="country" type="text" required placeholder="Type here"
                   class="input input-bordered w-full max-w-xl"
                   :class="{ 'input-error' : countryErrors !== null }"/>
            <label class="label flex-col items-start" v-if="countryErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in countryErrors" :key="error">
            {{ error }}
          </span>
            </label>
          </div>

          <div class="form-control w-full flex-1">
            <label class="label">
              <span class="label-text">City</span>
            </label>
            <input v-model="city" name="city" type="text" required placeholder="Type here"
                   class="input input-bordered w-full max-w-xl"
                   :class="{ 'input-error' : cityErrors !== null }"/>
            <label class="label flex-col items-start" v-if="cityErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in cityErrors" :key="error">
            {{ error }}
          </span>
            </label>
          </div>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Street</span>
          </label>
          <input v-model="street" name="street" type="text" required placeholder="Type here"
                 class="input input-bordered w-full max-w-xl"
                 :class="{ 'input-error' : streetErrors !== null }"/>
          <label class="label flex-col items-start" v-if="streetErrors">
          <span class="label-text-alt text-error text-sm" v-for="error in streetErrors" :key="error">
            {{ error }}
          </span>
          </label>
        </div>
      </div>

      <div class="w-full flex flex-col justify-center items-center mt-4">
        <label class="label">
          <span class="label-text">Schedule</span>
        </label>

        <div class="w-full flex flex-col justify-start items-start">
          <div class="w-full overflow-x-auto">
            <table class="table table-md w-full">
              <tbody class="w-full">
                <tr>
                  <td class="p-2 text-md grow">
                    <span>{{ $t("weekday.monday") }}</span>
                  </td>
                   <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="12:15"
                           :placeholder="Start"/>
                  </td>
                  <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="18:20"
                           :placeholder="Start"/>
                  </td>
                  <td class="p-2 w-[48px] text-center">
                    <input type="checkbox" class="toggle toggle-sm toggle-success mt-1" checked="checked" />
                  </td>
                </tr>
                <tr>
                  <td class="p-2 text-md grow">
                    <span>{{ $t("weekday.tuesday") }}</span>
                  </td>
                  <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="12:15"
                           :placeholder="Start"/>
                  </td>
                  <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="18:20"
                           :placeholder="Start"/>
                  </td>
                </tr>
                <tr>
                  <td class="p-2 text-md grow">
                    <span>{{ $t("weekday.wednesday") }}</span>
                  </td>
                   <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="12:15"
                           :placeholder="Start"/>
                  </td>
                  <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="18:20"
                           :placeholder="Start"/>
                  </td>
                </tr>
                <tr>
                  <td class="p-2 text-md grow">
                    <span>{{ $t("weekday.thursday") }}</span>
                  </td>
                   <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="12:15"
                           :placeholder="Start"/>
                  </td>
                  <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="18:20"
                           :placeholder="Start"/>
                  </td>
                </tr>
                <tr>
                  <td class="p-2 text-md grow">
                    <span>{{ $t("weekday.friday") }}</span>
                  </td>
                   <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="12:15"
                           :placeholder="Start"/>
                  </td>
                  <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="18:20"
                           :placeholder="Start"/>
                  </td>
                </tr>
                <tr>
                  <td class="p-2 text-md grow">
                    <span>{{ $t("weekday.saturday") }}</span>
                  </td>
                   <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="12:15"
                           :placeholder="Start"/>
                  </td>
                  <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="18:20"
                           :placeholder="Start"/>
                  </td>
                </tr>
                <tr>
                  <td class="p-2 text-md grow">
                    <span>{{ $t("weekday.sunday") }}</span>
                  </td>
                   <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="12:15"
                           :placeholder="Start"/>
                  </td>
                  <td class="p-2 w-[48px] text-end">
                    <input class="w-[48px] input input-xs text-[16px] px-1 bg-transparent text-center"
                           style="min-height: 2rem;"
                           maxlength="5"
                           name="time" type="text"
                           value="18:20"
                           :placeholder="Start"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

    <PreviewRestaurant class="max-w-xl"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewRestaurant from "@/components/preview/PreviewRestaurant.vue";
import {mapActions, mapGetters} from "vuex";
import Divider from "@/layouts/divider/Divider.vue";
import Time from "@/components/order/time/Time.vue";

export default defineComponent({
  name: "EditRestaurantPage",
  components: {
    Divider,
    PreviewRestaurant,
  },
  data() {
    const scheduling = [];

    // scheduling[] = {
    //   'day': '',
    //   'enabled': '',
    // }

    return {
      scheduling,
    };
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
    }),
  },
  methods: {
    ...mapActions({
      selectRestaurant: "restaurants/setSelected",
      loadAndSelectRestaurant: "restaurants/loadAndSelectRestaurant",
    }),
    time(hour, minute) {
      let time = '';

      time += hour < 10 ? '0' + hour : hour;

      time += ':'

      time += minute < 10 ? '0' + minute : minute;

      return time;
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
        await this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }
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
