<template>
  <button :class="{'selected': selected}" 
    @click="onClick">
    <span>{{ menu.title ?? 'Menu' }}</span>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuSwitcherItem',
  emits: ['switch-menu'],
  props: {
    menu: Object,
    selected: Boolean,
  },
  methods: {
    onClick() {
      if (this.selected) {
        return;
      }

      this.$emit('switch-menu', this.menu);
    },
  },
})
</script>

<style scoped>
  button {
    @apply btn btn-ghost pt-2 pb-2 pl-3 pr-3 text-lg;
    flex: 0 0 auto;
  }

  .selected {
    background-color: var(--yellow);
    color: var(--d-black);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
