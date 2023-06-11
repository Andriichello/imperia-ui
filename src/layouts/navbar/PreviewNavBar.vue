<template>
  <div class="navbar bg-neutral text-neutral-content opacity-80">

    <div class="navbar flex w-full h-[68px]">
      <div class="flex-1 gap-2">
        <button class="btn btn-square btn-ghost" v-if="shouldShowBack" @click="onBack">
          <BaseIcon title="back" color="transparent" width="24" height="24" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}">
            <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </BaseIcon>
        </button>

        <Item v-if="isRestaurantPage || isMenuPage"
              :with-icon="false"
              :restaurant="restaurant"/>
      </div>

      <div class="flex-none gap-2 pr-2">
        <div class="dropdown dropdown-end">

          <label tabindex="0">
            <button class="btn btn-square btn-ghost">
              <BaseIcon title="theme" color="transparent" width="24" height="24" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
              </BaseIcon>
            </button>
          </label>

          <ul tabindex="0" class="menu menu-sm dropdown-content mt-6 p-2 shadow bg-neutral rounded-box">
            <li v-for="t in themes" :key="t" class="justify-center items-center">
              <button :disabled="theme === t" @click="applyTheme(t)" class="rounded-box">{{ t }}</button>
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

export default defineComponent({
  name: "PreviewNavBar",
  components: {
    Item,
    BaseIcon,
  },
  computed: {
    ...mapGetters({
      authorized: "auth/authorized",
      theme: "theme/get",
      themes: "theme/list",
      restaurant: "restaurants/selected",
      restaurants: "restaurants/restaurants",
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
      return this.isMenuPage || this.isRestaurantPage;
    },
  },
  methods: {
    ...mapActions({
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
      if (this.isMenuPage) {
        const restaurantId = this.$route.params['restaurantId'];
        this.$router.push(`/preview/${restaurantId}`)
      } else if (this.isRestaurantPage) {
        this.$router.push(`/preview`)
      }
    },
  },
});
</script>

<style scoped>

</style>
