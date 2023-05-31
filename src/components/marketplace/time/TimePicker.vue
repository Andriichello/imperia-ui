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
          <Time :h="s.hour" :m="s.minute" @time-change="onStartAtChange"/> 
        </div>

        <span class="time-header ">-</span>

        <div class="time-card-entry">
          <span class="time-header">End</span>
          <Time :h="e.hour" :m="e.minute" @time-change="onEndAtChange"/> 
        </div>
      </div>
      
      <SaveButton :loading="false" class="p-0" @save-clicked="onTimeSelect()" v-show="changed"/>
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
      type: Date,
      default: null,  
    },
    endAt: {
      type: Date,
      default: null,  
    },
  },
  data() {
    const s = { hour: 0, minute: 0 };
    if (this.startAt instanceof Date) {
      s.hour = this.startAt.getUTCHours();
      s.minute = this.startAt.getUTCMinutes();
    }

    const e = { hour: 0, minute: 0 };
    if (this.endAt instanceof Date) {
      e.hour = this.endAt.getUTCHours();
      e.minute = this.endAt.getUTCMinutes();
    }

    return {
      s,
      e,
    };
  },
  computed: {
    changed() {
      if (this.startAt instanceof Date) {
        let result = this.s.hour === this.startAt.getUTCHours() 
          && this.s.minute === this.startAt.getUTCMinutes();
      
        if (!result) {
          return true;
        }
      } else if (this.startAt === null) {
        return this.s.hour !== 0 || this.s.minute !== 0;
      }

      if (this.endAt instanceof Date) {
        let result = this.e.hour === this.endAt.getUTCHours() 
          && this.e.minute === this.endAt.getUTCMinutes();
      
        if (!result) {
          return true;
        }
      } else if (this.endAt === null) {
        return this.s.hour !== 0 || this.s.minute !== 0;
      }


      return false;
    },
  },
  methods: {
    iconColor() {
      return 'currentColor';
    },
    onStartAtChange({ hour, minute }) {
      this.s.hour = hour;
      this.s.minute = minute;
    },
    onEndAtChange({ hour, minute }) {
      this.e.hour = hour;
      this.e.minute = minute;
    },
    onTimeSelect() {
      this.$emit('time-select', { start: this.s, end: this.e });
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