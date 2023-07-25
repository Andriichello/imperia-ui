<template>
  <div class="banquet">
    <div class="flex justify-between items-center w-full gap-2">
      <div class="form-control">
        <input class="input input-sm input-ghost w-full text-xl font-semibold px-1"
               name="title" type="text" required value="Banquet #1"
               :placeholder="$t('banquet.title') + '...'"/>
        <!--      <label class="label flex-col items-start" v-if="emailErrors">-->
        <!--              <span class="label-text-alt text-error text-sm" v-for="error in emailErrors" :key="error">-->
        <!--                {{ error }}-->
        <!--              </span>-->
        <!--      </label>-->
      </div>

      <State class="h-full cursor-pointer"/>
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

    <div class="flex flex-wrap justify-between items-end w-full gap-1 mt-2">
      <div class="flex flex-col justify-start items-start gap-1">
        <Date class="cursor-pointer"
          :date="new Date()"/>
        <Time class="cursor-pointer"
              :start-at="new Date()" :end-at="new Date()"/>
      </div>

      <div class="flex flex-col justify-start items-end gap-2">
        <Customer class="cursor-pointer"
                  :customer="{id: 1, name: 'John', surname: 'Doe', phone: '+380501234567'}"/>
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

export default defineComponent({
  // eslint-disable-next-line
  name: 'Banquet',
  components: {Time, Date, Customer, State},
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
