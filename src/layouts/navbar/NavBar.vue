<template>
  <div class="w-full flex flex-col justify-start items-center bg-neutral">

    <div class="w-full flex flex-col justify-center items-start text-neutral-content">
      <div class="navbar flex w-full bg-neutral text-neutral-content h-[68px]">
        <div class="flex-1 gap-2">
          <button class="btn btn-square btn-ghost" v-if="isRestaurantPage || isMenuPage || isReviewsPage || isOrderPage" @click="onBack">
            <BaseIcon :title="$t('preview.navbar.back')" color="transparent" width="24" height="24" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}">
              <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </BaseIcon>
          </button>

          <Item v-if="isMenuPage || isOrderPage || isReviewsPage"
                :with-icon="false"
                :restaurant="restaurant"/>
        </div>

        <div class="flex-none gap-2 pr-2" v-if="!authorized">
          <button class="btn btn-square btn-ghost"
                  @click="onSwitchTheme">
            <BaseIcon :title="$t('preview.navbar.theme')" color="transparent" width="24" height="24" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}">
              <template v-if="theme === ThemeConfig.dark()">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.11628C9.3028 7.11628 7.11628 9.3028 7.11628 12C7.11628 14.6972 9.3028 16.8837 12 16.8837C14.6972 16.8837 16.8837 14.6972 16.8837 12C16.8837 9.3028 14.6972 7.11628 12 7.11628ZM5.72093 12C5.72093 8.53217 8.53217 5.72093 12 5.72093C15.4678 5.72093 18.2791 8.53217 18.2791 12C18.2791 15.4678 15.4678 18.2791 12 18.2791C8.53217 18.2791 5.72093 15.4678 5.72093 12Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C12.3853 2 12.6977 2.31236 12.6977 2.69767V3.62791C12.6977 4.01322 12.3853 4.32558 12 4.32558C11.6147 4.32558 11.3023 4.01322 11.3023 3.62791V2.69767C11.3023 2.31236 11.6147 2 12 2Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 19.6744C12.3853 19.6744 12.6977 19.9868 12.6977 20.3721V21.3023C12.6977 21.6876 12.3853 22 12 22C11.6147 22 11.3023 21.6876 11.3023 21.3023V20.3721C11.3023 19.9868 11.6147 19.6744 12 19.6744Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 12.3853 21.6876 12.6977 21.3023 12.6977H20.3721C19.9868 12.6977 19.6744 12.3853 19.6744 12C19.6744 11.6147 19.9868 11.3023 20.3721 11.3023H21.3023C21.6876 11.3023 22 11.6147 22 12Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.32558 12C4.32558 12.3853 4.01322 12.6977 3.62791 12.6977H2.69767C2.31236 12.6977 2 12.3853 2 12C2 11.6147 2.31236 11.3023 2.69767 11.3023H3.62791C4.01322 11.3023 4.32558 11.6147 4.32558 12Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0711 4.92893C19.3435 5.20139 19.3435 5.64313 19.0711 5.91559L18.4133 6.57337C18.1408 6.84583 17.6991 6.84583 17.4266 6.57337C17.1542 6.30091 17.1542 5.85916 17.4266 5.58671L18.0844 4.92893C18.3569 4.65647 18.7986 4.65647 19.0711 4.92893Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.57337 17.4266C6.84583 17.6991 6.84583 18.1408 6.57337 18.4133L5.91559 19.0711C5.64313 19.3435 5.20139 19.3435 4.92893 19.0711C4.65647 18.7986 4.65647 18.3569 4.92893 18.0844L5.58671 17.4266C5.85916 17.1542 6.30091 17.1542 6.57337 17.4266Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0711 19.0711C18.7986 19.3435 18.3569 19.3435 18.0844 19.0711L17.4266 18.4133C17.1542 18.1408 17.1542 17.6991 17.4266 17.4266C17.6991 17.1542 18.1408 17.1542 18.4133 17.4266L19.0711 18.0844C19.3435 18.3569 19.3435 18.7986 19.0711 19.0711Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.57337 6.57337C6.30091 6.84583 5.85917 6.84583 5.58671 6.57337L4.92893 5.91559C4.65647 5.64313 4.65647 5.20139 4.92893 4.92893C5.20139 4.65647 5.64313 4.65647 5.91559 4.92893L6.57337 5.58671C6.84583 5.85916 6.84583 6.30091 6.57337 6.57337Z" fill="currentColor"/>
              </template>

              <template v-else>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2154 3.31437C12.0492 3.54032 12.0187 3.83868 12.1358 4.09354C12.6493 5.21097 12.9022 6.31549 12.9022 7.54849C12.9022 11.4234 9.63724 14.7358 5.44505 14.7358C4.99513 14.7358 4.528 14.6268 3.95275 14.4877C3.66956 14.4192 3.37196 14.5161 3.18339 14.7382C2.99482 14.9603 2.94746 15.2697 3.06095 15.538C4.44561 18.8117 7.80801 21 11.7211 21C16.8729 21 21 16.8935 21 12C21 7.4123 17.486 3.5932 12.9355 3.00635C12.6573 2.97047 12.3816 3.08842 12.2154 3.31437ZM14.0568 4.82295C17.2042 5.79639 19.4571 8.67288 19.4571 12C19.4571 16.0095 16.053 19.4571 11.7211 19.4571C8.97499 19.4571 6.61107 18.2002 5.2318 16.2734C5.30261 16.2768 5.37373 16.2787 5.44505 16.2787C10.4577 16.2787 14.445 12.3068 14.445 7.54849C14.445 6.59161 14.3149 5.69502 14.0568 4.82295Z" fill="currentColor"/>
              </template>
            </BaseIcon>
          </button>
        </div>

        <div class="dropdown dropdown-end" v-if="authorized">
          <label tabindex="0">
            <button class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52">
<!--            <li>-->
<!--              <RouterLink :class="{'hover:bg-base-100/25': theme !== ThemeConfig.dark(), 'hover:text-base-100': theme !== ThemeConfig.dark()}"-->
<!--                          to="/preview" replace>-->
<!--                Preview-->
<!--              </RouterLink>-->
<!--            </li>-->
            <!--          <li>-->
            <!--            <RouterLink class="justify-between" to="/marketplace" replace>-->
            <!--              Marketplace-->
            <!--            </RouterLink>-->
            <!--          </li>-->
<!--            <li v-if="authorized">-->
<!--              <RouterLink :class="{'hover:bg-base-100/25': theme !== ThemeConfig.dark(), 'hover:text-base-100': theme !== ThemeConfig.dark()}"-->
<!--                          to="/profile" replace>-->
<!--                {{ $t('preview.navbar.profile') }}-->
<!--              </RouterLink>-->
<!--            </li>-->
            <li v-if="authorized" @click="onSwitchTheme">
              <span :class="{'hover:bg-base-100/25': theme !== ThemeConfig.dark(), 'hover:text-base-100': theme !== ThemeConfig.dark()}">
                {{ $t('preview.navbar.theme') }}
              </span>
            </li>
            <li v-if="authorized" @click="onLogout">
              <span :class="{'hover:bg-base-100/25': theme !== ThemeConfig.dark(), 'hover:text-base-100': theme !== ThemeConfig.dark()}">
                {{ $t('preview.navbar.logout') }}
              </span>
            </li>
          </ul>
        </div>
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
  computed: {
    ThemeConfig() {
      return ThemeConfig
    },
    ...mapGetters({
      user: "auth/user",
      authorized: "auth/authorized",
      theme: "theme/get",
      themes: "theme/list",
      restaurant: "restaurants/selected",
      restaurants: "restaurants/restaurants",
      menu: "preview/menu",
      menus: "preview/menus",
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
    isOrderPage() {
      const name = this.$route.name;

      return name && name.endsWith('-order');
    },
    shouldShowBack() {
      return this.isMenuPage;
    },
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
      applyTheme: "theme/apply",
      selectRestaurant: "restaurants/setSelected",
    }),
    onSelectRestaurant(restaurant) {
      this.selectRestaurant(restaurant);
      this.onHide();
    },
    onHide() {
      const elem = document.activeElement;
      if(elem){
        elem?.blur();
      }
    },
    onBack() {
      const restaurantId = this.$route.params['restaurantId'];

      if (this.isReviewsPage || this.isMenuPage) {
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
    },
    onSwitchTheme() {
      if (this.theme === this.themes[0]) {
        this.applyTheme(this.themes[1])
      } else {
        this.applyTheme(this.themes[0])
      }
    },
    async onLogout() {
      if (this.user && this.authorized) {
        await this.logout();

        this.$router.push('/login');
      }
    },
  },
});
</script>

<style scoped>

</style>
