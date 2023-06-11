<template>
  <button class="btn btn-sm btn-ghost"
          :class="{'selected': selected}"
          @click="onCategoryToggle">
    {{ title }}
  </button>
</template>

<script>
import { defineComponent } from "vue";
import Category from "@/openapi/models/Category";

export default defineComponent({
  // eslint-disable-next-line
  name: "Category",
  emits: ["category-toggle"],
  props: {
    item: Category,
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    title() {
      return this.item.title;
    },
    description() {
      return this.item.description;
    },
    image() {
      const p = this.item;

      if (p.media && p.media.length) {
        return p.media[0].url;
      }

      return null;
    },
  },
  methods: {
    onCategoryToggle() {
      this.$emit('category-toggle', {category: this.item, selected: this.selected});
    },
  },
});
</script>

<style scoped>
.selected {
  background-color: var(--yellow);
  color: var(--d-black);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>
