<template>
  <div class="w-full list flex flex-wrap justify-center items-start gap-4 pb-2" >

    <template v-if="type === 'products'">
      <template v-if="number === 1">
        <div class="w-full flex flex-col gap-3">
          <Product :item="item" v-for="item in this.items" :key="item.id"/>
        </div>
      </template>

      <template v-else>
        <div class="list-col flex flex-col gap-3" v-for="(column, index) in this.splitOnColumns(this.items ?? [], this.number)" :key="index" :id="'list-' + index">
          <Product :item="item" v-for="item in column" :key="item.id"/>
        </div>
      </template>
    </template>

    <template v-if="type === 'spaces'">
      <template v-if="number === 1">
        <div class="w-full flex flex-col gap-3">
          <Space :item="item" v-for="item in this.items" :key="item.id"/>
        </div>
      </template>

      <template v-else>
        <div class="list-col flex flex-col gap-3" v-for="(column, index) in this.splitOnColumns(this.items ?? [], this.number)" :key="index" :id="'list-' + index">
          <Space :item="item" v-for="item in column" :key="item.id"/>
        </div>
      </template>
    </template>

    <template v-if="type === 'services'">
      <template v-if="number === 1">
        <div class="w-full flex flex-col gap-3">
          <Service :item="item" v-for="item in this.items" :key="item.id"/>
        </div>
      </template>

      <template v-else>
        <div class="list-col flex flex-col gap-3" v-for="(column, index) in this.splitOnColumns(this.items ?? [], this.number)" :key="index" :id="'list-' + index">
          <Service :item="item" v-for="item in column" :key="item.id"/>
        </div>
      </template>
    </template>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Product from "./items/Product.vue";
import Space from "@/components/preview/list/items/Space.vue";
import Service from "@/components/preview/list/items/Service.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "List",
  props: {
    type: {
      type: String,
      default: 'products',
    },
    items: Array,
  },
  components: {
    Service,
    Space,
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

@media (max-width: 585px) {
  .list-col {
    flex-basis: 96%;
  }
}
</style>
