<template>
  <div class="order-page">
    <PreviewRestaurant class="max-w-xl"
        @menu-select="onSelectMenu"
        @open-reviews="onOpenReviews"
        @open-tips="onOpenTips"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewRestaurant from "@/components/preview/PreviewRestaurant.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  name: "PreviewRestaurantPage",
  components: {
    PreviewRestaurant,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/resources',
    }),
  },
  methods: {
    ...mapActions({
      selectRestaurant: "restaurants/setSelected",
      loadMenusIfMissing: "preview/loadMenusIfMissing",
      loadReviewsIfMissing: "reviews/loadReviewsIfMissing",
      loadWaitersIfMissing: "waiters/loadWaitersIfMissing",
      loadAndSelectRestaurant: "restaurants/loadAndSelectResource",
    }),
    onSelectMenu({ restaurant, menu }) {
      window.scrollTo(0, 0)
      this.$router.push(`/preview/${restaurant.id}/menu/${menu.id}`);
    },
    onOpenReviews({ restaurant }) {
      this.$router.push(`/preview/${restaurant.id}/reviews`);
    },
    onOpenTips({ restaurant }) {
      this.$router.push(`/preview/${restaurant.id}/tips`);
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

    this.loadWaitersIfMissing();
    this.loadReviewsIfMissing();
    this.loadMenusIfMissing();
  },
});
</script>

<style scoped>
.order-page {
  @apply flex flex-col w-full gap-0 pt-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
