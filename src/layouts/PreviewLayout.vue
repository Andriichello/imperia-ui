<template>
    <div class="preview-layout">
      <PreviewNavBar class="w-full"/>

      <template v-if="isMenuPage">
        <PreviewMenuNavBar class="w-full" v-if="isShortScreen"/>

        <div class="w-full sticky top-0 z-50">
          <PreviewMenuNavBar class="w-full"
                             v-if="!isShortScreen"/>

          <PreviewCategoryNavBar class="w-full"/>
        </div>
      </template>

      <slot />

      <div class="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-neutral/50 z-50 flex flex-col justify-end items-center" id="menus-modal"
        v-if="isShowingMenusModal">
        <div class="grow w-full overscroll-none" id="menus-modal-closer" @click="setIsShowingMenusModal(false)">

        </div>
        <div class="w-full p-2 bg-base-200 flex justify-between items-center pl-3 pr-2 shadow-sm overscroll-none">
          <span class="font-semibold text-xl">
            {{ $t('preview.menu.switcher.title') }}
          </span>

          <div class="btn btn-sm btn-square" @click="setIsShowingMenusModal(false)">
            <BaseIcon width="24" height="24" view-box="0 0 24 24" style="transform: rotate(45deg)">
              <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </BaseIcon>
          </div>
        </div>
        <div class="w-full max-h-[50%] bg-base-200 flex flex-col justify-center items-center px-2 pb-2 gap-2">
          <template v-for="m in [...menus]" :key="m.id">
            <Menu :menu="m" v-if="m" @click="onSelectMenu(m)"/>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewNavBar from "@/layouts/navbar/PreviewNavBar.vue";
import PreviewMenuNavBar from "@/components/preview/menu/PreviewMenuNavBar.vue";
import PreviewCategoryNavBar from "@/components/preview/category/PreviewCategoryNavBar.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import Menu from "@/components/preview/menu/Menu.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  name: "PreviewLayout",
  components: {
    Menu,
    BaseIcon,
    PreviewCategoryNavBar,
    PreviewMenuNavBar,
    PreviewNavBar,
  },
  data() {
    return {
      isShortScreen: window.innerHeight < 800,
    };
  },
  computed: {
    ...mapGetters({
      menu: 'preview/menu',
      menus: 'preview/menus',
      isShowingMenusModal: 'preview/isShowingMenusModal',
    }),
    isMenuPage() {
      return this.$route['name'] === 'preview-menu';
    },
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
      setIsShowingMenusModal: 'preview/setIsShowingMenusModal',
    }),
    onResize() {
      this.isShortScreen = window.innerHeight < 800;
    },
    onSelectMenu(menu) {
      this.selectMenu(menu);

      window.scrollTo(0, 0);

      this.setIsShowingMenusModal(false);
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
.preview-layout {
  @apply flex flex-col w-full max-w-full bg-base-200 p-0;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}

.on-menus {
  @apply sticky top-[44px];
}

.under-menus {

}
</style>
