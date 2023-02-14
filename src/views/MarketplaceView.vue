<template>
  <div class="marketplace-view">
    <TabSwitcher :tab="tab"/>
    
    <Basket v-if="showing" class="basket-component"/>
    <Marketplace v-else class="marketplace-component"/>

    <BasketSwitcher class="basket-switcher"/>    
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TabSwitcher from "@/components/marketplace/tab/TabSwitcher.vue";
import BasketSwitcher from "@/components/marketplace/basket/BasketSwitcher.vue";
import Basket from "@/components/marketplace/basket/Basket.vue";
import Marketplace from "@/components/marketplace/Marketplace.vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "MarketplaceView",
  components: {
    TabSwitcher,
    Basket,
    Marketplace,
    BasketSwitcher,
  },
  computed: {
    ...mapGetters({
      tab: 'marketplace/tab',
      showing: 'basket/showing',
    }),
  },
});
</script>

<style scoped>
.marketplace-view {  
  display: block;
  flex-grow: 1;

  max-width: 100%;
  min-width: 260px;
}

.basket-switcher {
  @apply fixed right-3 bottom-3 overflow-hidden;
}

.basket-component { 
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  min-width: 100%;
  flex-basis: 100%;
  
  margin-left: auto;
  margin-right: auto;
}

.marketplace-component {
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 40px;
}
</style>
