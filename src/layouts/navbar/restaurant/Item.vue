<template>
  <div class="flex flex-row gap-2 rounded-box select-none p-1">
    <button class="max-h-full" v-if="withIcon">
      <Icon :restaurant="restaurant" v-if="restaurant"/>
      <div class="h-10 w-10 flex justify-center items-center" v-else>
        <div class="loading loading-spinner loading-md" />
      </div>
    </button>

    <Details :restaurant="restaurant" :description="underText"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant.ts";
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
  computed: {
    isBanquet() {
      return this.$route['name'] === 'place-menu'
          || this.$route['name'] === 'place-order';
    },
    isDelivery() {
      return this.$route['name'] === 'place-delivery-menu'
          || this.$route['name'] === 'place-pre-delivery-menu'
          || this.$route['name'] === 'place-delivery-order';
    },
    underText() {
      if (this.isDelivery) {
        return this.$t('preview.navbar.delivery');
      }

      if (this.isBanquet) {
        return this.$t('preview.navbar.banquet');
      }

      return null;
    },
  }
});
</script>

<style scoped>

</style>
