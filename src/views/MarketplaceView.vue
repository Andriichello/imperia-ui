<template>
  <div class="marketplace">
    <OrderBasket class="marketplace-basket"/>

    <div class="marketplace-content"> 
      <MenuSwitcher :menus="menus" :selected="selectedMenu" @switch-menu="onSwitchMenu" class="menu-switcher"/>
      <CategorySwitcher :categories="categories" :selected="selectedCategory" @switch-category="onSwitchCategory" class="category-switcher"/>
      <ContentList type="items" :items="items" class="content-list"/>
   
    </div>     
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MenuSwitcher from "@/components/marketplace/menu/MenuSwitcher.vue";
import CategorySwitcher from "@/components/marketplace/category/CategorySwitcher.vue";
import OrderBasket from "@/components/marketplace/order/OrderBasket.vue";
import ContentList from "@/components/marketplace/list/ContentList.vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "MarketplaceView",
  components: {
    MenuSwitcher, 
    CategorySwitcher,
    OrderBasket,
    ContentList,
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
  methods: {
    ...mapActions({
      'loadMenus': 'marketplace/loadMenus',
      'loadCategories': 'marketplace/loadCategories',
      'loadItems': 'marketplace/loadItems',
      'selectMenu': 'marketplace/selectMenu',
      'selectCategory': 'marketplace/selectCategory',
      'applySearch': 'marketplace/applySearch',
    }),
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
  min-width: 320px;
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
