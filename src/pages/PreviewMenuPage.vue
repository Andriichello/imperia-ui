<template>
  <div class="order-page">
    <Preloader :title="$t('preview.restaurant.loading')" class="p-2"
               v-if="loadingRestaurant || isLoadingRestaurants"/>

    <Preloader :title="$t('preview.menu.loading')" class="p-2"
               v-if="!isLoadingRestaurants && isLoadingMenus"/>

    <PreviewMenu v-if="menu" :menu="menu"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewMenu from "@/components/preview/PreviewMenu.vue";
import {mapActions, mapGetters} from "vuex";
import Preloader from "@/components/preview/loading/Preloader.vue";

export default defineComponent({
  name: "PreviewMenuPage",
  components: {
    Preloader,
    PreviewMenu,
  },
  data() {
    return {
      loadingRestaurant: false,
    }
  },
  watch: {
    showRestaurantResponse: {
      handler() {
        this.loadingRestaurant = false;
      },
    },
    restaurant: {
      handler(newRestaurant, oldRestaurant) {
        // this.loadingRestaurant = false;

        if (newRestaurant === oldRestaurant) {
          return;
        }

        const menuId = +this.$route.params['menuId'];

        if (!this.menu || (this.menu && this.menu.id !== menuId)) {
          const target = (this.menus ?? []).find(r => r.id === menuId);

          if (target) {
            this.selectMenu(target);
          } else {
            this.loadMenusAndSelect({ id: menuId });
          }
        } else {
          this.loadMenusIfMissing();
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      menu: 'preview/selected',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
      showRestaurantResponse: 'restaurants/getShowResponse',
      isLoadingMenus: "preview/isLoadingMenus",
      isLoadingRestaurants: "restaurants/isLoadingRestaurants",
    }),
  },
  methods: {
    ...mapActions({
      selectMenu: "preview/selectMenu",
      loadAndSelectMenu: "preview/loadAndSelectMenu",
      loadMenusAndSelect: "preview/loadMenusAndSelect",
      loadMenusAndSelectFirst: "preview/loadMenusAndSelectFirst",
      loadMenusIfMissing: "preview/loadMenusIfMissing",
      selectRestaurant: "restaurants/setSelected",
      loadAndSelectRestaurant: "restaurants/loadAndSelectRestaurant",
    }),
  },
  async mounted() {
    const restaurantId = +this.$route.params['restaurantId'];
    if (restaurantId < 1) {
      this.$router.replace(`/preview`);
      return;
    }

    const menuId = +this.$route.params['menuId'];
    if (menuId < 1) {
      if (this.menu) {
        this.$router.replace(`/preview/${restaurantId}/menu/${this.menu.id}`);
      } else if (this.menus && this.menus.length > 0) {
        this.$router.replace(`/preview/${restaurantId}/menu/${this.menus[0].id}`);
      } else {
        await this.loadMenusAndSelectFirst();

        if (this.menu) {
          this.$router.replace(`/preview/${restaurantId}/menu/${this.menu.id}`);
        }
      }

      return;
    }

    if (this.restaurants && this.restaurant?.id === restaurantId) {
      if (!this.menu || (this.menu && this.menu.id !== menuId)) {
        const target = (this.menus ?? []).find(r => r.id === menuId);

        if (target) {
          this.selectMenu(target);
        } else {
          this.loadMenusAndSelect({ id: menuId });
        }
      } else {
        this.loadMenusIfMissing();
      }
    }

    if (!this.restaurant || (this.restaurant && this.restaurant.id !== restaurantId)) {
      const target = (this.restaurants ?? []).find(r => r.id === restaurantId);

      if (target) {
        await this.selectRestaurant(target);
      } else {
        this.loadingRestaurant = true;
        await this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }
  },
});
</script>

<style scoped>
.order-page {
  @apply flex flex-col w-full gap-3 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
