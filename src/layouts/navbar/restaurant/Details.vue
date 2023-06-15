<template>
  <div class="flex flex-col flex-wrap justify-center">
    <span class="font-bold text-md text-ellipsis overflow-hidden line-clamp-1">{{ name }}</span>
    <span class="font-light text-sm text-ellipsis overflow-hidden line-clamp-1">{{ place }}</span>
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
    name() {
      if (!this.restaurant || !this.restaurant.name) {
        return this.$t("preview.navbar.restaurant");
      }

      return this.restaurant.name;
    },
    place() {
      if (!this.restaurant || !this.restaurant.place) {
        return this.$t("preview.navbar.street_and_address");
      }

      return this.restaurant.place;
    },
  },
});
</script>

<style scoped>

</style>
