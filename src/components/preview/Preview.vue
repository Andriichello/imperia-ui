<template>
  <div class="preview select-none">
    <template v-if="restaurant">
      <Divider v-if="restaurant"
               class="opacity-50"
               title="Restaurant"/>

      <Restaurant :item="restaurant"/>

      <Divider v-if="menus"
               class="opacity-50 pb-3"
               title="Menus"/>

      <Menu class="w-full"
            v-for="m in menus" :key="m.id"
            :menu="m" @click="onMenuSelect(m)"/>
    </template>

    <template v-else-if="restaurants">
      <RestaurantPicker :items="restaurants"
          @restaurant-select="onRestaurantSelect"/>
    </template>

  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import RestaurantPicker from "@/components/preview/restaurant/RestaurantPicker.vue";
import Divider from "@/layouts/divider/Divider.vue";
import Restaurant from "@/components/preview/restaurant/Restaurant.vue";
import Menu from "@/components/preview/menu/Menu.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Preview",
  components: {
    Menu, Restaurant, Divider,
    RestaurantPicker,
  },
  data() {
    return {
      loadingMore: false,
    };
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
  watch: {
    products: {
      async handler() {
        this.loadingMore = false;
      }
    },
    restaurant: {
      async handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.loadMenusIfMissing();
        }

        const id = this.$route.params.restaurantId;

        if (newVal && id != newVal.id) {
          this.$router.replace(`/preview/${newVal.id}`);
        }
      }
    }
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
      selectRestaurant: 'restaurants/setSelected',
      loadMenus: 'preview/loadMenus',
      loadMenusIfMissing: 'preview/loadMenusIfMissing',
      loadAndSelectRestaurant: 'restaurants/loadAndSelectRestaurant',
    }),
    onMenuSelect(menu) {
      this.selectMenu(menu);
      this.$router.push(`/preview/${this.restaurant.id}/menu/${menu.id}`);
    },

    onRestaurantSelect({restaurant}) {
      this.selectRestaurant(restaurant);
    },
  },
  mounted() {
    const id = this.$route.params.restaurantId;

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
