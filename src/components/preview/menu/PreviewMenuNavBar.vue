<template>
  <div class="w-full flex flex-col justify-center bg-base-100">

    <div class="w-full flex justify-center items-center" v-if="menus">
      <div class="max-w-full flex justify-start p-1 gap-2 overflow-x-auto overflow-y-hidden">
        <template v-for="m in isNarrowScreen ? [menu ?? menus[0]] : menus" :key="m.id">
          <div @click="onSelectMenu(m)">
            <div class="flex justify-center items-center cursor-pointer hover:opacity-100 px-3"
              :class="{'opacity-50': !menu || menu.id !== m.id}">
              <span class="font-bold text-lg">
                 {{ m.title }}
              </span>

              <div class="ml-1 mt-0.5" v-if="isNarrowScreen && menus.length > 1">
                <BaseIcon width="16" height="16" view-box="0 0 24 24">
                  <path d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
                </BaseIcon>
              </div>
            </div>
            <div class="w-full h-0.5 bg-current"
                 :class="{'opacity-50': !menu || menu.id !== m.id}">
            </div>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Menu from "@/openapi/models/Menu";
import {mapActions, mapGetters} from "vuex";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewMenuNavBar",
  components: {BaseIcon},
  data() {
    return {
      isNarrowScreen: window.innerWidth < 600,
    };
  },
  computed: {
    ...mapGetters({
      menu: "preview/selected",
      menus: "preview/menus",
    }),
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
      setIsShowingMenusModal: 'preview/setIsShowingMenusModal',
    }),
    onResize() {
      this.isNarrowScreen = window.innerWidth < 600;
    },
    onSelectMenu(menu) {
      if (this.isNarrowScreen) {
        if (this.menus && this.menus.length > 1) {
          this.setIsShowingMenusModal(true);
          return;
        }
      }

      this.selectMenu(menu);

      const restaurantId = this.$route.params['restaurantId'];

      if (this.$route.path.includes('/preview/')) {
        this.$router.push(`/preview/${restaurantId}/menu/${menu.id}`);
      }

      if (this.$route.path.includes('/place/')) {
        this.$router.push(`/place/${restaurantId}/menu/${menu.id}`);
      }

      window.scrollTo(0, 0);
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  }
});
</script>

<style scoped>
</style>
