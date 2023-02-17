<template>
  <div class="banquet">
    <div class="flex basis-full gap-1">
      <BanquetTitle :value="null"/>

       <div class="flex flex-grow-0">
        <BanquetState state="Draft"/>
      </div>
    </div>
   
    <BanquetDescription :value="null" class="basis-full"/>
  
    <div class="flex flex-row basis-full justify-between">
      <BanquetCustomer :customer="{name: 'John', surname: 'Doe', phone: '+380501234567'}"/>
      <BanquetDate date="2023-02-17T19:38:24.151Z"/>
      <BanquetTime startAt="2023-02-17T09:15:00.000Z" endAt="2023-02-17T15:30:00.000Z"/>
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

export default defineComponent({
  // eslint-disable-next-line
  name: "Banquet",
  components: {
    BanquetTitle,
    BanquetState,
    BanquetDescription,
    BanquetCustomer,
    BanquetDate,
    BanquetTime,
  }
});
</script>


<style scoped>
.banquet {
  @apply gap-2;

  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
}
</style>