<template>
  <div class="basket">
    <Banquet />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Banquet from './Banquet.vue';

export default defineComponent({
  // eslint-disable-next-line
  name: "Basket",
  components: {
    Banquet,
  },
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