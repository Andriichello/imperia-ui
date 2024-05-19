<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="w-full max-h-[180px] select-none" v-if="image">
      <figure class="w-full max-h-[180px] rounded-t-box" >
        <img :alt="title" :src="image"
             class="overflow-hidden"
             style="object-fit: cover;"
             @load="imageLoaded = true"/>
      </figure>

<!--      <figure class="h-[140px] w-full bg-base-100" v-if="!imageLoaded">-->
<!--        <BaseIcon :width="120" :height="120" view-box="0 0 64 64" class="text-current">-->
<!--          <path d="M0,33.48c4-.48,5.13-3.12,6.07-6.71,2.53-9.65,9.06-15.7,18.54-18.53,1.73-.52,2.79-.88,2.9-3C27.68,2.7,30,3,31.74,2.94s3.87.14,3.82,2.68c0,1.77.84,2.11,2.28,2.48A25.85,25.85,0,0,1,52.67,18c.3.41.54.9.11,1.3s-.87,0-1.17-.33c-.78-.83-1.47-1.77-2.3-2.56C42.21,9.64,33.89,7.09,24.44,10c-9,2.71-14.7,8.89-17.15,18-.8,3-.75,3,2.12,4.6a5.37,5.37,0,0,1,.72.56c-.28.16-.54.46-.82.47-1.64.11-3.27.1-4.9.23-1.13.08-2.49.12-2.41,1.75C2.06,36.84,3.22,36.9,4.18,37s2,.08,3,.08q24.35,0,48.68,0a27.85,27.85,0,0,0,4.37-.4c.33,0,.73-.63.83-1a1.15,1.15,0,0,0-.9-1.49,30.57,30.57,0,0,0-4.38-.37q-18.43,0-36.87,0c-1.31,0-2.62-.06-3.92-.16-.28,0-.52-.35-.78-.54.27-.17.53-.47.81-.49,1.3-.09,2.61-.12,3.92-.12h32c1.15,0,2.3,0,3.44,0,1.52,0,2-.92,1.85-2.26A25.58,25.58,0,0,0,54.45,24,.74.74,0,0,1,55,22.92c.22,0,.62.25.76.5a21.17,21.17,0,0,1,2,6.53c.29,1.43.65,2.43,2.36,2.52,2,.1,2.87,1.43,2.7,3.34-.18,2.09-1.65,2.63-3.48,2.61-.82,0-1.64,0-2.46,0-2,0-3.15.51-4.64,2.41-5.38,6.85-12.5,10.94-21.62,10.51a72.64,72.64,0,0,0-8.34-.16c-2.52.17-2.7.65-2.81,3.7-.14,4.22-3.5,6.16-7,3.93C9.62,57,6.79,55,4,53,.51,50.53.8,46.55,4.91,45.42c3.33-.92,4.49-3.55,6.4-5.64.6-.66.11-1.23-.68-1.26-2-.08-3.94-.13-5.9-.07a9,9,0,0,1-4.69-1ZM36.59,44.39a11.47,11.47,0,0,1-1.54,0c-.63-.12-1.6-.11-1.79-.48-.29-.58.42-1.07,1-1.39a14.27,14.27,0,0,0,1.24-.77c.53-.4,1-.9.79-1.63a1.42,1.42,0,0,0-1.54-.89,6,6,0,0,0-1.94.18A17.93,17.93,0,0,1,20.36,39c-3.23-1.17-5.75.09-8,2.19-4.67,4.36-4.6,4.9.65,8.44.81.54,1.61,1.1,2.43,1.64a2,2,0,0,0,2.64.07c3.25-2.61,7-2.27,10.76-1.67a18,18,0,0,0,6.29-.07c5.14-1,9.67-3,13.21-6.86,1-1.07,3.55-1.83,2.24-3.57-.92-1.22-2.57.64-3.64,1.41A19.83,19.83,0,0,1,36.59,44.39Zm-18.88,11c-.22-.32-.4-.84-.77-1.09q-5.21-3.6-10.46-7.12c-1.4-.95-2,.17-2.67,1.09s-1.05,2,.24,2.89C7.4,53.41,10.75,55.7,14.11,58a1.58,1.58,0,0,0,2.2,0A4.34,4.34,0,0,0,17.71,55.36ZM45.61,39a1.41,1.41,0,0,0-.25-.29c-.66-.48-6.4-.35-6.69.29a4.65,4.65,0,0,0-.49,2.79c.25.95,1.36.63,2.12.38a12.08,12.08,0,0,0,4.81-2.35A3.52,3.52,0,0,0,45.61,39ZM31.69,4.32c-1.05.17-2.55-.09-2.56,1.46,0,1.09,1.13,1.4,2.19,1.41s2.53-.11,2.59-1.52C34,4.48,32.59,4.55,31.69,4.32Z" />-->
<!--        </BaseIcon>-->
<!--      </figure>-->
    </div>

    <div class="card-body min-h-[100px]">
      <div class="flex justify-between items-center card-title">
        <div class="grow flex justify-center items-start card-title">
          <h2 class="grow line-clamp-2 text-ellipsis flex justify-start items-center">
            {{ title }}
          </h2>
          <div class="badge badge-warning mt-1 select-none" v-if="badge && badge.length">
            {{ badge }}
          </div>
        </div>

        <Counter class="self-start ml-1" v-if="rerendered && !isPreview && authorized"
                 @on-change="onChangeAmount"
                 :amount="field?.amount"/>
      </div>

      <div class="flex-grow">
        <p class="">
          {{ description }}
        </p>
      </div>

<!--      <div class="card-actions justify-end select-none">-->
<!--        <div v-for="category in categories" :key="category.id"-->
<!--            class="badge badge-outline badge-md">-->
<!--          {{ category.title }}-->
<!--        </div>-->
<!--      </div>-->

      <div class="card-actions
      justify-between items-end pt-2">
        <div class="flex gap-1">
          <template v-if="variants">
<!--            <button class="btn btn-sm normal-case rounded-none text-md px-2 py-2" v-if="weight"-->
<!--                    :class="{'btn-neutral': theme!== 'dark' && (!variant || !variants), 'btn-outline': variant && variants, 'btn-selected': theme === 'dark' && (!variant || !variants)}"-->
<!--                    @click="onVariantSelect(null)">-->
<!--              {{ weight ?? '' }}-->
<!--            </button>-->

            <template v-for="v in variants" :key="v.id">
              <div class="indicator">
                <span class="indicator-item indicator-center badge badge-md bg-[var(--yellow)] text-black font-semibold z-[1]"
                      v-if="!isPreview && (tempVar = variantField(v))?.amount">
                  {{ tempVar?.amount }}
                </span>
                <button class="btn btn-sm rounded-none normal-case text-md px-2 py-2"
                        :class="{'btn-neutral': theme !== 'dark' && ((variant && variant.id === v.id) || id === null), 'btn-outline': !variant || variant.id !== v.id, 'btn-selected': theme === 'dark' && ((variant && variant.id === v.id) || id === null)}"
                        @click="onVariantSelect(v)">
                  {{ variantWeight(v) }}
                </button>
              </div>
            </template>
          </template>

          <template v-else>
            <div class="breadcrumbs p-0 justify-end">
              <ul>
                <li>
                   <span class="font-bold text-md">
                    {{ weight ?? '' }}
                  </span>
                </li>

                <template v-for="alternation in alternations" :key="alternation.id">
                  <li v-if="alternation.metadata?.weight">
                    <h2 class="font-semibold text-xs self-end">
                      {{ weightFormatted(alternation.metadata?.weight, alternation.metadata?.weightUnit ?? item?.weightUnit) }}
                    </h2>
                  </li>
                </template>
              </ul>
            </div>
          </template>
        </div>

        <div class="breadcrumbs p-0 justify-end">
          <ul>
            <li>
              <h2 class="card-title grow">
                {{ price }}
              </h2>
            </li>

            <template v-for="alternation in alternations" :key="alternation.id">
              <li v-if="alternation.metadata?.price">
                <h2 class="card-title text-sm grow self-end">
                  {{ priceFormatted(alternation.metadata?.price) }}
                </h2>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Product from "@/openapi/models/Product";
import {mapActions, mapGetters} from "vuex";
import Counter from "@/components/preview/list/items/Counter.vue";
import {priceFormatted} from "@/helpers";

export default defineComponent({
  // eslint-disable-next-line
  name: "Product",
  components: {Counter},
  props: {
    item: Product,
  },
  data() {
    return {
      imageLoaded: false,
      variant: null,
      rerendered: true,
    };
  },
  computed: {
    ...mapGetters({
      theme: "theme/get",
      authorized: "auth/authorized",
      fields: "order/products",
    }),
    isPreview() {
      return (this.$route.name ?? '').startsWith('preview');
    },
    field() {
      const fields = this.productFields.filter((f) => {
        return f.variantId === (this.variant?.id ?? null);
      });

      return fields?.length ? fields[0] : this.productField;
    },
    variantFields() {
      return this.$store.getters['order/products'].filter(
          (p) => p.productId === this.id && p.variantId === this.variant?.id
      );
    },
    productField() {
      return this.productFields.find((f) => f.batch === null)
          ?? this.productFields[0];
    },
    productFields() {
      return this.$store.getters['order/products'].filter(
          (p) => p.productId === this.id
      );
    },
    id() {
      return this.item.id;
    },
    title() {
      return this.item.title;
    },
    badge() {
      return this.item.badge;
    },
    description() {
      return this.item.description;
    },
    image() {
      const p = this.item;

      if (p && p.media && p.media.length) {

        if (p.media[0].variants && p.media[0].variants.length) {
          const variants = p.media[0].variants.filter((v) => v.extension === 'webp');

          if (variants.length && variants[0].url) {
            return variants[0].url;
          }
        }

        return p.media[0].url;
      }

      return null;
    },
    price() {
      if (this.variant) {
        return priceFormatted(this.variant.price);
      }

      return priceFormatted(this.item?.price);
    },
    weight() {
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

      const variants = [...this.item.variants];
      const base = {
        id: null,
        productId: this.item.id,
        price: this.item.price,
        weight: this.item.weight,
        weightUnit: this.item.weightUnit,
      };

      variants.push(base);

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
    categories() {
      const ids = this.item.categoryIds ?? [];

      if (!ids.length) {
        return [];
      }

      return this.$store.getters['preview/categories']
          .filter(category => ids.includes(category.id));
    },
    alternations() {
      if (this.variant?.id) {
        return this.variant.pendingAlterations ?? [];
      }

      return this.item?.pendingAlterations ?? [];
    },
  },
  watch: {
    field(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.freshRender();
      }
    },
  },
  methods: {
    priceFormatted,
    ...mapActions({
      setField: 'order/setProduct',
      unsetField: 'order/unsetProduct',
    }),
    weightFormatted(weight, unit) {
      if (unit) {
        unit = this.$t('unit.' + unit);
      }

      return weight && unit
          ? (weight + (unit ?? '')) : null;
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
    variantField(v) {
      if (!v) {
        return null;
      }

      return this.fields.find((f) => {
        return f.productId === this.id && v.id === f.variantId;
      });
    },
    onVariantSelect(v) {
      const shouldRerender = this.variant !== v;

      this.variant = v;

      if (shouldRerender) {
        this.freshRender();
      }
    },
    onChangeAmount({amount}) {
      console.log({item: this.item, variant: this.variant})
      console.log({field: this.field, variantFields: this.variantFields})

      if (amount === null) {
        this.unsetField({
          productId: this.id,
          variantId: this.variant?.id,
          batch: this.field?.batch ?? this.productField?.batch,
        });

        return;
      }

      this.setField({
        productId: this.id,
        variantId: this.variant?.id,
        batch: this.field?.batch ?? this.productField?.batch,
        serveAt: this.field?.serveAt,
        amount: amount,
        comments: this.field?.comments ?? [],
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

.indicator-center {
  --tw-translate-y: -55%;
}

img {
  pointer-events: none
}

.btn-selected {
  @apply btn-outline border-base-content bg-base-content text-base-100;
}
</style>
