<template>
  <div class="preview-page">
    <PreviewMenu :menu="menu" v-if="menu"/>
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
  watch: {
    restaurant: {
      async handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.loadMenusIfMissing();
        }

        const id = this.$route.params.restaurantId;

        if (newVal && id != newVal.id) {
          // this.$router.replace(`/preview/${newVal.id}`);
        }
      }
    }
  },
  methods: {
    ...mapActions({
      loadAndSelectMenu: "preview/loadAndSelectMenu",
      loadMenusAndSelect: "preview/loadMenusAndSelect",
      loadMenusIfMissing: "preview/loadMenusIfMissing",
      loadAndSelectRestaurant: "restaurants/loadAndSelectRestaurant",
    }),
  },
  mounted() {
    const restaurantId = this.$route.params.restaurantId;
    const menuId = this.$route.params.menuId;

    console.log({restaurantId, menuId})

    if (menuId && (!this.menu || this.menu.id != menuId)) {
      this.loadAndSelectRestaurant({ restaurantId });
      this.loadAndSelectMenu({ menuId });
    }
  },
});
</script>

<style scoped>
.preview-page {
  @apply flex flex-col w-full p-3 gap-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
