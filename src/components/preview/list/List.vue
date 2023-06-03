<template>
  <div class="list">
    <div class="list-col" v-for="(column, index) in this.columns" :key="index">
      <Product :item="item" v-for="item in column" :key="item.id"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Product from "./items/Product.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "List",
  props: {
    type: String,
    items: Array,
  },
  components: {
    Product,
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
.list {
  @apply gap-4 p-1 justify-center;

  display: flex;
  flex-basis: 236px;
  flex-grow: 1;
  flex-wrap: wrap;
}

.list-col {
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
