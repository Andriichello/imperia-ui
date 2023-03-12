<template>
  <div class="save-basket-container">
    <div class="save-basket-body">
      <div class="save-basket-btn">
        <button class="btn btn-block btn-primary" :class="{ 'loading': loading }" @click="onSaveBasket">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SaveBasket",
  props: {
    loading: Boolean,
  },
  emits: ['save-basket'],
  methods: {
    onSaveBasket() {
      this.$emit('save-basket');
    }
  },
});
</script>

<style scoped>
.save-basket-container {
  @apply flex flex-col flex-nowrap justify-center items-center gap-3;
}

.save-basket-body {
  @apply card-body flex-col justify-center items-center pl-0 pr-0;

  min-width: 100%;
}

.save-basket-btn {
  min-width: 100%;
}
</style>
