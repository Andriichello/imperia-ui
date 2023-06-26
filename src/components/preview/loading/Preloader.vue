<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-3">
      <span class="font-bold text-xl text-center">
        {{ title }}
      </span>
    <span class="loading loading-spinner loading-lg"></span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Preloader",
  props: {
    title: String
  },
});
</script>

<style scoped>
</style>
