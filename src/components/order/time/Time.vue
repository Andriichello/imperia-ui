<template>
  <div class="time-picker">
    <div class="hour">
      <BaseIcon color="currentColor" class="hour-up" @click="hourUp()">
        <path d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
      </BaseIcon>
      <input type="number" class="hour-input"
        :value="hour" @input="onHourChange($event.target.value)"/>
      <BaseIcon color="currentColor" class="hour-down" @click="hourDown()">
        <path d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
      </BaseIcon>
    </div>

    <div class="separator">:</div>

    <div class="minute">
       <BaseIcon color="currentColor" class="minute-up" @click="minuteUp()">
        <path d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
      </BaseIcon>
      <input type="number" class="minute-input"
        :value="minute" @input="onMinuteChange($event.target.value)"/>
      <BaseIcon color="currentColor" class="minute-down" @click="minuteDown()">
        <path d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
      </BaseIcon>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Time",
  emits: ["on-change"],
  components: {
    BaseIcon,
  },
  props: {
    h: {
      type: Number,
      default: 0,
    },
    m: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      hourVal: this.h,
      minuteVal: this.m,
    };
  },
  watch: {
    hourVal: function(newVal, oldVal) {
      this.$emit('on-change', { hour: this.hourVal, minute: this.minuteVal });
    },
    minuteVal: function(newVal, oldVal) {
      this.$emit('on-change', { hour: this.hourVal, minute: this.minuteVal });
    },
  },
  computed: {
    hour: {
      get() {
        return this.formatted(this.hourVal);
      },
      set(val) {
        const diff = val - this.hourVal;

        if (diff === 1) {
          this.hourUp();
        } else if (diff === -1) {
          this.hourDown();
        } else {
          val = parseInt(val);

          this.hourVal = val;
          if (val < 0) {
            this.hourVal = 0;
          } else if (val > 23) {
            this.hourVal = 23;
          }
        }
      },
    },
    minute: {
      get() {
        return this.formatted(this.minuteVal);
      },
      set(val) {
        const diff = val - this.minuteVal;

        if (diff === 1) {
          this.minuteUp();
        } else if (diff === -1) {
          this.minuteDown();
        } else {
          val = parseInt(val);

          this.minuteVal = val;
          if (val < 0) {
            this.minuteVal = 0;
          } else if (val > 59) {
            this.minuteVal = 59;
          }
        }
      },
    },
  },
  methods: {
    formatted(time) {
      let val = parseInt(time);
      if (val < 10) {
        val = val.toString().padStart(2, '0');
      }

      return val;
    },
    hourUp() {
      let val = this.hourVal;

      val = val + 1;
      if (val > 23) {
        val = 0;
      }

      this.hourVal = val;
    },
    hourDown() {
      let val = this.hourVal;

      val = val - 1;
      if (val < 0) {
        val = 23;
      }

      this.hourVal = val;
    },
    minuteUp() {
      let val = this.minuteVal;

      val = val + 1;
      if (val > 59) {
        val = 0;
        this.hourUp();
      }

      this.minuteVal = val;
    },
    minuteDown() {
      let val = this.minuteVal;

      val = val - 1;
      if (val < 0) {
        val = 59;
        this.hourDown();
      }

      this.minuteVal = val;
    },
    onHourChange(hour) {
      this.hour = hour;
    },  
    onMinuteChange(minute) {
      this.minute = minute;
    },
  },
});
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.time-picker {
  @apply flex flex-wrap text-xl text-current justify-center items-center;
}

.time-picker input {
  @apply flex-wrap w-8;

  background: none;
  appearance: none;
  border: none;
  outline: none;
  display: block;
  text-align: center;
}

.hour, .minute {
  @apply flex flex-col justify-center items-center;
}

.hour-up, .minute-up {
  transform: rotate(180deg);
}

.hour-up, .hour-down, .minute-up, .minute-down {
  @apply w-6 h-6 p-1 btn-ghost rounded-md;
}
</style>
