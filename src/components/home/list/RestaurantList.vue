<template>
  <div class="restaurant-list">
    <div class="restaurant-list-col" v-for="r in restaurants" :key="r.id">
      <RestaurantListItem :restaurant="r" :selected="selected && r.id === selected.id" @restaurant-click="onClick"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import RestaurantListItem from "./RestaurantListItem.vue";
import Restaurant from "@/openapi/models/Restaurant";

export default defineComponent({
  name: "RestaurantList",
  emits: ["restaurant-click"],
  components: {
    RestaurantListItem,
  },
  props: {
    selected: {
      type: Restaurant,
      default: null,
    },
    restaurants: Array,
  },
  methods: {
    onClick({ restaurant }) {
      this.$emit('restaurant-click', { restaurant });
    },
  }
});
</script>

<style scoped>
.restaurant-list {
  @apply gap-4 p-1;

  display: flex;
  max-width: 800px;
  flex-grow: 1;
  flex-wrap: wrap;
}

.restaurant-list-col {
  @apply gap-4;

  flex-basis: 212px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
}
</style>
