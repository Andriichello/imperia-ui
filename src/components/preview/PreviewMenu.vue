<template>
  <div class="preview select-none">
    <template v-if="products && categories">
      <template v-for="c in categories" :key="c.id">
        <Divider :title="c.title" class="opacity-60"/>
        <List :items="filterByCategory(products, c)" class="mb-12"/>
      </template>
    </template>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import List from "@/components/preview/list/List.vue";
import Divider from "@/layouts/divider/Divider.vue";
import Menu from "@/openapi/models/Menu";
import {mapGetters} from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewMenu",
  components: {
    Divider,
    List
  },
  props: {
    menu: Menu,
  },
  computed: {
    ...mapGetters({
      products: "preview/products",
      categories: "preview/categories",
    }),
  },
  methods: {
    filterByCategory(products, category) {
      return products.filter(p => {
        return p.categoryIds.includes(category.id);
      })
    }
  },
});
</script>

<style scoped>
.preview {
  @apply flex flex-col w-full gap-2 p-2 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
