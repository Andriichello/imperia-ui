<template>
  <div class="base-div">
    <h1>History</h1>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HistoryView",
  components: {},
});
</script>

<style scoped>
.base-div {
  background-color: var(--l-black);
  @apply rounded-box;
  min-width: 100px;
  min-height: 100px;
  padding: 12px 12px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
