<template>
  <div class="order-page w-full">
    <Preloader :title="$t('preview.restaurant.loading')" class="p-2"
               v-if="isLoadingRestaurant || isLoadingRestaurants"/>

    <Preloader :title="$t('preview.order.loading')" class="p-2"
               v-if="orderId && (isLoadingOrder || isLoadingOrder)"/>

    <div class="flex flex-col justify-center items-start gap-3 w-full min-w-xl max-w-xl">
      <Preloader :title="$t('banquet.loading')" class="p-2"
                 v-if="orderId && (isLoadingBanquet)"/>

      <Banquet class="w-full"
               :banquet="banquetForm"
               @title-update="onBanquetTitleUpdate"
               @date-click="onDateClick"
               @time-click="onTimeClick"
               @customer-click="onCustomerClick"/>

      <div class="w-full flex justify-center items-center"
           v-if="isBanquetChanged && validateBanquetForm()">
        <button class="w-full btn btn-md btn-primary" @click="onStoreBanquet">
          {{ $t('banquet.store') }}
          <span class="loading loading-spinner" v-if="isCreatingBanquet || isUpdatingBanquet"></span>
        </button>
      </div>

      <OrderSwitcher class="w-full z-10"
                     :show-arrow="false"/>

      <Preloader :title="$t('preview.order.loading_products')" class="p-2"
                 v-if="orderId && (isLoadingProducts || isLoadingOrderedProducts)"/>

      <List :fields="nonEmptyFields" class="w-full" v-if="nonEmptyFields.length"/>

      <div class="w-full flex justify-center items-center"
           v-if="isOrderChanged && validateOrderForm()">
        <button class="w-full btn btn-md btn-primary" @click="onStoreOrder">
          {{ $t('preview.order.store') }}
          <span class="loading loading-spinner" v-if="isCreatingOrder || isUpdatingOrder"></span>
        </button>
      </div>
    </div>

    <div class="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-neutral/80 backdrop-blur-sm z-50"
         v-if="modal">

      <div class="grow w-full min-h-[8px]" @click="modal = null"></div>

      <div class="w-full flex justify-center items-center">
        <div class="grow h-full min-w-[8px]" @click="modal = null"></div>

        <div class="w-full max-w-md flex flex-col justify-center items-center card bg-base-100 p-2 gap-1"
          v-if="modal === 'date'">
          <Calendar :selected-date="banquetForm?.date"
                    @on-select="onSelectDate"
                    @on-cancel="modal = null"/>
        </div>

        <div class="min-w-[220px] max-w-xl flex flex-col justify-center items-center card bg-base-100 p-2 gap-1"
             v-if="modal === 'time'">
          <TimePicker v-if="modal === 'time'"
                      class="w-[220px]"
                      :start-at="banquetForm?.startAt"
                      :end-at="banquetForm?.endAt"
                      @on-select="onSelectTime"
                      @on-cancel="modal = null"/>
        </div>

        <div class="flex flex-col justify-center items-center card bg-base-100 p-2 gap-1"
          v-if="modal === 'customer'">
          <CustomerPicker v-if="modal === 'customer'"
                          :style="{'width': maxModalWidth + 'px', 'height': maxModalHeight + 'px'}"
                          :selected="banquetForm?.customer"
                          :search="customerFilters?.search"
                          @on-select="onSelectCustomer"
                          @on-cancel="modal = null"/>
        </div>


        <div class="grow h-full min-w-[8px]" @click="modal = null"></div>
      </div>

      <div class="grow w-full min-h-[8px]" @click="modal = null"></div>
    </div>

  </div>
</template>

<script>
import {defineComponent} from "vue";
import List from "@/components/order/list/List.vue";
import {mapActions, mapGetters} from "vuex";
import OrderSwitcher from "@/components/order/OrderSwitcher.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";
import Banquet from "@/components/order/banquet/Banquet.vue";
import Calendar from "@/components/order/date/Calendar.vue";
import TimePicker from "@/components/order/time/TimePicker.vue";
import {
  instanceOfStoreBanquetResponse,
  instanceOfUpdateBanquetResponse
} from "@/openapi";
import CustomerPicker from "@/components/order/customer/CustomerPicker.vue";

export default defineComponent({
  name: "PreviewOrderPage",
  components: {
    CustomerPicker,
    TimePicker,
    Calendar,
    Banquet,
    Preloader,
    OrderSwitcher,
    List,
  },
  data() {
    let maxModalWidth = Math.min(window.innerWidth / 4 * 3, 600);

    if (window.innerWidth < 700) {
      maxModalWidth = window.innerWidth - 32;
    }

    let maxModalHeight = Math.min(window.innerHeight / 3 * 2, 800);

    if (window.innerHeight < 700) {
      maxModalHeight = window.innerHeight - 32;
    }

    return {
      modal: null,
      maxModalWidth,
      maxModalHeight,
      isLoadingProducts: false,
      isLoadingRestaurant: false,
      isLoadingBanquet: false,
      isCreatingBanquet: false,
      isUpdatingBanquet: false,
      isLoadingOrder: false,
      isCreatingOrder: false,
      isUpdatingOrder: false,
    };
  },
  computed: {
    ...mapGetters({
      banquet: 'basket/banquet',
      banquetForm: 'basket/form',
      isBanquetChanged: 'basket/hasRealChanges',
      showBanquetResponse: 'basket/getShowResponse',
      createBanquetResponse: 'basket/getCreateResponse',
      updateBanquetResponse: 'basket/getUpdateResponse',
      order: 'order/order',
      orderForm: 'order/form',
      isOrderChanged: 'order/hasRealChanges',
      fields: 'order/products',
      orderId: 'order/orderId',
      showOrderResponse: 'order/getShowOrderResponse',
      updateOrderResponse: 'order/getUpdateOrderResponse',
      isLoadingOrder: 'order/isLoadingOrder',
      orderedProductsResponse: 'order/getOrderedProductsResponse',
      isLoadingOrderedProducts: 'order/isLoadingOrderedProducts',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
      isLoadingRestaurants: 'restaurants/isLoadingRestaurants',
      showRestaurantResponse: 'restaurants/getShowResponse',
      customerFilters: 'customers/filters',
    }),
    nonEmptyFields() {
      return this.fields.filter((f) => {
        return f.amount;
      });
    }
  },
  watch: {
    showBanquetResponse() {
      this.isLoadingBanquet = false;
    },
    createBanquetResponse(newValue) {
      this.isCreatingBanquet = false;

      if (instanceOfStoreBanquetResponse(newValue)) {
        const id = newValue.data.id;

        const fields = this.orderForm && !this.orderForm?.id
          ? this.orderForm?.products : null;

        console.log({form: this.orderForm, fields: fields})

        this.setOrder({order: newValue.data?.order, fields});
        this.loadBanquet({ id });

        const path = this.$route.path;
        this.$router.replace(`${path}/${id}`);
      }
    },
    updateBanquetResponse(newValue) {
      this.isUpdatingBanquet = false;

      if (instanceOfUpdateBanquetResponse(newValue)) {
        const id = newValue.data.id;
        this.loadBanquet({ id });
      }
    },
    showOrderResponse: {
      handler() {
        this.isLoadingOrder = false;
      },
    },
    updateOrderResponse: {
      handler() {
        this.isUpdatingOrder = false;
      },
    },
    orderedProductsResponse: {
      handler() {
        this.isLoadingProducts = false;
      },
    },
    showRestaurantResponse: {
      handler() {
        this.isLoadingRestaurant = false;
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
      loadBanquet: 'basket/loadBanquet',
      loadBanquetIfMissing: 'basket/loadBanquetIfMissing',
      createBanquet: 'basket/createBanquet',
      updateBanquet: 'basket/updateBanquet',
      loadOrderForBanquet: 'order/loadOrderForBanquet',
      loadOrderForBanquetIfMissing: 'order/loadOrderForBanquetIfMissing',
      loadProductsForOrderIfMissing: 'order/loadProductsForOrderIfMissing',
      setOrder: 'order/setOrder',
      createOrder: 'order/createOrder',
      updateOrder: 'order/updateOrder',
      setTitle: 'basket/setTitle',
      setDate: 'basket/setDate',
      setStartAt: 'basket/setStartAt',
      setEndAt: 'basket/setEndAt',
      setCustomer: 'basket/setCustomer',
    }),
    onResize() {
      let maxModalWidth = Math.min(window.innerWidth / 4 * 3, 600);

      if (window.innerWidth < 700) {
        maxModalWidth = window.innerWidth - 32;
      }

      let maxModalHeight = Math.min(window.innerHeight / 4 * 3, 800);

      if (window.innerHeight < 700) {
        maxModalHeight = window.innerHeight - 32;
      }

      this.maxModalWidth = maxModalWidth;
      this.maxModalHeight = maxModalHeight;
    },
    onDateClick() {
      this.modal = 'date';
    },
    onTimeClick() {
      this.modal = 'time';
    },
    onCustomerClick() {
      this.modal = 'customer';
    },
    onBanquetTitleUpdate({title}) {
      this.setTitle(title);
    },
    onSelectDate({date}) {
      this.setDate(date);

      this.modal = null;
    },
    onSelectTime({start, end}) {
      const date = this.date instanceof Date
          ? this.date : new Date(Date.now());

      const startAt = new Date(date.getTime());
      startAt.setUTCHours(start.hour);
      startAt.setUTCMinutes(start.minute);
      this.setStartAt(startAt);

      const endAt = new Date(date.getTime());
      endAt.setUTCHours(end.hour);
      endAt.setUTCMinutes(end.minute);
      this.setEndAt(endAt);

      this.modal = null;
    },
    onSelectCustomer({customer}) {
      this.setCustomer(customer);

      this.modal = null;
    },
    validateBanquetForm() {
      return this.banquetForm?.title
          && this.banquetForm?.state
          && this.banquetForm?.customer
          && this.banquetForm?.date
          && this.banquetForm?.startAt
          && this.banquetForm?.endAt;
    },
    onStoreBanquet() {
      const banquetId = +this.$route.params['banquetId'];

      if (banquetId) {
        this.isUpdatingBanquet = true;
        this.updateBanquet({ id: banquetId, request: this.banquetForm.asUpdate() });
      } else {
        this.isCreatingBanquet = true;
        this.createBanquet(this.banquetForm.asCreate());
      }
    },
    validateOrderForm() {
      return this.orderForm?.banquetId
          && this.orderForm?.products
          && this.orderForm?.products?.length;
    },
    onStoreOrder() {
      if (this.orderId) {
        this.isUpdatingOrder = true;
        this.updateOrder({ id: this.orderId, request: this.orderForm.asUpdate() });
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    const banquetId = this.$route.params['banquetId'];

    if (banquetId) {
      this.loadBanquetIfMissing({id: banquetId})
      this.loadOrderForBanquetIfMissing({banquetId });
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
        this.isLoadingRestaurant = true;
        this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
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
