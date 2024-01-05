<template>
  <div class="preview">
    <div>
      <h3 class="font-bold text-xl text-current">
        {{ $t('preview.tip.title') }}
        "{{ $t('preview.tip.for.service') }}"
      </h3>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewTipsForWaiters",
  components: {
    // Tips,
    // Preloader,
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
