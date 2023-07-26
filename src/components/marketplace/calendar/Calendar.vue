<template>
  <div class="calendar-container">
    <div class="calendar">
      <Cell @click="onPrev()"> 
        <BaseIcon title="previous" color="currentColor" :width="24" :height="24" viewBox="0 0 24 24">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
      </Cell>

      <Cell style="grid-column: 2/5" class="w-full" :noAnimation="true">
        <span>{{ sub(months[month], 0, 3) }}</span>
      </Cell>

      <Cell style="grid-column: 5/7" class="w-full" :noAnimation="true"> 
        <span>{{ year }}</span>
      </Cell>

      <Cell @click="onNext()"> 
        <BaseIcon title="next" color="currentColor" :width="24" :height="24" viewBox="0 0 24 24" style="transform: rotate(180deg)">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
      </Cell>

      <Weekday v-for="weekday in weekdays" :key="weekday" :weekday="sub(weekday, 0, 3)"/>
    
      <template v-for="(row, index) in rows" :key="index">
        <Day v-for="day in row" :key="day" :day="day" 
          :highlighted="isSame(today, day, month, year)"
          :selected="isSame(selected, day, month, year)"
          @day-click="onDayClick({day, month, year})"/>
      </template>
    </div>

    <div class="w-full flex justify-center items-center gap-1 mt-2">
      <button class="btn btn-sm  grow"
              @click="onCancelClick">
        Cancel
      </button>
      <button class="btn btn-sm btn-primary grow"
              v-if="!selectOnClick && changed"
              @click="onSaveClick">
        Select
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Day from "./items/Day.vue";
import Weekday from "./items/Weekday.vue";
import Cell from "./items/Cell.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {sameDay} from "@/helpers";

export default defineComponent({
  // eslint-disable-next-line
  name: "Calendar",
  emits: ["date-select", "on-select", "on-cancel"],
  components: {
    Day,
    Weekday,
    Cell,
    BaseIcon,
  },
  props: {
    selectedDate: {
      type: Date,
      default: null,
    },
    selectOnClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const today = new Date();

    return {
      today: today,
      selected: this.selectedDate,
      year: this.selectedDate ? this.selectedDate.getFullYear() : today.getFullYear(),
      month: this.selectedDate ? this.selectedDate.getMonth() : today.getMonth(),
      weekdays: [
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday",
      ],
      months: [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ],
    }
  },
  computed: {
    rows() {
      const numberOfDays = (new Date(this.year, this.month + 1, 0)).getDate();
      
      const days = [];
      for (let i = 1; i <= numberOfDays; i++) {
        days.push(i);
      }
      
      let numberOfShifts = (new Date(this.year, this.month, 1)).getDay();
      if (numberOfShifts === 0) {
        numberOfShifts = 6;
      }
      else {
        numberOfShifts--;
      }
      
      for (let i = numberOfShifts; i > 0; i--) {
        days.unshift(null)
      }

      const rows = [];
      for (let r = 0; r < 6; r++) {
        const row = [];

        for (let i = r * 7; i < (r + 1) * 7 && i < days.length; i++) {
          row.push(days[i]);
        }

        for (let i = 7 - row.length; i > 0; i--) {
          row.push(null);
        } 

        rows.push(row);
      }

      return rows;
    },
    changed() {
      if (this.selected !== this.selectedDate) {
        let result = false;
        if (this.selectedDate instanceof Date) {
          result = this.selectedDate.getFullYear() === this.selected.getFullYear() &&
            this.selectedDate.getMonth() === this.selected.getMonth() &&
            this.selectedDate.getDate() === this.selected.getDate();
        }

        return !result;
      }

      return false;
    },
  },
  methods: {
    sub(str, start, end) {
      if (typeof str === 'string') {
        return str.substring(start, end)
      }

      return str;
    },
    isSame(date, day, month, year) {
      return date 
        && date.getDate() === day
        && date.getMonth() === month 
        && date.getFullYear() === year; 
    },
    onPrev() {
      if (this.month === 0) {
        this.month = 11;
        this.year--;

        return;
      }

      this.month--;
    },
    onNext() {
      if (this.month === 11) {
        this.month = 0;
        this.year++;

        return;
      }

      this.month++;
    },
    iconColor() {
      return 'var(--text-color)';
    },
    onDayClick({day, month, year}) {
      const date = new Date();

      date.setUTCDate(day);
      date.setUTCMonth(month);
      date.setUTCFullYear(year);

      if (this.selectOnClick) {
        this.selected = this.selected && sameDay(this.selected, date)
          ? null : date;

        this.onSaveClick();
      } else {
        this.selected = date;
      }
    },
    onSaveClick() {
      this.$emit('on-select', { date: this.selected });
    },
    onCancelClick() {
      this.$emit('on-cancel');
    },
  },
});
</script>

<style scoped>
.calendar {
  @apply grid grid-cols-7 grid-rows-[8] gap-1 w-full;
}

.calendar-container {
  @apply w-full;
}
</style>
