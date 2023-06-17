<template>
  <div class="w-full flex flex-col justify-center items-start">
<!--    <h2 class="text-md">{{ $t("schedule.working_schedule") }}</h2>-->
    <p class="text-sm font-light">{{ statusDescription }} ({{ timeBeforeOrUntil }})</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";
import {DateTime} from "luxon";

export default defineComponent({
  // eslint-disable-next-line
  name: "ShortSchedule",
  props: {
    item: Restaurant,
  },
  computed: {
    schedules() {
      return this.item.schedules;
    },
    timezoneOffset() {
      return this.item.timezoneOffset ?? 0;
    },
    isOpen() {
      const current = this.schedules[0];

      const beg = DateTime.utc()
          .set({hours: current.begHour, minutes: current.begMinute, seconds: 0, milliseconds: 0})
          .minus({hours: this.timezoneOffset});

      const end = DateTime.utc()
          .set({hours: current.endHour, minutes: current.endMinute, seconds: 0, milliseconds: 0})
          .minus({hours: this.timezoneOffset});

      const now = DateTime.utc();

      return beg.toMillis() <= now.toMillis() && now.toMillis() <= end.toMillis();
    },
    statusDescription() {
      return this.isOpen ? this.$t("schedule.open") : this.$t("schedule.closed");
    },
    timeBeforeOrUntil() {
      const current = this.schedules[0];

      const beg = DateTime.utc()
          .set({hours: current.begHour, minutes: current.begMinute, seconds: 0, milliseconds: 0})
          .minus({hours: this.timezoneOffset});

      const end = DateTime.utc()
          .set({hours: current.endHour, minutes: current.endMinute, seconds: 0, milliseconds: 0})
          .minus({hours: this.timezoneOffset});

      const now = DateTime.utc();

      if (this.isOpen) {
        const minutes = Math.trunc(end.diff(now, 'minutes').values.minutes);
        const hours = Math.trunc(minutes / 60);

        return this.$t("schedule.T_until_closing", {time: this.time(hours, minutes % 60)});
      } else if (beg.toMillis() >= now.toMillis()) {
        const minutes = Math.trunc(beg.diff(now, 'minutes').values.minutes);
        const hours = Math.trunc(minutes / 60);

        return this.$t("schedule.T_before_opening", {time: this.time(hours, minutes % 60)});
      } else {
        const next = this.schedules[1];
        const nextBeg = DateTime.utc()
            .set({hours: next.begHour, minutes: next.begMinute, seconds: 0, milliseconds: 0})
            .minus({hours: this.timezoneOffset});

        const minutes = Math.trunc(nextBeg.diff(now, 'minutes').values.minutes);
        const hours = Math.trunc(minutes / 60);

        return this.$t("schedule.T_before_opening", {time: this.time(hours, minutes % 60)});
      }
    },
  },
  methods: {
    time(hour, minute) {
      let time = '';

      time += hour < 10 ? '0' + hour : hour;

      time += ':'

      time += minute < 10 ? '0' + minute : minute;

      return time;
    },
  },
});
</script>

<style scoped>

</style>
