<template>
  <div class="w-full list flex flex-wrap justify-center items-start gap-4 pb-2">
    <div class="w-full flex flex-col gap-3">

      <template v-if="type === 'products'">
        <template v-for="group in groups" :key="'product-' + group[0].productId">
          <template v-for="subGroups in splitGroupByBatch(group)" :key="subGroups[0].productId + '-' + subGroups[0].batch" >
            <Product :fields="subGroups" :product-id="subGroups[0].productId" :batch="subGroups[0].batch"/>
          </template>
        </template>
      </template>

      <template v-else-if="type === 'spaces'">
        <template v-for="group in groups" :key="'space-' + group[0].spaceId">
          <template v-for="subGroups in splitGroupByBatch(group)" :key="subGroups[0].spaceId" >
            <Space :space-id="subGroups[0].spaceId"/>
          </template>
        </template>
      </template>

    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Product from "@/components/order/list/items/Product.vue";
import Space from "@/components/order/list/items/Space.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "List",
  props: {
    type: {
      type: String,
      default: 'products',
    },
    fields: Array,
  },
  components: {
    Space,
    Product,
  },
  computed: {
    groups() {
      const map = new Map();

      this.fields.forEach((f) => {
        if (this.type === 'products' && !f.amount) {
          //
        } else {
          let id = null;

          if (this.type === 'spaces') {
            id = f.spaceId;
          }

          if (this.type === 'products') {
            id = f.productId;
          }

          let fields = map.has(id) ? map.get(id) : [];

          fields.push(f);

          map.set(id, fields);
        }
      });

      return Array.from(map.values());
    },
    reversedFields() {
      return [...this.fields].reverse();
    },
  },
  methods: {
    splitGroupByBatch(group) {
      if (!group || !group.length) {
        return [];
      }

      const batches = [...new Set(group.map(f => f.batch))];
      const subGroups = [];

      batches.forEach((batch) => {
        const subGroup = group.filter((f) => f.batch === batch);

        if (subGroup.length > 0) {
          subGroups.push(subGroup);
        }
      });

      return subGroups;
    },
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
