<template>
  <div class="order-basket">
    <TabSwitcher :tab="tab" @switch-tab="switchTab"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import TabSwitcher from "../tab/TabSwitcher.vue";

export default defineComponent({
  name: "OrderBasket",
  components: {
    TabSwitcher,
  },
  computed: {
    ...mapGetters({
      tab: 'marketplace/tab',
    }),
  },
  methods: {
    ...mapActions({
      switchTab: 'marketplace/selectTab'
    }),
  },
});
</script>


<style scoped>
.order-basket {
  display: flex;
  align-self: stretch;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>