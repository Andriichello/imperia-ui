<template>
    <div class="authenticated-layout drawer drawer-open">
        <NavBar class="z-50"/>
        <slot />
    </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "@/layouts/navbar/NavBar.vue";

export default defineComponent({
  name: "AuthenticatedLayout",
  components: {
    NavBar,
  },
});
</script>

<style scoped>
.authenticated-layout {
  @apply flex flex-col min-w-full max-w-full bg-base-200;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
