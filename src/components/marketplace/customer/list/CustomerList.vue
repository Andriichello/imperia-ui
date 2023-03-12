<template>
  <div class="customer-list">
    <CustomerListItem :customers="customers" v-for="customer in customers" :key="customer.id" :customer="customer" class="customer-list-item" @select-customer="onSelectCustomer"/>
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
    type: String,
    customers: Array,
  },
  methods: {
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
