<template>
  <div class="dates">

    <div class="date">
      <div class="mb-2">
        <label class="label">
          <span class="label-text">From</span>
        </label>
        <input v-model="fromDisplay" readonly placeholder="From..." class="input input-bordered max-w-md w-full" />
      </div>

      <Calendar :selected-date="fromVal" :select-on-click="true" @date-select="onStartSelect"/>
    </div>

    <div class="date">
      <div class="mb-2">
        <label class="label">
          <span class="label-text">Until</span>
        </label>
        <input v-model="untilDisplay" readonly placeholder="Until..." class="input input-bordered max-w-md w-full" />
      </div>

      <Calendar :selected-date="untilVal" :select-on-click="true" @date-select="onEndSelect"/>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Calendar from "@/components/marketplace/calendar/Calendar.vue";
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
    @apply flex flex-wrap w-full justify-between;
  }

  .date {
    @apply max-w-[300px];

    flex-grow: 1;
  }
</style>
