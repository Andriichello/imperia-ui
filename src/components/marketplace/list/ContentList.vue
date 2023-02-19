<template>
  <div class="content-list">
    <div class="content-list-col" v-for="(column, index) in this.columns" :key="index">
      <ContentListItem :type="type" :item="item" v-for="item in column" :key="item.id"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ContentListItem from "./ContentListItem.vue";

export default defineComponent({
  name: "ContentList",
  components: {
    ContentListItem,
  },
  props: {
    type: String,
    items: Array,
  },
  computed: {
    columns() {
      return this.splitOnColumns(this.items ?? [], 2);
    },
  },
  methods: {
    splitOnColumns(items, number) {
      const columns = [[], []]
      items.forEach((item, index) => {
        columns[index % number].push(item);
      });

      return columns;
    },
  },
});
</script>

<style scoped>
.content-list {
  @apply gap-4 p-1;

  display: flex;
  flex-basis: 236px;
  flex-grow: 1;
  flex-wrap: wrap;
}

.content-list-col {
  @apply gap-4;

  flex-basis: 212px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: start;
  align-items: stretch;
}
</style>
