<template>
  <div class="w-full flex flex-col justify-center bg-base-100 shadow-md mb-2" v-if="categories && categories.length">
    <div class="w-full flex justify-center items-center">
      <div class="max-w-full flex justify-start gap-2 p-2 overflow-x-auto overflow-y-hidden" id="category-buttons-scroll">
        <template v-for="c in categories" :key="c.id">
          <Category :item="c" :id="`category-${c.id}-button`"
                    :selected="category && category.id === c.id"
                    @category-toggle="onToggleCategory"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Menu from "@/openapi/models/Menu";
import Category from "@/components/preview/category/Category.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewCategoryNavBar",
  components: {
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
</style>
