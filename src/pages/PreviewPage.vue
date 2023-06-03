<template>
  <div class="preview-page">
    <Restaurant v-if="restaurant" :item="restaurant"/>
    <Preview />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Preview from "@/components/preview/Preview.vue";
import Restaurant from "@/components/preview/restaurant/Restaurant.vue";
import {mapGetters} from "vuex";

export default defineComponent({
  name: "PreviewPage",
  components: {
    Restaurant,
    Preview,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
    }),
  },
});
</script>

<style scoped>
.preview-page {
  @apply flex flex-col w-full p-3 gap-8;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
