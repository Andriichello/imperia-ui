<template>
  <div class="banquet-card">
    <div class="banquet-body">
      <div class="flex basis-full gap-1">
        <Title :value="banquet.title" @clicked="onTitleClicked(banquet)"/>

        <div class="flex flex-grow-0">
          <State :state="banquet.state"/>
        </div>
      </div>
    
      <Description :value="banquet.description" class="basis-full"/>
    
      <div class="flex flex-row basis-full justify-between">
        <Customer :customer="banquet.customer"/>
        <Date :date="banquet.startAt"/>
        <Time :startAt="banquet.startAt" :endAt="banquet.endAt"/>
      </div>

      <Totals :totals="banquet.totals" :advance="banquet.advanceAmount" class="basis-full"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import Title from './Title.vue';
import State from './State.vue';
import Description from './Description.vue';
import Customer from './Customer.vue';
import Date from './Date.vue';
import Time from './Time.vue';
import Totals from './Totals.vue';

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
    Title,
    State,
    Description,
    Customer,
    Date,
    Time,
    Totals,
  },
  methods: {
    ...mapActions({
      setBanquet: 'basket/setBanquet',
    }),
    onTitleClicked(banquet) {
      this.setBanquet(banquet);
      this.$router.push({path: '/marketplace/' + banquet.id, replace: true});
    }
  }
});
</script>


<style scoped>
.banquet-card {
  @apply card flex-wrap shadow-lg block;
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