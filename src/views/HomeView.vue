<template>
  <div class="preview">
    <RestaurantPicker v-if="restaurants" :items="restaurants" :selected="restaurant" @restaurant-select="onSelectRestaurant"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {mapActions, mapGetters} from "vuex";
import RestaurantPicker from "@/components/preview/restaurant/RestaurantPicker.vue";

export default defineComponent({
  name: "HomeView",
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
      setSelected: 'restaurants/setSelected',
    }),
    onSelectRestaurant({ restaurant }) {
      this.setSelected(restaurant);

      this.$router.push(`/preview`);
    },
  },
});
</script>

<style scoped>
.preview {
  @apply rounded-box flex-wrap w-full;
  
  min-width: 100px;
  min-height: 100px;
  margin: 12px;
  padding: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
