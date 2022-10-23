<template>
  <button class="navbar-item" @click="onClick">
    <slot class="navbar-item-icon"></slot>
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBarIcon",
  emits: ['item-click'],
  props: {
    page: String,
    path: String,
  },
  methods: {
    onClick() {
      const args = {
        page: this.page,
        path: this.path,
      };

      this.$emit('item-click', args);
    }
  },
});
</script>

<style scoped>
.navbar-item {
  @apply btn btn-ghost w-14 h-14 rounded-box;
}

.navbar-item-icon {
  @apply inline-block h-6 w-6 stroke-white;
}
</style>