<template>
  <div class="flex flex-row gap-2 cursor-pointer btn-ghost rounded-box p-1 w-[200px]">
    <button>
      <Icon :restaurant="restaurant"/>
    </button>

    <Details :restaurant="restaurant" v-if="restaurant"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";
import Icon from "@/layouts/navbar/restaurant/Icon.vue";
import Details from "@/layouts/navbar/restaurant/Details.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Item",
  components: {Details, Icon},
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
