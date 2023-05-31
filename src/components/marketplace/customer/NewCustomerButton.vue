<template>
  <button class="new-customer-button"> 
    <span>+ New customer</span>
  </button>    
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NewCustomerButton",
  methods: {
    iconColor() {
      return 'currentColor';
    },
  },
});
</script>


<style scoped>
.new-customer-button {
  @apply btn btn-ghost;
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