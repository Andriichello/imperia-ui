<template>
  <div class="w-full flex flex-col justify-center bg-base-100 shadow-md mb-2" v-if="categories && categories.length">
    <div class="w-full flex justify-center items-start">
      <div class="max-w-full flex justify-start items-start gap-2 p-2 overflow-x-auto overflow-y-hidden" id="category-buttons-scroll">
        <template v-for="c in categories" :key="c.id">
          <Category :item="c" :id="`category-${c.id}-button`"
                    :selected="category && category.id === c.id"
                    @category-toggle="onToggleCategory"/>
        </template>
      </div>

      <div class="w-fit h-full bg-base-100 sticky right-0 p-2"
           @click="$emit('open-categories-modal')">
        <div class="h-full btn btn-sm btn-outline normal-case rounded">
          <AlignRight class="w-6 h-5"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {AlignRight} from "lucide-vue-next";
import Menu from "@/openapi/models/Menu.ts";
import Category from "@/components/preview/category/Category.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewCategoryNavBar",
  emits: ["open-categories-modal"],
  components: {
    AlignRight,
    Category,
  },
  props: {
    menu: Menu,
  },
  watch: {
    category(newCategory, oldCategory) {
      if (newCategory === oldCategory) {
        return;
      }

      const scroll = document.getElementById('category-buttons-scroll');

      if (!newCategory) {
        if (scroll) {
          scroll.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }

        return;
      }

      const button = document.getElementById(`category-${newCategory.id}-button`);

      if (button && scroll) {
        scroll.scrollTo({
          top: 0,
          left: Math.max(0, button.offsetLeft - 8),
          behavior: 'smooth',
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      category: 'preview/category',
      categories: 'preview/categories',
    }),
  },
  methods: {
    ...mapActions({
      selectCategory: 'preview/selectCategory',
    }),
    onToggleCategory({category, selected}) {
      if (selected) {
        return;
      }

      this.selectCategory(category);
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
