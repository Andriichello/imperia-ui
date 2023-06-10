<template>
  <div class="preview-page">
    <PreviewMenu :menu="menu"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewMenu from "@/components/preview/PreviewMenu.vue";
import {mapGetters} from "vuex";

export default defineComponent({
  name: "MenuPreview",
  components: {
    PreviewMenu,
  },
  computed: {
    ...mapGetters({
      scrolled: 'nav/scrolled',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
      menu: 'preview/menu',
      category: 'preview/category',
      categories: 'preview/categories',
      menus: 'preview/menus',
      menusResponse: 'preview/menusResponse',
      products: 'preview/products',
      productsResponse: 'preview/productsResponse',
      productsMoreResponse: 'preview/productsMoreResponse',
    }),
  },
});
</script>

<style scoped>
.preview-page {
  @apply flex flex-col w-full p-3 gap-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
