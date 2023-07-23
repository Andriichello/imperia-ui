<template>
  <div class="order-page">
    <PreviewRestaurants class="max-w-xl"
        @restaurant-select="onSelectRestaurant"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import PreviewRestaurants from "@/components/preview/PreviewRestaurants.vue";

export default defineComponent({
  name: "PreviewPage",
  components: {
    PreviewRestaurants,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
    }),
  },
  methods: {
    ...mapActions({
      clearReviews: 'reviews/clear',
      clearPreview: 'preview/clear',
      selectRestaurant: 'restaurants/setSelected'
    }),
    onSelectRestaurant({ restaurant }) {
      if (!this.restaurant || this.restaurant !== restaurant) {
        this.clearReviews();
        this.clearPreview();
      }

      this.selectRestaurant(restaurant);

      if (restaurant) {
        this.$router.push(`/preview/${restaurant.id}`);
      }
    },
  },

});
</script>

<style scoped>
.order-page {
  @apply flex flex-col items-center w-full gap-3 w-full pt-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
