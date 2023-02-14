<template>
  <div class="basket">
    <h1>Basket</h1>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Basket",
});
</script>


<style scoped>
.basket {
  display: flex;
  align-self: stretch;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>