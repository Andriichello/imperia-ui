<template>
  <div class="base-div">
    <h2>Home</h2>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
});
</script>

<style scoped>
.base-div {
  @apply rounded-box bg-base-300;
  min-width: 100px;
  min-height: 100px;
  padding: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
