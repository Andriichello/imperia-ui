<template>
  <div class="order-page w-full">
    <Preloader :title="$t('preview.restaurant.loading')" class="p-2"
               v-if="isLoadingRestaurant || isLoadingRestaurants"/>

    <Preloader :title="$t('preview.order.loading')" class="p-2"
               v-if="orderId && (isLoadingOrder)"/>

    <div class="flex flex-col justify-center items-start gap-3 w-full min-w-xl max-w-xl">
      <Preloader :title="$t('banquet.loading')" class="p-2"
                 v-if="orderId && (isLoadingBanquet)"/>

      <Banquet class="w-full"
               :banquet="banquetForm"
               :errors="banquetErrors"
               @title-update="onBanquetTitleUpdate"
               @date-click="onDateClick"
               @time-click="onTimeClick"
               @customer-click="onCustomerClick"
               @state-click="onStateClick"
               @bill-click="onBillClick"/>


      <details tabindex="0" class="collapse collapse-arrow border border-base-content">
        <summary class="collapse-title text-lg font-medium">
          {{ $t('banquet.more_details') }}
        </summary>
        <div class="collapse-content">
          <BanquetAdditional class="w-full"
                             :banquet="banquetForm"
                             :errors="banquetErrors"
                             @advance-amount-update="onBanquetAdvanceAmountUpdate"
                             @advance-amount-payment-method-update="onBanquetAdvanceAmountPaymentMethodUpdate"
                             @is-birthday-club-update="onBanquetIsBirthdayClubUpdate"
                             @with-photographer-update="onBanquetWithPhotographerUpdate"
                             @actual-total-update="onBanquetActualTotalUpdate"
                             @adults-amount-update="onBanquetAdultsAmountUpdate"
                             @adult-ticket-price-update="onBanquetAdultTicketPriceUpdate"
                             @children-amount-update="onBanquetChildrenAmountUpdate"
                             @child-ticket-price-update="onBanquetChildTicketPriceUpdate"/>
        </div>
      </details>

      <div class="w-full max-w-xl flex justify-center items-center"
           v-for="errorsGroup in (Object.keys(createBanquetErrors?.errors ?? {}))"
           :key="errorsGroup">
        <span class="label-text-alt text-error text-sm"
              v-for="error in createBanquetErrors.errors[errorsGroup]"
              :key="error">
          {{ error }}
        </span>
      </div>

      <div class="w-full max-w-xl flex justify-center items-center"
           v-for="errorsGroup in (Object.keys(updateBanquetErrors?.errors ?? {}))"
           :key="errorsGroup">
        <span class="label-text-alt text-error text-sm"
              v-for="error in updateBanquetErrors.errors[errorsGroup]"
              :key="error">
          {{ error }}
        </span>
      </div>

      <div class="w-full max-w-xl flex justify-center items-center" v-if="banquetSavedSuccessfully !== null && !isBanquetChanged">
        <span class="label-text-alt text-success text-lg" v-if="banquetSavedSuccessfully === true">
          {{ $t('banquet.was_successfully_saved') }}
        </span>
        <span class="label-text-alt text-error text-lg" v-else>
          {{ $t('banquet.an_error_occurred_while_saving') }}
        </span>
      </div>

      <div class="w-full max-w-xl flex justify-center items-center"
           v-if="isBanquetChanged && !Object.keys(banquetErrors).length">
        <button class="w-full btn btn-md btn-primary"
                :disabled="isCreatingBanquet || isUpdatingBanquet"
                @click="onStoreBanquet">
          {{ +this.$route.params['banquetId'] ? $t('banquet.store') : $t('banquet.create') }}
          <span class="loading loading-spinner" v-if="isCreatingBanquet || isUpdatingBanquet"></span>
        </button>
      </div>

      <OrderSwitcher class="w-full z-10"
                     @click="onOrderSwitcherClick"
                     :loading-banquet="isLoadingBanquet"
                     :loading-order="isLoadingOrder"
                     :show-arrow="false"/>

      <div class="w-full flex justify-center items-center">
        <button class="w-full btn btn-sm btn-ghost max-w-xl"
                @click="onCreateComment">
          + {{ $t('banquet.create_comment') }}
        </button>
      </div>

      <CommentList :comments="comments" class="w-full px-2" v-if="comments.length"
        @on-update="onUpdateComment"/>

      <Preloader :title="$t('preview.order.loading_products')" class="p-2"
                 v-if="orderId && (isLoadingProducts || isLoadingOrderedProducts)"/>

      <List :fields="nonEmptyFields" class="w-full" v-if="nonEmptyFields.length"/>

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

      <div class="w-full max-w-xl flex justify-center items-center" v-if="orderSavedSuccessfully !== null && !isOrderChanged">
        <span class="label-text-alt text-success text-lg" v-if="orderSavedSuccessfully === true">
          {{ $t('preview.order.was_successfully_saved') }}
        </span>
        <span class="label-text-alt text-error text-lg" v-else>
          {{ $t('preview.order.an_error_occurred_while_saving') }}
        </span>
      </div>

      <div class="w-full flex justify-center items-center"
           v-if="isOrderChanged && banquetId">
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

        <div class="flex flex-col justify-center items-center card bg-base-100 p-2 gap-1"
             v-if="modal === 'state'">
          <StatePicker v-if="modal === 'state'"
                          :states="banquet?.availableStates"
                          :selected="banquetForm?.state"
                          @on-select="onSelectState"
                          @on-cancel="modal = null"/>
        </div>

        <div class="flex flex-col justify-center items-center card bg-base-100 p-2 gap-1"
             v-if="modal === 'bill'">
          <BillPicker v-if="modal === 'bill'"
                      :style="{'height': Math.min(380 + (menus ?? []).length * 40, maxModalHeight) + 'px'}"
                      :menus="menus ?? []"
                      :tags="tags ?? []"
                      @on-select="onSelectBill"
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
import StatePicker from "@/components/order/state/StatePicker.vue";
import {
  instanceOfStoreBanquetResponse,
  instanceOfUpdateBanquetResponse, instanceOfUpdateOrderResponse
} from "@/openapi";
import CustomerPicker from "@/components/order/customer/CustomerPicker.vue";
import {ResponseErrors} from "@/helpers";
import CommentList from "@/components/order/comment/CommentList.vue";
import BillPicker from "@/components/order/bill/BillPicker.vue";
import BanquetAdditional from "@/components/order/banquet/BanquetAdditional.vue";

export default defineComponent({
  name: "PlaceOrderPage",
  components: {
    BanquetAdditional,
    BillPicker,
    CommentList,
    CustomerPicker,
    TimePicker,
    StatePicker,
    Calendar,
    Banquet,
    Preloader,
    OrderSwitcher,
    List,
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
      isLoadingBanquet: false,
      isCreatingBanquet: false,
      isUpdatingBanquet: false,
      isLoadingOrder: false,
      isCreatingOrder: false,
      isUpdatingOrder: false,
      wasStoreClicked: false,
      banquetErrors: {},
      createBanquetErrors: {},
      updateBanquetErrors: {},
      banquetSavedSuccessfully: null,
      orderErrors: {},
      createOrderErrors: {},
      updateOrderErrors: {},
      orderSavedSuccessfully: null
    };
  },
  computed: {
    ...mapGetters({
      tags: 'preview/tags',
      menus: 'preview/menus',
      banquet: 'basket/banquet',
      banquetId: 'order/banquetId',
      banquetForm: 'basket/form',
      isBanquetChanged: 'basket/hasRealChanges',
      showBanquetResponse: 'basket/getShowResponse',
      createBanquetResponse: 'basket/getCreateResponse',
      updateBanquetResponse: 'basket/getUpdateResponse',
      order: 'order/order',
      orderForm: 'order/form',
      comments: 'order/comments',
      isOrderChanged: 'order/hasRealChanges',
      fields: 'order/products',
      orderId: 'order/orderId',
      showOrderResponse: 'order/getShowOrderResponse',
      updateOrderResponse: 'order/getUpdateOrderResponse',
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
    banquet(newValue) {
      if (!newValue) {
        this.wasStoreClicked = false;
      }

      this.createBanquetErrors = {};
      this.updateBanquetErrors = {};
    },
    order(newOrder) {
      if (!newOrder) {
        return;
      }

      this.createOrderErrors = {};
      this.updateOrderErrors = {};

      this.loadProductsForOrderIfMissing({order: this.order});
    },
    showBanquetResponse() {
      this.isLoadingBanquet = false;
    },
    async createBanquetResponse(newValue) {
      this.isCreatingBanquet = false;
      this.createBanquetErrors = newValue
          ? await ResponseErrors.from(newValue) : {};

      if (instanceOfStoreBanquetResponse(newValue)) {
        const id = newValue.data.id;

        const fields = this.orderForm && !this.orderForm?.id
          ? this.orderForm?.products : null;

        this.setOrder({order: newValue.data?.order, fields});
        this.loadBanquet({ id });

        this.banquetSavedSuccessfully = true;

        const path = this.$route.path;
        this.$router.replace(`${path}/${id}`);
      } else {
        this.banquetSavedSuccessfully = false;
      }
    },
    async updateBanquetResponse(newValue) {
      this.isUpdatingBanquet = false;
      this.updateBanquetErrors = newValue
          ? await ResponseErrors.from(newValue) : {};

      if (instanceOfUpdateBanquetResponse(newValue)) {
        this.banquetSavedSuccessfully = true;

        const id = newValue.data.id;
        this.loadBanquet({ id });
      } else {
        this.banquetSavedSuccessfully = false;
      }
    },
    showOrderResponse: {
      handler() {
        this.isLoadingOrder = false;
      },
    },
    async updateOrderResponse(newValue) {
      console.log(newValue);

      this.isUpdatingOrder = false;
      this.updateOrderErrors = newValue
          ? await ResponseErrors.from(newValue) : {};

      if (instanceOfUpdateOrderResponse(newValue)) {
        this.orderSavedSuccessfully = true;
      } else {
        this.orderSavedSuccessfully = false;
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
      addComment: 'order/addComment',
      updateComment: 'order/updateComment',
      setTitle: 'basket/setTitle',
      setAdvanceAmount: 'basket/setAdvanceAmount',
      setAdvanceAmountPaymentMethod: 'basket/setAdvanceAmountPaymentMethod',
      setIsBirthdayClub: 'basket/setIsBirthdayClub',
      setWithPhotographer: 'basket/setWithPhotographer',
      setActualTotal: 'basket/setActualTotal',
      setAdultsAmount: 'basket/setAdultsAmount',
      setAdultTicketPrice: 'basket/setAdultTicketPrice',
      setChildrenAmount: 'basket/setChildrenAmount',
      setChildTicketPrice: 'basket/setChildTicketPrice',
      setDate: 'basket/setDate',
      setStartAt: 'basket/setStartAt',
      setEndAt: 'basket/setEndAt',
      setCustomer: 'basket/setCustomer',
      setState: 'basket/setState',
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
      const banquetId = this.$route.params['banquetId'];
      const restaurantId = this.$route.params['restaurantId'];

      let path = `/place/${restaurantId}`;

      if (banquetId) {
        path += `/order/${banquetId}`;
      }

      path += `/menu`;

      if (menuId) {
        path += `/${menuId}`;
      }

      this.$router.push(path);
    },
    onBanquetTitleUpdate({title}) {
      this.setTitle(title);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onBanquetAdvanceAmountUpdate({advanceAmount}) {
      this.setAdvanceAmount(advanceAmount);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onBanquetAdvanceAmountPaymentMethodUpdate({advanceAmountPaymentMethod}) {
      this.setAdvanceAmountPaymentMethod(advanceAmountPaymentMethod);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onBanquetIsBirthdayClubUpdate({isBirthdayClub}) {
      this.setIsBirthdayClub(isBirthdayClub);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onBanquetWithPhotographerUpdate({withPhotographer}) {
      this.setWithPhotographer(withPhotographer);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onBanquetActualTotalUpdate({actualTotal}) {
      this.setActualTotal(actualTotal);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onBanquetAdultsAmountUpdate({adultsAmount}) {
      this.setAdultsAmount(adultsAmount);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onBanquetAdultTicketPriceUpdate({adultTicketPrice}) {
      this.setAdultTicketPrice(adultTicketPrice);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onBanquetChildrenAmountUpdate({childrenAmount}) {
      this.setChildrenAmount(childrenAmount);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onBanquetChildTicketPriceUpdate({childTicketPrice}) {
      this.setChildTicketPrice(childTicketPrice);

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onSelectDate({date}) {
      this.setDate(date);

      this.modal = null;

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onSelectTime({start, end}) {
      const date = this.banquetForm?.date instanceof Date
          ? this.banquetForm?.date : new Date(Date.now());

      const startAt = new Date(date.getTime());
      startAt.setUTCHours(start.hour);
      startAt.setUTCMinutes(start.minute);
      this.setStartAt(startAt);

      const endAt = new Date(date.getTime());
      endAt.setUTCHours(end.hour);
      endAt.setUTCMinutes(end.minute);

      if (start.hour > end.hour) {
        endAt.setDate(endAt.getDate() + 1);
      } else if (start.hour === end.hour && start.minute > end.minute) {
        endAt.setDate(endAt.getDate() + 1);
      }

      this.setEndAt(endAt);

      this.modal = null;

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onSelectCustomer({customer}) {
      this.setCustomer(customer);

      this.modal = null;

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onSelectState({state}) {
      this.setState(state);

      this.modal = null;

      if (this.wasStoreClicked) {
        this.validateBanquetForm();
      }
    },
    onSelectBill({tags, menus, sections}) {
      this.modal = null;

      let url = this.banquet?.invoiceUrl;

      if (!url) {
        return;
      }

      if (tags) {
        url += '&tags=' + tags.join(',')
      }
      if (menus) {
        url += '&menus=' + menus.join(',');
      }
      if (sections) {
        url += '&sections=' + sections.join(',')
      }

      window.open(url, '_blank').focus();
    },
    validateBanquetForm() {
      const errors = {};

      const title = this.banquetForm?.title;
      if (!title) {
        // errors.title = [this.$t('banquet.errors.required.title')];
      } else if (title.trim().length < 2) {
        errors.title = [this.$t('banquet.errors.min.title')];
      }

      const customer = this.banquetForm?.customer;
      if (!customer) {
        errors.customer = [this.$t('banquet.errors.required.customer')];
      }

      const date = this.banquetForm?.date;
      if (!date) {
        errors.date = [this.$t('banquet.errors.required.date')];
      }

      const startAt = this.banquetForm?.startAt;
      if (!startAt) {
        errors.startAt = [this.$t('banquet.errors.required.time')];
      }

      const endAt = this.banquetForm?.startAt;
      if (!endAt) {
        errors.endAt = [this.$t('banquet.errors.required.time')];
      }

      this.banquetErrors = errors;

      return !Object.keys(errors).length
          && this.banquetForm?.state
          && this.banquetForm?.customer
          && this.banquetForm?.date
          && this.banquetForm?.startAt
          && this.banquetForm?.endAt;
    },
    onStoreBanquet() {
      this.wasStoreClicked = true;
      if (!this.validateBanquetForm() !== false) {
        return;
      }

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
      const productErrors = [];
      const errors = {};

      if (this.orderForm?.products?.length) {
        this.orderForm.products.forEach((field) => {
          if (field?.serveAt) {
            const serveAt = field?.serveAt.trim()

            if (serveAt.length > 0) {
              const isValidMinute = /^.*:[0-5]?[0-9]?\s*$/.test(serveAt);
              const isSingleDigitHour = /^[0-9]:?.*$/.test(serveAt);
              const isDoubleDigitHour = /^[0-1][0-9]:?.*$/.test(serveAt) || /^[2][0-3]:?.*$/.test(serveAt);

              const isValid = isValidMinute && (isSingleDigitHour || isDoubleDigitHour);

              if (!isValid) {
                productErrors.push(this.$t('preview.order.errors.serve_at.invalid', {time: serveAt}))
              }
            }
          }
        });

        if (productErrors.length) {
          errors.products = productErrors;
        }
      }

      this.orderErrors = errors;
      console.log('order errors: ', errors)

      return !Object.keys(errors).length
          && this.orderForm?.banquetId
          && this.orderForm?.products
          && (this.orderForm?.products?.length || this.orderForm?.comments?.length);
    },
    onStoreOrder() {
      if (!this.validateOrderForm() !== false) {
        return;
      }

      if (this.orderId) {
        this.isUpdatingOrder = true;
        this.updateOrder({ id: this.orderId, request: this.orderForm.asUpdate() });
      }
    },
    onCreateComment() {
      if (this.comments?.length > 0 && !this.comments[0]?.text?.length) {
        return;
      }

      this.addComment({text: null});
    },
    onUpdateComment({comment, index}) {
      this.updateComment({comment, index});
    },
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("resize", this.onResize);
    const banquetId = +this.$route.params['banquetId'];

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
