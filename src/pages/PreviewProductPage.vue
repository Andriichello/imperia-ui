<template>
  <div class="product-page">
    <Preloader :title="$t('preview.product.loading')" class="p-2"
               v-if="isLoadingProduct && !product"/>
    <PreviewProduct v-if="product" :item="product"
                    @close="onClose"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import Preloader from "@/components/preview/loading/Preloader.vue";
import PreviewProduct from "@/components/preview/PreviewProduct.vue";

export default defineComponent({
  name: "PreviewProductPage",
  components: {
    PreviewProduct,
    Preloader,
  },
  computed: {
    ...mapGetters({
      product: 'preview/product',
      productResponse: 'preview/productResponse',
      isLoadingProduct: "preview/isLoadingProduct",
    }),
  },
  methods: {
    ...mapActions({
      loadProduct: "preview/loadProduct",
      loadAndSelectProduct: "preview/loadAndSelectProduct",
    }),
    onClose() {
      const restaurantId = +this.$route.params['restaurantId'];
      const menuId = +this.$route.params['menuId'];

      this.$router.replace(`/preview/${restaurantId}/menu/${menuId}`);
    },
  },
  async mounted() {
    const productId = +this.$route.params['productId'];
    await this.loadAndSelectProduct(productId);
  }
});
</script>

<style scoped>
.product-page {
  @apply flex flex-col w-full gap-3 p-2 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
