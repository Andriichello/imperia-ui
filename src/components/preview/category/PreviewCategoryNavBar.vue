<template>
  <div class="w-full flex flex-col justify-center bg-base-100 shadow-md pb-1 mb-2" v-if="categories && categories.length">
    <div class="w-full flex justify-center items-center">
      <div class="max-w-full flex justify-start p-1 pt-2 gap-2 overflow-x-auto overflow-y-hidden">
        <template v-for="c in categories" :key="c.id">
          <Category :item="c"
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
import BaseIcon from "@/components/icons/BaseIcon.vue";
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
  computed: {
    ...mapGetters({
      category: "preview/category",
      categories: "preview/categories",
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
