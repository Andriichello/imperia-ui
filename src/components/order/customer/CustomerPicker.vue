<template>
  <div class="customer h-full">
    <div class="customer-card-body h-full" v-if="mode === 'view'">
      <div class="flex justify-between items-center w-full gap-2">
        <div class="form-control w-full">
          <input class="input input-md input-bordered w-full text-xl z-[1]"
                 name="search" type="text" required v-model="searchVal"
                 :placeholder="$t('banquet.customer.search') + '...'"/>
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

      <div class="w-full flex justify-center items-center pt-2">
        <button class="w-full btn btn-sm btn-ghost max-w-xl"
                @click="onCreateCustomer">
          + {{ $t('banquet.customer.create') }}
        </button>
      </div>

      <template v-if="customers && customers.length">
        <div class="w-full grow flex flex-col justify-start items-center overflow-y-auto" id="customers-list">
          <List class="pb-3"
                :customers="customers"
                :selected="lastSelected"
                @select-customer="onSelectCustomer"
                @edit-customer="onEditCustomer"/>

          <div class="w-full flex flex-col justify-center items-center mt-1 mb-3">
            <div class="w-full flex flex-col justify-center items-center gap-2">
              <span v-if="customersCount && customersTotal && customersCount !== customersTotal">
                {{ $t('banquet.customer.showing_C_of_T', {count: customersCount, total: customersTotal}) }}
              </span>
              <span v-else-if="customersCount && customersTotal && customersCount === customersTotal">
                {{ $t('banquet.customer.showing_all_C', {count: customersCount}) }}
              </span>

              <div class="w-full list-more-btn max-w-xl" v-if="customersCount < customersTotal">
                <button class="w-full btn btn-sm btn-ghost" @click="onLoadMore">
                  {{ $t('banquet.customer.load_more') }}
                  <span class="loading loading-spinner" v-if="isLoadingMore"></span>
                </button>
              </div>
            </div>
          </div>
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
          <input v-model="name" type="text" :placeholder="$t('banquet.customer.name') + '...'"
                 class="input input-md input-bordered w-full"
                 :class="{ 'input-error' : errors.name }"/>
          <label class="label flex-col items-start" v-if="errors.name">
            <span class="label-text-alt text-error text-sm" v-for="error in errors.name" :key="error">
              {{ error }}
            </span>
          </label>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-md">{{ $t('banquet.customer.surname') }}</span>
          </label>
          <input v-model="surname" type="text" :placeholder="$t('banquet.customer.surname') + '...'"
                 class="input input-md input-bordered w-full"
                 :class="{ 'input-error' : errors.surname }"/>
          <label class="label flex-col items-start" v-if="errors.surname">
            <span class="label-text-alt text-error text-sm" v-for="error in errors.surname" :key="error">
              {{ error }}
            </span>
          </label>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-md">{{ $t('banquet.customer.phone') }}</span>
          </label>
          <input v-model="phone" type="tel" :placeholder="$t('banquet.customer.phone') + '...'"
                 class="input input-md input-bordered w-full"
                 :class="{ 'input-error' : errors.phone }"/>
          <label class="label flex-col items-start" v-if="errors.phone">
            <span class="label-text-alt text-error text-sm" v-for="error in errors.phone" :key="error">
              {{ error }}
            </span>
          </label>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-md">{{ $t('banquet.customer.email') }}</span>
          </label>
          <input v-model="email" type="email" :placeholder="$t('banquet.customer.email') + '...'"
                 class="input input-md input-bordered w-full"
                 :class="{ 'input-error' : errors.email }"/>
          <label class="label flex-col items-start" v-if="errors.email">
            <span class="label-text-alt text-error text-sm" v-for="error in errors.email" :key="error">
              {{ error }}
            </span>
          </label>
        </div>
      </div>

      <div class="w-full flex justify-center items-center pb-2"
           v-for="errorsGroup in (Object.keys(createErrors?.errors ?? {}))"
           :key="errorsGroup">
        <span class="label-text-alt text-error text-sm"
              v-for="error in createErrors.errors[errorsGroup]"
              :key="error">
          {{ error }}
        </span>
      </div>

      <div class="w-full flex justify-center items-center pb-2"
           v-for="errorsGroup in (Object.keys(updateErrors?.errors ?? {}))"
           :key="errorsGroup">
        <span class="label-text-alt text-error text-sm"
              v-for="error in updateErrors.errors[errorsGroup]"
              :key="error">
          {{ error }}
        </span>
      </div>

      <div class="w-full flex justify-between items-center gap-2">
        <button class="grow btn btn-md pl-5 pr-5" @click="onCloseCustomer">
          {{ $t('banquet.customer.close') }}
        </button>

        <button class="grow btn btn-md btn-primary pl-5 pr-5" v-if="hasChanges" @click="onSaveForm">
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
import {ResponseErrors} from "@/helpers";

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
      isLoadingMore: false,
      searchVal: this.search,
      lastSelected: this.selected,
      wasStoreClicked: false,
      errors: {},
      createErrors: {},
      updateErrors: {},
    }
  },
  computed: {
    ...mapGetters({
      restaurantId: 'restaurants/restaurantId',
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
    customersCount() {
      return this.customers?.length;
    },
    name: {
      get() {
        return this.$store.getters['customers/name'];
      },
      set(value) {
        this.$store.commit('customers/setName', value);

        if (this.wasStoreClicked) {
          this.validateForm();
        }
      },
    },
    surname: {
      get() {
        return this.$store.getters['customers/surname'];
      },
      set(value) {
        this.$store.commit('customers/setSurname', value);

        if (this.wasStoreClicked) {
          this.validateForm();
        }
      },
    },
    phone: {
      get() {
        return this.$store.getters['customers/phone'];
      },
      set(value) {
        this.$store.commit('customers/setPhone', value);

        if (this.wasStoreClicked) {
          this.validateForm();
        }
      },
    },
    email: {
      get() {
        return this.$store.getters['customers/email'];
      },
      set(value) {
        this.$store.commit('customers/setEmail', value);

        if (this.wasStoreClicked) {
          this.validateForm();
        }
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
    indexMoreResponse: {
      async handler(response) {
        this.isLoadingMore = false;
      }
    },
    createResponse: {
      async handler(response) {
        this.isCreating = false;
        this.createErrors = response
            ? await ResponseErrors.from(response) : {};

        if (instanceOfStoreCustomerResponse(response)) {
          await this.setFormCustomer(response.data);
        }

        await this.setIndexResponse(null);
        await this.setCustomers([]);
        await this.loadCustomers();
      }
    },
    updateResponse: {
      async handler(response) {
        this.isUpdating = false;
        this.updateErrors = response
            ? await ResponseErrors.from(response) : {};

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
      loadMoreCustomers: 'customers/loadMoreCustomers',
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

      this.errors = {};
      this.createErrors = {};
      this.updateErrors = {};

      this.setFormCustomer(customer);
    },
    onCreateCustomer() {
      this.mode = 'create';

      this.errors = {};
      this.updateErrors = {};
      this.createErrors = {};

      if (this.formCustomer !== null) {
        this.setFormCustomer(null);
      }
    },
    onCloseCustomer() {
      this.mode = 'view';

      this.createErrors = {};
      this.updateErrors = {};
    },
    validateForm() {
      const errors = {};

      const name = this.form.name;
      if (!name) {
        errors.name = [this.$t('banquet.customer.errors.required.name')];
      } else if (name.trim().length < 2) {
        errors.name = [this.$t('banquet.customer.errors.min.name')];
      }

      const surname = this.form.surname;
      if (!surname) {
        errors.surname = [this.$t('banquet.customer.errors.required.surname')];
      } else if (surname.trim().length < 2) {
        errors.surname = [this.$t('banquet.customer.errors.min.surname')];
      }

      const phone = this.form.phone;
      if (phone && (!phone.startsWith('+') || phone.trim().length < 10)) {
        errors.phone = [this.$t('banquet.customer.errors.phone_rules')];
      }

      const email = this.form.email;
      if (email && (!email.includes('@') || email.trim().startsWith('@') || email.trim().endsWith('@') || email.trim().includes(' '))) {
        errors.email = [this.$t('banquet.customer.errors.email_rules', {sign: '@'})];
      }

      if (!email && !phone) {
        errors.phone = [this.$t('banquet.customer.errors.required.phone_or_email')];
        errors.email = [this.$t('banquet.customer.errors.required.phone_or_email')];
      }

      this.errors = errors;

      return !Object.keys(errors).length
          && this.form.name
          && this.form.surname
          && this.form.phone;
    },
    onSaveForm() {
      this.wasStoreClicked = true;
      if (!this.validateForm()) {
        return;
      }

      let form = null;

      if (this.formCustomer) {
        this.isUpdating = true;
        form = this.form.asUpdate();

        if (!form.restaurantId) {
          form.restaurantId = this.restaurantId
        }

        this.updateCustomer({id: this.formCustomer.id, request: form});
      } else {
        this.isCreating = true;
        form = this.form.asCreate();

        if (!form.restaurantId) {
          form.restaurantId = this.restaurantId
        }

        this.storeCustomer({request: form});
      }
    },
    onLoadMore() {
      this.isLoadingMore = true;

      this.loadMoreCustomers();
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