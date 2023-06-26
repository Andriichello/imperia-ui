<template>
  <div class="preview">

    <template v-if="restaurant">
      <Divider v-if="restaurant && !isLoadingReviews"
               :lines="false"
               title="Відгуки"/>

      <template v-if="isLoadingReviews">
        <Preloader :title="$t('preview.restaurant.loading_reviews')"
                   class="p-2"/>
      </template>

      <Reviews :item="restaurant"/>

    </template>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import Divider from "@/layouts/divider/Divider.vue";
import Reviews from "@/components/preview/review/Reviews.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewReviews",
  components: {
    Preloader,
    Reviews,
    Divider,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
      isLoadingReviews: 'reviews/isLoadingReviews',
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
