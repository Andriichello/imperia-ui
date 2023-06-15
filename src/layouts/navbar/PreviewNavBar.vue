<template>
  <div class="w-full flex flex-col">

    <div class="navbar flex-col text-neutral-content bg-neutral" v-if="showMainNavbar">
        <div class="navbar flex w-full h-[68px]">
          <div class="flex-1 gap-2">
            <button class="btn btn-square btn-ghost" v-if="isRestaurantPage || isMenuPage" @click="onBack">
              <BaseIcon :title="$t('preview.navbar.back')" color="transparent" width="24" height="24" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}">
                <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </BaseIcon>
            </button>

            <Item v-if="isMenuPage"
                  :with-icon="false"
                  :restaurant="restaurant"/>
          </div>

          <div class="flex-none gap-2 pr-2">
            <button class="btn btn-square btn-ghost"
              @click="onSwitchTheme">
              <BaseIcon :title="$t('preview.navbar.theme')" color="transparent" width="24" height="24" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
              </BaseIcon>
            </button>
<!--            <div class="dropdown dropdown-end">-->

<!--              <label tabindex="0">-->

<!--              </label>-->

<!--              <ul tabindex="0" class="menu menu-sm dropdown-content mt-6 p-2 shadow bg-neutral rounded-box">-->
<!--                <li v-for="t in themes" :key="t" class="justify-center items-center">-->
<!--                  <button :disabled="theme === t" @click="applyTheme(t)" class="rounded-box">{{ $t('theme.' + t) }}</button>-->
<!--                </li>-->
<!--              </ul>-->

<!--            </div>-->
          </div>
        </div>
      </div>

    <div class="w-full flex flex-col justify-center bg-base-100 shadow-md pb-1" v-if="menu && isMenuPage">
      <div class="w-full flex justify-center items-center" v-if="menus">
        <div class="max-w-full flex justify-start p-1 pt-2 gap-2 overflow-x-auto overflow-y-hidden">
          <template v-for="m in menus" :key="m.id">
            <a class="tab tab-bordered text-2xl font-bold"
               :class="{'tab-active': menu && menu.id === m.id}"
               @click="onSelectMenu(m)">
              {{ m.title }}
            </a>
          </template>
        </div>
      </div>

      <!--      <div class="flex justify-center w-full">-->
      <!--        <h2 class="text-xl font-bold">{{ menu.title }}</h2>-->
      <!--      </div>-->

      <div class="w-full flex justify-center items-center">
        <div class="max-w-full flex justify-start p-1 pt-2 gap-2 overflow-x-auto overflow-y-hidden">
          <template v-for="c in (categories ?? [])" :key="c.id">
            <Category :item="c"
                      :selected="category && category.id === c.id"
                      @category-toggle="onToggleCategory"/>
          </template>
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
import Category from "@/components/preview/category/Category.vue";

export default defineComponent({
  name: "PreviewNavBar",
  components: {
    Item,
    BaseIcon,
    Category,
  },
  data() {
    return {
      lastScrollPosition: 0,
      showMainNavbar: true,
    };
  },
  computed: {
    ...mapGetters({
      authorized: "auth/authorized",
      theme: "theme/get",
      themes: "theme/list",
      restaurant: "restaurants/selected",
      restaurants: "restaurants/restaurants",
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
    },
    onSelectMenu(menu) {
      this.selectMenu(menu)

      const restaurantId = this.$route.params['restaurantId'];
      this.$router.push(`/preview/${restaurantId}/menu/${menu.id}`)
    },
    onToggleCategory({category, selected}) {
      if (selected) {
        return;
      }

      this.selectCategory(category);
    },
    onHide() {
      const elem = document.activeElement;
      if(elem){
        elem?.blur();
      }
    },
    onBack() {
      if (this.isMenuPage) {
        const restaurantId = this.$route.params['restaurantId'];
        this.$router.push(`/preview/${restaurantId}`)
      } else if (this.isRestaurantPage) {
        this.$router.push(`/preview`)
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
      } else {
        this.showMainNavbar = true;
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
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
});
</script>

<style scoped>
</style>
