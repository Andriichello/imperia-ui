<template>
  <div class="basket">
    <TabSwitcher :tab="tab"/>

    <BasketSwitcher class="basket-switcher"/>  
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TabSwitcher from "@/components/marketplace/tab/TabSwitcher.vue";
import BasketSwitcher from "@/components/marketplace/basket/BasketSwitcher.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Basket",
  components: {
    TabSwitcher,
    BasketSwitcher,
  },
});
</script>


<style scoped>
.basket {
  @apply flex self-stretch justify-start items-start pl-4 pr-4;
}

.banquet {
  max-width: 80%;
}

.basket-switcher {
  @apply fixed right-3 bottom-3 overflow-hidden;
}
</style>