<template>
  <div class="preview-layout">
    <AppDrawer />
    <MenusDrawer />

    <div class="preview-layout">
      <PreviewNavBar class="w-full" id="preview-bar"/>

      <template v-if="isMenuPage && !failed">
        <PreviewMenuNavBar class="w-full" id="preview-menu-bar"
                           v-if="pinMenus && isShortScreen"/>

        <div class="w-full sticky top-0 z-50">
          <PreviewMenuNavBar class="w-full" id="preview-menu-bar"
                             v-if="pinMenus && !isShortScreen"/>

          <PreviewCategoryNavBar class="w-min-4xl w-max-4xl"
            @open-categories-modal="openCategoriesModal"/>
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
        <button class="btn btn-sm btn-square btn-ghost rounded up"
                v-show="isMenuPage && products && products.length > 4 && showGoToTop"
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
import {mapActions, mapGetters} from "vuex";
import Error from "@/components/common/Error.vue";
import {ThemeConfig} from "@/configs";
import {sortByPopularity} from "@/helpers";
import AppDrawer from "@/layouts/drawer/AppDrawer.vue";
import MenusDrawer from "@/layouts/drawer/MenusDrawer.vue";

export default defineComponent({
  name: "PreviewLayout",
  components: {
    MenusDrawer,
    AppDrawer,
    Error,
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
    ThemeConfig() {
      return ThemeConfig
    },
    ...mapGetters({
      theme: "theme/get",
      themes: "theme/list",
      failed: 'error/present',
      menu: 'preview/menu',
      menus: 'preview/menus',
      categories: 'preview/categories',
      products: 'preview/products',
      restaurant: 'restaurants/selected',
      restaurantId: "restaurants/restaurantId",
      selectedMenu: 'preview/selected',
      selectedCategory: 'preview/category',
    }),
    isMenuPage() {
      return this.$route['name'] === 'preview-menu';
    },
    isRestaurantPage() {
      return this.$route['name'] === 'preview-restaurant';
    },
  },
  methods: {
    sortByPopularity,
    ...mapActions({
      applyTheme: 'theme/apply',
      selectMenu: 'preview/selectMenu',
      selectCategory: 'preview/selectCategory',
      setIsShowingMenusDrawer: 'preview/setIsShowingMenusDrawer',
    }),
    onSwitchTheme() {
      if (this.theme === this.themes[0]) {
        this.applyTheme(this.themes[1])
      } else {
        this.applyTheme(this.themes[0])
      }
    },
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
    openCategoriesModal() {
      this.setIsShowingMenusDrawer(true);
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

.menu-title {
  @apply p-0 ml-3 mt-2 mb-1;
}

.menu ul {
  @apply p-0 ml-3;
}

.menu ul li {
  @apply mx-2;
}

.menu ul li div {
  @apply px-1 m-0;

  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

#side-schedule {
  @apply px-0 m-0;
}
</style>
