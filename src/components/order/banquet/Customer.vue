<template>
  <div @click="onClick" :class="{ 'customer': true, 'cursor-pointer': !readonly }">
    <BaseIcon :width="48" :height="48" title="customer" color="currentColor"
              class="grow-0 rounded bg-base-200 p-2.5">
      <mask id="mask0_60_12019" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="14" width="16" height="8">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 14.4961H19.8399V21.8701H4V14.4961Z" fill="white" />
      </mask>
      <g mask="url(#mask0_60_12019)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.921 15.9961C7.66 15.9961 5.5 16.7281 5.5 18.1731C5.5 19.6311 7.66 20.3701 11.921 20.3701C16.181 20.3701 18.34 19.6381 18.34 18.1931C18.34 16.7351 16.181 15.9961 11.921 15.9961ZM11.921 21.8701C9.962 21.8701 4 21.8701 4 18.1731C4 14.8771 8.521 14.4961 11.921 14.4961C13.88 14.4961 19.84 14.4961 19.84 18.1931C19.84 21.4891 15.32 21.8701 11.921 21.8701Z"/>
      </g>
      <mask id="mask1_60_12019" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="2" width="12" height="11">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.60986 2H17.2299V12.6186H6.60986V2Z" fill="white" />
      </mask>
      <g mask="url(#mask1_60_12019)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9209 3.42751C9.77989 3.42751 8.03789 5.16851 8.03789 7.30951C8.03089 9.44351 9.75989 11.1835 11.8919 11.1915L11.9209 11.9055V11.1915C14.0609 11.1915 15.8019 9.44951 15.8019 7.30951C15.8019 5.16851 14.0609 3.42751 11.9209 3.42751ZM11.9209 12.6185H11.8889C8.9669 12.6095 6.59989 10.2265 6.60989 7.30651C6.60989 4.38151 8.99189 1.99951 11.9209 1.99951C14.8489 1.99951 17.2299 4.38151 17.2299 7.30951C17.2299 10.2375 14.8489 12.6185 11.9209 12.6185Z"/>
      </g>
    </BaseIcon>

    <div class="customer-info">
      <span class="text-md font-semibold">{{ name() }}</span>
      <span class="text-md font-light" v-if="phone()">{{ phone() }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseIcon from '@/components/icons/BaseIcon.vue';

export default defineComponent({
  // eslint-disable-next-line
  name: "Customer",
  emits: ["customer-click"],
  components: {
    BaseIcon,
  },
  props: {
    customer: Object,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    name() {
      const noName = !this.customer || !this.customer.name;
      const noSurname = !this.customer || !this.customer.surname;

      return noName && noSurname ? 'Customer'
          : this.customer.name + ' ' + this.customer.surname;
    },
    phone() {
      if (!this.customer) {
        return null;
      }

      return this.customer.phone ?? null;
    },
    onClick() {
      if (this.readonly) {
        return;
      }

      this.$emit('customer-click', { customer: this.customer });
    },
  }
});
</script>


<style scoped>
.customer {
  @apply flex flex-wrap gap-2 justify-center items-center;
}

.customer-info {
  @apply flex justify-center items-center flex-col;
}
</style>