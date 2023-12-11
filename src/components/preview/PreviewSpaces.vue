<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="preview w-full min-w-4xl max-w-4xl" id="preview-menu">
      <Preloader :title="$t('preview.menu.loading_spaces')" class="p-2"
                 v-if="isLoadingSpaceCategories || isLoadingSpaces"/>

      <template v-if="spaces && categories">
        <template v-for="c in categories" :key="c.id">
          <ListOfCategory :type="'spaces'" :category="c" :items="filterByCategory(spaces, c)"
                          :id="`space-category-${c.id}`"/>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import Preloader from "@/components/preview/loading/Preloader.vue";
import ListOfCategory from "@/components/preview/list/ListOfCategory.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewSpaces",
  components: {
    ListOfCategory,
    Preloader,
  },
  data() {
    return {
      ignoringScroll: false,
      ignoringScrollId: 0,
      shouldNotScroll: 0,
      fixNavbar: false,
      loadingRestaurant: !this.selected
    };
  },
  computed: {
    ...mapGetters({
      spaces: "preview/spaces",
      categories: "preview/spaceCategories",
      restaurant: "preview/selected",
      isLoadingSpaceCategories: "preview/isLoadingSpaceCategories",
      isLoadingSpaces: "preview/isLoadingSpaces",
    }),
    uncategorized() {
      if (!this.spaces || !this.spaces.length) {
        return null;
      }

      return this.filterByCategory(this.spaces, null)
    },
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
      selectCategory: 'preview/selectCategory',
      setIsShowingMenusModal: 'preview/setIsShowingMenusModal',
    }),
    filterByCategory(spaces, category) {
      return spaces.filter(s => {
        if (category === null) {
          return !s.categoryIds || !s.categoryIds.length;
        }

        return s.categoryIds.includes(category.id);
      })
    },
    onScroll() {
      // Get the current scroll position
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (scrollPosition < 0) {
        return;
      }

      if (this.ignoringScroll) {
        return;
      }

      const categoriesCount = this.categories.length;

      for (let i = 0; i < categoriesCount; i++) {
        const category = this.categories[i];
        const group = document.getElementById(`menu-category-${category.id}`);

        if (!group) {
          continue;
        }

        const isTopOutOfView = group.offsetTop < scrollPosition
        const isBottomOutOfView = (group.offsetTop + group.clientHeight - 120) < scrollPosition;

        if (!isTopOutOfView || !isBottomOutOfView) {
          this.shouldNotScroll = Date.now();
          this.selectCategory(category);
          break;
        }
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
.preview {
  @apply flex flex-col gap-1 px-2;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
