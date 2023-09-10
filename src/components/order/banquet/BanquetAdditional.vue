<template>
  <div class="banquet-additional">
    <div class="flex flex-wrap justify-start items-start w-full gap-2 mt-2">
      <div class="form-control grow basis-[140px]">
        <label class="label">
          <span class="label-text text-md font-semibold">{{ $t('banquet.advance_amount') }}</span>
        </label>
        <input class="input input-sm input-ghost text-lg font-semibold px-1 w-full"
               :class="{ 'input-error' : advanceAmountErrors !== null }"
               name="advanceAmount" type="number" min="0" v-model="advanceAmount"
               :placeholder="$t('banquet.advance_amount') + '...'"/>
        <label class="label flex-col items-start" v-if="advanceAmountErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in advanceAmountErrors" :key="error">
                {{ error }}
              </span>
        </label>
      </div>
      <div class="form-control grow basis-[140px]">
        <label class="label">
          <span class="label-text text-md font-semibold">{{ $t('banquet.actual_total') }}</span>
        </label>
        <input class="input input-sm input-ghost text-lg font-semibold px-1 w-full"
               :class="{ 'input-error' : actualTotalErrors !== null }"
               name="actualTotal" type="number" min="0" v-model="actualTotal"
               :placeholder="$t('banquet.actual_total') + '...'"/>
        <label class="label flex-col items-start" v-if="actualTotalErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in actualTotalErrors" :key="error">
                {{ error }}
              </span>
        </label>
      </div>
    </div>

    <div class="flex flex-wrap justify-start items-start w-full gap-1 mt-2">
      <div class="form-control grow basis-[140px]">
        <label class="label">
          <span class="label-text text-md font-semibold">{{ $t('banquet.advance_amount_payment_method') }}</span>
        </label>
        <label class="label cursor-pointer justify-start">
          <input type="radio" v-model="advanceAmountPaymentMethod"
                 name="advanceAmountPaymentMethod" value="card"
                 class="radio radio-xs radio-primary" />
          <span class="label-text text-start pl-2">{{ $t('banquet.payment_method.card') }}</span>
        </label>
        <label class="label cursor-pointer justify-start">
          <input type="radio" v-model="advanceAmountPaymentMethod"
                 name="advanceAmountPaymentMethod" value="cash"
                 class="radio radio-xs radio-primary" />
          <span class="label-text text-start pl-2">{{ $t('banquet.payment_method.cash') }}</span>
        </label>
      </div>

      <div class="form-control grow basis-[140px]">
        <label class="label">
          <span class="label-text text-md font-semibold">{{ $t('banquet.birthday_club') }}</span>
        </label>
        <label class="label cursor-pointer justify-start">
          <input type="checkbox" v-model="isBirthdayClub"
                 name="isBirthdayClub" :checked="false"
                 class="checkbox checkbox-xs checkbox-primary" />
          <span class="label-text text-start pl-2">{{ $t('banquet.birthday_club') }}</span>
        </label>
      </div>
    </div>

    <div class="flex flex-wrap justify-start items-start w-full gap-2 mt-2">
      <div class="form-control grow basis-[140px]">
        <label class="label">
          <span class="label-text text-md font-semibold">{{ $t('banquet.children_amount') }}</span>
        </label>
        <input class="input input-sm input-ghost text-lg font-semibold px-1 w-full"
               :class="{ 'input-error' : childrenAmountErrors !== null }"
               name="advanceAmount" type="number" min="0" v-model="childrenAmount"
               :placeholder="$t('banquet.children_amount') + '...'"/>
        <label class="label flex-col items-start" v-if="childrenAmountErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in childrenAmountErrors" :key="error">
                {{ error }}
              </span>
        </label>
      </div>
      <div class="form-control grow basis-[140px]">
        <label class="label">
          <span class="label-text text-md font-semibold">{{ $t('banquet.child_ticket_price') }}</span>
        </label>
        <input class="input input-sm input-ghost text-lg font-semibold px-1 w-full"
               :class="{ 'input-error' : childTicketPriceErrors !== null }"
               name="actualTotal" type="number" min="0" v-model="childTicketPrice"
               :placeholder="$t('banquet.child_ticket_price') + '...'"/>
        <label class="label flex-col items-start" v-if="childTicketPriceErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in childTicketPriceErrors" :key="error">
                {{ error }}
              </span>
        </label>
      </div>
    </div>

    <div class="flex flex-wrap justify-start items-start w-full gap-2 mt-2">
      <div class="form-control grow basis-[140px]">
        <label class="label">
          <span class="label-text text-md font-semibold">{{ $t('banquet.adults_amount') }}</span>
        </label>
        <input class="input input-sm input-ghost text-lg font-semibold px-1 w-full"
               :class="{ 'input-error' : adultsAmountErrors !== null }"
               name="advanceAmount" type="number" min="0" v-model="adultsAmount"
               :placeholder="$t('banquet.adults_amount') + '...'"/>
        <label class="label flex-col items-start" v-if="adultsAmountErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in adultsAmountErrors" :key="error">
                {{ error }}
              </span>
        </label>
      </div>
      <div class="form-control grow basis-[140px]">
        <label class="label">
          <span class="label-text text-md font-semibold">{{ $t('banquet.adult_ticket_price') }}</span>
        </label>
        <input class="input input-sm input-ghost text-lg font-semibold px-1 w-full"
               :class="{ 'input-error' : adultTicketPriceErrors !== null }"
               name="actualTotal" type="number" min="0" v-model="adultTicketPrice"
               :placeholder="$t('banquet.adult_ticket_price') + '...'"/>
        <label class="label flex-col items-start" v-if="adultTicketPriceErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in adultTicketPriceErrors" :key="error">
                {{ error }}
              </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line
  name: 'BanquetAdditional',
  emits: [
    "advance-amount-update",
    "advance-amount-payment-method-update",
    "actual-total-update",
    "is-birthday-club-update",
    "adults-amount-update",
    "adult-ticket-price-update",
    "children-amount-update",
    "child-ticket-price-update",
  ],
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
    advanceAmount: {
      get() {
        return this.banquet?.advanceAmount;
      },
      set(value) {
        return this.$emit('advance-amount-update', {advanceAmount: value});
      },
    },
    advanceAmountPaymentMethod: {
      get() {
        return this.banquet?.advanceAmountPaymentMethod;
      },
      set(value) {
        return this.$emit('advance-amount-payment-method-update', {advanceAmountPaymentMethod: value});
      },
    },
    isBirthdayClub: {
      get() {
        return this.banquet?.isBirthdayClub;
      },
      set(value) {
        return this.$emit('is-birthday-club-update', {isBirthdayClub: value});
      },
    },
    actualTotal: {
      get() {
        return this.banquet?.actualTotal;
      },
      set(value) {
        return this.$emit('actual-total-update', {actualTotal: value});
      },
    },
    adultsAmount: {
      get() {
        return this.banquet?.adultsAmount;
      },
      set(value) {
        return this.$emit('adults-amount-update', {adultsAmount: value});
      },
    },
    adultTicketPrice: {
      get() {
        return this.banquet?.adultTicketPrice;
      },
      set(value) {
        return this.$emit('adult-ticket-price-update', {adultTicketPrice: value});
      },
    },
    childrenAmount: {
      get() {
        return this.banquet?.childrenAmount;
      },
      set(value) {
        return this.$emit('children-amount-update', {childrenAmount: value});
      },
    },
    childTicketPrice: {
      get() {
        return this.banquet?.childTicketPrice;
      },
      set(value) {
        return this.$emit('child-ticket-price-update', {childTicketPrice: value});
      },
    },
    advanceAmountErrors() {
      return this.errors?.advanceAmount ?? null;
    },
    advanceAmountPaymentMethodErrors() {
      return this.errors?.advanceAmountPaymentMethod ?? null;
    },
    isBirthdayClubErrors() {
      return this.errors?.isBirthdayClub ?? null;
    },
    actualTotalErrors() {
      return this.errors?.actualTotal ?? null;
    },
    adultsAmountErrors() {
      return this.errors?.adultsAmount ?? null;
    },
    adultTicketPriceErrors() {
      return this.errors?.adultTicketPrice ?? null;
    },
    childrenAmountErrors() {
      return this.errors?.childrenAmount ?? null;
    },
    childTicketPriceErrors() {
      return this.errors?.childTicketPrice ?? null;
    },
  },
})
</script>

<style scoped>
  .banquet-additional {
    @apply flex flex-col justify-center items-center card w-full bg-base-100 shadow-xl gap-1 pt-1 p-3;
  }

  .label {
    @apply p-1;
  }

  .input::placeholder {
    color: hsl(var(--bc) / 0.15);
  }

  .selected {
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
