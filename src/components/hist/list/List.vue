<template>
  <div class="w-full flex flex-wrap justify-center items-start gap-4 pb-2">
    <div class="w-full flex flex-col gap-3">
      <template v-for="banquet in banquets" :key="banquet.id">
        <Banquet :banquet="banquet"/>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Banquet from "./items/Banquet.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "List",
  props: {
    banquets: Array,
  },
  components: {
    Banquet,
  },
});
</script>

<style scoped>
</style>
