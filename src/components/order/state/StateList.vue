<template>
  <div class="w-full list flex flex-wrap justify-center items-start gap-2 py-2" id="customer-list-container">
    <div class="w-full flex flex-row justify-center items-start gap-3">
        <div class="w-full max-w-sm flex flex-col gap-3">
          <State v-for="state in states"
                 :key="state" :state="state" :selected="selected === state"
                 @click="onSelect(state)"/>
        </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import State from "@/components/order/state/State.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "StateList",
  emits: ["change-state"],
  props: {
    states: Array,
    selected: String,
  },
  components: {
    State,
  },
  methods: {
    onSelect(state) {
      this.$emit('change-state', {state});
    },
  },
});
</script>

<style scoped>
.list {
  @apply w-full;
}
</style>
