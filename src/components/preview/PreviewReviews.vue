<template>
  <div class="preview">
    <template v-if="restaurant">
      <Divider v-if="restaurant"
               :lines="false"
               title="Відгуки"/>

      <Reviews :item="restaurant"/>

    </template>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import Divider from "@/layouts/divider/Divider.vue";
import Reviews from "@/components/preview/review/Reviews.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewReviews",
  components: {
    Reviews,
    Divider,
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
      loadMenusIfMissing: "preview/loadMenusIfMissing",
      loadReviewsIfMissing: "reviews/loadReviewsIfMissing",
      loadMyReviewsIfMissing: "reviews/loadMyReviewsIfMissing",
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
</style>
