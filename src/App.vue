<template>
  <div class="wrapper">
    <router-view />
  </div>
  <NavBar />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/nav/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
});
</script>

<style scoped>
  .wrapper {
    @apply pl-20;

    display: flex;
    flex-grow: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-self: center;
    align-self: center;
  }
</style>
