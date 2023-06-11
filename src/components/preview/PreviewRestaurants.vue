<template>
  <div class="preview select-none">
    <RestaurantPicker v-if="restaurants"
        :items="restaurants" @restaurant-select="onRestaurantSelect"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import RestaurantPicker from "@/components/preview/restaurant/RestaurantPicker.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewRestaurants",
  emits: ["restaurant-select"],
  components: {
    RestaurantPicker,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
    }),
  },
  methods: {
    ...mapActions({
      selectRestaurant: 'restaurants/setSelected',
    }),
    onRestaurantSelect({restaurant}) {
      this.selectRestaurant(restaurant);
      this.$emit('restaurant-select', {restaurant});
    },
  },
});
</script>

<style scoped>
.preview {
  @apply flex flex-col w-full gap-2 p-2 pb-20;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
