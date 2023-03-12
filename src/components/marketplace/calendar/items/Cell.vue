<template>
  <div class="cell">
    <button :class="{'selected': selected, 'no-animation': noAnimation}" @click="onCellClicked()">
      <slot/>
    </button> 
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Cell",
  emits: ["cell-clicked"],
  props: {
    noAnimation: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onCellClicked() {
      this.$emit("cell-clicked")
    },
  }
});
</script>

<style scoped>
.cell {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;

  flex-basis: 100%;
}

button {
  @apply btn btn-ghost btn-sm w-full;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}

.no-animation {
  background-color: transparent;
}

.no-animation:hover {
  background-color: transparent;
}
</style>
