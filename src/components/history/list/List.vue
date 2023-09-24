<template>
  <div class="w-full flex flex-wrap justify-center items-start gap-4 pb-2">
    <div class="w-full flex flex-col gap-3">
      <template v-for="banquet in banquets" :key="banquet.id">
        <Banquet :banquet="banquet"
                 @click="onToggleSelection(banquet)"/>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Banquet from "./items/Banquet.vue";
import {mapGetters} from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "List",
  emits: ["toggle-selection"],
  props: {
    banquets: {
      type: Array,
    },
  },
  components: {
    Banquet,
  },
  computed: {
    ...mapGetters({
      mode: "history/mode",
      selected: "history/selected",
    }),
  },
  methods: {
    onToggleSelection(banquet) {
      if (this.mode !== 'selection') {
        return;
      }

      this.$emit('toggle-selection', {banquet})
    },
  }
});
</script>

<style scoped>
</style>
