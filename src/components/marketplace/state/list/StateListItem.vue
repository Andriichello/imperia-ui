<template>
  <div class="state-card" :class="{'selected': selected}">
    <div class="state-header" @click="onClick">
      <span class="state-name">{{ state }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "StateListItem",
  emits: ["select-state"],
  props: {
    state: String,
    selected: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onClick() {
      this.$emit('select-state', { state: this.state })
    }
  },
});
</script>

<style scoped>
.state-header {
  @apply flex justify-start items-center gap-2;
 
  color: var(--text-color);
  cursor: pointer;
}

.state-info {
  @apply flex justify-center items-start gap-0.5 flex-col;

  color: var(--text-color);
}

.state-name {
  font-size: 14px;
  font-weight: 500;
}

.state-phone {
  font-size: 12px;
  font-weight: 300;
}

.state-card {
  @apply card flex-wrap shadow-lg block bg-base-300 p-3;
  min-width: 80%;
  flex-basis: 100%;
}

.state-body {
  @apply gap-2 card-body;

  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>
