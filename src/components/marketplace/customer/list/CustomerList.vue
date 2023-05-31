<template>
  <div class="customer-list">
    <template v-if="selected">
      <CustomerListItem :customer="selected" class="customer-list-item" @select-customer="onSelectCustomer" @edit-customer="onEditCustomer" :selected="true"/>
    </template>

    <template v-for="customer in customers">
      <template v-if="!isSelected(customer)">
        <CustomerListItem :key="customer.id" :customer="customer" class="customer-list-item" @select-customer="onSelectCustomer" @edit-customer="onEditCustomer" :selected="false"/>
      </template>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CustomerListItem from "./CustomerListItem.vue";

export default defineComponent({
  name: "CustomerList",
  emits: ["select-customer", "edit-customer"],
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
    onEditCustomer({ customer }) {
      this.$emit('edit-customer', { customer })
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
