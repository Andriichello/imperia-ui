<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="preview w-full min-w-4xl max-w-4xl" id="preview-menu">
      <Preloader :title="$t('preview.menu.loading_products')"  class="p-2"
                 v-if="isLoadingProducts"/>

      <template v-if="only !== null && !areThereAddedProducts">
        <div class="flex flex-col items-center justify-center">
          <span class="text-center text-2xl p-5">
            {{ $t('preview.menu.only_added_list_is_empty') }}
          </span>

          <button class="btn btn-md h-10 btn-ghost rounded cart bg-[var(--yellow)] hover:bg-[var(--yellow)]"
                  @click="onToggleAddedOnly">
            {{ $t('preview.menu.only_added_to_show_all') }}

            <BaseIcon :title="$t('preview.navbar.cart')" color="currentColor" width="24" height="24" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}">
              <g id="Buy">
                <g id="Group 7">
                  <path id="Fill 1" fill-rule="evenodd" clip-rule="evenodd" d="M6.32772 8.34736L6.93072 15.5194C6.97472 16.0714 7.42572 16.4854 7.97672 16.4854H7.98072H18.8917H18.8937C19.4147 16.4854 19.8597 16.0974 19.9337 15.5824L20.8837 9.02337C20.9057 8.86736 20.8667 8.71136 20.7717 8.58536C20.6777 8.45836 20.5397 8.37636 20.3837 8.35436C20.1747 8.36236 11.5017 8.35036 6.32772 8.34736ZM7.97472 17.9854C6.65772 17.9854 5.54272 16.9574 5.43572 15.6424L4.51972 4.74836L3.01272 4.48836C2.60372 4.41636 2.33072 4.02936 2.40072 3.62036C2.47272 3.21136 2.86772 2.94536 3.26772 3.00936L5.34772 3.36936C5.68272 3.42836 5.93772 3.70637 5.96672 4.04637L6.20172 6.84736C20.4777 6.85336 20.5237 6.86037 20.5927 6.86837C21.1497 6.94937 21.6397 7.24037 21.9737 7.68836C22.3077 8.13537 22.4477 8.68637 22.3677 9.23837L21.4187 15.7964C21.2397 17.0444 20.1557 17.9854 18.8957 17.9854H18.8907H7.98272H7.97472Z"/>
                  <path id="Fill 3" fill-rule="evenodd" clip-rule="evenodd" d="M17.2876 12.0437H14.5156C14.1006 12.0437 13.7656 11.7077 13.7656 11.2937C13.7656 10.8797 14.1006 10.5437 14.5156 10.5437H17.2876C17.7016 10.5437 18.0376 10.8797 18.0376 11.2937C18.0376 11.7077 17.7016 12.0437 17.2876 12.0437Z"/>
                  <path id="Fill 5" fill-rule="evenodd" clip-rule="evenodd" d="M7.54451 20.7019C7.84551 20.7019 8.08851 20.9449 8.08851 21.2459C8.08851 21.5469 7.84551 21.7909 7.54451 21.7909C7.24251 21.7909 6.99951 21.5469 6.99951 21.2459C6.99951 20.9449 7.24251 20.7019 7.54451 20.7019Z"/>
                </g>
                <g id="Group 10">
                  <mask id="mask0_33437_4502" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="6" y="20" width="3" height="2">
                    <path id="Clip 9" fill-rule="evenodd" clip-rule="evenodd" d="M6.99902 21.2454C6.99902 21.5474 7.24202 21.7914 7.54502 21.7914C7.84602 21.7914 8.08902 21.5474 8.08902 21.2454C8.08902 20.9444 7.84602 20.7014 7.54502 20.7014C7.24202 20.7014 6.99902 20.9444 6.99902 21.2454Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_33437_4502)">
                    <path id="Fill 8" fill-rule="evenodd" clip-rule="evenodd" d="M2 26.7904H13.089V15.7014H2V26.7904Z"/>
                  </g>
                </g>
                <g id="Group 15">
                  <path id="Fill 11" fill-rule="evenodd" clip-rule="evenodd" d="M7.54351 21.0408C7.43051 21.0408 7.33851 21.1328 7.33851 21.2458C7.33851 21.4728 7.74951 21.4728 7.74951 21.2458C7.74951 21.1328 7.65651 21.0408 7.54351 21.0408ZM7.54351 22.5408C6.82951 22.5408 6.24951 21.9598 6.24951 21.2458C6.24951 20.5318 6.82951 19.9518 7.54351 19.9518C8.25751 19.9518 8.83851 20.5318 8.83851 21.2458C8.83851 21.9598 8.25751 22.5408 7.54351 22.5408Z"/>
                  <path id="Fill 13" fill-rule="evenodd" clip-rule="evenodd" d="M18.8248 20.7019C19.1258 20.7019 19.3698 20.9449 19.3698 21.2459C19.3698 21.5469 19.1258 21.7909 18.8248 21.7909C18.5228 21.7909 18.2798 21.5469 18.2798 21.2459C18.2798 20.9449 18.5228 20.7019 18.8248 20.7019Z"/>
                </g>
                <g id="Group 18">
                  <mask id="mask1_33437_4502" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="18" y="20" width="2" height="2">
                    <path id="Clip 17" fill-rule="evenodd" clip-rule="evenodd" d="M18.28 21.2454C18.28 21.5474 18.523 21.7914 18.825 21.7914C19.125 21.7914 19.37 21.5474 19.37 21.2454C19.37 20.9444 19.125 20.7014 18.825 20.7014C18.523 20.7014 18.28 20.9444 18.28 21.2454Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask1_33437_4502)">
                    <path id="Fill 16" fill-rule="evenodd" clip-rule="evenodd" d="M13.28 26.7904H24.37V15.7014H13.28V26.7904Z"/>
                  </g>
                </g>
                <path id="Fill 19" fill-rule="evenodd" clip-rule="evenodd" d="M18.8238 21.0408C18.7118 21.0408 18.6198 21.1328 18.6198 21.2458C18.6208 21.4748 19.0308 21.4728 19.0298 21.2458C19.0298 21.1328 18.9368 21.0408 18.8238 21.0408ZM18.8238 22.5408C18.1098 22.5408 17.5298 21.9598 17.5298 21.2458C17.5298 20.5318 18.1098 19.9518 18.8238 19.9518C19.5388 19.9518 20.1198 20.5318 20.1198 21.2458C20.1198 21.9598 19.5388 22.5408 18.8238 22.5408Z"/>
              </g>
            </BaseIcon>
          </button>

        </div>
      </template>

      <template v-else-if="products && categories">
        <template v-for="c in categories" :key="c.id">
          <ListOfCategory :type="'products'" :category="c"
                          :items="filterByOnly(filterByCategory(products, c))"
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
import BaseIcon from "@/components/icons/BaseIcon.vue";
import category from "@/components/preview/category/Category.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewMenu",
  components: {
    BaseIcon,
    ListOfCategory,
    Preloader,
  },
  props: {
    only: {
      type: Array,
      default: null,
    }
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
      addedOnly: "preview/addedOnly",
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
    isDeliveryPage() {
      const name = this.$route.name ?? '';

      return name === 'place-pre-delivery-menu'
          || name === 'place-delivery-menu'
          || name === 'place-delivery-order';
    },
    areThereAddedProducts() {
      const fields = this.isDeliveryPage
          ? this.$store.getters['delivery/productFields']
          : this.$store.getters['order/products'];

      return fields?.some(f => f?.productId);
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
    categories: {
      handler(newCategories, oldCategories) {
        if (newCategories !== oldCategories) {
          // this.onScroll();
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
      selectAddedOnly: 'preview/selectAddedOnly',
      setIsShowingMenusModal: 'preview/setIsShowingMenusModal',
    }),
    onToggleAddedOnly() {
      this.selectAddedOnly(!this.addedOnly);
    },
    filterByOnly(products) {
      if (this.only === null) {
        return products;
      }

      return products?.filter(p => this.only.includes(p.id));
    },
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
