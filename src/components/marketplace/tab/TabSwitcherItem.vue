<template>
  <button :class="{'selected': selected}"
    @click="onClick">
    <slot class="inline-block"></slot>
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TabSwitcherItem",
  emits: ['switch-tab'],
  props: {
    tab: String,
    selected: Boolean,
  },
  methods: {
    onClick() {
      if (this.selected) {
        return;
      }

      this.$emit('switch-tab', this.tab);
    }
  },
});
</script>

<style scoped>
  button {
    @apply btn btn-ghost w-14 h-14 p-2;
  }

  .selected {
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>