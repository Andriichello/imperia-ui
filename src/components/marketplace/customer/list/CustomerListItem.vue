<template>
  <div class="customer-card" :class="{'selected': selected}">
    <div class="customer-header">
      <BaseIcon :width="32" :height="32" title="customer" color="var(--text-color)" class="grow-0">
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

      <span class="customer-name">{{ name() }}</span>
    
      <button class="customer-select" @click="onSelect" v-if="!selected">
        <BaseIcon :width="24" :height="24" title="select" color="var(--text-color)">
          <path d="M16.8395 9.7857C17.1911 9.4341 17.1911 8.8653 16.8395 8.5137C16.4879 8.1621 15.9191 8.1621 15.5675 8.5137L10.5083 13.5717L8.29547 11.3613C7.94387 11.0097 7.37507 11.0097 7.02347 11.3613C6.67187 11.7129 6.67187 12.2817 7.02347 12.6333L9.87226 15.4809C10.0475 15.6573 10.2791 15.7449 10.5083 15.7449C10.7387 15.7449 10.9691 15.6573 11.1443 15.4809L16.8395 9.7857Z"/>
        </BaseIcon>
      </button>
      <button class="customer-edit" @click="onEdit">
        <BaseIcon :width="20" :height="20" title="edit" color="var(--text-color)">
          <path d="M20.3415 19.2089C20.7052 19.2089 21 19.498 21 19.8545C21 20.1813 20.7523 20.4514 20.4308 20.4941L20.3415 20.5H13.471C13.1073 20.5 12.8125 20.211 12.8125 19.8545C12.8125 19.5277 13.0602 19.2576 13.3816 19.2148L13.471 19.2089H20.3415ZM13.6592 4.41662C14.906 3.19446 16.9283 3.19446 18.175 4.41662L19.4694 5.6854C20.7162 6.90755 20.7162 8.88985 19.4694 10.112L9.74061 19.6486C9.1843 20.1939 8.43007 20.4999 7.64282 20.4999H3.65854C3.28841 20.4999 2.99098 20.201 3.00021 19.8383L3.10043 15.8975C3.12036 15.1526 3.43127 14.4425 3.96867 13.9157L13.6592 4.41662ZM12.906 6.979L4.89998 14.8287C4.60126 15.1215 4.42814 15.5169 4.41707 15.9305L4.33345 19.2084L7.64282 19.2088C8.03222 19.2088 8.4067 19.0745 8.70228 18.8317L8.8093 18.7357L16.855 10.849L12.906 6.979ZM17.2437 5.32953C16.5113 4.61156 15.323 4.61156 14.5905 5.32953L13.838 6.066L17.786 9.936L18.5381 9.19909C19.2298 8.52101 19.2683 7.44433 18.6534 6.72195L18.5381 6.59831L17.2437 5.32953Z"/>
        </BaseIcon>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  name: "CustomerListItem",
  emits: ["select-customer", "edit-customer"],
  components: {
    BaseIcon,
  },
  props: {
    customer: Object,
    selected: {
      type: Boolean,
      default: false,
    }
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
    onSelect() {
      this.$emit('select-customer', { customer: this.customer });
    },
    onEdit() {
      this.$emit('edit-customer', { customer: this.customer });
    }
  },
});
</script>

<style scoped>
.customer-header {
  @apply flex justify-start items-center gap-2;
 
  color: var(--text-color);
}

.customer-info {
  @apply flex justify-center items-start gap-0.5 flex-col;

  color: var(--text-color);
}

.customer-name {
  @apply flex-grow;

  font-size: 14px;
  font-weight: 500;
}

.customer-edit {
  @apply btn btn-ghost btn-sm w-8 p-0;
}

.customer-select {
  @apply btn btn-ghost btn-sm w-8 p-0;
}

.customer-phone {
  font-size: 12px;
  font-weight: 300;
}

.customer-card {
  @apply card flex-wrap shadow-lg block bg-base-300 p-3;
  min-width: 80%;
  flex-basis: 100%;
}

.customer-body {
  @apply gap-2 card-body;

  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>
