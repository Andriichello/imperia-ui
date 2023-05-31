<template>
  <div>
    <Banquet :banquet="banquet" :readonly="true"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Banquet from '../banquet/Banquet.vue'

export default defineComponent({
  name: "HistoryListItem",
  components: {
    Banquet,
  },
  props: {
    banquet: Object,
  },
});
</script>

<style scoped>
</style>
