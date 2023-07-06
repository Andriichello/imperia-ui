<template>
  <div class="w-full flex flex-col justify-start items-center gap-1">
    <Divider :title="category.title" :id="'category-' + category.id" :lines="false"/>
    <List :items="items" class="mb-2"/>
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
.list {

}

.list-col {
  flex-basis: 45%;
}
</style>
