<template>
  <div>
      <div class="w-full flex flex-row justify-center items-center rounded" @click="showTable = !showTable">
        <div class="grow flex flex-col justify-center items-start cursor-pointer">
<!--          <h2 class="text-md font-semibold">{{ $t("schedule.working_schedule") }}</h2>-->
          <p class="text-md font-semibold">{{ statusDescription }}</p>
          <p class="text-sm">{{ timeBeforeOrUntil }}</p>
        </div>

        <button class="flex justify-center items-center w-[40px] h-[40px]">
          <BaseIcon :width="20" :height="20" color="currentColor" :class="{'rotated': showTable}">
            <path  d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
          </BaseIcon>
        </button>
      </div>

      <div class="w-full flex flex-col justify-start items-start" v-if="showTable">
        <div class="w-full overflow-x-auto">
          <table class="table table-sm w-full">
            <tbody class="w-full">
              <template v-for="(schedule) in schedules" :key="schedule.id">
                {{ void(active = isActive(schedule)) }}
                <tr>
                  <td class="p-2 grow" :class="{'font-light': !active, 'font-bold': active}">
                    <span>{{ $t("weekday." + schedule.weekday) }}</span>
                  </td>
                  <td class="p-2 w-[60px] text-end" :class="{'font-light': !active, 'font-bold': active}">
                    <span>{{ time(schedule.begHour, schedule.begMinute) }}</span>
                  </td>
                  <td class="p-2 w-[60px]" :class="{'font-light': !active, 'font-bold': active}">
                    <span>{{ time(schedule.endHour, schedule.endMinute) }}</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {DateTime} from "luxon";
import {Schedule, ScheduleWeekdayEnum} from "@/openapi";
import {filterAndSortSchedules, getCurrentUtcWithOffset, getUpcomingSchedules} from "@/helpers";

export default defineComponent({
  // eslint-disable-next-line
  name: "Schedule",
  components: {BaseIcon},
  props: {
    item: Restaurant,
  },
  data() {
    return {
      showTable: false,
    };
  },
  computed: {
    title() {
      return this.item.name;
    },
    address() {
      return this.item.place + ', ' + this.item.city +  ', ' + this.item.country;
    },
    schedules() {
      return filterAndSortSchedules(this.item?.schedules ?? []);
    },
    upcomingSchedules() {
      const now = getCurrentUtcWithOffset(this.timezoneOffset);
      return getUpcomingSchedules(now, this.schedules);
    },
    relevantSchedule() {
      return this.upcomingSchedules[0] ?? null;
    },
    activeSchedule() {
      const now = getCurrentUtcWithOffset(this.timezoneOffset);
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

      const now = getCurrentUtcWithOffset(this.timezoneOffset);
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
    isActive(schedule) {
      return this.activeSchedule?.weekday === schedule?.weekday;
    },
  },
});
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
}
</style>
