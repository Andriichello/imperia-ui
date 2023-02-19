<template>
    <div class="switcher" v-if="menus && menus.length">
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
    @apply flex flex-row items-center p-1 gap-4;

    flex-wrap: nowrap;

    flex: 0 1 auto;
    overflow-x: auto;
  }
</style>
