<template>
  <div class="preview w-full min-w-4xl max-w-4xl" :class="{'mt-[92px]': (categories && categories.length), 'mt-[48px]': (!categories || !categories.length)}" id="preview-menu">
    <template v-if="products && categories">
      <template v-for="c in categories" :key="c.id">
        <Divider :title="c.title" :id="'category-' + c.id" :lines="true"/>
        <List :items="filterByCategory(products, c)"/>
      </template>
    </template>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import List from "@/components/preview/list/List.vue";
import Divider from "@/layouts/divider/Divider.vue";
import Menu from "@/openapi/models/Menu";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewMenu",
  components: {
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
    };
  },
  computed: {
    ...mapGetters({
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
    onScroll() {
      if (this.ignoringScroll) {
        return;
      }

      if (this.category) {
        // Get the current scroll position
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const screenHeight = screen.height;

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
