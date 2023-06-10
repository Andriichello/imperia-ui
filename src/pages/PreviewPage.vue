<template>
  <div class="preview-page">
    <Preview />
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Preview from "@/components/preview/Preview.vue";

export default defineComponent({
  name: "PreviewPage",
  components: {
    Preview,
  },
});
</script>

<style scoped>
.preview-page {
  @apply flex flex-col w-full p-3 gap-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
