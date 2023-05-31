<template>
  <div class="banquet-card">
    <div class="banquet-body">
      <div class="flex basis-full gap-1">
        <TitleInput/>

        <div class="flex flex-grow-0">
          <State :state="state" @click="onStateClick({ state })" class="cursor-pointer"/>
        </div>
      </div>
    
      <DescriptionInput class="basis-full"/>
    
      <div class="flex flex-row basis-full justify-between">
        <Customer :customer="customer" :readonly="!user || user.customer" @customer-click="onCustomerClick"/>
        <Date :date="date" @click="onDateClick({ date: startAt })" class="cursor-pointer"/>
        <Time :startAt="startAt" :endAt="endAt"  @click="onTimeClick({ startAt, endAt })" class="cursor-pointer"/>
      </div>

      <Totals :totals="totals" :advance="advanceAmount" class="basis-full"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import TitleInput from '../banquet/TitleInput.vue';
import State from '@/components/history/banquet/State.vue';
import DescriptionInput from '../banquet/DescriptionInput.vue';
import Customer from '@/components/history/banquet/Customer.vue';
import Date from '@/components/history/banquet/Date.vue';
import Time from '@/components/history/banquet/Time.vue';
import Totals from '@/components/history/banquet/Totals.vue';

export default defineComponent({
  // eslint-disable-next-line
  name: "Banquet",
  emits: ["state-click", "customer-click", "date-click", "time-click"],
  props: {
    banquet: Object,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TitleInput,
    State,
    DescriptionInput,
    Customer,
    Date,
    Time,
    Totals,
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      state: 'basket/state',
      date: 'basket/date',
      startAt: 'basket/startAt',
      endAt: 'basket/endAt',
      customer: 'basket/customer',
      totals: 'basket/totals',
      advanceAmount: 'basket/advanceAmount',
    }),
  },
  methods: {
    ...mapActions({
      setBanquet: 'basket/setBanquet',
    }),
    onTitleClicked(banquet) {
      this.setBanquet(banquet);
      this.$router.push({path: '/marketplace/' + banquet.id, replace: true});
    },
    onStateClick({ state }) {
      this.$emit("state-click", { state });
    },
    onCustomerClick({ customer }) {
      this.$emit("customer-click", { customer });
    },
    onDateClick({ date }) {
      this.$emit("date-click", { date });
    },
    onTimeClick({ startAt, endAt }) {
      this.$emit("time-click", { startAt, endAt });
    },
    
  },
});
</script>


<style scoped>
.banquet-card {
  @apply card flex-wrap shadow-xl block bg-base-300;
  min-width: 80%;
  flex-basis: 100%;
}

.banquet-body {
  @apply gap-2 card-body;

  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
}
</style>