<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="preview w-full min-w-4xl max-w-4xl" id="preview-menu">
      <Preloader :title="$t('preview.menu.loading_products')"  class="p-2"
                 v-if="isLoadingProducts"/>

      <template v-if="products && categories">
        <template v-for="c in categories" :key="c.id">
          <ListOfCategory :type="'products'" :category="c" :items="filterByCategory(products, c)"
                          :id="`menu-category-${c.id}`"/>
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
  name: "PreviewMenu",
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
      showMenus: true,
      loadingRestaurant: !this.selected
    };
  },
  computed: {
    ...mapGetters({
      menu: "preview/selected",
      menus: "preview/menus",
      category: "preview/category",
      spaces: "preview/spaces",
      products: "preview/products",
      categories: "preview/categories",
      restaurant: "preview/selected",
      isLoadingProducts: "preview/isLoadingProducts",
      isShowingMenusModal: "preview/isShowingMenusModal",
    }),
    uncategorized() {
      if (!this.products || !this.products.length) {
        return null;
      }

      return this.filterByCategory(this.products, null)
    },
  },
  watch: {
    menu: {
      handler(newMenu, oldMenu) {
        if (newMenu !== oldMenu && newMenu.products && newMenu.products.length) {
          const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

          if (scrollPosition > 80) {
            setTimeout(function () {
              window.scrollTo({
                top: 80,
                behavior: 'smooth',
              });
            }, 200);
          }
        }
      },
    },
    category: {
      async handler(newCategory) {
        if (newCategory) {

          const divider = document.getElementById('category-' + newCategory.id);

          if ((this.shouldNotScroll === 0 || (Date.now() - this.shouldNotScroll) > 100) && divider) {
            this.ignoringScroll = true;

            window.scrollTo({
              top: divider.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight >= 800 ? 98 : 54),
              behavior: 'smooth'
            });

            const idToCheck = this.ignoringScrollId++;

            setTimeout(() => {
              if (idToCheck === (this.ignoringScrollId - 1)) {
                this.ignoringScroll = false;
              }
            }, 1000)
          }
        }

        this.shouldNotScroll = 0;
      },
    },
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
      selectCategory: 'preview/selectCategory',
      setIsShowingMenusModal: 'preview/setIsShowingMenusModal',
    }),
    filterByCategory(products, category) {
      return products.filter(p => {
        if (category === null) {
          return !p.categoryIds || !p.categoryIds.length;
        }

        return p.categoryIds.includes(category.id);
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
