<template>
  <button :class="{'selected': selected}" 
    @click="onClick">
    <div> 
      <img :src="category.media[0].url"/>
      <span>{{ category.title }}</span>
    </div>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CategorySwitcherItem',
  emits: ['switch-category'],
  props: {
    category: Object,
    selected: Boolean,
  },
  methods: {
    onClick() {
      this.$emit('switch-category', this.selected ? null : this.category);
    },
  },
})
</script>

<style scoped>
  button {
    @apply btn btn-ghost p-2 text-sm h-auto;
  }

  div {
    @apply flex flex-col justify-center items-center gap-1 flex-nowrap;
  }

  img {
    @apply block rounded-box w-[72px] h-12;
  }

  span {
    @apply block w-[128px] h-6 overflow-hidden text-center;
  }

  .selected {
    background-color: var(--yellow);
    color: var(--d-black);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
