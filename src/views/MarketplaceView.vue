<template>
  <div class="marketplace-view">    
    <Basket v-if="showing" class="basket-component"/>
    <Marketplace v-else class="marketplace-component"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Basket from "@/components/marketplace/basket/Basket.vue";
import Marketplace from "@/components/marketplace/Marketplace.vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "MarketplaceView",
  components: {
    Basket,
    Marketplace,
  },
  computed: {
    ...mapGetters({
      tab: 'marketplace/tab',
      showing: 'basket/showing',
    }),
  },
  methods: {
     ...mapActions({
      loadBanquet: 'basket/loadBanquet',
    }),
  },
  updated() {
    const id = this.$route.params.id;
    if (isNaN(id) || !id) {
      return;
    }

    if (!this.banquet || this.banquet.id != id) {
      this.loadBanquet({ id: id });
    }
  }
});
</script>

<style scoped>
.marketplace-view {
  @apply pl-3 pr-3 pt-2 pb-2;  

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
  flex-direction: col;
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
}
</style>
