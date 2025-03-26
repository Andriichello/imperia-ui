<template>
  <div>
      <div class="w-full flex flex-row justify-center items-center rounded" @click="showTable = !showTable">
        <div class="flex justify-center items-center pr-5">
          <BaseIcon width="28" height="28" color="currentColor" view-box="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4311 15.6925C15.3001 15.6925 15.1681 15.6585 15.0471 15.5875L11.2771 13.3385C11.0511 13.2025 10.9111 12.9575 10.9111 12.6935V7.84546C10.9111 7.43146 11.2471 7.09546 11.6611 7.09546C12.0761 7.09546 12.4111 7.43146 12.4111 7.84546V12.2675L15.8161 14.2975C16.1711 14.5105 16.2881 14.9705 16.0761 15.3265C15.9351 15.5615 15.6861 15.6925 15.4311 15.6925Z"/>
          </BaseIcon>
        </div>

        <div class="grow flex flex-col justify-center items-start cursor-pointer">
<!--          <h2 class="text-md font-semibold">{{ $t("schedule.working_schedule") }}</h2>-->
          <p class="text-lg font-semibold">{{ statusDescription }}</p>
          <p class="text-md">{{ timeBeforeOrUntil }}</p>
        </div>

        <button class="flex justify-center items-center w-[40px] h-[40px]">
          <BaseIcon :width="20" :height="20" color="currentColor" :class="{'rotated': showTable}">
            <path  d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
          </BaseIcon>
        </button>
      </div>

      <div class="w-full flex flex-col justify-start items-start mt-1" v-if="showTable">
        <div class="w-full overflow-x-auto">
          <table class="table table-sm w-full">
            <tbody class="w-full text-md">
              <template v-for="(schedule) in schedules" :key="schedule.id">
                {{ void(active = isActive(schedule)) }}
                <tr :class="{'bg-base-200': active}">
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
import Restaurant from "@/openapi/models/Restaurant.ts";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {DateTime} from "luxon";
import {Schedule, ScheduleWeekdayEnum} from "@/openapi";
import {filterAndSortSchedules, getCurrentUtcWithOffset, getUpcomingSchedules} from "@/helpers";

export default defineComponent({
  // eslint-disable-next-line
  name: "SideSchedule",
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
      if (this.activeSchedule) {
        return this.activeSchedule?.weekday === schedule?.weekday;
      }

      return this.relevantSchedule?.weekday === schedule?.weekday;
    },
  },
});
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
}
</style>
