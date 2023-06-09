<template>
  <div class="preview">
    <RestaurantPicker v-if="restaurants && !restaurant"
      :items="restaurants"
      @restaurant-select="onRestaurantSelect"/>

    <MenuSwitcher class="max-w-full"
                  :menus="menus" :selected="selectedMenu"
                  @switch-menu="onSwitchMenu"/>

    <CategorySwitcher class="max-w-full" v-if="!(!items || !items.length && !selectedCategory)"
                      :categories="categories" :selected="selectedCategory"
                      @switch-category="onSwitchCategory"/>

    <List :items="items"/>
    <ListMore v-if="itemsTotal !== null"
        :count="itemsCount" :total="itemsTotal"
        :loading="loadingMore"
        @load-more="onLoadMoreItems"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import CategorySwitcher from "@/components/marketplace/category/CategorySwitcher.vue";
import MenuSwitcher from "@/components/marketplace/menu/MenuSwitcher.vue";
import List from "@/components/preview/list/List.vue";
import ListMore from "@/components/preview/list/ListMore.vue";
import RestaurantPicker from "@/components/preview/restaurant/RestaurantPicker.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Preview",
  components: {
    MenuSwitcher,
    CategorySwitcher,
    List,
    ListMore,
    RestaurantPicker,
  },
  data() {
    return {
      loadingMore: false,
    };
  },
  computed: {
    resource() {
      return 'products';
    },
    ...mapGetters({
      scrolled: 'nav/scrolled',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
    }),
    menus() {
      return this.$store.getters['marketplace/menus'](this.resource);
    },
    items() {
      return this.$store.getters['marketplace/items'](this.resource);
    },
    itemsCount() {
      return this.items ? this.items.length : 0;
    },
    itemsTotal() {
      return this.$store.getters['marketplace/itemsTotal'](this.resource);
    },
    categories() {
      return this.$store.getters['marketplace/categories'](this.resource);
    },
    selectedMenu() {
      return this.$store.getters['marketplace/menu'](this.resource);
    },
    selectedCategory() {
      return this.$store.getters['marketplace/category'](this.resource);
    },
  },
  watch: {
    items: {
      async handler() {
        this.loadingMore = false;
      }
    },
    scrolled: {
      async handler(newVal) {
        if (!newVal || this.loadingMore) {
          return;
        }

        if (this.itemsCount < this.itemsTotal) {
          this.onLoadMoreItems()
        }
      }
    },
    restaurant: {
      async handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.clearFilters();

          this.loadMenus({ resource: this.resource });
          this.loadCategories({ resource: this.resource });
          this.loadItems({ resource: this.resource });
        }

        const id = this.$route.params.id;

        if (newVal && id != newVal.id) {
          this.$router.replace(`/preview/${newVal.id}`);
        }
      }
    }
  },
  methods: {
    ...mapActions({
      clearFilters: 'marketplace/clearFilters',
      loadMenus: 'marketplace/loadMenus',
      loadItems: 'marketplace/loadItems',
      loadMoreItems: 'marketplace/loadMoreItems',
      loadCategories: 'marketplace/loadCategories',
      selectMenu: 'marketplace/selectMenu',
      selectCategory: 'marketplace/selectCategory',
      selectRestaurant: 'restaurants/setSelected',
      loadAndSelectRestaurant: 'restaurants/loadAndSelectRestaurant',
    }),
    onSwitchMenu(menu) {
      this.selectMenu({ menu, resource: this.resource });
    },
    onSwitchCategory(category) {
      this.selectCategory({ category, resource: this.resource });
    },
    onRestaurantSelect({restaurant}) {
      this.selectRestaurant(restaurant);
    },
    onLoadMoreItems() {
      this.loadingMore = true;
      this.loadMoreItems({ resource: this.resource });
    },
  },
  mounted() {
    const id = this.$route.params.id;

    if (id && (!this.restaurant || this.restaurant.id != id)) {
      this.loadAndSelectRestaurant({ id });
    }

    if (!id && this.restaurant) {
      this.$router.replace(`/preview/${this.restaurant.id}`);
    }
  },
});
</script>

<style scoped>
.preview {
  @apply flex flex-col w-full gap-2 max-w-xl pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
