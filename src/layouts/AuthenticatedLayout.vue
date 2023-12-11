<template>
  <div class="authenticated-layout drawer drawer-open">
    <template v-if="isShowingMenusModal && !failed && tab === 'products'">
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

    <template v-else>
      <NavBar class="z-50"/>
    </template>

    <div class="preview-layout" v-show="!isShowingMenusModal || !isMenuPage">
      <template v-if="isMenuPage && !failed">
        <OrderTabs class="bg-base-100 p-2 h-auto w-full overflow-y-hidden"
                   :selected="tab"
                   :only="['products', 'spaces', 'services']"
                   @switch-to-tab="onSwitchTab"/>

        <div class="w-full sticky top-0 z-40" v-if="tab === 'products'">
          <PreviewMenuNavBar class="w-full" id="preview-menu-bar"
                             v-if="!isShortScreen || pinMenus"/>

          <PreviewCategoryNavBar class="w-full"/>
        </div>

      </template>

      <template v-if="failed">
        <Error :back-to-page="isMenuPage || isRestaurantPage || isHomePage"
               @on-back-to="onErrorBackTo"/>
      </template>

      <template v-else>
        <slot />
      </template>

    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "@/layouts/navbar/NavBar.vue";
import PreviewMenuNavBar from "@/components/preview/menu/PreviewMenuNavBar.vue";
import PreviewCategoryNavBar from "@/components/preview/category/PreviewCategoryNavBar.vue";
import Error from "@/components/common/Error.vue";
import {mapActions, mapGetters} from "vuex";
import Menu from "@/components/preview/menu/Menu.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import OrderTabs from "@/components/order/OrderTabs.vue";

export default defineComponent({
  name: "AuthenticatedLayout",
  components: {
    OrderTabs,
    BaseIcon, Menu,
    Error,
    PreviewCategoryNavBar,
    PreviewMenuNavBar,
    NavBar,
  },
  data() {
    return {
      isShortScreen: window.innerHeight < 800,
      pinMenus: true,
      scrolledDistance: 0,
      lastScrollPosition: null,
      wasLastScrollUp: null,
    };
  },
  computed: {
    ...mapGetters({
      failed: 'error/present',
      tab: 'preview/tab',
      menu: 'preview/menu',
      menus: 'preview/menus',
      restaurant: 'restaurants/selected',
      isShowingMenusModal: 'preview/isShowingMenusModal',
    }),
    isHomePage() {
      return this.$route['name'] === 'home';
    },
    isMenuPage() {
      return this.$route['name'] === 'place-menu'
          || this.$route['name'] === 'place-order-menu';
    },
    isRestaurantPage() {
      return this.$route['name'] === 'place-restaurant';
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
      selectTab: 'preview/selectTab',
      selectMenu: 'preview/selectMenu',
      setIsShowingMenusModal: 'preview/setIsShowingMenusModal',
    }),
    onResize() {
      this.isShortScreen = window.innerHeight < 800;
    },
    onScroll() {
      if (this.isShowingMenusModal || !this.isShortScreen) {
        return;
      }

      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Get the current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + clientHeight;

      if (scrollTop <= 68) {
        this.pinMenus = true;
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
          this.pinMenus = true;
        } else if (this.scrolledDistance > 10) {
          this.pinMenus = false
        }
      }

      this.lastScrollPosition = scrollTop;
    },
    onSwitchTab({to}) {
      this.selectTab(to);
    },
    onSelectMenu(menu) {
      this.setIsShowingMenusModal(false);
      this.selectMenu(menu);

      const restaurantId = this.$route.params['restaurantId'];
      this.$router.push(`/place/${restaurantId}/menu/${menu.id}`);

      window.scrollTo(0, 0);
    },
    onErrorBackTo() {
      if (this.isHomePage) {
        this.$router.replace(`/place`);
        setTimeout(
            function () {
              document.location.reload();
            },
            200
        );
      } else if (this.isMenuPage) {
        const restaurantId = this.$route.params['restaurantId'];
        this.$router.push(`/place/${restaurantId}`);
      } else if (this.isRestaurantPage) {
        this.$router.replace(`/place`);
        setTimeout(
            function () {
              document.location.reload();
            },
            200
        );
      }

      this.$store.dispatch('error/clear');
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
.authenticated-layout {
  @apply flex flex-col min-w-full max-w-full bg-base-200;

  display: flex;
  flex-basis: 100%;
  justify-content: start;
  align-items: center;
}

.preview-layout {
  @apply flex flex-col w-full max-w-full bg-base-200 p-0;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
