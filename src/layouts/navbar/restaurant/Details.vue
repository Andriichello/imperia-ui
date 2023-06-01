<template>
  <div class="flex flex-col flex-wrap justify-center">
    <span class="font-bold text-md text-ellipsis overflow-hidden line-clamp-1">{{ restaurant.name }}</span>
    <span class="font-light text-sm text-ellipsis overflow-hidden line-clamp-1">{{ restaurant.place }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";

export default defineComponent({
  // eslint-disable-next-line
  name: "Details",
  props: {
    restaurant: {
      type: Restaurant,
      default: null,
    },
  },
  computed: {
    image() {
      if (!this.restaurant || !this.restaurant.media || !this.restaurant.media.length) {
        return null;
      }

      return this.restaurant.media[0].url;
    },
    title() {
      if (!this.restaurant || !this.restaurant.title) {
        return null;
      }

      return this.restaurant.title;
    },
  },
});
</script>

<style scoped>

</style>
