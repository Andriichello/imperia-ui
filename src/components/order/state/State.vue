<template>
  <div class="state cursor-pointer btn btn-ghost" :class="{'selected': selected}">

    <div class="w-full flex flex-col flex-wrap justify-center items-start">
      <div class="w-full flex flex-col flex-wrap justify-between px-2 py-1 gap-1">
        <span class="w-full text-lg line-clamp-1 text-ellipsis text-center">
          {{ $t(`banquet.state.${state}`) }}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: 'State',
  emits: ["change-state"],
  props: {
    state: {
      type: String,
      default: 'new',
    },
    selected: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onSelect(state) {
      this.$emit('change-state', { state });
    },
  }
})
</script>

<style scoped>
  .state {
    @apply flex flex-col justify-center items-center card bg-base-200/80 shadow-md w-full p-3;
  }

  .selected {
    @apply text-black;
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
