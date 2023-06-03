<template>
  <div class="preview">
    <RestaurantList :restaurants="restaurants" :selected="selected" @restaurant-click="onRestaurantClick"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import RestaurantList from "@/components/home/list/RestaurantList.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  name: "HomeView",
  components: {
    RestaurantList,
  },
  computed: {
    ...mapGetters({
      selected: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
    }),
  },
  methods: {
    ...mapActions({
      setSelected: 'restaurants/setSelected',
    }),
    onRestaurantClick({ restaurant }) {
      this.setSelected(this.selected === restaurant ? null : restaurant);
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
