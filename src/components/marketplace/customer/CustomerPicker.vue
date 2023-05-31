<template>
  <div class="customers"> 
    <div class="customers-actions">
      <button class="btn btn-ghost w-14 h-14 p-2"
        @click="!creatingNew && !editingExisting ? this.$emit('close-picker') : onCloseForm()">
        <BaseIcon title="back" :color="iconColor()" :width="24" :height="24" viewBox="0 0 24 24">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" :stroke="iconColor()" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
      </button>
    </div>

    <div class="w-full flex justify-center mt-1 mb-1" v-if="!creatingNew && !editingExisting">
      <NewCustomerButton @click="onNewCustomerClick"/>
    </div>

    <div class="w-full flex justify-center" v-if="creatingNew || editingExisting">
      <CustomerForm :customer="formCustomer" class="w-full max-w-xs" @close-form="onCloseForm" @save-form="onSaveForm" @select-customer="onSelectCustomer"/>
    </div>

    <template v-if="!creatingNew && !editingExisting" >
      <SearchBar :search="filters.search" @search-change="onSearchChange" class="mb-2"/>

      <div class="w-full flex justify-center">
        <CustomerList :customers="customers" :selected="selected" class="customers-list max-w-sm" @select-customer="onSelectCustomer" @edit-customer="onEditCustomer"/> 
      </div>
      <div class="w-full flex justify-center">
        <CustomerListMore :count="customersCount" :total="customersTotal" :loading="loadingMore" v-if="customers" class="max-w-sm" @load-more="onLoadMoreCustomers"/>  
      </div>
    </template>
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import CustomerList from "@/components/marketplace/customer/list/CustomerList.vue";
import CustomerListMore from "@/components/marketplace/customer/list/CustomerListMore.vue";
import CustomerForm from "@/components/marketplace/customer/CustomerForm.vue";
import NewCustomerButton from "@/components/marketplace/customer/NewCustomerButton.vue";
import { instanceOfStoreCustomerResponse, instanceOfUpdateCustomerResponse } from "@/openapi";
import SearchBar from "@/components/common/SearchBar.vue";

export default defineComponent({
  name: "CustomerPicker",
  emits: ["close-picker", "customer-select"],
  components: {
    SearchBar,
    BaseIcon,
    CustomerList,
    CustomerListMore,
    CustomerForm,
    NewCustomerButton,
  },
  data() {
    return {
      loadingMore: false,
      creatingNew: false,
      editingExisting: false,
    };
  },
  computed: {
    ...mapGetters({
      filters: 'customers/filters',
      selected: 'customers/selected',
      formCustomer: 'customers/formCustomer',
      basketCustomer: 'basket/customer',
      customers: 'customers/customers',
      indexMoreResponse: 'customers/getIndexMoreResponse',
      createResponse: 'customers/getCreateResponse',
      updateResponse: 'customers/getUpdateResponse',
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
    indexMoreResponse: {
      async handler(newValue) {
        this.loadingMore = false;
      },
    },
    createResponse: {
      async handler(newValue) {
        if (instanceOfStoreCustomerResponse(newValue)) {
          this.setFormCustomer(newValue.data);
          this.prependCustomers([newValue.data]);
        }
      },
    },
    updateResponse: {
      async handler(newValue) {
        if (instanceOfUpdateCustomerResponse(newValue)) {
          this.setFormCustomer(newValue.data);
        }
      },
    }
  },
  methods: {
    ...mapActions({
      'setSelected': 'customers/setSelected',
      'setFormCustomer': 'customers/setFormCustomer',
      'prependCustomers': 'customers/prependCustomers',
      'loadCustomers': 'customers/loadCustomers',
      'loadCustomersIfMissing': 'customers/loadCustomersIfMissing',
      'loadMoreCustomers': 'customers/loadMoreCustomers',
      'applySearch': 'customers/applySearch',
      'createCustomer': 'customers/storeCustomer',
      'updateCustomer': 'customers/updateCustomer',
    }),
    iconColor() {
      return 'currentColor';
    },
    onLoadMoreCustomers() {
      this.loadingMore = true;
      this.loadMoreCustomers();
    },
    onSearchChange({ search }) {
      this.applySearch({ search });
    },
    onSelectCustomer({ customer }) {
      this.setSelected(customer);
      this.$emit('customer-select', { customer })
    },
    onEditCustomer({ customer }) {
      this.setFormCustomer(customer);
      this.editingExisting = true;
      this.creatingNew = false;
    },
    onNewCustomerClick() {
      this.setFormCustomer(null);
      this.creatingNew = true;
      this.editingExisting = false;
    },
    onCloseForm() {
      this.creatingNew = false;
      this.editingExisting = false;
    },
    onSaveForm({ form }) {
      if (this.creatingNew) {
        this.createCustomer({ request: form});
      }

      if (this.editingExisting) {
        this.updateCustomer({ id: this.formCustomer.id, request: form });
      }
    },
  },
  mounted() {
    this.setSelected(this.basketCustomer);
    this.loadCustomersIfMissing();
  },
});
</script>


<style scoped>
.customers {
  @apply w-full;

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