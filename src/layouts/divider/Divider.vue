<template>
  <div class="w-full min-w-xl max-w-2xl flex justify-center items-center px-5 py-2 gap-5">
    <div class="bg-current grow h-0.5" v-if="lines"></div>
    <span class="font-bold text-xl text-current">{{ title }}</span>
    <div class="bg-current grow h-0.5" v-if="lines"></div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Divider",
  props: {
    title: String,
    lines: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style scoped>

</style>
