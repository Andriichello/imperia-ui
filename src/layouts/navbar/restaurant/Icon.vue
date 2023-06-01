<template>
  <div class="w-12 h-12">
    <img :src="image" :alt="title" :title="title" class="w-12 h-12 rounded"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";

export default defineComponent({
  // eslint-disable-next-line
  name: "Icon",
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
