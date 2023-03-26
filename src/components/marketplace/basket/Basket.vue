<template>
  <div class="basket">

    <template v-if="picker == null">
      <!-- <TabSwitcher :tab="tab"/> -->

      <div class="banquet">
        <Banquet @customer-click="onOpenCustomerPicker" @date-click="onOpenDatePicker" @time-click="onOpenTimePicker"/>
        <SaveButton :loading="isCreatingBanquet || isUpdatingBanquet" class="pt-3" @save-clicked="onSaveBanquet()" v-if="isBanquetChanged"/>
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
        <DatePicker @close-picker="onClosePicker" @date-select="onDateSelect"/>
      </div>
    </template>
     <template v-if="picker == 'time'">
      <div class="picker">
        <TimePicker @close-picker="onClosePicker" @time-select="onTimeSelect"
          :startAt="startAt" :endAt="endAt"/>
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
      banquet: 'basket/banquet',
      picker: 'basket/picker',
      date: 'basket/date',
      startAt: 'basket/startAt',
      endAt: 'basket/endAt',
      isBanquetChanged: 'basket/isBanquetChanged',
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
      this.isUpdatingBanquet = false;
      if (instanceOfStoreBanquetResponse(newValue)) {
        const id = newValue.data.id;
        this.loadBanquet({ id });
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
    }),
    onClosePicker() {
      this.setPicker(null);
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
    onSelectCustomer({ customer }) {
      this.setCustomer(customer);
      this.onClosePicker();
    },
    onOpenTimePicker() {
      this.setPicker('time');
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
    onSaveBanquet() {
      const id = this.$route.params.id;
      
      if (!id && this.banquet === null) {
        this.isCreatingBanquet = true;
        this.createBanquet(this.form);
      } 

      if (id && this.banquet) {
        this.isUpdatingBanquet = true;
        this.updateBanquet({ id: id, request: this.form });
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