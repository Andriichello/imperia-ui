<template>
  <div class="order-page w-full">
    <div class="flex flex-col justify-center items start gap-3 w-full min-w-xl max-w-xl">
      <OrderSwitcher class="w-full" v-if="nonEmptyFields.length"/>
      <List :fields="nonEmptyFields" class="w-full"/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import List from "@/components/order/list/List.vue";
import {mapGetters} from "vuex";
import OrderSwitcher from "@/components/order/OrderSwitcher.vue";

export default defineComponent({
  name: "PreviewMenuPage",
  components: {
    OrderSwitcher,
    List,
  },
  computed: {
    ...mapGetters({
      fields: 'order/products',
    }),
    nonEmptyFields() {
      return this.fields.filter((f) => {
        return f.amount;
      })
    }
  },

});
</script>

<style scoped>
.order-page {
  @apply flex flex-col w-full gap-3 px-2 pt-4 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
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
