<template>
  <div class="w-full max-w-[200px] flex justify-center items-center">
    <div class="form-control w-full max-w-[200px] flex flex-row justify-start items-start gap-2">
      <div class="flex justify-center start-center mt-1.5">
        <BaseIcon title="time" :color="color" :width="24" :height="24" viewBox="0 0 24 24">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4311 15.6925C15.3001 15.6925 15.1681 15.6585 15.0471 15.5875L11.2771 13.3385C11.0511 13.2025 10.9111 12.9575 10.9111 12.6935V7.84546C10.9111 7.43146 11.2471 7.09546 11.6611 7.09546C12.0761 7.09546 12.4111 7.43146 12.4111 7.84546V12.2675L15.8161 14.2975C16.1711 14.5105 16.2881 14.9705 16.0761 15.3265C15.9351 15.5615 15.6861 15.6925 15.4311 15.6925Z"/>
        </BaseIcon>
      </div>

      <input class="input input-xs w-full text-[16px] font-semibold px-1 bg-transparent"
             style="min-height: 2rem;"
             :style="{'color': color}"
             maxlength="5"
             name="time" type="text" v-model="timeVal"
             :placeholder="$t('product.serving_time') + '...'"
             @focusout="onFocusOut"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: 'ServingTime',
  emits: ["on-update"],
  components: {BaseIcon},
  props: {
    time: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      timeVal: this.time,
      isValid: this.validate(this.time),
    }
  },
  computed: {
    color() {
      if (this.errors.length) {
        return 'var(--red)';
      }

      return this.timeVal?.length > 0 ? 'currentColor' : 'var(--hint-color)';
    },
    errors() {
      if (!this.isValid) {
        return ['Invalid time'];
      }

      return [];
    },
  },
  watch: {
    timeVal(newVal, oldVal) {
      if (newVal === ((oldVal ? oldVal : '') + ' ')) {
        if (/^\d+\s*$/.test(newVal)) {
          this.timeVal = newVal.trim(' ') + ':';
        }
      }

      this.isValid = this.validate(this.timeVal);
      this.onUpdate({time: newVal});
    },
  },
  methods: {
    onUpdate({time}) {
      this.$emit('on-update', {time})
    },
    onFocusOut() {
      this.timeVal = this.autocomplete(this.timeVal);
      this.isValid = this.validate(this.timeVal);
    },
    validate(time) {
      if (time === null || time.trim().length === 0) {
        return true;
      }

      if (/^\s*\d\s*$/.test(time)) {
        return true;
      }

      if (/^\s*\d\d\s*$/.test(time)) {
        const val = time.trim(' ');

        let hours = val.slice(0, 1);
        let minutes = val.slice(1);

        if (hours >= 2) {
          return minutes < 6;
        }

        return true;
      }

      if (/^\s*\d\d\d\s*$/.test(time)) {
        const val = time.trim(' ');

        let hours = val.slice(0, 2);
        let minutes = val.slice(2);

        if (hours > 23) {
          hours = val.slice(0, 1);
          minutes = val.slice(1);

          return minutes < 59;
        } else {
          return minutes < 6;
        }
      }

      if (/^\s*\d\d\d\d\s*$/.test(time)) {
        const val = time.trim(' ');

        let hours = val.slice(0, 2);
        let minutes = val.slice(2);

        if (hours > 23) {
          return false;
        }

        if (minutes > 59) {
          return false;
        }

        return true;
      }

      let isValidMinute = /^.*:[0-5]?[0-9]?\s*$/.test(time);
      let isSingleDigitHour = /^[0-9]:?.*$/.test(time);
      let isDoubleDigitHour = /^[0-1][0-9]:?.*$/.test(time) || /^[2][0-3]:?.*$/.test(time);

      return isValidMinute &&
          (isSingleDigitHour || isDoubleDigitHour);
    },
    autocomplete(time) {
      if (time === null) {
        return '';
      }


      if (/^\s*\d{3,4}\s*$/.test(time)) {
        const val = time.trim(' ');

        const hours = val.slice(0, 2);
        const minutes = val.slice(2);

        if (hours > 23) {
          return time;
        }

        if (minutes.length === 1) {
          if (minutes > 5) {
            return time;
          }
        } else if (minutes > 59) {
          return time;
        }

        return hours + ':' + minutes + (minutes.length === 1 ? '0' : '');
      }

      if (/^\d{1,2}\s*$/.test(time)) {
        if (time > 23) {
          return time;
        }

        return time.trim(' ') + ':' + '00';
      }

      if (/^\d{1,2}:$/.test(time)) {
        if (time.trim(':') > 23) {
          return time;
        }

        return time + '00';
      }

      if (/^\d{1,2}:\d$/.test(time)) {
        const hours = time.split(':')[0];
        const minutes = time.split(':')[1];

        if (hours > 23) {
          return time;
        }

        if (minutes > 59) {
          return time;
        }

        return hours + ':' + (minutes > 5 ? '0' + minutes : minutes + '0');
      }

      return time;
    },
  }

})
</script>

<style scoped>

</style>
