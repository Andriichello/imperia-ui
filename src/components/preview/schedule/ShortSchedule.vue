<template>
  <div class="w-full flex flex-col justify-center items-start">
<!--    <h2 class="text-md font-bold">{{ $t("schedule.working_schedule") }}</h2>-->
    <p class="text-md font-semibold">{{ statusDescription }}</p>
    <p class="text-sm">{{ timeBeforeOrUntil }}</p>
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
          .minus({minutes: this.timezoneOffset});

      const end = DateTime.utc()
          .set({hours: current.endHour, minutes: current.endMinute, seconds: 0, milliseconds: 0})
          .minus({minutes: this.timezoneOffset});

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
          .minus({minutes: this.timezoneOffset});

      const end = DateTime.utc()
          .set({hours: current.endHour, minutes: current.endMinute, seconds: 0, milliseconds: 0})
          .minus({minutes: this.timezoneOffset});

      const now = DateTime.utc();

      if (this.isOpen) {
        const minutes = Math.trunc(end.diff(now, 'minutes').values.minutes);
        const hours = Math.trunc(minutes / 60);

        let time = '';

        if (hours > 0) {
          time += hours + ' ' + this.$t('schedule.hour_short');
        }

        if (minutes % 60 > 0) {
          if (hours > 0) {
            time += ' ';
          }

          time += (minutes % 60) + ' ' + this.$t('schedule.minute_short');
        }

        return this.$t("schedule.T_until_closing", {time});
      } else if (beg.toMillis() >= now.toMillis()) {
        const minutes = Math.trunc(beg.diff(now, 'minutes').values.minutes);
        const hours = Math.trunc(minutes / 60);

        let time = '';

        if (hours > 0) {
          time += hours + ' ' + this.$t('schedule.hour_short');
        }

        if (minutes % 60 > 0) {
          if (hours > 0) {
            time += ' ';
          }

          time += (minutes % 60) + ' ' + this.$t('schedule.minute_short');
        }

        return this.$t("schedule.T_before_opening", {time});
      } else {
        const next = this.schedules[0];

        let nextBeg = DateTime.utc()
            .set({hours: next.begHour, minutes: next.begMinute, seconds: 0, milliseconds: 0})
            .minus({minutes: this.timezoneOffset});

        if (next.closestDate) {
          nextBeg = DateTime.fromJSDate(next.closestDate)
              .minus({minutes: this.timezoneOffset});
        } else {
          const weekdays = {
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6,
            sunday: 7,
          };

          const nextWeekdayNumber = weekdays[next.weekday];
          while (nextBeg.weekday !== nextWeekdayNumber) {
            nextBeg = nextBeg.plus({'days': 1});
          }
        }

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
