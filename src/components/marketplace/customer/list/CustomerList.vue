<template>
  <div class="customer-list">
    <CustomerListItem :customers="customers" v-for="customer in customers" :key="customer.id" :customer="customer" class="customer-list-item" @select-customer="onSelectCustomer" :selected="isSelected(customer)"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CustomerListItem from "./CustomerListItem.vue";

export default defineComponent({
  name: "CustomerList",
  emits: ["select-customer"],
  components: {
    CustomerListItem,
  },
  props: {
    customers: Array,
    selected: {
      type: Object,
      default: null,
    },
  },
  methods: {
    isSelected(customer) {
      return this.selected && customer 
        && this.selected.id == customer.id; 
    },
    onSelectCustomer({ customer }) {
      this.$emit('select-customer', { customer })
    },
  },
});
</script>

<style scoped>
.customer-list {
  @apply gap-3;

  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;

  flex-basis: 100%;
}

.customer-list-item {
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: stretch;
}
</style>
