<template>
  <div class="w-full flex flex-col justify-center items-start">
<!--    <h2 class="text-md">{{ $t("schedule.working_schedule") }}</h2>-->
    <p class="text-sm font-light">{{ statusDescription }} ({{ timeBeforeOrUntil }})</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";

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
    isOpen() {
      const current = this.schedules[0];

      const beg = new Date();
      beg.setUTCHours(current.begHour, current.begHour, 0, 0);

      const end = new Date();
      end.setUTCHours(current.endHour, current.endHour, 0, 0);

      const now = new Date();

      return beg.getTime() <= now.getTime() && now.getTime() <= end.getTime();
    },
    statusDescription() {
      return this.isOpen ? this.$t("schedule.open") : this.$t("schedule.closed");
    },
    timeBeforeOrUntil() {
      const current = this.schedules[0];

      const beg = new Date();
      beg.setUTCHours(current.begHour, current.begHour, 0, 0);

      const end = new Date();
      end.setUTCHours(current.endHour, current.endHour, 0, 0);

      const now = new Date();
      now.setUTCHours(now.getHours(), now.getMinutes(), now.getSeconds())

      if (this.isOpen) {
        const minutes = Math.ceil(Math.abs(end - now) / (60 * 1000));
        const hours = Math.ceil(minutes / 60);

        return this.$t("schedule.T_until_closing", {time: this.time(hours, minutes % 60)});
      } else if (beg.getTime() >= now.getTime()) {
        const minutes = Math.ceil(Math.abs(beg - now) / (60 * 1000));
        const hours = Math.ceil(minutes / 60);

        return this.$t("schedule.T_before_opening", {time: this.time(hours, minutes % 60)});
      } else {
        const next = this.schedules[1];
        const nextBeg = new Date();
        beg.setUTCHours(next.begHour, next.begHour, 0, 0);

        const minutes = Math.ceil(Math.abs(nextBeg - now) / (60 * 1000));
        const hours = Math.ceil(minutes / 60);

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
