<template>
  <button class="btn btn-sm btn-ghost normal-case"
          :class="{'selected': selected, 'text-base-100': selected && theme === ThemeConfig.dark()}"
          @click="onCategoryToggle">
    {{ title }}
  </button>
</template>

<script>
import { defineComponent } from "vue";
import {Category} from "@/openapi/models/Category";
import {mapGetters} from "vuex";
import {ThemeConfig} from "@/configs";

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
    ThemeConfig() {
      return ThemeConfig
    },
    ...mapGetters({
      theme: "theme/get",
    }),
    title() {
      return this.item.title;
    },
    description() {
      return this.item.description;
    },
    image() {
      const p = this.item;

      if (p && p.media && p.media.length) {
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
  @apply bg-[var(--yellow)];
}

.selected:hover {
  @apply bg-[var(--yellow)];
}
</style>
