<template>
  <div class="customers"> 
    <div class="customers-actions">
      <button class="btn btn-ghost w-14 h-14 p-2"
        @click="this.$emit('close-picker')">
        <BaseIcon title="back" :color="iconColor()" :width="24" :height="24" viewBox="0 0 24 24">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" :stroke="iconColor()" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
    </button>
    </div>

    <CustomerList :customers="customers" :selected="selected" class="customers-list" @select-customer="onSelectCustomer"/> 
    <CustomerListMore :count="customersCount" :total="customersTotal" :loading="loadingMore" v-if="customers" @load-more="onLoadMoreCustomers"/>  
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import CustomerList from "@/components/marketplace/customer/list/CustomerList.vue";
import CustomerListMore from "@/components/marketplace/customer/list/CustomerListMore.vue";

export default defineComponent({
  name: "CustomerPicker",
  emits: ["close-picker", "select-customer"],
  components: {
    BaseIcon,
    CustomerList,
    CustomerListMore,
  },
  props: {
    selectedCustomer: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loadingMore: false,
    };
  },
  computed: {
    ...mapGetters({
      filters: 'customers/filters',
      selected: 'customers/selected',
      customers: 'customers/customers',
    }),
    customersCount() {
      return this.customers ? this.customers.length : 0;
    },
    customersTotal() {
      return this.$store.getters['customers/customersTotal'];
    },
  },
  watch: {
    customers: {
      async handler() {
        this.loadingMore = false;
      }
    },
  },
  methods: {
    ...mapActions({
      'setSelected': 'customers/setSelected',
      'loadCustomers': 'customers/loadCustomers',
      'loadCustomersIfMissing': 'customers/loadCustomersIfMissing',
      'loadMoreCustomers': 'customers/loadMoreCustomers',
      'applySearch': 'customers/applySearch',
    }),
    iconColor() {
      return 'var(--text-color)';
    },
    onLoadMoreCustomers() {
      this.loadingMore = true;
      this.loadMoreCustomers();
    },
    onSelectCustomer({ customer }) {
      this.setSelected(customer);
      this.$emit('select-customer', { customer })
    },
  },
  mounted() {
    this.loadCustomersIfMissing();
  },
});
</script>


<style scoped>
.customers {
  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
}

.customers-actions {
  @apply flex w-full;

  margin-left: auto;
  margin-right: auto;
}

.customers-list {
  flex-basis: 90%;

  margin-left: auto;
  margin-right: auto;
}

.switcher {
  @apply flex flex-row items-center;

  flex-wrap: nowrap;

  flex: 0 1 auto;
  overflow-x: auto;

  margin-left: auto;
  margin-right: auto;
}

.blurred {
  --tw-border-opacity: 0;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.1;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>