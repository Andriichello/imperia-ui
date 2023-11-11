<template>
  <div class="w-full flex flex-col justify-start items-center gap-1">
    <Divider :title="category.title" :id="'category-' + category.id" :lines="false"/>
    <List :items="items" class="mb-2"
          @select-item="onSelectItem"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Divider from "@/layouts/divider/Divider.vue";
import {Category} from "@/openapi/models/Category.ts";
import List from "@/components/preview/list/List.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "ListOfCategory",
  emits: ["select-item"],
  props: {
    category: {
      type: Category,
    },
    items: {
      type: Array,
    },
  },
  components: {
    List,
    Divider,
  },
  methods: {
    onSelectItem(item) {
      this.$emit('select-item', item);
    },
  }
});
</script>

<style scoped>
</style>
