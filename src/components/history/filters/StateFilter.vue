<template>
  <div class="switcher">
    <template v-for="state in states" :key="state">
      <StateFilterItem :state="state" :selected="isSelected(state)" @item-click="onItemClick"/>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import StateFilterItem from './StateFilterItem.vue'

export default defineComponent({
  name: 'StateFilter',
  emits: ['state-switch'],
  components: {
    StateFilterItem,
  },
  props: {
    states: Array,
    selected: Array,
  },
  methods: {
    isSelected(state) {
      return (this.selected ?? []).includes(state);
    },
    onItemClick({ state, selected }) {
      this.$emit('state-switch', { state, wasSelected: selected});
    }
  },
})
</script>

<style scoped>
  .switcher {
    @apply flex flex-row items-center p-1 gap-3;

   flex-wrap: nowrap;

    flex: 0 1 auto;
    overflow-x: auto;

    margin-left: auto;
    margin-right: auto;
  }
</style>
