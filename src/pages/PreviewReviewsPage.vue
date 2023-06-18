<template>
  <div class="preview-page">
    <PreviewReviews class="max-w-xl"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapGetters} from "vuex";
import PreviewReviews from "@/components/preview/PreviewReviews.vue";

export default defineComponent({
  name: "PreviewReviewsPage",
  components: {
    PreviewReviews,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
    }),
  },
  mounted() {
    window.scrollTo(0, 0);
  }
});
</script>

<style scoped>
.preview-page {
  @apply flex flex-col items-center w-full gap-3 w-full pt-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
