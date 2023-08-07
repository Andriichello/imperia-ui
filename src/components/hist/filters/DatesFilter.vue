<template>
  <div class="dates">

    <div class="date">
      <div class="mb-2">
        <label class="label">
          <span class="label-text">{{ $t('history.filters.from') }}</span>
        </label>
        <input class="input input-bordered max-w-md w-full"
               :placeholder="$t('history.filters.from') + '...'"
               v-model="fromDisplay" readonly/>
      </div>

      <Calendar :selected-date="fromVal" :select-on-click="true"
                :no-buttons="true"
                @on-select="onStartSelect"/>
    </div>

    <div class="date">
      <div class="mb-2">
        <label class="label">
          <span class="label-text">{{ $t('history.filters.until') }}</span>
        </label>
        <input class="input input-bordered max-w-md w-full"
               :placeholder="$t('history.filters.until') + '...'"
               v-model="untilDisplay" readonly/>
      </div>

      <Calendar :selected-date="untilVal" :select-on-click="true"
                :no-buttons="true"
                @on-select="onEndSelect"/>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Calendar from "@/components/order/date/Calendar.vue";
import {dateFormatted} from "@/helpers";

export default defineComponent({
  name: 'DatesFilter',
  emits: ['from-select', 'until-select'],
  components: {
    Calendar,
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
    onStartSelect({ date }) {
      console.log({from: date})

      this.fromVal = date;
      this.$emit('from-select', { date });
    },
    onEndSelect({ date }) {
      console.log({until: date})

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
    @apply max-w-[300px];

    flex-grow: 1;
  }
</style>
