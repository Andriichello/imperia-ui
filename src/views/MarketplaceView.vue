<template>
  <div class="marketplace">
    <OrderBasket class="marketplace-basket"/>

    <div class="marketplace-content"> 
      <MenuSwitcher :menus="menus" :selected="selectedMenu" @switch-menu="onSwitchMenu" class="menu-switcher"/>
      <CategorySwitcher :categories="categories" :selected="selectedCategory" @switch-category="onSwitchCategory" class="category-switcher"/>
      <ContentList type="items" :items="items" class="content-list"/> 
      <ContentListMore :count="itemsCount" :total="itemsTotal" :loading="loadingMore" v-if="items" @load-more="onLoadMoreItems"/>  
    </div>     
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MenuSwitcher from "@/components/marketplace/menu/MenuSwitcher.vue";
import CategorySwitcher from "@/components/marketplace/category/CategorySwitcher.vue";
import OrderBasket from "@/components/marketplace/order/OrderBasket.vue";
import ContentList from "@/components/marketplace/list/ContentList.vue";
import ContentListMore from "@/components/marketplace/list/ContentListMore.vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "MarketplaceView",
  components: {
    MenuSwitcher, 
    CategorySwitcher,
    OrderBasket,
    ContentList,
    ContentListMore,
  },
  data() {
    return {
      loadingMore: false,
    };
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
      async handler(newValue, oldValue) {
        console.log('items: ', newValue, oldValue);
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
      'selectCategory': 'marketplace/selectCategory',
      'applySearch': 'marketplace/applySearch',
    }),
    onLoadMoreItems() {
      this.loadingMore = true;
      this.loadMoreItems({ resource: this.tab });
    },
    onSwitchMenu(menu) {
      this.selectMenu({ menu, resource: this.tab });
    },
    onSwitchCategory(category) {
      this.selectCategory({ category, resource: this.tab });
    },
  },
});
</script>

<style scoped>
.marketplace {  
  display: block;
  flex-grow: 1;

  max-width: 100%;
  min-width: 260px;
}

.marketplace-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
  
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 40px;
}

.marketplace-basket { 
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  min-width: 100%;
  flex-basis: 100%;
  
  margin-left: auto;
  margin-right: auto;
}

.menu-switcher {
  flex-basis: 90%;

  margin-left: auto;
  margin-right: auto;
}

.category-switcher {
  flex-basis: 90%;

  margin-left: auto;
  margin-right: auto;
}

.content-list {
  flex-basis: 90%;

  margin-left: auto;
  margin-right: auto;
}
</style>
