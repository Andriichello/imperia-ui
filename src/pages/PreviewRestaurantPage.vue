<template>
  <div class="preview-page">
    <PreviewRestaurant class="max-w-2xl"
        @menu-select="onSelectMenu"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewRestaurant from "@/components/preview/PreviewRestaurant.vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  name: "PreviewRestaurantPage",
  components: {
    PreviewRestaurant,
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
    }),
  },
  methods: {
    ...mapActions({
      selectRestaurant: "restaurants/setSelected",
      loadMenusIfMissing: "preview/loadMenusIfMissing",
      loadAndSelectRestaurant: "restaurants/loadAndSelectRestaurant",
    }),
    onSelectMenu({ restaurant, menu }) {
      this.$router.push(`/preview/${restaurant.id}/menu/${menu.id}`);
    },
  },
  mounted() {
    const restaurantId = +this.$route.params['restaurantId'];

    if (restaurantId < 1) {
      this.$router.replace(`/preview`);
      return;
    }

    if (!this.restaurant || (this.restaurant && this.restaurant.id !== restaurantId)) {
      const target = (this.restaurants ?? []).find(r => r.id === restaurantId);

      if (target) {
        this.selectRestaurant(target);
      } else {
        this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }

    this.loadMenusIfMissing();
  },
});
</script>

<style scoped>
.preview-page {
  @apply flex flex-col w-full gap-0 pt-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
