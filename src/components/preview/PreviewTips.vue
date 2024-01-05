<template>
  <div class="preview">
    <template v-if="restaurant">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <Divider v-if="restaurant"
                 :lines="false"
                 :title="$t('preview.tip.title')"/>

        <div class="w-full h-full flex flex-col justify-center items-center gap-2">


          <div class="w-full flex justify-center items-center">
            <div class="w-full tip-box" @click="onOpenTipsForWaiters">
              <h3 class="text-lg font-semibold text-center">{{ $t('preview.tip.for.service') }}</h3>
              <p class="text-md text-center">{{ $t('preview.tip.for.service_description') }}</p>
            </div>
          </div>

          <div class="w-full flex justify-center items-stretch gap-2">
            <div class="tip-box flex-grow basis-1" @click="onOpenTipsForFood">
              <h3 class="text-lg font-semibold text-center">{{ $t('preview.tip.for.food') }}</h3>
              <p class="text-md text-center">{{ $t('preview.tip.for.food_description') }}</p>
            </div>
            <div class="tip-box flex-grow basis-1" @click="onOpenTipsForCleanness">
              <h3 class="text-lg font-semibold text-center">{{ $t('preview.tip.for.cleanness') }}</h3>
              <p class="text-md font-light text-center">{{ $t('preview.tip.for.cleanness_description') }}</p>
            </div>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import Divider from "@/layouts/divider/Divider.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewTips",
  components: {
    // Tips,
    // Preloader,
    Divider,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
      isLoadingWaiters: 'waiters/isLoadingWaiters',
    }),
  },
  methods: {
    ...mapActions({
      selectRestaurant: "restaurants/setSelected",
      loadWaitersIfMissing: "waiters/loadWaitersIfMissing",
      loadAndSelectRestaurant: "restaurants/loadAndSelectRestaurant",
    }),
    onOpenTipsForWaiters() {
      const restaurantId = +this.$route.params['restaurantId'];

      this.$router.push(`/preview/${restaurantId}/tips/waiters`);
    },
    onOpenTipsForFood() {
      const restaurantId = +this.$route.params['restaurantId'];

      this.$router.push(`/preview/${restaurantId}/tips/food`);
    },
    onOpenTipsForCleanness() {
      const restaurantId = +this.$route.params['restaurantId'];

      this.$router.push(`/preview/${restaurantId}/tips/cleanness`);
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
        this.selectRestaurant(target);
      } else {
        this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }
  },
});
</script>

<style scoped>
.preview {
  @apply flex flex-col w-full gap-0 px-2 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}

.tip-box {
  @apply card shadow-md flex flex-col flex-wrap justify-center items-center gap-0 bg-base-100 btn-ghost py-5 px-3 rounded cursor-pointer min-h-[120px];

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}
</style>
