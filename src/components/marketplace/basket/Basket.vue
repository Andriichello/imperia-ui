<template>
  <div class="basket">

    <template v-if="picker == null">
      <!-- <TabSwitcher :tab="tab"/> -->

      <div class="banquet">
        <Banquet @customer-click="onOpenCustomerPicker" @date-click="onOpenDatePicker"/>
        <SaveBasket :loading="false"/>
      </div>

      <BasketSwitcher class="basket-switcher"/>
    </template>

    <template v-if="picker == 'customer'">
      <div class="picker">
        <CustomerPicker @close-picker="onClosePicker" @select-customer="onSelectCustomer"/>
      </div>
    </template>
    <template v-if="picker == 'date'">
      <div class="picker">
        <DatePicker @close-picker="onClosePicker" @day-click="onDayClick"/>
      </div>
    </template>
      
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import TabSwitcher from "@/components/marketplace/tab/TabSwitcher.vue";
import BasketSwitcher from "@/components/marketplace/basket/BasketSwitcher.vue";
import CustomerPicker from "@/components/marketplace/customer/CustomerPicker.vue";
import DatePicker from "@/components/marketplace/calendar/DatePicker.vue";
import Banquet from "../banquet/Banquet.vue";
import SaveBasket from "./SaveBasket.vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "Basket",
  components: {
    // TabSwitcher,
    Banquet,
    CustomerPicker,
    DatePicker,
    BasketSwitcher,
    SaveBasket,
  },
  computed: {
    ...mapGetters({
      form: 'basket/form',
      banquet: 'basket/banquet',
      picker: 'basket/picker',
    }),
  },
  methods: {
    ...mapActions({
      loadBanquet: 'basket/loadBanquet',
      resolveCustomer: 'basket/resolveCustomer',
      setPicker: 'basket/setPicker',
      setDate: 'basket/setDate',
      setCustomer: 'basket/setCustomer',
    }),
    onClosePicker() {
      this.setPicker(null);
    },
    onOpenDatePicker({ date }) {
      this.setPicker('date');
    },
    onDayClick({ date }) {
      this.setDate(date);
      this.onClosePicker();
    },
    onOpenCustomerPicker({ customer }) {
      this.setPicker('customer');
    },
    onSelectCustomer({ customer }) {
      this.setCustomer(customer);
      this.onClosePicker();
    },
  },
  mounted() {
    const id = this.$route.params.id;

    if (id && this.banquet == null) {
      this.loadBanquet(id);
    }

    this.resolveCustomer()
  },
});
</script>


<style scoped>
.basket {
  @apply gap-1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
}

.banquet {
  @apply p-1 w-full;
}

.picker {
  @apply flex p-1 w-full justify-center;
}

.basket-switcher {
  @apply fixed right-3 bottom-3 overflow-hidden;
}
</style>