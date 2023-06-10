<template>
  <div class="preview select-none">
    <template v-if="products && categories">
      <template v-for="c in categories" :key="c.id">
        <Divider :title="c.title"/>
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
    categories() {
      return this.menu ? this.menu.categories : [];
    },
    products() {
      return this.menu ? this.menu.products : [];
    },
  },
  methods: {
    filterByCategory(products, category) {
      return products.filter(p => {
        return p.categoryIds.includes(category.id);
      })
    }
  },
  mounted() {
    const restaurantId = this.$route.params.restaurantId;
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

.divider:before {
  width: 160px;
}

.divider:after {
  width: 160px;
}
</style>
