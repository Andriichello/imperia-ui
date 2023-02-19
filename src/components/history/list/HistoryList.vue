<template>
  <div class="history-list">
    <HistoryListItem :banquet="banquet" v-for="banquet in banquets" :key="banquet.id" class="history-list-item"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HistoryListItem from "./HistoryListItem.vue";

export default defineComponent({
  name: "HistoryList",
  components: {
    HistoryListItem,
  },
  props: {
    type: String,
    banquets: Array,
  },
});
</script>

<style scoped>
.history-list {
  @apply gap-1;

  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
}

.history-list-item {
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
}
</style>
