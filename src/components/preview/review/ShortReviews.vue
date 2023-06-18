<template>
  <div class="w-full">
    <div class="w-full flex flex-row justify-center items-center btn-ghost rounded px-2 py-1">
      <div class="grow flex flex-col justify-center items-start">
        <h2 class="text-md font-bold">Відгуки</h2>
        <p class="text-md" v-if="reviewsTotal !== null">
          {{ reviewsResponse.meta.total ? 'Всього відгуків: ' + reviewsResponse.meta.total: '' }}
        </p>
      </div>

      <button class="flex justify-center items-center w-[40px] h-[40px]">
        <BaseIcon width="20" height="20" view-box="0 0 24 24" style="transform: rotate(180deg);">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {mapGetters} from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "ShortReviews",
  components: {BaseIcon},
  props: {
    item: Restaurant,
  },
  computed: {
    ...mapGetters({
      reviews: "reviews/reviews",
      reviewsResponse: "reviews/getIndexResponse",
    }),
    reviewsCount() {
      if (!this.reviews) {
        return null;
      }

      return this.reviews.length;
    },
    reviewsTotal() {
      if (!this.reviewsResponse || !this.reviewsResponse.meta) {
        return null;
      }

      return this.reviewsResponse.meta?.total;
    },
  },
});
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
}
</style>
