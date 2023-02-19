<template>
  <div class="banquet-card">
    <div class="banquet-body">
      <div class="flex basis-full gap-1">
        <Title :value="banquet.title" :readonly="readonly" @clicked="onTitleClicked(banquet)"/>

        <div class="flex flex-grow-0">
          <State :state="banquet.state" :readonly="readonly"/>
        </div>
      </div>
    
      <Description :value="banquet.description" :readonly="readonly" class="basis-full"/>
    
      <div class="flex flex-row basis-full justify-between">
        <Customer :customer="banquet.customer ?? {}" :readonly="readonly"/>
        <Date :date="banquet.startAt" :readonly="readonly"/>
        <Time :startAt="banquet.startAt" :endAt="banquet.endAt" :readonly="readonly"/>
      </div>

      <Totals :totals="banquet.totals ?? {}" class="basis-full"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
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
    onTitleClicked(banquet) {
      console.log('onTitleClicked', banquet);

      this.$router.push({path: '/marketplace/' + banquet.id, replace: true});
    }
  }
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