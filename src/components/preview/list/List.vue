<template>
  <div class="w-full list flex flex-wrap justify-center items-start gap-4 pb-2">

    <template v-if="number === 1">
      <div class="w-full flex flex-col gap-3">
        <Product :item="item" v-for="item in this.items" :key="item.id" @on-select="onSelectItem"/>
      </div>
    </template>

    <template v-else>
      <div class="list-col flex flex-col gap-3" v-for="(column, index) in this.splitOnColumns(this.items ?? [], this.number)" :key="index" :id="'list-' + index">
        <Product :item="item" v-for="item in column" :key="item.id" @on-select="onSelectItem"/>
      </div>
    </template>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Product from "./items/Product.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "List",
  emits: ["select-item"],
  props: {
    type: String,
    items: Array,
  },
  components: {
    Product,
  },
  data() {
    return {
      number: window.innerWidth > 500 ? 2 : 1,
    }
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
    onSelectItem(item) {
      this.$emit('select-item', item);
    },
    onResize() {
      if (window.innerWidth > 500) {
        this.number = 2;
      } else {
        this.number = 1;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
});
</script>

<style scoped>
.list {

}

.list-col {
  flex-basis: 45%;
}
</style>
