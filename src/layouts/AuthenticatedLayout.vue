<template>
  <div class="authenticated-layout drawer drawer-open">
    <NavBar class="z-50"/>

    <div class="preview-layout" v-show="!isShowingMenusModal || !isMenuPage">
      <template v-if="isMenuPage && !failed">
        <div class="w-full sticky top-0 z-40">
          <PreviewMenuNavBar class="w-full" id="preview-menu-bar"
                             v-if="!isShortScreen || pinMenus"/>

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

export default defineComponent({
  name: "AuthenticatedLayout",
  components: {
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
      menu: 'preview/menu',
      menus: 'preview/menus',
      restaurant: 'restaurants/selected',
      isShowingMenusModal: 'preview/isShowingMenusModal',
    }),
    isMenuPage() {
      return this.$route['name'] === 'place-menu';
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

      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPosition <= 68) {
        this.pinMenus = true;
        return;
      }

      if (this.lastScrollPosition !== null) {
        const diff = scrollPosition - this.lastScrollPosition;

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

      this.lastScrollPosition = scrollPosition;
    },
    onSelectMenu(menu) {
      this.setIsShowingMenusModal(false);
      this.selectMenu(menu);

      const restaurantId = this.$route.params['restaurantId'];
      this.$router.push(`/place/${restaurantId}/menu/${menu.id}`);

      window.scrollTo(0, 0);
    },
    onErrorBackTo() {
      if (this.isMenuPage) {
        const restaurantId = this.$route.params['restaurantId'];
        this.$router.push(`/place/${restaurantId}`);
      } else if (this.isRestaurantPage) {
        this.$router.push(`/place`);
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
