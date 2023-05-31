<template>
  <div class="weekday">
    <button>
      <span :style="{'color': 'var(--icon-color)'}">{{ weekday }}</span>
    </button> 
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Weekday",
  props: {
    weekday: {
      type: String,
      default: null,
    },
  },
});
</script>

<style scoped>
.weekday {
  @apply p-1;

  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;

  flex-basis: 100%;
}

button {
  @apply btn btn-ghost btn-sm aspect-square no-animation;
}

button:hover {
  background-color: transparent;
}
</style>
