<template>
  <div class="navbar bg-base-300">
    <div class="flex-1">
      <div class="dropdown dropdown-bottom">
        <label tabindex="0">
          <Item :restaurant="restaurant"/>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box">
          <li v-for="r in (restaurants ?? []).filter(i => i !== restaurant)" :key="r">
            <Item :restaurant="r" @click="onSelectRestaurant(r)"/>
          </li>
        </ul>
      </div>
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
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box">
          <li v-for="t in themes" :key="t" class="justify-center items-center">
            <button :disabled="theme === t" @click="applyTheme(t)" class="rounded-box">{{ t }}</button>
          </li>
        </ul>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0">
          <button class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <RouterLink class="justify-between" to="marketplace">
              Marketplace
            </RouterLink>
          </li>
          <li v-if="authorized">
            <RouterLink class="justify-between" to="profile">
              Profile
            </RouterLink>
          </li>
        </ul>
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
  name: "NavBar",
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
  },
  methods: {
    ...mapActions({
      applyTheme: "theme/apply",
      selectRestaurant: "restaurants/setSelected",
    }),
    onSelectRestaurant(restaurant) {
      const elem = document.activeElement;
      if(elem){
        elem?.blur();
      }
      this.selectRestaurant(restaurant);
    },
  },
});
</script>

<style scoped>

</style>
