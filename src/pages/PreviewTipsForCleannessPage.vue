<template>
  <div class="order-page">
    <PreviewTipsForCleanness class="max-w-xl"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewTipsForCleanness from "@/components/preview/PreviewTipsForCleanness.vue";

export default defineComponent({
  name: "PreviewTipsForCleannessPage",
  components: {
    PreviewTipsForCleanness,
  },
  mounted() {
    window.scrollTo(0, 0);
  }
});
</script>

<style scoped>
.order-page {
  @apply flex flex-col items-center w-full gap-3 w-full pt-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
