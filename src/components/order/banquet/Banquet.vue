<template>
  <div class="banquet">
    <div class="flex justify-between items-center w-full gap-2">
      <div class="form-control w-full">
        <input class="input input-sm input-ghost w-full text-xl font-semibold px-1"
               :class="{ 'input-error' : titleErrors !== null }"
               name="title" type="text" required v-model="title"
               :placeholder="$t('banquet.title') + '...'"/>
          <label class="label flex-col items-start" v-if="titleErrors">
            <span class="label-text-alt text-error text-sm" v-for="error in titleErrors" :key="error">
              {{ error }}
            </span>
          </label>
      </div>

      <button class="flex justify-center start-center btn btn-sm btn-ghost btn-square"
        @click="onOpenBill" v-if="banquet?.invoiceUrl">
        <BaseIcon width="24" height="24" color="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 8C1.25 6.48122 2.48122 5.25 4 5.25H20C21.5188 5.25 22.75 6.48122 22.75 8V16C22.75 17.5188 21.5188 18.75 20 18.75H18C17.5858 18.75 17.25 18.4142 17.25 18C17.25 17.5858 17.5858 17.25 18 17.25H20C20.6904 17.25 21.25 16.6904 21.25 16V8C21.25 7.30964 20.6904 6.75 20 6.75H4C3.30964 6.75 2.75 7.30964 2.75 8V16C2.75 16.6904 3.30964 17.25 4 17.25H6C6.41421 17.25 6.75 17.5858 6.75 18C6.75 18.4142 6.41421 18.75 6 18.75H4C2.48122 18.75 1.25 17.5188 1.25 16V8Z"/>
          <path d="M20 9.5C20 10.3284 19.3284 11 18.5 11C17.6716 11 17 10.3284 17 9.5C17 8.67157 17.6716 8 18.5 8C19.3284 8 20 8.67157 20 9.5Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 2C5.25 1.58579 5.58579 1.25 6 1.25H18C18.4142 1.25 18.75 1.58579 18.75 2V6C18.75 6.41421 18.4142 6.75 18 6.75H6C5.58579 6.75 5.25 6.41421 5.25 6V2ZM6.75 2.75V5.25H17.25V2.75H6.75Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 14C5.25 13.5858 5.58579 13.25 6 13.25H18C18.4142 13.25 18.75 13.5858 18.75 14V22C18.75 22.4142 18.4142 22.75 18 22.75H6C5.58579 22.75 5.25 22.4142 5.25 22V14ZM6.75 14.75V21.25H17.25V14.75H6.75Z"/>
        </BaseIcon>
      </button>

<!--      <div class="dropdown dropdown-end">-->
<!--        <label tabindex="0">-->
<!--          <button class="flex justify-center start-center btn btn-sm btn-ghost btn-square">-->
<!--            <BaseIcon width="28" height="28" color="currentColor">-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.334 2C19.723 2 22 4.378 22 7.916V16.084C22 19.622 19.723 22 16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2H16.334ZM16.334 3.5H7.665C5.135 3.5 3.5 5.233 3.5 7.916V16.084C3.5 18.767 5.135 20.5 7.665 20.5H16.333C18.864 20.5 20.5 18.767 20.5 16.084V7.916C20.5 5.233 18.864 3.5 16.334 3.5ZM15.9482 11.0137C16.5012 11.0137 16.9482 11.4607 16.9482 12.0137C16.9482 12.5667 16.5012 13.0137 15.9482 13.0137C15.3952 13.0137 14.9432 12.5667 14.9432 12.0137C14.9432 11.4607 15.3862 11.0137 15.9382 11.0137H15.9482ZM11.9385 11.0137C12.4915 11.0137 12.9385 11.4607 12.9385 12.0137C12.9385 12.5667 12.4915 13.0137 11.9385 13.0137C11.3855 13.0137 10.9345 12.5667 10.9345 12.0137C10.9345 11.4607 11.3765 11.0137 11.9295 11.0137H11.9385ZM7.9297 11.0137C8.4827 11.0137 8.9297 11.4607 8.9297 12.0137C8.9297 12.5667 8.4827 13.0137 7.9297 13.0137C7.3767 13.0137 6.9247 12.5667 6.9247 12.0137C6.9247 11.4607 7.3677 11.0137 7.9207 11.0137H7.9297Z"/>-->
<!--            </BaseIcon>-->
<!--          </button>-->
<!--        </label>-->
<!--        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52">-->
<!--          <li @click="onOpenBill">-->
<!--            <span :class="{'hover:bg-base-100/25': theme !== ThemeConfig.dark(), 'hover:text-base-100': theme !== ThemeConfig.dark()}">-->
<!--              {{ $t('banquet.more.bill') }}-->
<!--            </span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
    </div>

<!--    <div class="form-control w-full">-->
<!--      <input class="input input-sm input-ghost w-full text-md px-1"-->
<!--             name="title" type="text" required-->
<!--             :placeholder="$t('banquet.description') + '...'"/>-->
<!--      &lt;!&ndash;      <label class="label flex-col items-start" v-if="emailErrors">&ndash;&gt;-->
<!--      &lt;!&ndash;              <span class="label-text-alt text-error text-sm" v-for="error in emailErrors" :key="error">&ndash;&gt;-->
<!--      &lt;!&ndash;                {{ error }}&ndash;&gt;-->
<!--      &lt;!&ndash;              </span>&ndash;&gt;-->
<!--      &lt;!&ndash;      </label>&ndash;&gt;-->
<!--    </div>-->

    <div class="flex flex-wrap justify-start items-start w-full gap-1 mt-2">
      <div class="flex flex-col justify-start items-start gap-1 grow">
        <Date class="cursor-pointer w-full"
              :date="banquet?.date"
              :errors="dateErrors"
              @click="onDateClick"/>

        <Time class="cursor-pointer w-full"
              :start-at="banquet?.startAt" :end-at="banquet?.endAt"
              :errors="timeErrors"
              @click="onTimeClick"/>
      </div>

      <div class="flex flex-col justify-start items-start gap-1">
<!--        <State class="cursor-pointer w-full"-->
<!--               :state="banquet?.state"/>-->
        <Customer class="cursor-pointer w-full"
                  :customer="banquet?.customer"
                  :errors="customerErrors"
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
  emits: ["date-click", "time-click", "customer-click", "title-update"],
  components: {
    BaseIcon,
    Time,
    Date,
    Customer,
    // State
  },
  props: {
    banquet: {
      type: Object,
      default: null
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ThemeConfig() {
      return ThemeConfig
    },
    ...mapGetters({
      theme: 'theme/get',
      pdfUrl: 'banquets/pdfUrl',
      pdfUrlResponse: 'banquets/getPdfUrlResponse',
    }),
    title: {
      get() {
        return this.banquet?.title;
      },
      set(value) {
        return this.$emit('title-update', {title: value});
      },
    },
    titleErrors() {
      return this.errors?.title ?? null;
    },
    dateErrors() {
      return this.errors?.date ?? null;
    },
    timeErrors() {
      const startErrors = this.errors?.startAt ?? null;
      const endErrors = this.errors?.startAt ?? null;

      const errors = [];

      if (startErrors && startErrors.length) {
        errors.push(...startErrors);
      }

      if (endErrors && endErrors.length) {
        errors.push(...endErrors);
      }

      return errors.length ? [...new Set(errors)] : null;
    },
    customerErrors() {
      return this.errors?.customer ?? null;
    },
  },
  methods: {
    ...mapActions({
      loadPdfUrl: "banquets/loadBanquetPdfUrl",
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
    onOpenBill() {
      // await this.loadPdfUrl({id: this.banquet?.id});

      if (this.banquet?.invoiceUrl) {
        window.open(this.banquet?.invoiceUrl, '_blank').focus();
      }
    },
  },
})
</script>

<style scoped>
  .banquet {
    @apply flex flex-col justify-center items-center card w-full bg-base-100 shadow-xl gap-1 p-3;
  }

  .selected {
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
