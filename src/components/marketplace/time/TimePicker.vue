<template>
  <div class="time"> 
    <div class="time-actions">
      <button class="btn btn-ghost w-14 h-14 p-2"
        @click="this.$emit('close-picker')">
        <BaseIcon title="back" :color="iconColor()" :width="24" :height="24" viewBox="0 0 24 24">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" :stroke="iconColor()" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
    </button>
    </div>

    <div class="time-card">
      <div class="time-card-body">
        <div class="time-card-entry">
          <span class="time-header">Start</span>
          <Time :h="startDate ? startDate.getUTCHours() : 0" :m="startDate ? startDate.getUTCMinutes() : 0" @time-change="onStartAtChange({})"/> 
        </div>

        <span class="time-header ">-</span>

        <div class="time-card-entry">
          <span class="time-header">End</span>
          <Time :h="endDate ? endDate.getUTCHours() : 0" :m="endDate ? endDate.getUTCMinutes() : 0" @time-change="onEndAtChange"/> 
        </div>
      </div>
      
      <SaveButton :loading="false" class="p-0" @save-clicked="onTimeSelect()"/>
    </div>
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import Time from "@/components/marketplace/time/Time.vue";
import SaveButton from "@/components/marketplace/basket/SaveButton.vue";

export default defineComponent({
  name: "TimePicker",
  emits: ["close-picker", "time-select"],
  components: {
    BaseIcon,
    Time,
    SaveButton,
  },
  props: {
    startAt: {
      default: null
    },
    endAt: {
      default: null
    },
  },
  data() {
    return {
      startDate: this.startAt ? new Date(this.startAt.getTime()) : new Date(),
      endDate: this.endAt ? new Date(this.endAt.getTime()) : new Date(),
    };
  },
  methods: {
    iconColor() {
      return 'currentColor';
    },
    onTimeSelect() {
      this.$emit('time-select', { startAt: this.startDate, endAt: this.endDate });
    },
    onStartAtChange({ hour, minute }) {
      this.startDate.setUTCHours(hour);
      this.startDate.setUTCMinutes(minute);
    },
    onEndAtChange({ hour, minute }) {
      this.endDate.setUTCHours(hour);
      this.endDate.setUTCMinutes(minute);
    },
  },
});
</script>


<style scoped>
.time {
  @apply w-full;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
}

.time-actions {
  @apply flex w-full pb-3;

  margin-left: auto;
  margin-right: auto;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}

.time-header {
  @apply text-center text-xl text-current font-semibold;
}

.time-card {
  @apply card flex flex-col bg-base-300 p-2;
}

.time-card-body {
  @apply card flex flex-row p-2 gap-3;
}

.time-card-entry {
  @apply flex flex-col bg-base-300 justify-center items-center;
}
</style>