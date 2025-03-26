<template>
  <div class="w-full flex flex-col justify-center items-center bg-neutral text-neutral-content">

    <div class="w-full flex-col justify-center items-center">
      <div class="navbar flex h-[68px] self-center">
        <div class="flex-1">
          <button class="btn btn-square btn-ghost" v-if="isRestaurantPage || isMenuPage || isReviewsPage || isTipsPage || isTipsForWaiterPage || isTipsForServicePage || isTipsForFoodPage || isTipsForCleannessPage" @click="onBack">
            <BaseIcon :title="$t('preview.navbar.back')" color="transparent" width="24" height="24" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}">
              <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </BaseIcon>
          </button>

          <Item v-if="isMenuPage || isReviewsPage || isTipsPage || isTipsForWaiterPage || isTipsForServicePage || isTipsForFoodPage || isTipsForCleannessPage"
                :with-icon="!isNarrowScreen"
                :restaurant="restaurant"/>
        </div>

        <div class="flex-none gap-2">
          <label tabindex="0">
            <label for="app-drawer" class="drawer-button btn btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {defineComponent} from "vue";
import Item from "@/layouts/navbar/restaurant/Item.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {mapActions, mapGetters} from "vuex";
import {ThemeConfig} from "@/configs";

export default defineComponent({
  name: "PreviewNavBar",
  components: {
    Item,
    BaseIcon,
  },
  data() {
    return {
      lastScrollPosition: 0,
      showMainNavbar: true,
      showMenusNavbar: true,
      isNarrowScreen: window.innerWidth < 600,
    };
  },
  computed: {
    ThemeConfig() {
      return ThemeConfig
    },
    ...mapGetters({
      authorized: "auth/authorized",
      theme: "theme/get",
      themes: "theme/list",
      restaurant: "restaurants/selected",
      restaurants: "restaurants/resources",
      menu: "preview/selected",
      menus: "preview/menus",
      category: "preview/category",
      categories: "preview/categories",
    }),
    isMenuPage() {
      const name = this.$route.name;

      return name && name.endsWith('-menu');
    },
    isRestaurantPage() {
      const name = this.$route.name;

      return name && name.endsWith('-restaurant');
    },
    isReviewsPage() {
      const name = this.$route.name;

      return name && name.endsWith('-reviews');
    },
    isTipsPage() {
      const name = this.$route.name;

      return name && name.endsWith('-tips');
    },
    isTipsForWaiterPage() {
      const name = this.$route.name;

      return name && name.endsWith('-tips-for-waiter');
    },
    isTipsForServicePage() {
      const name = this.$route.name;

      return name && name.endsWith('-tips-for-service');
    },
    isTipsForFoodPage() {
      const name = this.$route.name;

      return name && name.endsWith('-tips-for-food');
    },
    isTipsForCleannessPage() {
      const name = this.$route.name;

      return name && name.endsWith('-tips-for-cleanness');
    },
    shouldShowBack() {
      return this.isMenuPage;
    },
  },
  methods: {
    ...mapActions({
      applyTheme: "theme/apply",
      selectRestaurant: "restaurants/setSelected",
      selectMenu: "preview/selectMenu",
      selectCategory: "preview/selectCategory",
    }),
    onSelectRestaurant(restaurant) {
      this.selectRestaurant(restaurant);
      this.onHide();

      window.scrollTo(0, 0);
    },
    onResize() {
      this.isNarrowScreen = window.innerWidth < 500;
    },
    onHide() {
      const elem = document.activeElement;
      if(elem){
        elem?.blur();
      }
    },
    onBack() {
      if (this.isMenuPage || this.isReviewsPage || this.isTipsPage || this.isTipsForWaiterPage || this.isTipsForServicePage || this.isTipsForFoodPage || this.isTipsForCleannessPage) {
        const restaurantId = this.$route.params['restaurantId'];
        if (this.isTipsForWaiterPage || this.isTipsForServicePage || this.isTipsForFoodPage || this.isTipsForCleannessPage) {
          this.$router.push(`/preview/${restaurantId}/tips`);
        } else {
          this.$router.push(`/preview/${restaurantId}`);
        }
      } else if (this.isRestaurantPage) {
        this.$router.push(`/preview`)
      }

      window.scrollTo(0, 0);

      if (this.$store.getters['error/present']) {
        this.$store.dispatch('error/clear');
      }
    },
    onScroll() {
      if (!this.isMenuPage) {
        return;
      }

      // Get the current scroll position
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return;
      }

      if (currentScrollPosition > 64) {
        this.showMainNavbar = false;
        this.showMenusNavbar = window.innerHeight >= 800;
      } else {
        this.showMainNavbar = true;
        this.showMenusNavbar = true;
      }
    },
    onSwitchTheme() {
      if (this.theme === this.themes[0]) {
        this.applyTheme(this.themes[1])
      } else {
        this.applyTheme(this.themes[0])
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener("resize", this.onResize);
  }
});
</script>

<style scoped>
</style>
