<template>
  <div class="order-page w-full">
    <Preloader :title="$t('preview.restaurant.loading')" class="p-2"
               v-if="isLoadingRestaurant || isLoadingRestaurants"/>

    <div class="flex flex-col justify-center items-start gap-3 w-full min-w-xl max-w-xl">
      <DeliveryOrderSwitcher class="w-full z-10"
                     @click="onOrderSwitcherClick"
                     :loading-order="isLoadingOrder"
                     :show-arrow="false"
                     :show-tabs="['products']"/>

      <Preloader :title="$t('preview.order.loading')" class="p-2"
                 v-if="orderId && (isLoadingOrder)"/>

      <div class="w-full flex justify-center items-center">
        <button class="w-full btn btn-md btn-primary"
                :class="{'btn-disabled': !isOrderChanged}"
                @click="onStoreOrder">
          {{ $t('preview.order.store') }}
          <span class="loading loading-spinner" v-if="isCreatingOrder || isUpdatingOrder"></span>
        </button>
      </div>

      <div class="w-full max-w-xl flex justify-center items-center" v-if="isOrderSavedSuccessfully !== null && !isOrderChanged">
        <span class="label-text-alt text-lg" v-if="isOrderSavedSuccessfully === true">
          {{ $t('preview.order.was_successfully_saved') }}
        </span>
        <span class="label-text-alt text-error text-lg" v-else>
          {{ $t('preview.order.an_error_occurred_while_saving') }}
        </span>
      </div>

      <CommentList :comments="comments" class="w-full px-2" v-if="comments.length"
                   :min-rows="1"
                   @on-update="onUpdateComment"
                   @on-delete="onDeleteComment"/>

      <div class="w-full flex justify-center items-center">
        <button class="w-full btn btn-sm btn-ghost max-w-xl"
                @click="onCreateComment">
          + {{ $t('banquet.create_comment') }}
        </button>
      </div>

      <template v-if="true">

        <template v-if="nonEmptyProductFields.length">
          <Preloader :title="$t('preview.order.loading_products')" class="p-2"
                     v-if="orderId && (isLoadingProducts || isLoadingOrderedProducts)"/>

          <List class="w-full" v-if="nonEmptyProductFields.length"
                :type="'products'"
                :fields="nonEmptyProductFields"
                :show-descriptions="false"
                :show-serve-ats="false"
                :show-actions-on-side="true"
                :show-compactly="true"/>
        </template>

        <template v-else>
          <div class="w-full flex justify-center items-center p-5 text-xl">
            <span>{{ $t("preview.order.empty") }}</span>
          </div>
        </template>

      </template>

      <div class="w-full max-w-xl flex justify-center items-center"
           v-for="errorsGroup in (Object.keys(createOrderErrors?.errors ?? {}))"
           :key="errorsGroup">
        <span class="label-text-alt text-error text-sm"
              v-for="error in createOrderErrors.errors[errorsGroup]"
              :key="error">
          {{ error }}
        </span>
      </div>

      <div class="w-full max-w-xl flex justify-center items-center"
           v-for="errorsGroup in (Object.keys(updateOrderErrors?.errors ?? {}))"
           :key="errorsGroup">
        <span class="label-text-alt text-error text-sm"
              v-for="error in updateOrderErrors.errors[errorsGroup]"
              :key="error">
          {{ error }}
        </span>
      </div>

      <div class="w-full max-w-xl flex justify-center items-center"
           v-for="errorsGroup in (Object.keys(orderErrors ?? {}))"
           :key="errorsGroup">
        <span class="label-text-alt text-error text-sm"
              v-for="error in orderErrors[errorsGroup]"
              :key="error">
          {{ error }}
        </span>
      </div>

      <div class="w-full max-w-xl flex justify-center items-center" v-if="isOrderSavedSuccessfully !== null && !isOrderChanged">
        <span class="label-text-alt text-lg" v-if="isOrderSavedSuccessfully === true">
          {{ $t('preview.order.was_successfully_saved') }}
        </span>
        <span class="label-text-alt text-error text-lg" v-else>
          {{ $t('preview.order.an_error_occurred_while_saving') }}
        </span>
      </div>

      <div class="w-full flex justify-center items-center"
           v-if="isOrderChanged">
        <button class="w-full btn btn-md btn-primary" @click="onStoreOrder">
          {{ $t('preview.order.store') }}
          <span class="loading loading-spinner" v-if="isCreatingOrder || isUpdatingOrder"></span>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import Preloader from "@/components/preview/loading/Preloader.vue";
import {instanceOfUpdateOrderResponse} from "@/openapi";
import {ResponseErrors} from "@/helpers";
import CommentList from "@/components/order/comment/CommentList.vue";
import List from "@/components/order/list/List.vue";
import DeliveryOrderSwitcher from "@/components/delivery/DeliveryOrderSwitcher.vue";

export default defineComponent({
  name: "PlaceDeliveryOrderPage",
  components: {
    DeliveryOrderSwitcher,
    List,
    CommentList,
    Preloader,
  },
  data() {
    let maxModalWidth = Math.min(window.innerWidth / 4 * 3, 600);

    if (window.innerWidth < 800) {
      maxModalWidth = window.innerWidth - 32;
    }

    let maxModalHeight = Math.min(window.innerHeight / 3 * 2, 800);

    if (window.innerHeight < 800) {
      maxModalHeight = window.innerHeight - 32;
    }

    return {
      modal: null,
      maxModalWidth,
      maxModalHeight,
      isLoadingProducts: false,
      isLoadingRestaurant: false,
      wasStoreClicked: false,
      orderErrors: {},
      createOrderErrors: {},
      updateOrderErrors: {},
    };
  },
  computed: {
    ...mapGetters({
      tags: 'preview/tags',
      menus: 'preview/menus',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/resources',
      isLoadingRestaurants: 'restaurants/isLoadingIndex',
      showRestaurantResponse: 'restaurants/show',
      order: 'delivery/resource',
      orderForm: 'delivery/form',
      showOrderResponse: 'delivery/show',
      updateOrderResponse: 'delivery/update',
      orderedProductsResponse: 'delivery/orderedProductsResponse',
      isLoadingOrder: 'delivery/isLoadingShow',
      isCreatingOrder: 'delivery/isLoadingStore',
      isUpdatingOrder: 'delivery/isLoadingUpdate',
      isLoadingOrderedProducts: 'delivery/isLoadingOrderedProducts',
      isOrderSavedSuccessfully: 'delivery/isSavedSuccessfully',
    }),
    orderId() {
      return this.order?.id;
    },
    isOrderChanged() {
      return !!this.orderForm?.hasChanges();
    },
    comments() {
      return this.orderForm?.comments ?? [];
    },
    productFields() {
      return this.orderForm?.productFields ?? [];
    },
    nonEmptyProductFields() {
      return this.productFields.filter((f) => {
        return f.amount;
      });
    },
  },
  watch: {
    order(newOrder) {
      if (!newOrder) {
        return;
      }

      this.createOrderErrors = {};
      this.updateOrderErrors = {};

      this.loadProductsForOrderIfMissing({order: this.order});
    },
    async updateOrderResponse(newValue) {
      this.isUpdatingOrder = false;
      this.updateOrderErrors = newValue
          ? await ResponseErrors.from(newValue) : {};

      if (instanceOfUpdateOrderResponse(newValue)) {
        this.setIsOrderSavedSuccessfully(true);
      } else {
        this.setIsOrderSavedSuccessfully(false);
      }
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
  },
  methods: {
    ...mapActions({
      loadMenusIfMissing: 'preview/loadMenusIfMissing',
      loadTagsIfMissing: 'preview/loadTagsIfMissing',
      selectRestaurant: 'restaurants/setSelected',
      loadAndSelectRestaurant: 'restaurants/loadAndSelectResource',
      loadOrder: 'delivery/loadResource',
      loadOrderIfMissing: 'delivery/loadAndSelectResourceIfMissing',
      loadProductsForOrderIfMissing: 'delivery/loadProductsForOrderIfMissing',
      createOrder: 'delivery/storeResource',
      updateOrder: 'delivery/updateResource',
      addComment: 'delivery/addComment',
      updateComment: 'delivery/updateComment',
      deleteComment: 'delivery/deleteComment',
      setIsOrderSavedSuccessfully: 'delivery/setIsSavedSuccessfully',
    }),
    onKeyDown(e) {
      if (this.modal && e.key === 'Escape') {
        this.modal = null;
      }
    },
    onResize() {
      let maxModalWidth = Math.min(window.innerWidth / 4 * 3, 600);

      if (window.innerWidth < 800) {
        maxModalWidth = window.innerWidth - 32;
      }

      let maxModalHeight = Math.min(window.innerHeight / 4 * 3, 800);

      if (window.innerHeight < 800) {
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
    onStateClick() {
      this.modal = 'state';
    },
    onBillClick({banquet, url}) {
      this.modal = 'bill';

      this.loadMenusIfMissing();
      this.loadTagsIfMissing();
    },
    onOrderSwitcherClick() {
      const menuId = this.$store.getters['preview/menu']?.id;
      const orderId = this.$route.params['orderId'];
      const restaurantId = this.$route.params['restaurantId'];

      let path = `/place/${restaurantId}`;

      if (orderId) {
        path += `/delivery/order/${orderId}`;
      }

      path += `/menu`;

      if (menuId) {
        path += `/${menuId}`;
      }

      this.$router.push(path);
    },
    validateOrderForm() {
      const errors = {};

      this.orderErrors = errors;

      return !Object.keys(errors).length
          && this.orderForm?.id
          && this.orderForm?.productFields
          && (this.orderForm?.productFields?.length || this.orderForm?.comments?.length);
    },
    onStoreOrder() {
      if (!this.validateOrderForm() !== false) {
        return;
      }

      if (this.orderId) {
        this.isUpdatingOrder = true;

        const request = this.orderForm.asUpdate();

        this.updateOrder({ id: this.orderId, request: this.orderForm.asUpdate() });
      }
    },
    onCreateComment() {
      if (this.comments?.length > 0 && !this.comments[this.comments?.length - 1]?.text?.length) {
        return;
      }

      this.addComment({text: null});
    },
    onUpdateComment({comment, index}) {
      this.updateComment({comment, index});
    },
    onDeleteComment({comment, index}) {
      this.deleteComment({comment, index});
    },
  },
  mounted() {
    this.setIsOrderSavedSuccessfully(null);

    document.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("resize", this.onResize);
    const orderId = +this.$route.params['orderId'];

    if (orderId) {
      this.loadOrderIfMissing({id: orderId, params: {include: 'products'}});
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
        this.loadAndSelectRestaurant({ id: restaurantId, params: { include: 'schedules' } });
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
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
