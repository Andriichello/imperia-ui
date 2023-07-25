<template>
  <div class="w-full list flex flex-wrap justify-center items-start gap-4 pb-2">
    <div class="w-full flex flex-col gap-3">
      <template v-for="group in this.groups" :key="group[0].productId">
        <Product :fields="group" :product-id="group[0].productId"/>
      </template>

<!--      <template v-for="field in reversedFields" :key="`${field.productId}-${field.variantId}`">-->
<!--        <Product :fields="[field]" :product-id="field.productId"/>-->
<!--      </template>-->
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Product from "@/components/order/list/items/Product.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "List",
  props: {
    fields: Array,
  },
  components: {
    Product,
  },
  computed: {
    groups() {
      const map = new Map();

      this.fields.forEach((f) => {
        if (f.amount) {
          let fields = map.has(f.productId)
            ? map.get(f.productId) : [];

          fields.push(f);

          map.set(f.productId, fields);
        }
      });

      return map.values();
    },
    reversedFields() {
      return [...this.fields].reverse();
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
