<template>
  <div class="w-full flex flex-col justify-start items-center gap-1">
    <Divider :title="category.title" :id="'category-' + category.id" :lines="false"/>

    <List class="mb-2" :type="type" :items="items"
          v-if="items.length > 0"/>

    <div class="w-full flex justify-center items-center pb-5" v-else>
      {{ $t('Unfortunately, this category is empty') }}
    </div>
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
  props: {
    category: {
      type: Category,
    },
    type: {
      type: String,
      default: 'products',
    },
    items: {
      type: Array,
    },
  },
  components: {
    List,
    Divider,
  },
});
</script>

<style scoped>
</style>
