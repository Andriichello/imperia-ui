<template>
  <div class="basket">

    <template v-if="picker == null">
      <!-- <TabSwitcher :tab="tab"/> -->

      <div class="banquet">
        <Banquet @state-click="onOpenStatePicker" @customer-click="onOpenCustomerPicker" @date-click="onOpenDatePicker" @time-click="onOpenTimePicker"/>
        <SaveButton :loading="isCreatingBanquet || isUpdatingBanquet" class="pt-3" @save-clicked="onSaveBanquet()" 
        v-if="hasChanges && (title && state && customer && date && startAt && endAt)"/>
      </div>

      <BasketSwitcher class="basket-switcher"/>
    </template>

    <template v-if="picker == 'customer'">
      <div class="picker">
        <CustomerPicker @close-picker="onClosePicker" @customer-select="onCustomerSelect"
          :selected="customer"/>
      </div>
    </template>
    <template v-if="picker == 'date'">
      <div class="picker">
        <DatePicker @close-picker="onClosePicker" @date-select="onDateSelect"/>
      </div>
    </template>
     <template v-if="picker == 'time'">
      <div class="picker">
        <TimePicker @close-picker="onClosePicker" @time-select="onTimeSelect"
          :startAt="startAt" :endAt="endAt"/>
      </div>
    </template>
     <template v-if="picker == 'state'">
      <div class="picker">
        <StatePicker @close-picker="onClosePicker" @state-select="onStateSelect"
          :selected="state" :states="availableStates"/>
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
import TimePicker from "@/components/marketplace/time/TimePicker.vue";
import StatePicker from "@/components/marketplace/state/StatePicker.vue";
import Banquet from "../banquet/Banquet.vue";
import SaveButton from "./SaveButton.vue";
import { mapGetters, mapActions } from "vuex";
import { instanceOfShowBanquetResponse, instanceOfStoreBanquetResponse, instanceOfUpdateBanquetResponse } from "@/openapi";

export default defineComponent({
  // eslint-disable-next-line
  name: "Basket",
  components: {
    // TabSwitcher,
    Banquet,
    CustomerPicker,
    DatePicker,
    TimePicker,
    StatePicker,
    BasketSwitcher,
    SaveButton,
  },
  data() {
    return {
      isLoadingBanquet: false,
      isCreatingBanquet: false,
      isUpdatingBanquet: false,
    };
  },
  computed: {
    ...mapGetters({
      form: 'basket/form',
      title: 'basket/title',
      state: 'basket/state',
      customer: 'basket/customer',
      banquet: 'basket/banquet',
      picker: 'basket/picker',
      date: 'basket/date',
      startAt: 'basket/startAt',
      endAt: 'basket/endAt',
      availableStates: 'basket/availableStates',
      hasChanges: 'basket/hasRealChanges',
      showBanquetResponse: 'banquets/getShowResponse',
      createBanquetResponse: 'banquets/getCreateResponse',
      updateBanquetResponse: 'banquets/getUpdateResponse',
    }),
  },
  watch: {
    showBanquetResponse(newValue) {
      this.isLoadingBanquet = false;
      if (instanceOfShowBanquetResponse(newValue)) {
        this.setBanquet(newValue.data);
      } else {
        this.setBanquet(null);
      }
    },
    createBanquetResponse(newValue) {
      this.isCreatingBanquet = false;
      if (instanceOfStoreBanquetResponse(newValue)) {
        const id = newValue.data.id;
        this.loadBanquet({ id });

        const path = this.$route.path;
        this.$router.replace(`${path}/${id}`);
      }
    },
    updateBanquetResponse(newValue) {
      this.isUpdatingBanquet = false;
      if (instanceOfUpdateBanquetResponse(newValue)) {
          const id = newValue.data.id;
        this.loadBanquet({ id });
      }
    },
  },
  methods: {
    ...mapActions({
      loadBanquet: 'banquets/loadBanquet',
      createBanquet: 'banquets/createBanquet',
      updateBanquet: 'banquets/updateBanquet',
      setBanquet: 'basket/setBanquet',
      resolveCustomer: 'basket/resolveCustomer',
      setPicker: 'basket/setPicker',
      setDate: 'basket/setDate',
      setStartAt: 'basket/setStartAt',
      setEndAt: 'basket/setEndAt',
      setCustomer: 'basket/setCustomer',
      setState: 'basket/setState',
    }),
    onClosePicker() {
      this.setPicker(null);
    },
    onOpenStatePicker({ state }) {
        if (!this.availableStates || !this.availableStates.length) {
        return;
      }
      
      this.setPicker('state');
    },
    onOpenDatePicker({ date }) {
      this.setPicker('date');
    },
    onDateSelect({ date }) {
      this.setDate(date);
      this.onClosePicker();
    },
    onOpenCustomerPicker({ customer }) {
      this.setPicker('customer');
    },
    onOpenTimePicker() {
      this.setPicker('time');
    },
    onCustomerSelect({ customer }) {
      this.setCustomer(customer);
      this.onClosePicker();
    },
    onTimeSelect({ start, end }) {
      const date = this.date instanceof Date 
        ? this.date : new Date(Date.now());

      const startAt = new Date(date.getTime());
      startAt.setUTCHours(start.hour);
      startAt.setUTCMinutes(start.minute);
      this.setStartAt(startAt);

      const endAt = new Date(date.getTime());
      endAt.setUTCHours(end.hour);
      endAt.setUTCMinutes(end.minute);
      this.setEndAt(endAt);

      this.onClosePicker();
    },
    onStateSelect({ state }) {
      this.setState(state);
      this.onClosePicker();
    },
    onSaveBanquet() {
      const id = this.$route.params.id;
      
      if (!id && this.banquet === null) {
        this.isCreatingBanquet = true;
        this.createBanquet(this.form.asCreate());
      } 

      if (id && this.banquet) {
        this.isUpdatingBanquet = true;
        this.updateBanquet({ id: id, request: this.form.asUpdate() });
      }
    },
  },
  mounted() {
    const id = this.$route.params.id;

    if (id && this.banquet == null) {
      this.loadBanquet({ id });
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