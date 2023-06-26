<template>
  <div class="preview">
    <RestaurantPicker v-if="restaurants" class="pb-10"
        :items="restaurants" @restaurant-select="onRestaurantSelect"/>

    <Preloader :title="$t('preview.restaurants.loading')" v-if="isLoading"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import RestaurantPicker from "@/components/preview/restaurant/RestaurantPicker.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewRestaurants",
  emits: ["restaurant-select"],
  components: {
    Preloader,
    RestaurantPicker,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
      indexResponse: 'restaurants/getIndexResponse',
      showResponse: 'restaurants/getShowResponse',
    }),
    isLoading() {
      return !this.restaurant && !this.indexResponse && !this.showResponse;
    },
  },
  methods: {
    ...mapActions({
      selectRestaurant: 'restaurants/setSelected',
    }),
    onRestaurantSelect({restaurant}) {
      this.$emit('restaurant-select', {restaurant});
    },
  },
});
</script>

<style scoped>
.preview {
  @apply flex flex-col w-full gap-2 p-2;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
