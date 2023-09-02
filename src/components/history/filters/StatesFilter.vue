<template>
  <div class="states">
    <div class="w-full flex flex-col justify-center mb-2">
      <div class="w-full flex justify-center items-center">
        <div class="max-w-full flex justify-start gap-2 p-2 overflow-x-auto overflow-y-hidden" id="category-buttons-scroll">
          <div v-for="state in states" :key="state"
               class="btn btn-xs btn-ghost"
               :class="{'selected': selected === state}"
               @click="onStateClicked(state)" >
            <span>{{ $t(`banquet.state.${state}`) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StatesFilter',
  emits: ['state-clicked', 'state-select'],
  props: {
    states: {
      type: Array,
      default: null,
    },
    selected: {
      type: String,
      default: null,
    },
  },
  methods: {
    onStateClicked(state) {
      this.$emit('state-select', {state});
    },
    onStateSelect({ state }) {
      this.$emit('state-select', { state });
    },
  },
})
</script>

<style scoped>
  .states {
    @apply flex flex-wrap w-full justify-center gap-3;
  }

  .selected {
    @apply text-black;
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
