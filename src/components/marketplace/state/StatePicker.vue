<template>
  <div class="states"> 
    <div class="states-actions">
      <button class="btn btn-ghost w-14 h-14 p-2"
        @click="this.$emit('close-picker')">
        <BaseIcon title="back" :color="iconColor()" :width="24" :height="24" viewBox="0 0 24 24">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" :stroke="iconColor()" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
    </button>
    </div>

    <StateList :states="states" :selected="selected" class="states-list" @select-state="onSelectState"/> 
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import StateList from "@/components/marketplace/state/list/StateList.vue";

export default defineComponent({
  name: "StatePicker",
  emits: ["close-picker", "state-select"],
  components: {
    BaseIcon,
    StateList,
  },
  props: {
    states: {
      type: Array,
      default: null
    },
    selected: {
      type: String,
      default: null,
    },
  },
  methods: {
    iconColor() {
      return 'currentColor';
    },
    onSelectState({ state }) {
      this.$emit('state-select', { state })
    },
  },
});
</script>


<style scoped>
.states {
  @apply w-full;

  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
}

.states-actions {
  @apply flex w-full;

  margin-left: auto;
  margin-right: auto;
}

.states-list {
  max-width: 300px;

  margin-left: auto;
  margin-right: auto;
}

.switcher {
  @apply flex flex-row items-center;

  flex-wrap: nowrap;

  flex: 0 1 auto;
  overflow-x: auto;

  margin-left: auto;
  margin-right: auto;
}

.blurred {
  --tw-border-opacity: 0;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.1;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>