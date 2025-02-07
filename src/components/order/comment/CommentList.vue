<template>
  <div class="w-full list flex flex-wrap justify-center items-start gap-2" id="customer-list-container">
    <div class="w-full flex flex-row justify-center items-start gap-3">
      <div class="w-full flex flex-col gap-3">
        <Comment v-for="(comment, index) in comments"
                 :comment="comment" :key="comment"
                 :index="index"
                 :min-rows="minRows"
                 @on-update="onUpdate"
                 @on-delete="onDelete"/>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onUpdated} from "vue";
import Comment from "@/components/order/comment/Comment.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "CommentList",
  emits: ["on-update", "on-delete"],
  props: {
    comments: Array,
    minRows: {
      type: Number,
      default: 2,
    },
  },
  components: {
    Comment,
  },
  methods: {
    onUpdate({comment, index}) {
      this.$emit('on-update', {comment, index});
    },
    onDelete({comment, index}) {
      this.$emit('on-delete', {comment, index});
    },
  },
});
</script>

<style scoped>
.list {
  @apply w-full;
}

.list-col {
  flex-basis: 45%;
}
</style>
