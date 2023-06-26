<template>
  <div class="flex flex-row gap-2 rounded-box select-none p-1">
    <button class="max-h-full" v-if="withIcon">
      <Icon :restaurant="restaurant"/>
    </button>

    <Details :restaurant="restaurant"/>
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
    withIcon: {
      type: Boolean,
      default: true,
    }
  },
});
</script>

<style scoped>

</style>
