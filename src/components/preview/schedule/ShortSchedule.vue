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
      return this.item.schedules.filter((schedule) => !schedule.archived);
    },
    upcomingSchedules() {
      const now = this.getCurrentUtcWithOffset(this.timezoneOffset);
      return this.getUpcomingSchedules(now, this.schedules);
    },
    relevantSchedule() {
      return this.upcomingSchedules[0] ?? null;
    },
    activeSchedule() {
      const now = this.getCurrentUtcWithOffset(this.timezoneOffset);
      const relevant = this.relevantSchedule;

      if (relevant && relevant.closestBegDate <= now && now <= relevant.closestEndDate) {
        return relevant;
      }

      return null;
    },
    timezoneOffset() {
      return this.item.timezoneOffset ?? 0;
    },
    isOpen() {
      return !!this.activeSchedule;
    },
    statusDescription() {
      return this.isOpen ? this.$t("schedule.open") : this.$t("schedule.closed");
    },
    timeBeforeOrUntil() {
      if (!this.relevantSchedule) {
        return '-';
      }

      const now = this.getCurrentUtcWithOffset(this.timezoneOffset);
      const beg = this.relevantSchedule.closestBegDate;
      const end = this.relevantSchedule.closestEndDate;

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
    getCurrentUtcWithOffset(timezoneOffset) {
      // Get the current UTC time and apply the timezone offset
      return DateTime.utc()
          .plus({minutes: timezoneOffset});
    },
    getNextOccurrence(baseDate, weekday) {
      // Map weekday name to a number (1 = Monday, 7 = Sunday)
      const weekdayMap = {
        monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7,
      };
      const targetWeekday = weekdayMap[weekday.toLowerCase()];

      let daysUntilNext = (targetWeekday + 7 - baseDate.weekday) % 7;
      // if (daysUntilNext === 0) daysUntilNext = 0; // Skip to next week if today is the target weekday

      return baseDate.plus({days: daysUntilNext});
    },
    getUpcomingSchedules(now, schedules, timezoneOffset) {
      const upcomingSchedules = [];

      schedules.forEach(schedule => {
        // Find the next occurrence of the schedule's weekday
        let nextOccurrenceBeg = this.getNextOccurrence(now, schedule.weekday)
            .set({hour: schedule.begHour, minute: schedule.begMinute, second: 0, millisecond: 0})
            .minus({minutes: timezoneOffset}); // Adjust back to UTC

        let nextOccurrenceEnd = this.getNextOccurrence(now, schedule.weekday)
            .set({hour: schedule.endHour, minute: schedule.endMinute, second: 0, millisecond: 0})
            .minus({minutes: timezoneOffset}); // Adjust back to UTC

        // Handle cross-date schedules (end time is before start time)
        if (nextOccurrenceEnd < nextOccurrenceBeg) {
          nextOccurrenceEnd = nextOccurrenceEnd.plus({days: 1});
        }


        if (nextOccurrenceBeg.toMillis() < now.toMillis()) {
          if (nextOccurrenceEnd > now.toMillis()) {
            upcomingSchedules.push({
              weekday: schedule.weekday,
              closestBegDate: nextOccurrenceBeg,
              closestEndDate: nextOccurrenceEnd,
            });

            nextOccurrenceBeg = nextOccurrenceBeg.plus({days: 7});
            nextOccurrenceEnd = nextOccurrenceEnd.plus({days: 7});
          } else {
            nextOccurrenceBeg = nextOccurrenceBeg.plus({days: 7});
            nextOccurrenceEnd = nextOccurrenceEnd.plus({days: 7});
          }
        }

        upcomingSchedules.push({
          weekday: schedule.weekday,
          closestBegDate: nextOccurrenceBeg,
          closestEndDate: nextOccurrenceEnd,
        });
      });

      return upcomingSchedules.sort((a, b) => a.closestBegDate - b.closestBegDate);
    },
  },
});
</script>

<style scoped>

</style>
