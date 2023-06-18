<template>
  <div class="preview-page">
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
      selectRestaurant: 'restaurants/setSelected'
    }),
    onSelectRestaurant({ restaurant }) {
      this.selectRestaurant(restaurant);

      if (restaurant) {
        this.$router.push(`/preview/${restaurant.id}`);
      }
    },
  },

});
</script>

<style scoped>
.preview-page {
  @apply flex flex-col items-center w-full gap-3 w-full pt-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
