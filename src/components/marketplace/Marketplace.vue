<template>
  <div class="marketplace">
    <TabSwitcher :tab="tab" class="w-full"/>

    <MenuSwitcher :menus="menus" :selected="selectedMenu" @switch-menu="onSwitchMenu" class="w-full"/>
    <CategorySwitcher :categories="categories" :selected="selectedCategory" @switch-category="onSwitchCategory" class="w-full"/>
    <ContentList type="items" :items="items" class="w-full"/>
    <ContentListMore :count="itemsCount" :total="itemsTotal" :loading="loadingMore" v-if="items" @load-more="onLoadMoreItems" class="w-full"/>  
    
    <BasketSwitcher class="basket-switcher"/>  
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import TabSwitcher from "@/components/marketplace/tab/TabSwitcher.vue";
import MenuSwitcher from "@/components/marketplace/menu/MenuSwitcher.vue";
import CategorySwitcher from "@/components/marketplace/category/CategorySwitcher.vue";
import ContentList from "@/components/marketplace/list/ContentList.vue";
import ContentListMore from "@/components/marketplace/list/ContentListMore.vue";
import BasketSwitcher from "@/components/marketplace/basket/BasketSwitcher.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Marketplace",
  components: {
    TabSwitcher,
    MenuSwitcher, 
    CategorySwitcher,
    ContentList,
    ContentListMore,
    BasketSwitcher,
  },
  data() {
    return {
      loadingMore: false,
    };
  },
  mounted() {
    if (this.tab === undefined || this.tab === null) {
      this.selectTab('products');
    }
  },
  computed: {
    ...mapGetters({
      'tab': 'marketplace/tab',
    }),
    menus() {
      return this.$store.getters['marketplace/menus'](this.tab);
    },
    categories() {
      return this.$store.getters['marketplace/categories'](this.tab);
    },
    items() {
      return this.$store.getters['marketplace/items'](this.tab);
    },
    itemsCount() {
      return this.items ? this.items.length : 0;
    },
    itemsTotal() {
      return this.$store.getters['marketplace/itemsTotal'](this.tab);
    },
    selectedMenu() {
      return this.$store.getters['marketplace/menu'](this.tab);
    },
    selectedCategory() {
      return this.$store.getters['marketplace/category'](this.tab);
    },
    appliedSearch() {
      return this.$store.getters['marketplace/search'](this.tab);
    },
  },
  watch: {
    items: {
      async handler() {
        this.loadingMore = false;
      }
    },
  },
  methods: {
    ...mapActions({
      'loadMenus': 'marketplace/loadMenus',
      'loadCategories': 'marketplace/loadCategories',
      'loadItems': 'marketplace/loadItems',
      'loadMoreItems': 'marketplace/loadMoreItems',
      'selectMenu': 'marketplace/selectMenu',
      'selectTab': 'marketplace/selectTab',
      'selectCategory': 'marketplace/selectCategory',
      'applySearch': 'marketplace/applySearch',
    }),
    onLoadMoreItems() {
      this.loadingMore = true;
      this.loadMoreItems({ resource: this.tab });
    },
    onSwitchMenu(menu) {
      this.selectMenu({ selected: menu, resource: this.tab });
    },
    onSwitchCategory(category) {
      this.selectCategory({ category, resource: this.tab });
    },
  },
});
</script>


<style scoped>
.marketplace {
  @apply gap-1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
}

.basket-switcher {
  @apply fixed right-3 bottom-3 overflow-hidden;
}
</style>