<template>
  <div class="preview select-none" :class="{'mt-[100px]': (categories && categories.length)}" id="preview-menu">
    <template v-if="products && categories">
      <template v-for="c in categories" :key="c.id">
        <Divider :title="c.title" class="opacity-60" :id="'category-' + c.id"/>
        <List :items="filterByCategory(products, c)" class="mb-12"/>
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
      menu: "preview/selected",
      category: "preview/category",
      products: "preview/products",
      categories: "preview/categories",
    }),
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
            top: divider.getBoundingClientRect().top + window.pageYOffset - 100,
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
        return p.categoryIds.includes(category.id);
      })
    },
    onScroll() {
      if (this.ignoringScroll) {
        return;
      }

      if (this.category) {
        console.log('onScroll');

        // Get the current scroll position
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const screenHeight = screen.height;

        const divider = document.getElementById('category-' + this.category.id);
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
  @apply flex flex-col w-full gap-2 p-2 pb-[100px];

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
