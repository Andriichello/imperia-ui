<template>
  <button class="btn btn-ghost w-14 h-14 p-2" :class="{'selected': selected}"
    @click="onClick">
    <slot class="inline-block"></slot>
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBarItem",
  emits: ['item-click'],
  props: {
    page: String,
    path: String,
    selected: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onClick() {
      const args = {
        page: this.page,
        path: this.path,
      };

      this.$emit('item-click', args);
    }
  },
});
</script>

<style scoped>
  .selected {
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>