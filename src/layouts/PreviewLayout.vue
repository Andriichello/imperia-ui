<template>
    <div class="preview-layout">
      <PreviewNavBar class="w-full"/>
      <slot />
    </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewNavBar from "@/layouts/navbar/PreviewNavBar.vue";

export default defineComponent({
  name: "PreviewLayout",
  components: {
    PreviewNavBar,
  },
});
</script>

<style scoped>
.preview-layout {
  @apply flex flex-col w-full max-w-full bg-base-200 p-0;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
