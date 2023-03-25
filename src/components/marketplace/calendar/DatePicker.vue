<template>
  <div class="date"> 
    <div class="date-actions">
      <button class="btn btn-ghost w-14 h-14 p-2"
        @click="this.$emit('close-picker')">
        <BaseIcon title="back" :color="iconColor()" :width="24" :height="24" viewBox="0 0 24 24">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" :stroke="iconColor()" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
    </button>
    </div>

    <div class="card bg-base-300 p-2">
      <Calendar :selectedDate="date" @day-click="onDayClick"/> 
    </div>
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import Calendar from "@/components/marketplace/calendar/Calendar.vue";

export default defineComponent({
  name: "DatePicker",
  emits: ["close-picker", "day-click"],
  components: {
    BaseIcon,
    Calendar,
  },
  computed: {
    ...mapGetters({
      date: 'basket/date',
    }),
  },
  methods: {
    ...mapActions({
      'setDate': 'basket/setDate',
    }),
    iconColor() {
      return 'currentColor';
    },
    onDayClick({ date }) {
      this.$emit('day-click', { date });
    },
  },
});
</script>


<style scoped>
.date {
  @apply w-full;

  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
}

.date-actions {
  @apply flex w-full;

  margin-left: auto;
  margin-right: auto;
}

.date-list {
  flex-basis: 90%;

  margin-left: auto;
  margin-right: auto;
}

.switcher {
  @apply flex flex-row items-center;

  flex-wrap: nowrap;

  flex: 0 1 auto;
  overflow-x: auto;

  margin-left: auto;
  margin-right: auto;
}

.blurred {
  --tw-border-opacity: 0;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.1;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>