<template>
  <div class="card bg-base-300/50 p-1">
    <div class="flex flex-row flex-wrap w-full gap-4">
      <template v-for="schedule in schedules" :key="schedule.id">
        <div class="flex flex-col justify-center items-center flex-1">
          <span class="text-xs font-light capitalize">{{ schedule.weekday.substr(0, 3) }}</span>

          <div class="flex flex-col justify-center items-center">
            <span class="text-sm">{{ time(schedule.begHour, schedule.begMinute) }}</span>
            <span class="text-sm">-</span>
            <span class="text-sm">{{ time(schedule.endHour, schedule.endMinute) }}</span>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";

export default defineComponent({
  // eslint-disable-next-line
  name: "Schedule",
  props: {
    type: String,
    item: Restaurant,
  },
  computed: {
    title() {
      return this.item.name;
    },
    address() {
      return this.item.place + ', ' + this.item.city +  ', ' + this.item.country;
    },
    image() {
      const p = this.item;

      if (p.media && p.media.length) {
        return p.media[0].url;
      }

      if (p.defaultMedia && p.defaultMedia.length) {
        return p.defaultMedia[0].url;
      }

      return null;
    },
    schedules() {
      return this.item.schedules;
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
