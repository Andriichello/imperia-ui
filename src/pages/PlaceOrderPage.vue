<template>
  <div class="order-page w-full">
    <Preloader :title="$t('preview.restaurant.loading')" class="p-2"
               v-if="loadingRestaurant || isLoadingRestaurants"/>

    <Preloader :title="$t('preview.order.loading')" class="p-2"
               v-if="orderId && (loadingOrder || isLoadingOrder)"/>

    <div class="flex flex-col justify-center items start gap-3 w-full min-w-xl max-w-xl">
      <Banquet class="w-full"/>

<!--      <div class="w-full flex justify-center items-center">-->
<!--        <button class="w-full btn btn-md btn-primary">-->
<!--          {{ $t('banquet.store') }}-->
<!--        </button>-->
<!--      </div>-->

      <OrderSwitcher class="w-full z-10"
                     :show-arrow="false"/>

      <Preloader :title="$t('preview.order.loading_products')" class="p-2"
                 v-if="orderId && (loadingProducts || isLoadingOrderedProducts)"/>

      <List :fields="nonEmptyFields" class="w-full" v-if="nonEmptyFields.length"/>

      <div class="w-full flex justify-center items-center" v-if="nonEmptyFields.length">
        <button class="w-full btn btn-md btn-primary">
          {{ $t('preview.order.store') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import List from "@/components/order/list/List.vue";
import {mapActions, mapGetters} from "vuex";
import OrderSwitcher from "@/components/order/OrderSwitcher.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";
import Banquet from "@/components/order/Banquet.vue";

export default defineComponent({
  name: "PreviewMenuPage",
  components: {
    Banquet,
    Preloader,
    OrderSwitcher,
    List,
  },
  data() {
    return {
      loadingOrder: false,
      loadingProducts: false,
      loadingRestaurant: false,
    }
  },
  computed: {
    ...mapGetters({
      order: 'order/order',
      fields: 'order/products',
      orderId: 'order/orderId',
      showOrderResponse: 'order/getShowOrderResponse',
      isLoadingOrder: 'order/isLoadingOrder',
      orderedProductsResponse: 'order/getOrderedProductsResponse',
      isLoadingOrderedProducts: 'order/isLoadingOrderedProducts',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
      isLoadingRestaurants: 'restaurants/isLoadingRestaurants',
      showRestaurantResponse: 'restaurants/getShowResponse',
    }),
    nonEmptyFields() {
      return this.fields.filter((f) => {
        return f.amount;
      });
    }
  },
  watch: {
    showOrderResponse: {
      handler() {
        this.loadingOrder = false;
      },
    },
    orderedProductsResponse: {
      handler() {
        this.loadingProducts = false;
      },
    },
    showRestaurantResponse: {
      handler() {
        this.loadingRestaurant = false;
      },
    },
    order(newOrder) {
      if (!newOrder) {
        return;
      }

      this.loadProductsForOrderIfMissing({order: this.order});
    },
  },
  methods: {
    ...mapActions({
      selectRestaurant: 'restaurants/setSelected',
      loadAndSelectRestaurant: 'restaurants/loadAndSelectRestaurant',
      loadOrderForBanquet: 'order/loadOrderForBanquet',
      loadOrderForBanquetIfMissing: 'order/loadOrderForBanquetIfMissing',
      loadProductsForOrderIfMissing: 'order/loadProductsForOrderIfMissing',
    }),
  },
  mounted() {
    const banquetId = this.$route.params['banquetId'];

    if (banquetId) {
      this.loadOrderForBanquetIfMissing({banquetId});
    }

    if (this.order) {
      this.loadProductsForOrderIfMissing({order: this.order});
    }

    const restaurantId = +this.$route.params['restaurantId'];
    if (restaurantId < 0) {
      return;
    }

    if (!this.restaurant || (this.restaurant && this.restaurant.id !== restaurantId)) {
      const target = (this.restaurants ?? []).find(r => r.id === restaurantId);

      if (target) {
        this.selectRestaurant(target);
      } else {
        this.loadingRestaurant = true;
        this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }
  }

});
</script>

<style scoped>
.order-page {
  @apply flex flex-col w-full gap-3 px-2 pt-4 pb-10;

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
