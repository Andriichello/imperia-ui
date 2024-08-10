<template>
  <div class="preview-layout">
    <template v-if="isShowingMenusModal && !failed">
      <div class="w-full max-w-full h-full flex flex-col justify-start items-center gap-2 py-2 px-2">
        <div class="w-full flex justify-between items-center gap-2 p-1">
          <span class="font-semibold text-xl">
            {{ $t('preview.menu.switcher.title') }}
          </span>

          <div class="btn btn-sm btn-square" @click="setIsShowingMenusModal(false)">
            <BaseIcon width="24" height="24" view-box="0 0 24 24" style="transform: rotate(45deg)">
              <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </BaseIcon>
          </div>
        </div>

        <div class="w-full flex flex-col justify-start items-center gap-2 overflow-y-auto">
          <template v-for="m in menus" :key="m.id">
            <Menu :menu="m" v-if="m" @click="onSelectMenu(m)" class="w-full"/>
          </template>
        </div>

      </div>
    </template>

    <div class="preview-layout" v-show="!isShowingMenusModal || !isMenuPage">
      <PreviewNavBar class="w-full" id="preview-bar"/>

      <template v-if="isMenuPage && !failed">
        <PreviewMenuNavBar class="w-full" id="preview-menu-bar"
                           v-if="pinMenus && isShortScreen"/>

        <div class="w-full sticky top-0 z-50">
          <PreviewMenuNavBar class="w-full" id="preview-menu-bar"
                             v-if="pinMenus && !isShortScreen"/>

          <PreviewCategoryNavBar class="w-full"/>
        </div>
      </template>

      <template v-if="failed">
        <Error :back-to-page="isMenuPage || isRestaurantPage"
               @on-back-to="onErrorBackTo"/>
      </template>

      <template v-else>
        <slot />
      </template>

      <div class="w-fit sticky bottom-2 left-2 z-50 self-start">
        <button class="btn btn-sm btn-square btn-ghost rounded up opacity-75"
                v-show="isMenuPage && products && products.length > 10 && showGoToTop"
                @click="goToTop()">
          <BaseIcon :title="$t('preview.navbar.back')" color="transparent" width="20" height="20" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}" style="transform: rotate(90deg); transform-origin: center;">
            <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </BaseIcon>
        </button>
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
import Error from "@/components/common/Error.vue";

export default defineComponent({
  name: "PreviewLayout",
  components: {
    Error,
    Menu,
    BaseIcon,
    PreviewCategoryNavBar,
    PreviewMenuNavBar,
    PreviewNavBar,
  },
  data() {
    return {
      isShortScreen: window.innerHeight < 800,
      pinMenus: true,
      scrolledDistance: 0,
      lastScrollPosition: null,
      wasLastScrollUp: null,
      showGoToTop: false,
    };
  },
  computed: {
    ...mapGetters({
      failed: 'error/present',
      menu: 'preview/menu',
      menus: 'preview/menus',
      products: 'preview/products',
      restaurant: 'restaurants/selected',
      isShowingMenusModal: 'preview/isShowingMenusModal',
    }),
    isMenuPage() {
      return this.$route['name'] === 'preview-menu';
    },
    isRestaurantPage() {
      return this.$route['name'] === 'preview-restaurant';
    },
  },
  watch: {
    isShowingMenusModal(newValue) {
      if (newValue) {
        window.scrollTo(0, 0);
      }
    }
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
      setIsShowingMenusModal: 'preview/setIsShowingMenusModal',
    }),
    onResize() {
      this.isShortScreen = window.innerHeight < 800;
    },
    onScroll() {
      if (this.isShowingMenusModal) {
        return;
      }

      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Get the current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + clientHeight;

      if (scrollTop <= 68) {
        this.pinMenus = true;
        this.showGoToTop = false;
        return;
      }

      if (!this.isShortScreen) {
        if (scrollBottom < (scrollHeight - 160)) {
          this.showGoToTop = true;
        }

        return;
      }

      if (scrollBottom < (scrollHeight - 160) && this.lastScrollPosition !== null) {
        const diff = scrollTop - this.lastScrollPosition;

        if (diff > 0) {
          if (this.wasLastScrollUp) {
            this.scrolledDistance = 0;
          }

          this.wasLastScrollUp = false;
        } else {
          if (!this.wasLastScrollUp) {
            this.scrolledDistance = 0;
          }

          this.wasLastScrollUp = true;
        }

        this.scrolledDistance += diff;

        if (this.wasLastScrollUp && this.scrolledDistance < -50) {
          // this.pinMenus = true;
        } else if (this.scrolledDistance > 10) {
          // this.pinMenus = false
        }

        this.showGoToTop = true;
      }

      this.lastScrollPosition = scrollTop;
    },
    onSelectMenu(menu) {
      this.setIsShowingMenusModal(false);
      this.selectMenu(menu);

      const restaurantId = this.$route.params['restaurantId'];
      this.$router.push(`/preview/${restaurantId}/menu/${menu.id}`);

      window.scrollTo(0, 0);
    },
    onErrorBackTo() {
      if (this.isMenuPage) {
        const restaurantId = this.$route.params['restaurantId'];
        this.$router.push(`/preview/${restaurantId}`);
      } else if (this.isRestaurantPage) {
        this.$router.push(`/preview`);
      }

      this.$store.dispatch('error/clear');
    },
    goToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  },
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

.up {
  @apply text-black;
  background-color: var(--yellow);
}

.up:hover {
  background-color: var(--yellow);
}
</style>
