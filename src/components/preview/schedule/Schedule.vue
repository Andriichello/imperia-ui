<template>
  <div>
      <div class="w-full flex flex-row justify-center items-center btn-ghost rounded px-2 py-1" @click="showTable = !showTable">
        <div class="grow flex flex-col justify-center items-start">
          <h2 class="text-md font-bold">{{ $t("schedule.working_schedule") }}</h2>
          <p class="text-md">{{ statusDescription }} ({{ timeBeforeOrUntil }})</p>
        </div>

        <button class="flex justify-center items-center w-[40px] h-[40px]">
          <BaseIcon :width="20" :height="20" color="currentColor" :class="{'rotated': showTable}">
            <path  d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
          </BaseIcon>
        </button>
      </div>

      <div class="w-full flex flex-col justify-start items-start px-2" v-if="showTable">
        <div class="w-full overflow-x-auto">
          <table class="table table-sm w-full">
            <tbody class="w-full">
              <template v-for="(schedule, index) in schedules" :key="schedule.id">
                <tr >
                  <td class="p-2 grow" :class="{'font-light': !isOpen || index !== 0, 'font-bold': isOpen && index === 0}">
                    <span>{{ $t("weekday." + schedule.weekday) }}</span>
                  </td>
                  <td class="p-2 w-[60px] text-end" :class="{'font-light': !isOpen || index !== 0, 'font-bold': isOpen && index === 0}">
                    <span>{{ time(schedule.begHour, schedule.begMinute) }}</span>
                  </td>
                  <td class="p-2 w-[60px]" :class="{'font-light': !isOpen || index !== 0, 'font-bold': isOpen && index === 0}">
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
    DateTime() {
      return DateTime
    },
    title() {
      return this.item.name;
    },
    address() {
      return this.item.place + ', ' + this.item.city +  ', ' + this.item.country;
    },
    schedules() {
      return this.item.schedules;
    },
    scheduleBeg(schedule) {
      return DateTime.utc()
          .set({hours: schedule.begHour, minutes: schedule.begMinute, seconds: 0, milliseconds: 0})
          .minus({minutes: this.timezoneOffset});
    },
    scheduleEnd(schedule) {
      return DateTime.utc()
          .set({hours: schedule.begHour, minutes: schedule.begMinute, seconds: 0, milliseconds: 0})
          .minus({minutes: this.timezoneOffset});
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

        return this.$t("schedule.T_until_closing", {time: this.time(hours, minutes % 60)});
      } else if (beg.toMillis() >= now.toMillis()) {
        const minutes = Math.trunc(beg.diff(now, 'minutes').values.minutes);
        const hours = Math.trunc(minutes / 60);

        return this.$t("schedule.T_before_opening", {time: this.time(hours, minutes % 60)});
      } else {
        const next = this.schedules[1];
        const nextBeg = DateTime.utc()
            .set({hours: next.begHour, minutes: next.begMinute, seconds: 0, milliseconds: 0})
            .minus({minutes: this.timezoneOffset});

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
.rotated {
  transform: rotate(180deg);
}
</style>
