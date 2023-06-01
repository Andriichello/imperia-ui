<template>
  <div class="guest-layout ">
    <slot/>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GuestLayout",
});
</script>

<style scoped>
.guest-layout {
  @apply flex flex-col min-w-full max-w-full;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
