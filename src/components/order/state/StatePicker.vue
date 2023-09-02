<template>
  <div class="state">
    <div class="state-card">
      <div class="state-card-body">
        <StateList :states="states" :selected="stateVal"
          @change-state="onChangeState"/>
      </div>

      <div class="w-full flex justify-center items-center gap-1 mt-2">
        <button class="btn btn-md grow"
                @click="onCancelClick">
          {{ $t('banquet.calendar.cancel') }}
        </button>
        <button class="btn btn-md btn-primary grow"
                v-if="selected !== stateVal"
                @click="onSelectClick">
          {{ $t('banquet.calendar.select') }}
        </button>
      </div>
    </div>
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import StateList from "@/components/order/state/StateList.vue";

export default defineComponent({
  name: "TimePicker",
  emits: ["on-select", "on-cancel"],
  components: {
    StateList,
  },
  props: {
    states: {
      type: Array,
    },
    selected: {
      type: String,
    },
  },
  data() {
    return {
      stateVal: this.selected,
    }
  },
  methods: {
    iconColor() {
      return 'currentColor';
    },
    onChangeState({ state }) {
      this.stateVal = state;
    },
    onCancelClick() {
      this.$emit('on-cancel');
    },
    onSelectClick() {
      this.$emit('on-select', {state: this.stateVal});
    },
  },
});
</script>


<style scoped>
.state {
  @apply w-full;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}

.state-card {
  @apply card flex flex-col justify-start items-start;
}

.state-card-body {
  @apply w-full card flex flex-row p-2 gap-3;
}

.state-card-entry {
  @apply flex flex-col justify-center items-center;
}
</style>