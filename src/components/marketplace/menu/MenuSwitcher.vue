<template>
    <div class="switcher">
      <template v-for="menu in menus" :key="menu.id">
        <MenuSwitcherItem :menu="menu" :selected="isSelected(menu)" @switch-menu="onSwitchMenu"/>
      </template>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import MenuSwitcherItem from './MenuSwitcherItem.vue'

export default defineComponent({
  name: 'MenuSwitcher',
  emits: ['switch-menu'],
  components: {
    MenuSwitcherItem,
  },
  props: {
    menus: Array,
    selected: Object,
  },
  methods: {
    isSelected(menu) {
      return menu === this.selected;
    },
    onSwitchMenu(menu) {
      this.$emit('switch-menu', menu);
    }
  },
})
</script>

<style scoped>
  .switcher {
    @apply flex flex-row items-center pt-2 pb-2 gap-9;

    flex-wrap: nowrap;

    flex: 0 1 auto;
    overflow-x: auto;

    margin-left: auto;
    margin-right: auto;
  }
</style>
