<template>
  <button :class="{'selected': selected}"
          @click="onClick">
      <span>{{ state }}</span>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StateFilterItem',
  emits: ['item-click'],
  props: {
    state: String,
    selected: Boolean,
  },
  methods: {
    onClick() {
      this.$emit('item-click', { state: this.state, selected: this.selected });
    },
  },
})
</script>

<style scoped>
button {
  @apply btn btn-sm btn-ghost text-sm h-auto;
}

span {
  @apply block h-6 overflow-hidden text-center;
}

.selected {
  background-color: var(--yellow);
  color: var(--d-black);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>
