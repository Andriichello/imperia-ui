<template>
  <div class="w-full flex flex-col justify-start items-center bg-neutral">

    <div class="w-full flex flex-col justify-center items-start text-neutral-content">
      <div class="navbar flex w-full bg-neutral text-neutral-content h-[68px]">
        <div class="flex-1">
          <button class="btn btn-square btn-ghost" v-if="isRestaurantPage || isMenuPage || isReviewsPage || isOrderPage || isHistoryPage" @click="onBack">
            <BaseIcon :title="$t('preview.navbar.back')" color="transparent" width="24" height="24" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}">
              <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </BaseIcon>
          </button>

          <Item v-if="isMenuPage || isOrderPage || isReviewsPage || isHistoryPage"
                :with-icon="!isNarrowScreen"
                :restaurant="restaurant"/>
        </div>

        <label tabindex="0">
          <label for="app-drawer" class="drawer-button btn btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </label>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Item from "@/layouts/navbar/restaurant/Item.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {mapActions, mapGetters} from "vuex";
import {ThemeConfig} from "@/configs";

export default defineComponent({
  name: "NavBar",
  components: {
    Item,
    BaseIcon,
  },
  data() {
    return {
      isNarrowScreen: window.innerWidth < 600,
    }
  },
  computed: {
    ThemeConfig() {
      return ThemeConfig
    },
    ...mapGetters({
      me: "auth/me",
      user: "auth/user",
      authorized: "auth/authorized",
      theme: "theme/get",
      themes: "theme/list",
      restaurantId: "restaurants/restaurantId",
      restaurant: "restaurants/selected",
      restaurants: "restaurants/resources",
      menu: "preview/menu",
      menus: "preview/menus",
    }),
    isPlacePage() {
      const name = this.$route.name;

      return name && (name.startsWith('place') || name === 'home');
    },
    isHomePage() {
      const name = this.$route.name;

      return name && name === 'home';
    },
    isMenuPage() {
      const name = this.$route.name;

      return name && name.endsWith('-menu');
    },
    isRestaurantPage() {
      const name = this.$route.name;

      return name && name.endsWith('-restaurant');
    },
    isEditRestaurantPage() {
      const name = this.$route.name;

      return name && name === 'edit-restaurant';
    },
    isReviewsPage() {
      const name = this.$route.name;

      return name && name.endsWith('-reviews');
    },
    isOrderPage() {
      const name = this.$route.name;

      return name && name.endsWith('-order');
    },
    isHistoryPage() {
      const name = this.$route.name;

      return name && name.endsWith('-history');
    },
    shouldShowBack() {
      return this.isMenuPage;
    },
  },
  watch: {
    me(newMe) {
      if (!newMe) {
        return;
      }

      if (this.isHomePage || this.isHistoryPage || this.isOrderPage || this.isRestaurantPage || this.isReviewsPage) {
        if (!this.isPlacePage) {
          return;
        }

        if (newMe.status === 401) {
          this.$router.push(`/login`);
        }
      }
    },
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
      applyTheme: "theme/apply",
      selectRestaurant: "restaurants/setSelected",
      clearOrder: "order/clear",
      clearBanquet: "basket/clear",
    }),
    onSelectRestaurant(restaurant) {
      this.selectRestaurant(restaurant);
      this.onHide();
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
      const restaurantId = this.$route.params['restaurantId'];

      if (this.isReviewsPage || this.isMenuPage || this.isHistoryPage || this.isEditRestaurantPage) {
        this.$router.push(`/place/${restaurantId}`)
      } else if (this.isRestaurantPage) {
        this.$router.push(`/place`);
      } else if (this.isOrderPage) {
        const menuId = this.$store.getters['preview/menu']?.id;
        const banquetId = this.$route.params['banquetId'];

        let path = `/place/${restaurantId}`;

        if (banquetId) {
          path += `/order/${banquetId}`;
        }

        path += `/menu`;

        if (menuId) {
          path += `/${menuId}`;
        }

        this.$router.push(path);
      }


      window.scrollTo(0, 0);

      if (this.$store.getters['error/present']) {
        this.$store.dispatch('error/clear');
      }

      this.onHide();
    },
    mounted() {
      window.addEventListener("resize", this.onResize);
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.onResize);
    }
  },
});
</script>

<style scoped>

</style>
