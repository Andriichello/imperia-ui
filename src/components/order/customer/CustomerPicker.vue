<template>
  <div class="customer h-full">
    <div class="customer-card-body h-full" v-if="mode === 'view'">
      <div class="flex justify-between items-center w-full gap-2">
        <div class="form-control w-full">
          <input class="input input-md input-bordered w-full text-xl z-[1]"
                 name="search" type="text" required v-model="searchVal"
                 placeholder="Search..."/>
        </div>

        <!--        <div class="btn btn-square btn-neutral">-->
        <!--          <BaseIcon width="24" height="24" class="text-neutral-content">-->
        <!--            <mask id="mask0_1102_7955" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">-->
        <!--              <path d="M2 2H21.4768V21.477H2V2Z"/>-->
        <!--            </mask>-->
        <!--              <path d="M11.739 3.5C7.196 3.5 3.5 7.195 3.5 11.738C3.5 16.281 7.196 19.977 11.739 19.977C16.281 19.977 19.977 16.281 19.977 11.738C19.977 7.195 16.281 3.5 11.739 3.5ZM11.739 21.477C6.369 21.477 2 17.108 2 11.738C2 6.368 6.369 2 11.739 2C17.109 2 21.477 6.368 21.477 11.738C21.477 17.108 17.109 21.477 11.739 21.477Z"/>-->
        <!--            <mask id="mask1_1102_7955" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="17" y="17" width="6" height="6">-->
        <!--              <path d="M17.2397 17.707H22.2638V22.7218H17.2397V17.707Z"/>-->
        <!--            </mask>-->
        <!--              <path d="M21.514 22.7218C21.323 22.7218 21.131 22.6488 20.984 22.5028L17.46 18.9888C17.167 18.6958 17.166 18.2208 17.459 17.9278C17.751 17.6328 18.226 17.6348 18.52 17.9258L22.044 21.4408C22.337 21.7338 22.338 22.2078 22.045 22.5008C21.899 22.6488 21.706 22.7218 21.514 22.7218Z"/>-->
        <!--          </BaseIcon>-->
        <!--        </div>-->
      </div>

      <template v-if="customers && customers.length">
        <div class="w-full grow flex flex-col justify-start items-center overflow-y-auto">
          <div class="w-full flex justify-center items-center pt-2">
            <button class="w-full btn btn-sm btn-ghost max-w-sm"
                    @click="onCreateCustomer">
              + {{ $t('banquet.customer.create') }}
            </button>
          </div>

          <List class="pb-3" id="customers-list"
                :customers="customers"
                :selected="lastSelected"
                @select-customer="onSelectCustomer"
                @edit-customer="onEditCustomer"/>
        </div>
      </template>

      <template v-if="!indexResponse">
        <Preloader :title="$t('banquet.customer.loading')" class="p-2"/>
      </template>

      <template v-if="indexResponse && !customersTotal">
        <div class="w-full grow flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center items-center gap-2">
            <span class="text-xl font-semibold">
              {{ $t("banquet.customer.unfortunately_list_is_empty") }}
            </span>
          </div>
        </div>
      </template>

      <div class="w-full flex justify-center items-center gap-1 backdrop-blur-sm">
        <button class="btn btn-md grow"
                @click="onCancelClick">
          {{ $t('banquet.customer.cancel') }}
        </button>
        <button class="btn btn-md btn-primary grow"
                v-if="changed"
                @click="onSelectClick">
          {{ $t('banquet.customer.select') }}
        </button>
      </div>
    </div>

    <div class="customer-card-body h-full" v-if="mode === 'edit' || mode === 'create'">
      <div class="w-full card-body overflow-y-auto">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-md">{{ $t('banquet.customer.name') }}</span>
          </label>
          <input v-model="name" type="text" :placeholder="$t('banquet.customer.name') + '...'" class="input input-md input-bordered w-full" />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-md">{{ $t('banquet.customer.surname') }}</span>
          </label>
          <input v-model="surname" type="text" :placeholder="$t('banquet.customer.surname') + '...'" class="input input-md input-bordered w-full" />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-md">{{ $t('banquet.customer.phone') }}</span>
          </label>
          <input v-model="phone" type="tel" :placeholder="$t('banquet.customer.phone') + '...'" class="input input-md input-bordered w-full" />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-md">{{ $t('banquet.customer.email') }}</span>
          </label>
          <input v-model="email" type="email" :placeholder="$t('banquet.customer.email') + '...'" class="input input-md input-bordered w-full" />
        </div>
      </div>

      <div class="w-full flex justify-between items-center gap-2">
        <button class="grow btn btn-md pl-5 pr-5" @click="onCloseCustomer">
          {{ $t('banquet.customer.close') }}
        </button>

        <button class="grow btn btn-md btn-primary pl-5 pr-5" v-if="hasChanges && (name && surname && phone && email)" @click="onSaveForm">
          {{ formCustomer ? $t('banquet.customer.update') : $t('banquet.customer.create') }}
          <span class="loading loading-spinner" v-if="isCreating || isUpdating"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import List from "@/components/order/customer/List.vue";
import {mapActions, mapGetters} from "vuex";
import debounce from "lodash/debounce";
import Preloader from "@/components/preview/loading/Preloader.vue";
import {instanceOfStoreCustomerResponse, instanceOfUpdateCustomerResponse} from "@/openapi";

export default defineComponent({
  name: "CustomerPicker",
  emits: ["on-select", "on-edit", "open-edit", "close-edit", "on-cancel"],
  components: {
    Preloader,
    List,
  },
  props: {
    selected: {
      type: Object,
      default: null,
    },
    search: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      mode: 'view',
      isCreating: false,
      isUpdating: false,
      searchVal: this.search,
      lastSelected: this.selected,
    }
  },
  computed: {
    ...mapGetters({
      form: 'customers/form',
      customers: 'customers/customers',
      formCustomer: 'customers/formCustomer',
      indexResponse: 'customers/getIndexResponse',
      indexMoreResponse: 'customers/getIndexMoreResponse',
      hasChanges: 'customers/hasRealChanges',
      customersTotal: 'customers/customersTotal',
      createResponse: 'customers/getCreateResponse',
      updateResponse: 'customers/getUpdateResponse',
    }),
    name: {
      get() {
        return this.$store.getters['customers/name'];
      },
      set(value) {
        return this.$store.commit('customers/setName', value);
      },
    },
    surname: {
      get() {
        return this.$store.getters['customers/surname'];
      },
      set(value) {
        return this.$store.commit('customers/setSurname', value);
      },
    },
    phone: {
      get() {
        return this.$store.getters['customers/phone'];
      },
      set(value) {
        return this.$store.commit('customers/setPhone', value);
      },
    },
    email: {
      get() {
        return this.$store.getters['customers/email'];
      },
      set(value) {
        return this.$store.commit('customers/setEmail', value);
      }
    },
    changed() {
      return this.selected !== this.lastSelected;
    },
  },
  watch: {
    searchVal: debounce(
        function (newVal) {
          this.applySearch({search: newVal});
        }, 500
    ),
    createResponse: {
      async handler(response) {
        this.isCreating = false;

        if (instanceOfStoreCustomerResponse(response)) {
          await this.setFormCustomer(response.data);
        }

        await this.setIndexResponse(null);
        await this.setCustomers([]);
        await this.loadCustomers();}
    },
    updateResponse: {
      async handler(response) {
        this.isUpdating = false;

        if (instanceOfUpdateCustomerResponse(response)) {
          await this.setFormCustomer(response.data);
        }

        await this.setIndexResponse(null);
        await this.setCustomers([]);
        await this.loadCustomers();
      }
    },
  },
  methods: {
    ...mapActions({
      setCustomers: 'customers/setCustomers',
      loadCustomers: 'customers/loadCustomers',
      loadCustomersIfMissing: 'customers/loadCustomersIfMissing',
      applySearch: 'customers/applySearch',
      setFormCustomer: 'customers/setFormCustomer',
      storeCustomer: 'customers/storeCustomer',
      updateCustomer: 'customers/updateCustomer',
      setIndexResponse: 'customers/setIndexResponse',
      setIndexMoreResponse: 'customers/setIndexMoreResponse',
    }),
    isSelected(customer) {
      return this.selected && customer
          && this.selected.id === customer.id;
    },
    onSelectCustomer({customer}) {
      this.lastSelected = customer;

      const list = document.getElementById('customers-list');

      if (list) {
        list.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    },
    onEditCustomer({customer}) {
      this.mode = 'edit';
      this.setFormCustomer(customer);
    },
    onCreateCustomer() {
      this.mode = 'create';
    },
    onCloseCustomer() {
      this.mode = 'view';
    },
    onSaveForm() {
      let form = null;

      if (this.formCustomer) {
        this.isUpdating = true;
        form = this.form.asUpdate();

        this.updateCustomer({id: this.formCustomer.id, request: form});
      } else {
        this.isCreating = true;
        form = this.form.asCreate();

        this.storeCustomer({request: form});
      }
    },
    onCancelClick() {
      this.$emit('on-cancel');
    },
    onSelectClick() {
      this.$emit('on-select', {customer: this.lastSelected});
    },
  },
  mounted() {
    this.loadCustomersIfMissing();
  }
});
</script>


<style scoped>
.customer {
  @apply w-full h-full flex flex-col justify-between card;
}

.customer-actions {
  @apply flex w-full pb-3;

  margin-left: auto;
  margin-right: auto;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}

.customer-header {
  @apply text-center text-xl text-current font-semibold;
}

.customer-card-body {
  @apply card flex flex-col justify-start items-center;
}

.customer-card-entry {
  @apply flex flex-col justify-center items-center;
}
</style>