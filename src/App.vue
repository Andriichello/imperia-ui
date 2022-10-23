<template>
  <NavigationBar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationBar from "./components/nav/NavigationBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavigationBar,
  },
});
</script>
