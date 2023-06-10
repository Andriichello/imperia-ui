<template>
  <div class="list">
    <div class="list-col min-w-sm max-w-sm" v-for="(column, index) in this.columns" :key="index" :id="'list-' + index">
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
  data() {
    return {
      number: 2
    };
  },
  computed: {
    columns() {
      return this.splitOnColumns(this.items ?? [], this.number);
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
  @apply gap-4 w-full justify-center;

  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
}

.list-col {
  @apply gap-4 h-full;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
