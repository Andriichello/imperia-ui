<template>
  <div class="w-full list flex flex-wrap justify-center items-start gap-2 py-2">
    <div class="w-full flex flex-row justify-center items-start gap-3">
      <template v-if="number === 1">
        <div class="w-full max-w-sm flex flex-col gap-3">
          <Customer :customer="customer" v-for="customer in list" :key="customer.id"
                    :selected="isSelected(customer)"
                    @select-customer="onSelect(customer)"
                    @edit-customer="onEdit(customer)"/>
        </div>
      </template>

      <template v-else>
        <div class="w-full max-w-sm list-col flex flex-col gap-3"
             v-for="(column, index) in columns" :key="index" :id="'list-' + index">
          <Customer :customer="customer" v-for="customer in column" :key="customer.id"
                    :selected="isSelected(customer)"
                    @select-customer="onSelect(customer)"
                    @edit-customer="onEdit(customer)"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Customer from "@/components/order/customer/Customer.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "List",
  emits: ["select-customer", "edit-customer"],
  props: {
    customers: Array,
    selected: {
      type: Object,
      default: null,
    },
  },
  components: {
    Customer,
  },
  data() {
    return {
      number: window.innerWidth > 700 ? 2 : 1,
    }
  },
  computed: {
    list() {
      if (this.selected) {
        return [
          this.selected,
          ...(this.customers ?? []).filter((c) => {
            return c.id !== this.selected.id;
          }),
        ];
      }

      return this.customers;
    },
    columns() {
      return this.splitOnColumns(this.list ?? [], this.number);
    },
  },
  methods: {
    splitOnColumns(items, number) {
      const columns = [[], []]
      items.forEach((item, index) => {
        columns[index % number].push(item);
      });

      return columns;
    },
    isSelected(customer) {
      return this.selected && customer
          && this.selected.id === customer.id;
    },
    onSelect(customer) {
      this.$emit('select-customer', {customer});
    },
    onEdit(customer) {
      this.$emit('edit-customer', {customer});
    },
    onResize() {
      if (window.innerWidth > 500) {
        this.number = 2;
      } else {
        this.number = 1;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
});
</script>

<style scoped>
.list {
  @apply w-full;
}

.list-col {
  flex-basis: 45%;
}
</style>
