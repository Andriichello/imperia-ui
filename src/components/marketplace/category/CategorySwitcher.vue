<template>
  <div class="switcher">
    <template v-for="category in categories" :key="category.id">
      <CategorySwitcherItem :category="category" :selected="isSelected(category)" @switch-category="onSwitchCategory"/>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CategorySwitcherItem from './CategorySwitcherItem.vue'

export default defineComponent({
  name: 'CategorySwitcher',
  emits: ['switch-category'],
  components: {
    CategorySwitcherItem,
  },
  props: {
    categories: Array,
    selected: Object,
  },
  methods: {
    isSelected(category) {
      return category === this.selected;
    },
    onSwitchCategory(category) {
      this.$emit('switch-category', category);
    },
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
