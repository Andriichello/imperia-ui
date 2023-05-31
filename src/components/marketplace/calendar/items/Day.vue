<template>
  <div class="day">
    <button :class="{'selected': selected, 'highlighted': !selected && highlighted}" v-if="day !== null"
      @click="onDayClick()">
      <span :style="{'color': textColor()}">{{ day }}</span>
    </button> 
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Day",
  emits: ["day-click"],
  props: {
    day: {
      type: Number,
      default: null,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    highlighted: {
    type: Boolean,
      default: false,
    },
  },
  methods: {
    textColor() {
      return this.selected ? 'var(--d-black)' : 'var(--icon-color)';
    },
    onDayClick() {
      this.$emit('day-click', { day: this.day, selected: this.selected });
    }
  },
});
</script>

<style scoped>
.day {
  @apply p-1;

  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;

  flex-basis: 100%;
}

button {
  @apply btn btn-ghost btn-sm aspect-square;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}

.highlighted {
  --tw-border-opacity: 0;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.1;
}
</style>
