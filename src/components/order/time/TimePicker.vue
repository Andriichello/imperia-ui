<template>
  <div class="time">
    <div class="time-card">
      <div class="time-card-body">
        <div class="time-card-entry">
          <span class="time-header">{{ $t('banquet.time.start') }}</span>
          <Time :h="s.hour" :m="s.minute" @time-change="onStartAtChange"/> 
        </div>

        <span class="time-header ">-</span>

        <div class="time-card-entry">
          <span class="time-header">{{ $t('banquet.time.end') }}</span>
          <Time :h="e.hour" :m="e.minute" @time-change="onEndAtChange"/> 
        </div>
      </div>

      <div class="w-full flex justify-center items-center gap-1 mt-2">
        <button class="btn btn-sm grow"
                @click="onCancelClick">
          {{ $t('banquet.calendar.cancel') }}
        </button>
        <button class="btn btn-sm btn-primary grow"
                v-if="changed"
                @click="onSelectClick">
          {{ $t('banquet.calendar.select') }}
        </button>
      </div>
    </div>
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import Time from "@/components/marketplace/time/Time.vue";

export default defineComponent({
  name: "TimePicker",
  emits: ["on-select", "on-cancel"],
  components: {
    Time,
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
        if (this.s.hour !== 0 || this.s.minute !== 0) {
          return true
        }
      }

      if (this.endAt instanceof Date) {
        let result = this.e.hour === this.endAt.getUTCHours() 
          && this.e.minute === this.endAt.getUTCMinutes();
      
        if (!result) {
          return true;
        }
      } else if (this.endAt === null) {
        if (this.e.hour !== 0 || this.e.minute !== 0) {
          return true
        }
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
    onCancelClick() {
      this.$emit('on-cancel');
    },
    onSelectClick() {
      this.$emit('on-select', { start: this.s, end: this.e });
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
  @apply card flex flex-col justify-start items-start;
}

.time-card-body {
  @apply card flex flex-row p-2 gap-3;
}

.time-card-entry {
  @apply flex flex-col justify-center items-center;
}
</style>