<template>
  <div class="w-full flex flex-col justify-center bg-base-100">
      <div class="w-full flex justify-center items-center" v-if="menus">
      <div class="max-w-full flex justify-start p-1 pt-2 gap-2 overflow-x-auto overflow-y-hidden">
        <template v-for="m in menus" :key="m.id">
          <a class="tab tab-bordered text-2xl font-bold"
             :class="{'tab-active': menu && menu.id === m.id}"
             @click="onSelectMenu(m)">
            {{ m.title }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Menu from "@/openapi/models/Menu";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewMenuNavBar",
  computed: {
    ...mapGetters({
      menu: "preview/selected",
      menus: "preview/menus",
    }),
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
    }),
    onSelectMenu(menu) {
      this.selectMenu(menu);

      const restaurantId = this.$route.params['restaurantId'];
      this.$router.push(`/preview/${restaurantId}/menu/${menu.id}`);

      window.scrollTo(0, 0);
    },
  },
});
</script>

<style scoped>
</style>
