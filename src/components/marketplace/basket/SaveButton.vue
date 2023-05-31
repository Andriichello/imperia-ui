<template>
  <div class="save-button-container">
    <div class="save-button-body">
      <div class="save-button-btn">
        <button class="btn btn-block btn-primary" :class="{ 'loading': loading }" @click="onSaveBasket">{{ title }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SaveButton",
  props: {
    title: {
      type: String,
      default: "Save",
    },
    loading: Boolean,
  },
  emits: ['save-clicked'],
  methods: {
    onSaveBasket() {
      this.$emit('save-clicked');
    }
  },
});
</script>

<style scoped>
.save-button-container {
  @apply flex flex-col flex-nowrap justify-center items-center gap-3;
}

.save-button-body {
  @apply card-body flex-col justify-center items-center p-0;

  min-width: 100%;
}

.save-button-btn {
  min-width: 100%;
}
</style>
