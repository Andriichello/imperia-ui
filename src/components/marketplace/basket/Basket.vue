<template>
  <div class="basket">
    <!-- <TabSwitcher :tab="tab"/> -->

    <div class="banquet">
      <Banquet :banquet="form"/>
    </div>

    <BasketSwitcher class="basket-switcher"/>  
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import TabSwitcher from "@/components/marketplace/tab/TabSwitcher.vue";
import BasketSwitcher from "@/components/marketplace/basket/BasketSwitcher.vue";
import Banquet from "../banquet/Banquet.vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "Basket",
  components: {
    // TabSwitcher,
    Banquet,
    BasketSwitcher,
  },
  computed: {
    ...mapGetters({
      form: 'basket/form',
      banquet: 'basket/banquet',
    }),
  },
  methods: {
    ...mapActions({
      loadBanquet: 'basket/loadBanquet',
    }),
  },
});
</script>


<style scoped>
.basket {
  @apply gap-1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
}

.banquet {
  @apply p-1 w-full;
}

.basket-switcher {
  @apply fixed right-3 bottom-3 overflow-hidden;
}
</style>