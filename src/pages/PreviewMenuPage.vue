<template>
  <div class="preview-page">
    <PreviewMenu v-if="menu" :menu="menu"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewMenu from "@/components/preview/PreviewMenu.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  name: "PreviewMenuPage",
  components: {
    PreviewMenu,
  },
  computed: {
    ...mapGetters({
      menu: 'preview/selected',
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
    }),
  },
  methods: {
    ...mapActions({
      selectMenu: "preview/selectMenu",
      loadAndSelectMenu: "preview/loadAndSelectMenu",
      loadMenusAndSelect: "preview/loadMenusAndSelect",
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
      this.$router.replace(`/preview/${restaurantId}`);
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
  },
});
</script>

<style scoped>
.preview-page {
  @apply flex flex-col w-full gap-3 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
