<template>
  <div class="order-page">
    <template v-if="isDeliveryPage || (isPlacePage && tab === 'products')">
      <Preloader :title="$t('preview.menu.loading')" class="p-2"
                 v-if="!isLoadingRestaurants && isLoadingMenus"/>

      <PreviewMenu class="pb-4"
                   :only="addedOnly ? addedProductIds : null"
                   v-if="menu"/>
    </template>

    <template v-if="isPlacePage && tab === 'spaces'">
      <Preloader :title="$t('preview.menu.loading_spaces')" class="p-2"
                 v-if="!isLoadingRestaurants && (isLoadingSpaceCategories || isLoadingSpaces)"/>

      <template v-else-if="spaces && spaces.length">
        <PreviewSpaces class="pb-4"/>
      </template>

      <template v-else>
        <span class="p-10 text-xl">{{ $t("preview.menu.unfortunately_list_is_empty") }}</span>
      </template>
    </template>

    <template v-if="isPlacePage && tab === 'services'">
      <Preloader :title="$t('preview.menu.loading_services')" class="p-2"
                 v-if="!isLoadingRestaurants && (isLoadingServiceCategories || isLoadingServices)"/>

      <template v-else-if="services && services.length">
        <PreviewServices class="pb-4"/>
      </template>

      <template v-else>
        <span class="p-10 text-xl">{{ $t("preview.menu.unfortunately_list_is_empty") }}</span>
      </template>
    </template>

    <template v-if="isPlacePage">
      <div class="w-full fixed bottom-0 left-0 p-2 pt-1 bg-base-100/10 backdrop-blur-sm">
        <OrderSwitcher class="w-full max-w-4xl"
                       :show-arrow="true"
                       :loading-banquet="isLoadingBanquet"
                       @switch-to-order="onSwitchToOrder"/>
      </div>
    </template>

    <template v-if="isDeliveryPage">
      <div class="w-full fixed bottom-0 left-0 p-2 pt-1 bg-base-100/10 backdrop-blur-sm z-[2]">
        <DeliveryOrderSwitcher class="w-full max-w-4xl"
                       :show-arrow="true"
                       @switch-to-delivery="onSwitchToDelivery"/>
      </div>
    </template>

  </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewMenu from "@/components/preview/PreviewMenu.vue";
import {mapActions, mapGetters} from "vuex";
import Preloader from "@/components/preview/loading/Preloader.vue";
import OrderSwitcher from "@/components/order/OrderSwitcher.vue";
import PreviewSpaces from "@/components/preview/PreviewSpaces.vue";
import PreviewServices from "@/components/preview/PreviewServices.vue";
import DeliveryOrderSwitcher from "@/components/delivery/DeliveryOrderSwitcher.vue";

export default defineComponent({
  name: "PlaceMenuPage",
  components: {
    DeliveryOrderSwitcher,
    PreviewServices,
    PreviewSpaces,
    OrderSwitcher,
    Preloader,
    PreviewMenu,
  },
  watch: {
    tab: {
      handler(newTab, oldTab) {
        if (newTab === 'spaces') {
          this.loadSpaceCategoriesIfMissing();
          this.loadSpacesIfMissing();
        }
        if (newTab === 'services') {
          this.loadServiceCategoriesIfMissing();
          this.loadServicesIfMissing();
        }
      },
    },
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
      tab: 'preview/tab',
      menu: 'preview/selected',
      addedOnly: 'preview/addedOnly',
      spaces: 'preview/spaces',
      services: 'preview/services',
      spaceCategories: 'preview/spaceCategories',
      serviceCategories: 'preview/serviceCategories',
      order: 'order/order',
      delivery: 'delivery/selected',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/resources',
      showRestaurantResponse: 'restaurants/show',
      isLoadingSpaces: "preview/isLoadingSpaces",
      isLoadingSpaceCategories: "preview/isLoadingSpaceCategories",
      isLoadingServices: "preview/isLoadingServices",
      isLoadingServiceCategories: "preview/isLoadingServiceCategories",
      isLoadingMenus: "preview/isLoadingMenus",
      isLoadingRestaurants: "restaurants/isLoadingIndex",
      isLoadingBanquet: "basket/isLoadingShowResponse",
      isLoadingDelivery: "delivery/isLoadingShow",
      banquetId: 'order/banquetId',
      orderProductFields: 'order/products',
      deliveryProductFields: 'delivery/productFields',
    }),
    isPlacePage() {
      return !this.isDeliveryPage;
    },
    isDeliveryPage() {
      const name = this.$route.name ?? '';

      return name === 'place-pre-delivery-menu'
          || name === 'place-delivery-menu'
          || name === 'place-delivery-order';
    },
    addedProductIds() {
      const fields = this.isDeliveryPage
          ? this.$store.getters['delivery/productFields']
          : this.$store.getters['order/products'];

      return fields?.map(f => f?.productId);
    },
  },
  methods: {
    ...mapActions({
      selectTab: "preview/selectTab",
      selectMenu: "preview/selectMenu",
      loadSpacesIfMissing: "preview/loadSpacesIfMissing",
      loadSpaceCategoriesIfMissing: "preview/loadSpaceCategoriesIfMissing",
      loadServicesIfMissing: "preview/loadServicesIfMissing",
      loadServiceCategoriesIfMissing: "preview/loadServiceCategoriesIfMissing",
      loadAndSelectMenu: "preview/loadAndSelectMenu",
      loadMenusAndSelect: "preview/loadMenusAndSelect",
      loadMenusAndSelectFirst: "preview/loadMenusAndSelectFirst",
      loadMenusIfMissing: "preview/loadMenusIfMissing",
      selectRestaurant: "restaurants/setSelected",
      loadAndSelectRestaurant: "restaurants/loadAndSelectResource",
      loadBanquetIfMissing: "basket/loadBanquetIfMissing",
      loadOrderForBanquetIfMissing: "order/loadOrderForBanquetIfMissing",
      loadSpacesForOrder: "order/loadSpacesForOrder",
      loadSpacesForOrderIfMissing: "order/loadSpacesForOrderIfMissing",
      loadProductsForOrder: "order/loadProductsForOrder",
      loadProductsForOrderIfMissing: "order/loadProductsForOrderIfMissing",
      loadServicesForOrder: "order/loadServicesForOrder",
      loadServicesForOrderIfMissing: "order/loadServicesForOrderIfMissing",
      loadDeliveryIfMissing: "delivery/loadAndSelectResourceIfMissing",
    }),
    onSwitchToOrder() {
      const restaurantId = +this.$route.params['restaurantId'];

      if (this.banquetId) {
        this.$router.push(`/place/${restaurantId}/order/${this.banquetId}`);
      } else {
        this.$router.push(`/place/${restaurantId}/order`);
      }
      window.scrollTo(0, 0);
    },
    onSwitchToDelivery() {
      const restaurantId = +this.$route.params['restaurantId'];
      const deliveryId = +this.$route.params['deliveryId'];

      let path = `/place/${restaurantId}/delivery`;

      if (deliveryId) {
        path += `/${deliveryId}`;
      }

      this.$router.push(path);
      window.scrollTo(0, 0);
    },
  },
  async mounted() {
    const restaurantId = +this.$route.params['restaurantId'];
    if (restaurantId < 1) {
      this.$router.replace(`/place`);
      return;
    }

    if (!this.restaurant || (this.restaurant && this.restaurant.id !== restaurantId)) {
      const target = (this.restaurants ?? []).find(r => r.id === restaurantId);

      if (target) {
        await this.selectRestaurant(target);
      } else {
        await this.loadAndSelectRestaurant({ id: restaurantId, params: { include: 'schedules' } });
      }
    }

    const menuId = +this.$route.params['menuId'];
    const deliveryId = +this.$route.params['deliveryId'];
    const banquetId = +this.$route.params['banquetId'];

    if (menuId < 1) {
      let path = `/place/${restaurantId}`;

      if (this.isDeliveryPage) {
        path += '/delivery';
      }

      if (deliveryId) {
        path += `/${deliveryId}`;
      } else if (banquetId) {
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

    if (this.isDeliveryPage) {
      if (deliveryId) {
        this.loadDeliveryIfMissing({id: deliveryId, params: { include: 'comments,products,products.comments' }});
      }
    } else if (banquetId) {
      this.loadBanquetIfMissing({id: banquetId});
      this.loadOrderForBanquetIfMissing({banquetId});

      if (this.order) {
        this.loadBanquetIfMissing({id: this.order.banquetId});
        this.loadSpacesForOrderIfMissing({order: this.order});
        this.loadServicesForOrderIfMissing({order: this.order});
        this.loadProductsForOrderIfMissing({order: this.order});
      }
    }
  },
});
</script>

<style scoped>
.order-page {
  @apply flex flex-col w-full gap-3 pb-[200px];

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
