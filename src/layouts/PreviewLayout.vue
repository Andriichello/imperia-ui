<template>
    <div class="preview-layout pt-[68px]">
      <slot />
      <PreviewNavBar class="fixed left-0 top-0 w-full"/>
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
  @apply flex flex-col min-w-full max-w-full bg-base-200;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
