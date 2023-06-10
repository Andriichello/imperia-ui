<template>
  <div class="card">
    <div tabindex="0" class="collapse collapse-arrow">
      <input type="checkbox" class="peer"/>
      <div class="collapse-title">
        <h2 class="text-md">Working schedule</h2>
        <p class="text-sm font-light">{{ statusDescription }} ({{ timeBeforeOrUntil }})</p>
      </div>
      <div class="collapse-content w-full flex flex-col justify-start items-start">
        <div class="w-full overflow-x-auto">
          <table class="table w-full">
            <tbody class="w-full">
              <template v-for="(schedule, index) in schedules" :key="schedule.id">
                <tr class="h-8">
                  <td class="p-2" :class="{'font-light': !isOpen || index !== 0}">
                    <span>{{ schedule.weekday }}</span>
                  </td>
                  <td class="p-2" :class="{'font-light': !isOpen || index !== 0}">
                    <span>{{ time(schedule.begHour, schedule.begMinute) }}</span>
                  </td>
                  <td class="p-2" :class="{'font-light': !isOpen || index !== 0}">
                    <span>{{ time(schedule.endHour, schedule.endMinute) }}</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
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
      return this.isOpen ? 'Open' : 'Closed';
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

        return this.time(hours, minutes % 60) + ` until closing`;
      } else if (beg.getTime() >= now.getTime()) {
        const minutes = Math.ceil(Math.abs(beg - now) / (60 * 1000));
        const hours = Math.ceil(minutes / 60);

        return this.time(hours, minutes % 60) + ` hours before opening`;
      } else {
        const next = this.schedules[1];
        const nextBeg = new Date();
        beg.setUTCHours(next.begHour, next.begHour, 0, 0);

        const minutes = Math.ceil(Math.abs(nextBeg - now) / (60 * 1000));
        const hours = Math.ceil(minutes / 60);

        return this.time(hours, minutes % 60) + ` hours before opening`;
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
