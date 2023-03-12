<template>
  <div class="basket">

    <template v-if="picker == null">
      <!-- <TabSwitcher :tab="tab"/> -->

      <div class="banquet">
        <Banquet @customer-click="onCustomerClick"/>
        <SaveBasket :loading="false"/>
      </div>

      <BasketSwitcher class="basket-switcher"/>
    </template>

    <template v-if="picker == 'customers'">
      <div class="picker">
        <CustomerPicker @close-picker="onClosePicker"/>
      </div>
    </template>
      
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import TabSwitcher from "@/components/marketplace/tab/TabSwitcher.vue";
import BasketSwitcher from "@/components/marketplace/basket/BasketSwitcher.vue";
import CustomerPicker from "@/components/marketplace/customer/CustomerPicker.vue";
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
    }),
    onCustomerClick({ customer }) {
        this.setPicker('customers');
    },
    onClosePicker() {
      this.setPicker(null);
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
  @apply p-1 w-full;
}

.basket-switcher {
  @apply fixed right-3 bottom-3 overflow-hidden;
}
</style>