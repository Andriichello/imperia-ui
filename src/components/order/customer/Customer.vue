<template>
  <div class="customer" :class="{'selected': selected}">
    <div class="w-full flex flex-col flex-wrap justify-center items-start">
      <div class="w-full flex justify-between gap-1">
        <span class="text-lg font-semibold line-clamp-1 text-ellipsis">
          {{ customer.name }} {{ customer.surname }}
        </span>

        <div class="flex justify-between gap-1">
          <button class="btn btn-square btn-sm btn-neutral" @click="onSelect" v-if="!selected">
            <BaseIcon :width="24" :height="24" title="select" class="text-neutral-content">
              <path d="M16.8395 9.7857C17.1911 9.4341 17.1911 8.8653 16.8395 8.5137C16.4879 8.1621 15.9191 8.1621 15.5675 8.5137L10.5083 13.5717L8.29547 11.3613C7.94387 11.0097 7.37507 11.0097 7.02347 11.3613C6.67187 11.7129 6.67187 12.2817 7.02347 12.6333L9.87226 15.4809C10.0475 15.6573 10.2791 15.7449 10.5083 15.7449C10.7387 15.7449 10.9691 15.6573 11.1443 15.4809L16.8395 9.7857Z"/>
            </BaseIcon>
          </button>
          <button class="btn btn-square btn-sm btn-neutral" @click="onEdit">
            <BaseIcon :width="20" :height="20" title="edit" class="text-neutral-content">
              <path d="M20.3415 19.2089C20.7052 19.2089 21 19.498 21 19.8545C21 20.1813 20.7523 20.4514 20.4308 20.4941L20.3415 20.5H13.471C13.1073 20.5 12.8125 20.211 12.8125 19.8545C12.8125 19.5277 13.0602 19.2576 13.3816 19.2148L13.471 19.2089H20.3415ZM13.6592 4.41662C14.906 3.19446 16.9283 3.19446 18.175 4.41662L19.4694 5.6854C20.7162 6.90755 20.7162 8.88985 19.4694 10.112L9.74061 19.6486C9.1843 20.1939 8.43007 20.4999 7.64282 20.4999H3.65854C3.28841 20.4999 2.99098 20.201 3.00021 19.8383L3.10043 15.8975C3.12036 15.1526 3.43127 14.4425 3.96867 13.9157L13.6592 4.41662ZM12.906 6.979L4.89998 14.8287C4.60126 15.1215 4.42814 15.5169 4.41707 15.9305L4.33345 19.2084L7.64282 19.2088C8.03222 19.2088 8.4067 19.0745 8.70228 18.8317L8.8093 18.7357L16.855 10.849L12.906 6.979ZM17.2437 5.32953C16.5113 4.61156 15.323 4.61156 14.5905 5.32953L13.838 6.066L17.786 9.936L18.5381 9.19909C19.2298 8.52101 19.2683 7.44433 18.6534 6.72195L18.5381 6.59831L17.2437 5.32953Z"/>
            </BaseIcon>
          </button>
        </div>
      </div>

      <div class="w-full flex flex-col flex-wrap justify-between px-2 py-1 gap-1">
        <span class="text-md font-light line-clamp-1 text-ellipsis" v-if="customer.email">
          {{ customer.email }}
        </span>

        <span class="text-md font-light line-clamp-1 text-ellipsis" v-if="customer.phone">
          {{ customer.phone }}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: 'Customer',
  emits: ["select-customer", "edit-customer"],
  components: {BaseIcon},
  props: {
    customer: {
      type: Object,
      default: null,
    },
    selected: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onSelect() {
      this.$emit('select-customer', { customer: this.customer });
    },
    onEdit() {
      this.$emit('edit-customer', { customer: this.customer });
    },
  }
})
</script>

<style scoped>
  .customer {
    @apply flex flex-col justify-center items-center card bg-base-200/80 shadow-md w-full p-3;
  }

  .selected {
    @apply text-black;
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
