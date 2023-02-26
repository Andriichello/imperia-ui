<template>
  <div class="banquet-card">
    <div class="banquet-body">
      <div class="flex basis-full gap-1">
        <TitleInput/>

        <div class="flex flex-grow-0">
          <State :state="state"/>
        </div>
      </div>
    
      <DescriptionInput class="basis-full"/>
    
      <div class="flex flex-row basis-full justify-between">
        <Customer :customer="customer"/>
        <Date :date="startAt"/>
        <Time :startAt="startAt" :endAt="endAt"/>
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
      state: 'basket/state',
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
    }
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