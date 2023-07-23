<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body min-h-[100px]">
      <div class="flex justify-between items-center card-title">
        <div class="grow flex justify-center items-start card-title">
          <h2 class="grow line-clamp-2 text-ellipsis flex justify-start items-center">
            {{ title }}
          </h2>
        </div>

        <Counter class="self-start ml-1" v-if="rerendered"
                 @on-change="onChangeAmount"
                 :amount="current?.amount"/>
      </div>

      <div class="flex-grow">
        <p class="">
          {{ description }}
        </p>
      </div>

      <div class="card-actions justify-between items-end pt-2" v-if="variants && variants.length === 1">
        <div class="flex gap-1">
          <span class="font-bold text-md">
            {{ weight ?? '' }}
          </span>
        </div>

        <h2 class="card-title grow justify-end">
          {{ price }}
        </h2>
      </div>

      <div class="card-actions justify-between items-end pt-2" v-else>
        <div class="flex gap-1">
          <template v-if="variants">

            <template v-for="v in variants" :key="v.id">
              <div class="indicator">
                <span class="indicator-item indicator-center badge badge-md bg-[var(--yellow)] text-black font-semibold">
                  {{ variantField(v)?.amount }}
                </span>
                <button class="btn btn-sm rounded-none normal-case text-md px-2 py-2"
                        :class="{'btn-neutral': theme !== 'dark' && (((variant && variant.id === v.id) || (!variant && v.id === null)) || id === null), 'btn-outline': (!variant && !(!variant && v.id === null)) || (variant && variant.id !== v.id), 'btn-selected': theme === 'dark' && (((variant && variant.id === v.id) || (!variant && v.id === null)) || id === null)}"
                        @click="onVariantSelect(v)">
                  {{ variantWeight(v) }}
                </button>
              </div>
            </template>
          </template>

          <template v-else>
            <span class="font-bold text-md">
              {{ weight ?? '' }}
            </span>
          </template>
        </div>

        <h2 class="card-title grow justify-end">
          {{ price }}
        </h2>
      </div>
      </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {mapActions, mapGetters} from "vuex";
import Counter from "@/components/preview/list/items/Counter.vue";
import {priceFormatted} from "@/helpers";

export default defineComponent({
  // eslint-disable-next-line
  name: "Product",
  components: {Counter},
  props: {
    fields: Array,
  },
  data() {
    return {
      current: this.fields[0],
      rerendered: true,
    };
  },
  computed: {
    ...mapGetters({
      theme: "theme/get",
    }),
    item() {
      return this.$store.getters['preview/product'](this.current.productId);
    },
    variant() {
      if (!this.current || !this.current.variantId) {
        return null;
      }

      return (this.item.variants ?? []).find((v) => {
        return v.id === this.current.variantId;
      });
    },
    id() {
      return this.item?.id;
    },
    title() {
      return this.item?.title;
    },
    description() {
      return this.item?.description;
    },
    price() {
      if (this.variant) {
        return priceFormatted(this.variant.price);
      }

      return priceFormatted(this.item.price);
    },
    weight() {
      if (this.variant) {
        let unit = this.variant.weightUnit;

        if (unit) {
          unit = this.$t('unit.' + unit);
        }

        return this.variant.weight + (unit ?? '');
      }

      if (!this.item || !this.item.weight) {
        return null;
      }

      let unit = this.item.weightUnit;

      if (unit) {
        unit = this.$t('unit.' + unit);
      }

      return this.item.weight + (unit ?? '');
    },
    variants() {
      if (!this.item.variants || !this.item.variants.length) {
        return null;
      }

      let variants = [...this.item.variants];
      const base = {
        id: null,
        price: this.item.price,
        weight: this.item.weight,
        weightUnit: this.item.weightUnit,
      };

      variants.push(base);

      variants = variants.filter((v) => {
        return this.fields.find((f) => {
          return v.id === f.variantId;
        })
      });

      const sorted = variants.sort((v1, v2) => {
        if (v1.price < v2.price) {
          return -1;
        }
        if (v1.price > v2.price) {
          return 1;
        }
        return 0;
      });


      if (!this.variant) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.variant = sorted[0];
      }

      return sorted;
    },
  },
  methods: {
    ...mapActions({
      setField: 'order/setProduct',
      unsetField: 'order/unsetProduct',
    }),
    variantField(v) {
      if (!v) {
        return null;
      }

      return this.fields.find((f) => {
        return v.id === f.variantId;
      });
    },
    variantWeight(v) {
      if (!v) {
        return null;
      }

      let unit = v.weightUnit;

      if (unit) {
        unit = this.$t('unit.' + unit);
      }

      return v.weight + (unit ?? '');
    },
    onVariantSelect(v) {
      const shouldRerender = this.variant !== v;

      this.current = this.fields.find((f) => {
        return f.variantId === v?.id;
      });

      if (shouldRerender) {
        this.freshRender();
      }
    },
    onChangeAmount({amount}) {
      this.setField({
        productId: this.id,
        variantId: this.variant?.id,
        amount: amount
      });
    },
    async freshRender() {
      // Remove MyComponent from the DOM
      this.rerendered = false;

      // Wait for the change to get flushed to the DOM
      await this.$nextTick();

      // Add the component back in
      this.rerendered = true;
    }
  },
});
</script>

<style scoped>

img {
  pointer-events: none
}

.btn-selected {
  @apply btn-outline border-base-content bg-base-content text-base-100;
}
</style>
