<template>
  <div class="banquet"
       :class="{'selected': mode === 'selection' && isSelected, 'cursor-pointer': mode === 'selection', 'p-3': mode !== 'selection' || !isSelected, 'p-2': mode === 'selection' && isSelected}">
    <div class="flex justify-between items-center w-full gap-2">
      <div class="form-control">
        <RouterLink :to="`/place/${banquet.restaurantId}/order/${banquet.id}`"
                    class="text-xl font-semibold px-1"
                    :class="{'disabled-clicks': mode === 'selection'}"
                    @click="onLinkClick">
          {{ banquet?.title && banquet?.title.trim().length ? banquet?.title : $t('banquet.banquet') }}
        </RouterLink>
      </div>

      <button class="flex justify-center start-center btn btn-sm btn-ghost btn-square"
              :disabled="mode === 'selection'"
              @click="onOpenBill" v-if="banquet?.invoiceUrl">
        <BaseIcon width="24" height="24" color="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 8C1.25 6.48122 2.48122 5.25 4 5.25H20C21.5188 5.25 22.75 6.48122 22.75 8V16C22.75 17.5188 21.5188 18.75 20 18.75H18C17.5858 18.75 17.25 18.4142 17.25 18C17.25 17.5858 17.5858 17.25 18 17.25H20C20.6904 17.25 21.25 16.6904 21.25 16V8C21.25 7.30964 20.6904 6.75 20 6.75H4C3.30964 6.75 2.75 7.30964 2.75 8V16C2.75 16.6904 3.30964 17.25 4 17.25H6C6.41421 17.25 6.75 17.5858 6.75 18C6.75 18.4142 6.41421 18.75 6 18.75H4C2.48122 18.75 1.25 17.5188 1.25 16V8Z"/>
          <path d="M20 9.5C20 10.3284 19.3284 11 18.5 11C17.6716 11 17 10.3284 17 9.5C17 8.67157 17.6716 8 18.5 8C19.3284 8 20 8.67157 20 9.5Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 2C5.25 1.58579 5.58579 1.25 6 1.25H18C18.4142 1.25 18.75 1.58579 18.75 2V6C18.75 6.41421 18.4142 6.75 18 6.75H6C5.58579 6.75 5.25 6.41421 5.25 6V2ZM6.75 2.75V5.25H17.25V2.75H6.75Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 14C5.25 13.5858 5.58579 13.25 6 13.25H18C18.4142 13.25 18.75 13.5858 18.75 14V22C18.75 22.4142 18.4142 22.75 18 22.75H6C5.58579 22.75 5.25 22.4142 5.25 22V14ZM6.75 14.75V21.25H17.25V14.75H6.75Z"/>
        </BaseIcon>
      </button>
    </div>

    <div class="flex flex-wrap justify-start items-center w-full gap-1 mt-2">
      <div class="flex flex-col justify-start items-start gap-1 grow">
        <Date class="w-full"
              :date="banquet?.startAt"
              @click="onDateClick"/>

        <Time class="w-full"
              :start-at="banquet?.startAt" :end-at="banquet?.endAt"
              @click="onTimeClick"/>
      </div>

      <div class="flex flex-col justify-start items-start gap-1">
        <State class="w-full"
               :state="banquet?.state"/>
        <Customer class="w-full cursor-auto"
                  :customer="banquet?.customer"
                  @click="onCustomerClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import State from "@/components/order/banquet/State.vue";
import Customer from "@/components/order/banquet/Customer.vue";
import Date from "@/components/order/banquet/Date.vue";
import Time from "@/components/order/banquet/Time.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {mapActions, mapGetters} from "vuex";
import {ThemeConfig} from "@/configs";

export default defineComponent({
  // eslint-disable-next-line
  name: 'Banquet',
  emits: ["date-click", "time-click", "customer-click", "open-bill"],
  components: {
    BaseIcon,
    Time,
    Date,
    Customer,
    State
  },
  props: {
    banquet: {
      type: Object,
      default: null
    },
  },
  computed: {
    ThemeConfig() {
      return ThemeConfig
    },
    ...mapGetters({
      mode: 'history/mode',
      selected: 'history/selected',
      theme: 'theme/get',
      pdfUrl: 'banquets/pdfUrl',
      pdfUrlResponse: 'banquets/getPdfUrlResponse',
    }),
    isSelected() {
      if (!this.selected || !this.selected.length) {
        return false;
      }

      return !!this.selected.find((b) => b.id === this.banquet.id);
    },
  },
  methods: {
    ...mapActions({
      loadPdfUrl: "banquets/loadBanquetPdfUrl",
      clearOrder: "order/clear",
      clearBanquet: "basket/clear",
    }),
    onDateClick() {
      this.$emit('date-click');
    },
    onTimeClick() {
      this.$emit('time-click');
    },
    onCustomerClick() {
      this.$emit('customer-click');
    },
    onLinkClick() {
      this.clearOrder();
      this.clearBanquet();
    },
    onOpenBill() {
      this.$emit('open-bill', {banquet: this.banquet});

      // await this.loadPdfUrl({id: this.banquet?.id});

      // if (this.banquet?.invoiceUrl) {
      //   window.open(this.banquet?.invoiceUrl, '_blank').focus();
      // }
    },
  },
})
</script>

<style scoped>
  .banquet {
    @apply flex flex-col justify-center items-center card w-full bg-base-100 shadow-xl gap-1;
  }

  .selected {
    border: 4px solid currentColor;
  }

  .selected:hover {
    border: 4px solid currentColor;
  }

  .disabled-clicks {
    pointer-events: none;
  }
</style>
