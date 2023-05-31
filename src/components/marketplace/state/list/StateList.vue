<template>
  <div class="state-list">
    <StateListItem :states="states" v-for="state in states" :key="state" :state="state" class="state-list-item" @select-state="onSelectState" :selected="isSelected(state)"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import StateListItem from "./StateListItem.vue";

export default defineComponent({
  name: "StateList",
  emits: ["select-state"],
  components: {
    StateListItem,
  },
  props: {
    states: Array,
    selected: {
      type: String,
      default: null,
    },
  },
  methods: {
    isSelected(state) {
      return this.selected === state;
    },
    onSelectState({ state }) {
      this.$emit('select-state', { state })
    },
  },
});
</script>

<style scoped>
.state-list {
  @apply gap-3;

  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;

  flex-basis: 100%;
}

.state-list-item {
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: stretch;
}
</style>
