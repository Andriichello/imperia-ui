<template>
  <div class="flex-col justify-start items-start">
    <div class="time text-md">
      <div class="grow-0 rounded bg-base-200 hover:bg-base-300">
        <BaseIcon :width="48" :height="48" title="time" :color="errors ? 'var(--red)' : 'currentColor'" class="grow-0 p-2.5">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4311 15.6925C15.3001 15.6925 15.1681 15.6585 15.0471 15.5875L11.2771 13.3385C11.0511 13.2025 10.9111 12.9575 10.9111 12.6935V7.84546C10.9111 7.43146 11.2471 7.09546 11.6611 7.09546C12.0761 7.09546 12.4111 7.43146 12.4111 7.84546V12.2675L15.8161 14.2975C16.1711 14.5105 16.2881 14.9705 16.0761 15.3265C15.9351 15.5615 15.6861 15.6925 15.4311 15.6925Z"/>
        </BaseIcon>
      </div>

      <div class="time-info">
        <span class="time-val font-semibold">{{ val(startAt) ?? $t('banquet.time.start') }}</span>
        <!--      <span class="time-label font-light" v-if="val(startAt)">Start</span>-->
      </div>

      <div class="p-1 time-info">
        <span>-</span>
      </div>

      <div class="time-info">
        <span class="time-val font-semibold">{{ val(endAt) ?? $t('banquet.time.end') }}</span>
        <!--      <span class="time-label font-light" v-if="val(endAt)">End</span>-->
      </div>
    </div>

    <label class="label flex-col items-start" v-if="errors">
      <span class="label-text-alt text-error text-sm" v-for="error in errors" :key="error">
        {{ error }}
      </span>
    </label>
  </div>
</template>

<script>
import { timeFormatted } from "@/helpers";
import { defineComponent } from "vue";
import BaseIcon from '@/components/icons/BaseIcon.vue';

export default defineComponent({
  // eslint-disable-next-line
  name: "Time",
  components: {
    BaseIcon,
  },
  props: {
    startAt: Date,
    endAt: Date,
    readonly: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: null,
    }
  },
  methods: {
    val(date) {
      if (!date) {
        return null
      }
      return timeFormatted(date); 
    }
  }
});
</script>


<style scoped>
.time {
  @apply flex flex-wrap gap-2 justify-start items-center;
}

.time-info {
  @apply flex justify-center items-center flex-col font-light;
}
</style>