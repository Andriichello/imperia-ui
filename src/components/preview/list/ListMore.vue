<template>
  <div class="list-more-container">
    <div class="list-more-body">
      <span v-if="total === null">No such items...</span>
      <span v-else>Showing {{ count }} of {{ total }} items</span>

      <div class="list-more-btn" v-if="count < total">
        <button class="btn btn-block btn-ghost" :class="{ 'loading': loading }" @click="onLoadMore">Load more</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListMore",
  props: {
    count: Number,
    total: Number,
    loading: Boolean,
  },
  emits: ['load-more'],
  methods: {
    onLoadMore() {
      this.$emit('load-more');
    }
  },
});
</script>

<style scoped>
.list-more-container {
  @apply flex flex-col flex-nowrap justify-center items-center;
}

.list-more-body {
  @apply flex flex-col justify-center items-center gap-3 p-1;

  min-width: 100%;
}

.list-more-btn {
  min-width: 100%;
}
</style>
