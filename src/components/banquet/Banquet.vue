<template>
  <div class="banquet-card">
    <div class="banquet-body">
      <div class="flex basis-full gap-1">
        <BanquetTitle :value="banquet.title"/>

        <div class="flex flex-grow-0">
          <BanquetState :state="banquet.state"/>
        </div>
      </div>
    
      <BanquetDescription :value="banquet.description" class="basis-full"/>
    
      <div class="flex flex-row basis-full justify-between">
        <BanquetCustomer :customer="banquet.customer ?? {}"/>
        <BanquetDate :date="banquet.startAt"/>
        <BanquetTime :startAt="banquet.startAt" :endAt="banquet.endAt"/>
      </div>

      <BanquetTotals :totals="banquet.totals ?? {}" class="basis-full"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BanquetTitle from './BanquetTitle.vue';
import BanquetState from './BanquetState.vue';
import BanquetDescription from './BanquetDescription.vue';
import BanquetCustomer from './BanquetCustomer.vue';
import BanquetDate from './BanquetDate.vue';
import BanquetTime from './BanquetTime.vue';
import BanquetTotals from './BanquetTotals.vue';

export default defineComponent({
  // eslint-disable-next-line
  name: "Banquet",
  props: {
    banquet: Object,
  },
  components: {
    BanquetTitle,
    BanquetState,
    BanquetDescription,
    BanquetCustomer,
    BanquetDate,
    BanquetTime,
    BanquetTotals,
  }
});
</script>


<style scoped>
.banquet-card {
  @apply card flex-wrap shadow-xl block bg-base-300;
  min-width: 60%;
}

.banquet-body {
  @apply gap-2 card-body;

  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
}
</style>