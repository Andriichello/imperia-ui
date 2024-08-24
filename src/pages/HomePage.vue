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
        <div class="w-full min-w-xl max-w-2xl flex items-baseline justify-between py-2 gap-5 pl-2 mb-1" v-if="restaurant">
          <span class="font-bold text-xl text-current">{{ $t('preview.restaurant.restaurant') }}</span>

          <button class="btn btn-sm btn-neutral" @click="onEditRestaurant">
            <BaseIcon :width="20" :height="20" title="edit" class="text-neutral-content">
              <path d="M20.3415 19.2089C20.7052 19.2089 21 19.498 21 19.8545C21 20.1813 20.7523 20.4514 20.4308 20.4941L20.3415 20.5H13.471C13.1073 20.5 12.8125 20.211 12.8125 19.8545C12.8125 19.5277 13.0602 19.2576 13.3816 19.2148L13.471 19.2089H20.3415ZM13.6592 4.41662C14.906 3.19446 16.9283 3.19446 18.175 4.41662L19.4694 5.6854C20.7162 6.90755 20.7162 8.88985 19.4694 10.112L9.74061 19.6486C9.1843 20.1939 8.43007 20.4999 7.64282 20.4999H3.65854C3.28841 20.4999 2.99098 20.201 3.00021 19.8383L3.10043 15.8975C3.12036 15.1526 3.43127 14.4425 3.96867 13.9157L13.6592 4.41662ZM12.906 6.979L4.89998 14.8287C4.60126 15.1215 4.42814 15.5169 4.41707 15.9305L4.33345 19.2084L7.64282 19.2088C8.03222 19.2088 8.4067 19.0745 8.70228 18.8317L8.8093 18.7357L16.855 10.849L12.906 6.979ZM17.2437 5.32953C16.5113 4.61156 15.323 4.61156 14.5905 5.32953L13.838 6.066L17.786 9.936L18.5381 9.19909C19.2298 8.52101 19.2683 7.44433 18.6534 6.72195L18.5381 6.59831L17.2437 5.32953Z"/>
            </BaseIcon>
            Редагувати
          </button>
        </div>

        <Restaurant :item="restaurant"
                    @open-reviews="onOpenReviews({restaurant})"/>

<!--        <ShortReviews class="reviews-container mt-2"-->
<!--                      :item="restaurant"-->
<!--                      @click="onOpenReviews({restaurant})"/>-->

        <template v-if="isLoadingMenus">
          <Preloader :title="$t('preview.restaurant.loading_menus')"
                     class="mt-3 p-2"/>
        </template>

        <div class="w-full min-w-xl max-w-2xl flex items-baseline justify-between py-2 gap-5 pl-2 mt-3 mb-1" v-if="menus && menus.length">
          <span class="font-bold text-xl text-current">{{ $t('preview.restaurant.menus') }}</span>

          <button class="btn btn-sm btn-neutral" @click="onEditMenus">
            <BaseIcon :width="20" :height="20" title="edit" class="text-neutral-content">
              <path d="M20.3415 19.2089C20.7052 19.2089 21 19.498 21 19.8545C21 20.1813 20.7523 20.4514 20.4308 20.4941L20.3415 20.5H13.471C13.1073 20.5 12.8125 20.211 12.8125 19.8545C12.8125 19.5277 13.0602 19.2576 13.3816 19.2148L13.471 19.2089H20.3415ZM13.6592 4.41662C14.906 3.19446 16.9283 3.19446 18.175 4.41662L19.4694 5.6854C20.7162 6.90755 20.7162 8.88985 19.4694 10.112L9.74061 19.6486C9.1843 20.1939 8.43007 20.4999 7.64282 20.4999H3.65854C3.28841 20.4999 2.99098 20.201 3.00021 19.8383L3.10043 15.8975C3.12036 15.1526 3.43127 14.4425 3.96867 13.9157L13.6592 4.41662ZM12.906 6.979L4.89998 14.8287C4.60126 15.1215 4.42814 15.5169 4.41707 15.9305L4.33345 19.2084L7.64282 19.2088C8.03222 19.2088 8.4067 19.0745 8.70228 18.8317L8.8093 18.7357L16.855 10.849L12.906 6.979ZM17.2437 5.32953C16.5113 4.61156 15.323 4.61156 14.5905 5.32953L13.838 6.066L17.786 9.936L18.5381 9.19909C19.2298 8.52101 19.2683 7.44433 18.6534 6.72195L18.5381 6.59831L17.2437 5.32953Z"/>
            </BaseIcon>
            Редагувати
          </button>
        </div>

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
import Preloader from "@/components/preview/loading/Preloader.vue";
import Error from "@/components/common/Error.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    BaseIcon,
    Error,
    Preloader,
    // ShortReviews,
    Menu,
    Restaurant
  },
  computed: {
    ...mapGetters({
      me: 'auth/me',
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
    onEditRestaurant() {
      if (!this.restaurant) {
        return;
      }

      this.$router.push(`/place/${this.restaurant.id}/edit`);
    },
    onEditMenus() {
      if (!this.restaurant) {
        return;
      }

      this.$router.push(`/place/${this.restaurant.id}/menus/edit`);
    },
  },
  async mounted() {
    const restaurantId = +this.$route.params['restaurantId'];

    if (restaurantId < 1) {
      // this.$router.replace(`/preview`);
      return;
    }

    if (!this.restaurant || (this.restaurant && this.restaurant.id !== restaurantId)) {
      const target = (this.restaurants ?? []).find(r => r.id === restaurantId);

      if (target) {
        await this.selectRestaurant(target);
      } else {
        await this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }

    this.loadReviewsIfMissing();
    this.loadMenusIfMissing();
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