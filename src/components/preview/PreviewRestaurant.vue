<template>
  <div class="preview">
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
                  @open-reviews="onOpenReviews()"/>

      <ShortReviews class="reviews-container mt-2"
                    :item="restaurant"
                    @click="onOpenReviews"/>

<!--      <ShortTips class="waiters-container mt-2"-->
<!--                    @click="onOpenTips"/>-->

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
              :menu="m" @click="onMenuSelect(m)"/>
      </div>

    </template>

  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import Divider from "@/layouts/divider/Divider.vue";
import Restaurant from "@/components/preview/restaurant/Restaurant.vue";
import Menu from "@/components/preview/menu/Menu.vue";
import ShortReviews from "@/components/preview/review/ShortReviews.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";
// import ShortTips from "@/components/preview/tips/ShortTips.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewRestaurant",
  emits: ["menu-select", "open-reviews", "open-tips"],
  components: {
    // ShortTips,
    Preloader,
    ShortReviews,
    Menu,
    Restaurant,
    Divider,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/resources',
      menus: 'preview/menus',
      menusResponse: 'preview/menusResponse',
      restaurantsResponse: 'restaurants/index',
      restaurantResponse: 'restaurants/show',
    }),
    isLoadingRestaurant() {
      return !this.restaurant && !this.restaurantResponse && !this.restaurantsResponse;
    },
    isLoadingMenus() {
      return !this.menus && !this.menusResponse;
    },
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
      selectRestaurant: 'restaurants/setSelected',
      loadMenusIfMissing: 'preview/loadMenusIfMissing',
      loadAndSelectRestaurant: 'restaurants/loadAndSelectResource',
    }),
    onMenuSelect(menu) {
      this.selectMenu(menu);
      this.$emit('menu-select', {restaurant: this.restaurant, menu: menu});
    },
    onOpenReviews() {
      this.$emit('open-reviews', {restaurant: this.restaurant})
    },
    onOpenTips() {
      this.$emit('open-tips', {restaurant: this.restaurant})
    },
  },
});
</script>

<style scoped>
.preview {
  @apply flex flex-col w-full gap-0 px-2 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}

.reviews-container {
  @apply card shadow-xl flex flex-row flex-wrap justify-center items-start gap-0 bg-base-100 p-2 btn-ghost;

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}

.waiters-container {
  @apply card shadow-xl flex flex-row flex-wrap justify-center items-start gap-0 bg-base-100 p-2 btn-ghost;

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}
</style>
