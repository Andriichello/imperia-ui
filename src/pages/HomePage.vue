<template>
  <div class="w-full h-full flex flex-col justify-start items-center">

    <Error :back-to-page="true" :with-reload="false" @on-back-to="onBackTo"
           class="w-full min-h-full"
           v-if="!isValidRestaurantId"/>

    <div class="place max-w-xl px-2 pt-3 pb-10" v-else>
      <template v-if="isLoadingRestaurant">
        <Preloader :title="$t('preview.restaurant.loading')"
                   class="p-2"/>
      </template>

      <template v-if="restaurant">
        <Divider v-if="restaurant"
                 class="mb-1"
                 :lines="false"
                 :title="$t('preview.restaurant.restaurant')"/>

        <Restaurant :item="restaurant"
                    @open-reviews="onOpenReviews({restaurant})"/>

        <ShortReviews class="reviews-container mt-2"
                      :item="restaurant"
                      @click="onOpenReviews({restaurant})"/>

        <template v-if="isLoadingMenus">
          <Preloader :title="$t('preview.restaurant.loading_menus')"
                     class="mt-3 p-2"/>
        </template>

        <Divider v-if="menus && menus.length"
                 class="mt-3 mb-1"
                 :lines="false"
                 :title="$t('preview.restaurant.menus')"/>

        <div class="w-full flex flex-col justify-center items-center gap-2">
          <Menu class="w-full"
                v-for="m in menus" :key="m.id"
                :menu="m" @click="onSelectMenu({restaurant, menu: m})"/>
        </div>

      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {mapActions, mapGetters} from "vuex";
import Restaurant from "@/components/preview/restaurant/Restaurant.vue";
import Menu from "@/components/preview/menu/Menu.vue";
import ShortReviews from "@/components/preview/review/ShortReviews.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";
import Divider from "@/layouts/divider/Divider.vue";
import PreviewRestaurant from "@/components/preview/PreviewRestaurant.vue";
import Error from "@/components/common/Error.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    Error,
    Divider,
    Preloader,
    ShortReviews,
    Menu,
    Restaurant
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      reviews: 'reviews/reviews',
      restaurant: 'restaurants/selected',
      menus: 'preview/menus',
      isLoadingMenus: 'preview/isLoadingMenus',
      isLoadingRestaurants: 'restaurants/isLoadingRestaurants',
      restaurantResponse: 'restaurants/getShowResponse',
      restaurantsResponse: 'restaurants/getIndexResponse',
    }),
    isLoadingRestaurant() {
      return !this.restaurant && !this.restaurantResponse && !this.restaurantsResponse;
    },
    isValidRestaurantId() {
      if (!this.user || !this.user.restaurantId) {
        return true;
      }

      const restaurantId = +this.$route.params['restaurantId'];

      return !restaurantId || restaurantId === this.user.restaurantId;
    },
  },
  watch: {
    user(newUser) {
      if (!newUser || !newUser.restaurantId) {
        return;
      }

      const restaurantId = +this.$route.params['restaurantId'];

      if (!restaurantId || restaurantId === newUser.restaurantId) {
        this.loadAndSelectRestaurant({id: newUser.restaurantId});
        this.$router.push(`/place/${newUser.restaurantId}`);
      }
    },
    restaurant(newRestaurant) {
      this.loadReviewsIfMissing();
      this.loadMenusIfMissing();
    },
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
      selectRestaurant: 'restaurants/setSelected',
      loadAndSelectRestaurant: 'restaurants/loadAndSelectRestaurant',
      loadReviewsIfMissing: 'reviews/loadReviewsIfMissing',
      loadMenusIfMissing: 'preview/loadMenusIfMissing',
    }),
    onBackTo() {
      if (this.user && this.user.restaurantId) {
        this.$router.replace(`/place/${this.user.restaurantId}`);

        if (!this.restaurant) {
          this.loadAndSelectRestaurant({id: this.user.restaurantId});
        }
      } else {
        this.$router.replace(`/place`);
      }
    },
    onSelectMenu({ restaurant, menu }) {
      if (!restaurant) {
        return;
      }

      this.selectMenu(menu);

      window.scrollTo(0, 0)
      this.$router.push(`/place/${restaurant.id}/menu/${menu.id}`);
    },
    onOpenReviews({ restaurant }) {
      if (!this.restaurant) {
        return;
      }

      this.$router.push(`/place/${restaurant.id}/reviews`);
    },
  },
});
</script>

<style scoped>
.place {
  @apply flex flex-col w-full gap-0 px-2 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: start;
  align-items: center;
}

.reviews-container {
  @apply card shadow-xl flex flex-row flex-wrap justify-center items-start gap-0 bg-base-100 p-2 btn-ghost;

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}
</style>