<template>
  <div class="order-page">
    <Preloader :title="$t('preview.restaurant.loading')" class="p-2"
               v-if="loadingRestaurant || isLoadingRestaurants"/>

    <Preloader :title="$t('preview.menu.loading')" class="p-2"
               v-if="!isLoadingRestaurants && isLoadingMenus"/>

    <PreviewMenu v-if="menu" :menu="menu" class="pb-4"/>

    <div class="w-full fixed bottom-0 left-0 p-2 pt-1 bg-base-100/10 backdrop-blur-sm">
      <OrderSwitcher class="w-full max-w-4xl" :show-arrow="true"
                     @switch-to-order="onSwitchToOrder"/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewMenu from "@/components/preview/PreviewMenu.vue";
import {mapActions, mapGetters} from "vuex";
import Preloader from "@/components/preview/loading/Preloader.vue";
import OrderSwitcher from "@/components/order/OrderSwitcher.vue";

export default defineComponent({
  name: "PlaceMenuPage",
  components: {
    OrderSwitcher,
    Preloader,
    PreviewMenu,
  },
  data() {
    return {
      loadingRestaurant: false,
    }
  },
  watch: {
    showRestaurantResponse: {
      handler() {
        this.loadingRestaurant = false;
      },
    },
    restaurant: {
      handler(newRestaurant, oldRestaurant) {
        // this.loadingRestaurant = false;

        if (newRestaurant === oldRestaurant) {
          return;
        }

        const menuId = +this.$route.params['menuId'];

        if (!this.menu || (this.menu && this.menu.id !== menuId)) {
          const target = (this.menus ?? []).find(r => r.id === menuId);

          if (target) {
            this.selectMenu(target);
          } else {
            this.loadMenusAndSelect({ id: menuId });
          }
        } else {
          this.loadMenusIfMissing();
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      menu: 'preview/selected',
      order: 'order/order',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
      showRestaurantResponse: 'restaurants/getShowResponse',
      isLoadingMenus: "preview/isLoadingMenus",
      isLoadingRestaurants: "restaurants/isLoadingRestaurants",
      productsCount: 'order/productsCount',
      banquetId: 'order/banquetId',
    }),
  },
  methods: {
    ...mapActions({
      selectMenu: "preview/selectMenu",
      loadAndSelectMenu: "preview/loadAndSelectMenu",
      loadMenusAndSelect: "preview/loadMenusAndSelect",
      loadMenusAndSelectFirst: "preview/loadMenusAndSelectFirst",
      loadMenusIfMissing: "preview/loadMenusIfMissing",
      selectRestaurant: "restaurants/setSelected",
      loadAndSelectRestaurant: "restaurants/loadAndSelectRestaurant",
      loadOrderForBanquetIfMissing: "order/loadOrderForBanquetIfMissing",
      loadProductsForOrder: "order/loadProductsForOrder",
      loadProductsForOrderIfMissing: "order/loadProductsForOrderIfMissing",
    }),
    onSwitchToOrder() {
      const restaurantId = +this.$route.params['restaurantId'];

      if (this.banquetId) {
        this.$router.replace(`/place/${restaurantId}/order/${this.banquetId}`);
      } else {
        this.$router.replace(`/place/${restaurantId}/order`);
      }
    },
  },
  async mounted() {
    const restaurantId = +this.$route.params['restaurantId'];
    if (restaurantId < 1) {
      this.$router.replace(`/place`);
      return;
    }

    const menuId = +this.$route.params['menuId'];
    const banquetId = +this.$route.params['banquetId'];

    if (menuId < 1) {

      let path = `/place/${restaurantId}`;

      if (banquetId) {
        path += `/order/${banquetId}`;
      }

      if (this.menu) {
        this.$router.replace(`${path}/menu/${this.menu.id}`);
      } else if (this.menus && this.menus.length > 0) {
        this.$router.replace(`${path}/menu/${this.menus[0].id}`);
      } else {
        await this.loadMenusAndSelectFirst();

        if (this.menu) {
          this.$router.replace(`${path}/menu/${this.menu.id}`);
        }
      }

      return;
    }

    if (this.restaurants && this.restaurant?.id === restaurantId) {
      if (!this.menu || (this.menu && this.menu.id !== menuId)) {
        const target = (this.menus ?? []).find(r => r.id === menuId);

        if (target) {
          this.selectMenu(target);
        } else {
          this.loadMenusAndSelect({ id: menuId });
        }
      } else {
        this.loadMenusIfMissing();
      }
    }

    if (!this.restaurant || (this.restaurant && this.restaurant.id !== restaurantId)) {
      const target = (this.restaurants ?? []).find(r => r.id === restaurantId);

      if (target) {
        await this.selectRestaurant(target);
      } else {
        this.loadingRestaurant = true;
        await this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }

    if (banquetId) {
      this.loadOrderForBanquetIfMissing({banquetId});
    }

    if (this.order) {
      this.loadProductsForOrderIfMissing({order: this.order});
    }
  },
});
</script>

<style scoped>
.order-page {
  @apply flex flex-col w-full gap-3 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}

.switcher {
  @apply flex flex-row items-center;

  flex-wrap: nowrap;

  flex: 0 1 auto;
  overflow-x: auto;

  margin-left: auto;
  margin-right: auto;
}

.blurred {
  --tw-border-opacity: 0;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.1;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>
