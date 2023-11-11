<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="max-w-md card w-full pb-20">

      <div class="w-full flex justify-end items-center gap-2 px-1">
        <div class="btn btn-sm btn-square" @click="onClose">
          <BaseIcon width="24" height="24" view-box="0 0 24 24" style="transform: rotate(45deg)">
            <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </BaseIcon>
        </div>
      </div>

      <div class="max-w-md max-h-[240px] select-none self-center px-2 mt-2" v-if="item && image">
        <figure class="w-full max-h-[240px] rounded-box" >
          <img :alt="title" :src="image"
               class="overflow-hidden"
               style="object-fit: cover;"
               @load="imageLoaded = true"/>
        </figure>
      </div>

      <div class="flex flex-col justify-center items-stretch min-h-[100px] my-4 mx-2" v-if="item">
        <div class="flex justify-between items-center card-title">
          <div class="grow flex justify-center items-start card-title">
            <h2 class="text-2xl grow flex justify-start items-center">
              {{ title }}
            </h2>
          </div>

          <Counter class="self-start ml-1" v-if="rerendered && withOrder"
                   @on-change="onChangeAmount"
                   :amount="amount"/>
        </div>

        <div class="flex-grow">
          <p class="">
            {{ description }}
          </p>
        </div>

        <div class="card-actions justify-start select-none" :class="{'pt-2': categories.length}">
          <div v-for="category in categories" :key="category.id"
              class="badge badge-outline badge-neutral badge-md">
            {{ category.title }}
          </div>

          <div class="badge badge-warning select-none" v-if="badge && badge.length">
            {{ badge }}
          </div>
        </div>

        <div class="flex justify-between items-end pt-2">
          <div class="flex gap-1">
            <template v-if="variants">
              <template v-for="v in variants" :key="v.id">
                <div class="indicator">
                <span class="indicator-item indicator-center badge badge-md bg-[var(--yellow)] text-black font-semibold z-[1]"
                      v-if="(tempVar = variantField(v))?.amount">
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

        <div class="flex flex-col justify-end items-end mt-4 gap-3" v-if="withOrder">
          <div class="w-full flex justify-center items-center">
            <button class="normal-case w-full btn btn-sm btn-ghost max-w-xl"
                    @click="onAddComment">
              + {{ $t('product.create_comment') }}
            </button>
          </div>

          <CommentList class="pr-1" :comments="comments"/>
        </div>
      </div>
    </div>

    <div class="w-full max-w-md fixed bottom-0 left-1/2 p-2 pt-1 bg-base-100/10 backdrop-blur-sm"
         style="transform: translate(-50%, 0);"
         v-if="item && withOrder">
      <div class="flex justify-stretch items-end mt-2">
        <div class="w-full btn btn-md selected text-black">
          <span class="normal-case grow text-start">{{ $t('product.update_order') }}</span>
          <span>{{ priceFormatted(amount * priceVal) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Product from "@/openapi/models/Product";
import {mapActions, mapGetters} from "vuex";
import {priceFormatted} from "@/helpers";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import Counter from "@/components/preview/list/items/Counter.vue";
import CommentList from "@/components/order/comment/CommentList.vue";

export default defineComponent({
  name: "PreviewProduct",
  components: {CommentList, Counter, BaseIcon},
  emits: ["close"],
  props: {
    item: Product,
  },
  data() {
    return {
      amount: 0,
      rerendered: true,
      comments: [],
      variant: null,
      withOrder: false,
    }
  },
  computed: {
    ...mapGetters({
      'theme': 'theme/get',
    }),
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

      if (p.media && p.media.length) {
        return p.media[0].url;
      }

      return null;
    },
    priceVal() {
      return this.variant
          ? this.variant.price : this.item?.price;
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
      if (this.item?.categories?.length) {
        return this.item?.categories;
      }

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

      return (this.fields ?? []).find((f) => {
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
      this.amount = amount;
      // this.setField({
      //   productId: this.id,
      //   variantId: this.variant?.id,
      //   amount: amount,
      // });
    },
    onAddComment() {
      if (this.comments?.length > 0 && !this.comments[0]?.text?.length) {
        return;
      }

      this.comments.push({text: ''});
      // this.addComment({text: null});
    },
    onClose() {
      this.$emit('close');
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
.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>
