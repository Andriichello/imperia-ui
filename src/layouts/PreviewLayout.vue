<template>
    <div class="preview-layout">
      <PreviewNavBar class="w-full"/>

      <template v-if="isMenuPage">
        <PreviewMenuNavBar class="w-full" v-if="isShortScreen"/>

        <div class="w-full sticky top-0 z-50">
          <PreviewMenuNavBar class="w-full"
                             v-if="!isShortScreen"/>

          <PreviewCategoryNavBar class="w-full"/>
        </div>
      </template>

      <slot />
    </div>
</template>

<script>
import {defineComponent} from "vue";
import PreviewNavBar from "@/layouts/navbar/PreviewNavBar.vue";
import PreviewMenuNavBar from "@/components/preview/menu/PreviewMenuNavBar.vue";
import PreviewCategoryNavBar from "@/components/preview/category/PreviewCategoryNavBar.vue";

export default defineComponent({
  name: "PreviewLayout",
  components: {
    PreviewCategoryNavBar,
    PreviewMenuNavBar,
    PreviewNavBar,
  },
  data() {
    return {
      isShortScreen: window.innerHeight < 800,
    };
  },
  computed: {
    isMenuPage() {
      return this.$route['name'] === 'preview-menu';
    },
  },
  methods: {
    onResize() {
      this.isShortScreen = window.innerHeight < 800;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }
});
</script>

<style scoped>
.preview-layout {
  @apply flex flex-col w-full max-w-full bg-base-200 p-0;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}

.on-menus {
  @apply sticky top-[44px];
}

.under-menus {

}
</style>
