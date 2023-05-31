<template>
  <div class="filters">
    <div class="collapse collapse-arrow">
      <input type="checkbox" class="peer"/>
      <div class="collapse-title">
        Filters {{ appliedCount ? ' | ' + appliedCount + ' applied' : '' }}
      </div>
      <div class="collapse-content">
        <StateFilter
            :states="['draft', 'new', 'accepted', 'rejected', 'cancelled', 'completed', 'processing']"
            :selected="states"
            @state-switch="onStateSwitch"
        />

        <div class="collapse collapse-arrow">
          <input type="checkbox" class="peer"/>
          <div class="collapse-title">
            From & Until  {{ datesCount ? ' | ' + datesCount + ' applied' : '' }}
          </div>
          <div class="collapse-content">
            <DatesFilter :from="from" :until="until" @from-select="onFromSelect" @until-select="onUntilSelect"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import StateFilter from './StateFilter.vue'
import DatesFilter from './DatesFilter.vue'

export default defineComponent({
  // eslint-disable-next-line
  name: 'Filters',
  emits: ['state-switch', 'from-select', 'until-select'],
  components: {
    StateFilter,
    DatesFilter,
  },
  props: {
    states: Array,
    from: {
      type: Date,
      default: null,
    },
    until: {
      type: Date,
      default: null,
    },
  },
  computed: {
    statesCount() {
      return this.states.length;
    },
    datesCount() {
      let count = 0;

      if (this.from) {
        count++;
      }
      if (this.until) {
        count++;
      }

      return count;
    },
    appliedCount() {
      return this.statesCount + this.datesCount;
    },
  },
  methods: {
    onStateSwitch({ state, wasSelected}) {
      this.$emit('state-switch', { state, wasSelected });
    },
    onFromSelect({ date }) {
      this.$emit('from-select', { date });
    },
    onUntilSelect({ date }) {
      this.$emit('until-select', { date });
    },
  },
})
</script>

<style scoped>
  .filters {
    @apply flex w-full justify-center;
  }
</style>
