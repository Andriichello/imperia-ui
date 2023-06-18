<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="w-screen flex flex-col justify-center bg-base-100 shadow-md pb-1 mb-2" v-if="menu">
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

      <div class="w-full flex justify-center items-center" v-if="categories && categories.length">
        <div class="max-w-full flex justify-start p-1 pt-2 gap-2 overflow-x-auto overflow-y-hidden">
          <template v-for="c in categories" :key="c.id">
            <Category :item="c"
                      :selected="category && category.id === c.id"
                      @category-toggle="onToggleCategory"/>
          </template>
        </div>
      </div>
    </div>

    <div class="preview w-full min-w-4xl max-w-4xl" id="preview-menu">
      <template v-if="products && categories">
        <template v-for="c in categories" :key="c.id">
          <Divider :title="c.title" :id="'category-' + c.id" :lines="true"/>
          <List :items="filterByCategory(products, c)" class="mb-2"/>
        </template>
      </template>
    </div>


    <div class="fixed left-0 top-0 w-screen flex flex-col justify-center bg-base-100 shadow-md pb-1" v-if="fixNavbar && menu">
      <div class="w-full flex justify-center items-center" v-if="showMenus && menus">
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

      <div class="w-full flex justify-center items-center" v-if="categories && categories.length">
        <div class="max-w-full flex justify-start p-1 pt-2 gap-2 overflow-x-auto overflow-y-hidden">
          <template v-for="c in categories" :key="c.id">
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
import List from "@/components/preview/list/List.vue";
import Divider from "@/layouts/divider/Divider.vue";
import Menu from "@/openapi/models/Menu";
import {mapActions, mapGetters} from "vuex";
import Category from "@/components/preview/category/Category.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewMenu",
  components: {
    Category,
    Divider,
    List
  },
  props: {
    menu: Menu,
  },
  data() {
    return {
      ignoringScroll: false,
      ignoringScrollId: 0,
      fixNavbar: false,
      showMenus: true,
    };
  },
  computed: {
    ...mapGetters({
      menus: "preview/menus",
      category: "preview/category",
      products: "preview/products",
      categories: "preview/categories",
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
        if (!newCategory) {
          return;
        }

        const divider = document.getElementById('category-' + newCategory.id);

        if (divider) {
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
      },
    },
  },
  methods: {
    ...mapActions({
      selectMenu: 'preview/selectMenu',
      selectCategory: 'preview/selectCategory',
    }),
    filterByCategory(products, category) {
      return products.filter(p => {
        if (category === null) {
          return !p.categoryIds || !p.categoryIds.length;
        }

        return p.categoryIds.includes(category.id);
      })
    },
    onSelectMenu(menu) {
      this.selectMenu(menu)

      const restaurantId = this.$route.params['restaurantId'];
      this.$router.push(`/preview/${restaurantId}/menu/${menu.id}`);

      window.scrollTo(0, 0);
    },
    onToggleCategory({category, selected}) {
      if (selected) {
        return;
      }

      this.selectCategory(category);
    },
    onScroll() {
      // Get the current scroll position
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const screenHeight = screen.height;

      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (scrollPosition < 0) {
        return;
      }

      const isShort = window.innerHeight < 800;

      if (scrollPosition > (isShort ? 112 : 68)) {
        this.fixNavbar = true;
        this.showMenus = !isShort;
      } else {
        this.fixNavbar = false;
        this.showMenus = true;
      }

      if (this.ignoringScroll) {
        return;
      }

      if (this.category) {
        const divider = document.getElementById('category-' + this.category.id);
        if (!divider) {
          return;
        }

        const list = divider.nextElementSibling;

        if (divider && list) {
          let isTopOutOfView = divider.offsetTop < scrollPosition;
          let isBottomOutOfView = (list.offsetTop + list.clientHeight - 200) < scrollPosition;

          if (isTopOutOfView && isBottomOutOfView) {
            this.selectCategory(null);
            return;
          }

          isTopOutOfView = (divider.offsetTop + divider.parentElement.offsetTop * 2 + 200) > (scrollPosition + screenHeight);

          if (isTopOutOfView) {
            this.selectCategory(null);
          }
        }
      }
    }
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
