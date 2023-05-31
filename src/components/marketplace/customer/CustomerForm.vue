<template>
  <div class="customer-form"> 
    <div class="customer-form-body">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input v-model="name" type="text" placeholder="Name..." class="input input-md input-bordered w-full" />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Surname</span>
        </label>
        <input v-model="surname" type="text" placeholder="Surname..." class="input input-md input-bordered w-full" />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Phone</span>
        </label>
        <input v-model="phone" type="tel" placeholder="Phone..." class="input input-md input-bordered w-full" />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input v-model="email" type="email" placeholder="Email..." class="input input-md input-bordered w-full" />
      </div>
    
      <div class="customer-form-actions justify-end">
        <button :class="{'customer-save-button': true, 'loading': isCreating || isUpdating}" v-if="hasChanges && (name && surname && phone && email)" @click="onSaveForm"> 
          {{ customer ? 'Update' : 'Create' }}
          </button>
        <button class="btn btn-ghost pl-5 pr-5" @click="onCloseForm">Close</button>
      </div>
    </div>
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "CustomerForm",
  emits: ["close-form", "save-form"],
  props: {
    customer: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      isCreating: false,
      isUpdating: false,
    };
  },
  watch: {
    createResponse: {
      async handler() {
        this.isCreating = false;
      }
    },
    updateResponse: {
      async handler() {
        this.isUpdating = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      form: 'customers/form',
      hasChanges: 'customers/hasRealChanges',
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
      },
    },
  },
  methods: {
    iconColor() {
      return 'currentColor';
    },
    onCloseForm() {
      this.$emit('close-form')
    },
    onSaveForm() {
      let form = null;

      if (this.customer) {
        this.isUpdating = true;
        form = this.form.asUpdate();
      } else {
        this.isCreating = true;
        form = this.form.asCreate();
      }

      this.$emit('save-form', { form })
    }
  },
});
</script>


<style scoped>
.customer-form {
  @apply card w-full bg-base-300;
}

.customer-form-body {
  @apply card-body justify-center;
}

.customer-form-actions {
  @apply card-actions w-full mt-3;
}

.customer-save-button {
  @apply btn flex-grow pl-5 pr-5;
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