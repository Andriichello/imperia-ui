<template>
  <div class="order-page w-full">
    <div class="flex flex-col justify-center items start gap-3 w-full min-w-xl max-w-xl">
      <OrderSwitcher class="w-full" v-if="nonEmptyFields.length"/>
      <List :fields="nonEmptyFields" class="w-full"/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import List from "@/components/order/list/List.vue";
import {mapActions, mapGetters} from "vuex";
import OrderSwitcher from "@/components/order/OrderSwitcher.vue";

export default defineComponent({
  name: "PreviewMenuPage",
  components: {
    OrderSwitcher,
    List,
  },
  computed: {
    ...mapGetters({
      order: 'order/order',
      fields: 'order/products',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
    }),
    nonEmptyFields() {
      return this.fields.filter((f) => {
        return f.amount;
      })
    }
  },
  watch: {
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
