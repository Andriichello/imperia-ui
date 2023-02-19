<template>
  <div class="additional">
    <div class="additional-group">
      <span class="additional-label">Created By: </span>
      <span class="additional-value">{{ creator.name }}</span>
    </div>

    <div> 
      <div class="additional-group">
        <span class="additional-label">Created At: </span>
        <span class="additional-value">{{ val(createdAt) }}</span>
      </div>

      <div class="additional-group">
        <span class="additional-label">Updated At: </span>
        <span class="additional-value">{{ val(updatedAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormatted } from "@/helpers";
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Additional",
  props: {
    createdAt: String,
    updatedAt: String,
    creator: Object,
  },
  methods: {
    val(date) {
      return dateFormatted(date);
    }
  }
});
</script>


<style scoped>
.additional {
  @apply flex items-end basis-full justify-between gap-1;
}

.additional-group {
  @apply flex justify-center items-center gap-2 flex-row;

  color: var(--text-color);
}

.additional-label {
  font-size: 10px;
  font-weight: 300;
}

.additional-value {
  font-size: 12px;
  font-weight: 400;
}
</style>