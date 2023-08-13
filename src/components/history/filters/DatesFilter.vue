<template>
  <div class="dates">

    <div class="date">
      <div class="flex justify-between items-end w-full gap-1">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ $t('history.filters.from') }}</span>
          </label>
          <input class="input input-bordered max-w-md w-full cursor-pointer"
                 :placeholder="$t('history.filters.from') + '...'"
                 v-model="fromDisplay" readonly
                 @click="onFromClicked"/>
        </div>

        <div class="btn btn-square btn-ghost" v-if="fromVal"
             @click="onStartSelect({ date: null })" >
          <BaseIcon width="24" height="24" color="currentColor">
            <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg); transform-origin: center;"/>
          </BaseIcon>
        </div>
      </div>

<!--      <Calendar :selected-date="fromVal" :select-on-click="true"-->
<!--                :no-buttons="true"-->
<!--                @on-select="onStartSelect"/>-->
    </div>

    <div class="date">
      <div class="flex justify-between items-end w-full gap-1">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ $t('history.filters.until') }}</span>
          </label>
          <input class="input input-bordered max-w-md w-full cursor-pointer"
                 :placeholder="$t('history.filters.until') + '...'"
                 v-model="untilDisplay" readonly
                 @click="onUntilClicked"/>
        </div>

        <div class="btn btn-square btn-ghost" v-if="untilVal"
             @click="onEndSelect({ date: null })">
          <BaseIcon width="24" height="24" color="currentColor">
            <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg); transform-origin: center;"/>
          </BaseIcon>
        </div>
      </div>

<!--      <Calendar :selected-date="untilVal" :select-on-click="true"-->
<!--                :no-buttons="true"-->
<!--                @on-select="onEndSelect"/>-->
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Calendar from "@/components/order/date/Calendar.vue";
import {dateFormatted} from "@/helpers";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  name: 'DatesFilter',
  emits: ['from-select', 'until-select', 'from-clicked', 'until-clicked'],
  components: {
    BaseIcon
    // Calendar,
  },
  props: {
    from: {
      type: Date,
      default: null,
    },
    until: {
      type: Date,
      default: null,
    },
  },
  data() {
    return {
      fromVal: this.from,
      untilVal: this.until,
    };
  },
  watch: {
    from(newVal) {
      this.fromVal = newVal;
    },
    until(newVal) {
      this.untilVal = newVal;
    },
  },
  computed: {
    fromDisplay() {
      return dateFormatted(this.fromVal);
    },
    untilDisplay() {
      return dateFormatted(this.untilVal);
    },
  },
  methods: {
    onFromClicked() {
      this.$emit('from-clicked');
    },
    onUntilClicked() {
      this.$emit('until-clicked');
    },
    onStartSelect({ date }) {
      this.fromVal = date;
      this.$emit('from-select', { date });
    },
    onEndSelect({ date }) {
      this.untilVal = date;
      this.$emit('until-select', { date });
    },
  },
})
</script>

<style scoped>
  .dates {
    @apply flex flex-wrap w-full justify-center gap-3;
  }

  .date {
    @apply max-w-[300px] grow;

    flex-grow: 1;
  }
</style>
