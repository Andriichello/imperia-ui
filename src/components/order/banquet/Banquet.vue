<template>
  <div class="banquet">
    <div class="flex justify-between items-center w-full gap-2">
      <div class="form-control w-full">
        <input class="input input-sm input-ghost w-full text-xl font-semibold px-1"
               name="title" type="text" required v-model="title"
               :placeholder="$t('banquet.title') + '...'"/>
        <!--      <label class="label flex-col items-start" v-if="emailErrors">-->
        <!--              <span class="label-text-alt text-error text-sm" v-for="error in emailErrors" :key="error">-->
        <!--                {{ error }}-->
        <!--              </span>-->
        <!--      </label>-->
      </div>


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

    <div class="flex flex-wrap justify-start items-center w-full gap-1 mt-2">
      <div class="flex flex-col justify-start items-start gap-1 grow">
        <Date class="cursor-pointer w-full"
              :date="banquet?.date"
              @click="onDateClick"/>

        <Time class="cursor-pointer w-full"
              :start-at="banquet?.startAt" :end-at="banquet?.endAt"
              @click="onTimeClick"/>
      </div>

      <div class="flex flex-col justify-start items-start gap-1">
        <State class="cursor-pointer w-full"
               :state="banquet?.state"/>
        <Customer class="cursor-pointer w-full"
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

export default defineComponent({
  // eslint-disable-next-line
  name: 'Banquet',
  emits: ["date-click", "time-click", "customer-click", "title-update"],
  components: {
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
    title: {
      get() {
        return this.banquet?.title;
      },
      set(value) {
        return this.$emit('title-update', {title: value});
      },
    },
  },
  methods: {
    onDateClick() {
      this.$emit('date-click');
    },
    onTimeClick() {
      this.$emit('time-click');
    },
    onCustomerClick() {
      this.$emit('customer-click');
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
