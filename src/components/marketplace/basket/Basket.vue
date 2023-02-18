<template>
  <div class="basket">
    <Banquet :banquet="{}"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Banquet from '@/components/banquet/Banquet.vue';

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
  @apply flex self-stretch justify-start items-start pl-4 pr-4;
}
</style>