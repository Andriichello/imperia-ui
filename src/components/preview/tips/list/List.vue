<template>
  <div class="w-full flex flex-wrap justify-start items-start gap-3 pb-2">
    <div class="w-full flex flex-col gap-3">
      <template v-for="waiter in waiters" :key="waiter.id">
        <Waiter :waiter="waiter" class="cursor-pointer"/>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {mapGetters} from "vuex";
import Waiter from "@/components/preview/tips/list/items/Waiter.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "List",
  props: {
    waiters: {
      type: Array,
    },
  },
  components: {
    Waiter,
  },
  computed: {
    ...mapGetters({
      waiters: "waiters/waiters",
      selected: "waiters/selected",
    }),
  },
});
</script>

<style scoped>
</style>
