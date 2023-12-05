<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body min-h-[100px]">
      <div class="flex justify-between items-start card-title">
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
                <span class="indicator-item indicator-center badge badge-md bg-[var(--yellow)] text-black font-semibold z-[1]"
                  v-if="tempVar = variantField(v)">
                  {{ tempVar?.amount }}
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


      <div class="flex flex-wrap-reverse justify-between items-start card-title">

        <div class="w-full max-w-[200px] flex justify-center items-center" v-if="current !== null">
          <div class="form-control w-full max-w-[200px] flex flex-row justify-start items-start gap-2">
            <div class="flex justify-center start-center mt-1.5">
              <BaseIcon title="time" :color="timeColor" :width="24" :height="24" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4311 15.6925C15.3001 15.6925 15.1681 15.6585 15.0471 15.5875L11.2771 13.3385C11.0511 13.2025 10.9111 12.9575 10.9111 12.6935V7.84546C10.9111 7.43146 11.2471 7.09546 11.6611 7.09546C12.0761 7.09546 12.4111 7.43146 12.4111 7.84546V12.2675L15.8161 14.2975C16.1711 14.5105 16.2881 14.9705 16.0761 15.3265C15.9351 15.5615 15.6861 15.6925 15.4311 15.6925Z"/>
              </BaseIcon>
            </div>

            <input class="input input-xs w-full text-[16px] font-semibold px-1 bg-transparent"
                   style="min-height: 2rem;"
                   :style="{'color': timeColor}"
                   maxlength="5"
                   name="time" type="text" v-model="timeVal"
                   :placeholder="$t('product.serving_time') + '...'"
                   @focusout="onFocusOutOfTime"/>
          </div>
        </div>

        <div></div>

        <div class="flex justify-center items-start card-title">
          <div class="btn btn-square btn-ghost btn-sm flex justify-center start-center self-start" v-show="(!current?.serveAt || !current?.serveAt?.length) && !showServingTime"
               @click="onAddServingTime">
            <BaseIcon title="comment" color="currentColor" :width="24" :height="24" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4311 15.6925C15.3001 15.6925 15.1681 15.6585 15.0471 15.5875L11.2771 13.3385C11.0511 13.2025 10.9111 12.9575 10.9111 12.6935V7.84546C10.9111 7.43146 11.2471 7.09546 11.6611 7.09546C12.0761 7.09546 12.4111 7.43146 12.4111 7.84546V12.2675L15.8161 14.2975C16.1711 14.5105 16.2881 14.9705 16.0761 15.3265C15.9351 15.5615 15.6861 15.6925 15.4311 15.6925Z"/>
            </BaseIcon>
          </div>

          <div class="btn btn-square btn-ghost btn-sm flex justify-center start-center self-start"
               @click="onDuplicate">
            <BaseIcon title="comment" color="transparent" :width="24" :height="24" viewBox="0 0 24 24">
              <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" stroke="currentColor" stroke-width="1.5"/>
              <path opacity="0.5" d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14" stroke="currentColor" stroke-width="1.5"/>
            </BaseIcon>
          </div>

          <div class="btn btn-square btn-ghost btn-sm flex justify-center start-center self-start"
               @click="onAddComment">
            <BaseIcon title="comment" color="currentColor" :width="24" :height="24" viewBox="0 0 24 24">
              <g id="comment">
                <g id="Chat">
                  <g id="Group 3">
                    <mask id="mask0_60_13528" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                      <path id="Clip 2" fill-rule="evenodd" clip-rule="evenodd" d="M1 1.00024H22.493V22.494H1V1.00024Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_60_13528)">
                      <path id="Fill 1" fill-rule="evenodd" clip-rule="evenodd" d="M6.10844 19.6752C6.68844 19.6752 7.23544 19.8952 7.81444 20.1282C11.3614 21.7682 15.5564 21.0222 18.2894 18.2902C21.8954 14.6822 21.8954 8.81324 18.2894 5.20724C16.5434 3.46124 14.2214 2.50024 11.7494 2.50024C9.27644 2.50024 6.95344 3.46224 5.20844 5.20824C2.47444 7.94024 1.73044 12.1352 3.35544 15.6482C3.58944 16.2272 3.81544 16.7912 3.81544 17.3772C3.81544 17.9622 3.61444 18.5512 3.43744 19.0712C3.29144 19.4992 3.07044 20.1452 3.21244 20.2872C3.35144 20.4312 4.00144 20.2042 4.43044 20.0572C4.94544 19.8812 5.52944 19.6792 6.10844 19.6752ZM11.7244 22.4942C10.1964 22.4942 8.65844 22.1712 7.21944 21.5052C6.79544 21.3352 6.39844 21.1752 6.11344 21.1752C5.78544 21.1772 5.34444 21.3292 4.91844 21.4762C4.04444 21.7762 2.95644 22.1502 2.15144 21.3482C1.34944 20.5452 1.71944 19.4602 2.01744 18.5872C2.16444 18.1572 2.31544 17.7132 2.31544 17.3772C2.31544 17.1012 2.18244 16.7492 1.97844 16.2422C0.105437 12.1972 0.971437 7.32224 4.14844 4.14724C6.17644 2.11824 8.87544 1.00024 11.7484 1.00024C14.6214 1.00024 17.3214 2.11724 19.3494 4.14624C23.5414 8.33824 23.5414 15.1582 19.3494 19.3502C17.2944 21.4062 14.5274 22.4942 11.7244 22.4942Z"/>
                    </g>
                  </g>
                  <path id="Fill 4" fill-rule="evenodd" clip-rule="evenodd" d="M15.6964 13.1628C15.1444 13.1628 14.6924 12.7158 14.6924 12.1628C14.6924 11.6098 15.1354 11.1628 15.6874 11.1628H15.6964C16.2484 11.1628 16.6964 11.6098 16.6964 12.1628C16.6964 12.7158 16.2484 13.1628 15.6964 13.1628Z"/>
                  <path id="Fill 6" fill-rule="evenodd" clip-rule="evenodd" d="M11.6876 13.1628C11.1356 13.1628 10.6836 12.7158 10.6836 12.1628C10.6836 11.6098 11.1256 11.1628 11.6786 11.1628H11.6876C12.2396 11.1628 12.6876 11.6098 12.6876 12.1628C12.6876 12.7158 12.2396 13.1628 11.6876 13.1628Z"/>
                  <path id="Fill 8" fill-rule="evenodd" clip-rule="evenodd" d="M7.67832 13.1628C7.12632 13.1628 6.67432 12.7158 6.67432 12.1628C6.67432 11.6098 7.11732 11.1628 7.66932 11.1628H7.67832C8.23032 11.1628 8.67832 11.6098 8.67832 12.1628C8.67832 12.7158 8.23032 13.1628 7.67832 13.1628Z"/>
                </g>
              </g>
            </BaseIcon>
          </div>
        </div>

      </div>

      <CommentList :comments="comments" class="w-full" v-if="comments?.length"
                   @on-update="onUpdateComment"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {mapActions, mapGetters} from "vuex";
import Counter from "@/components/preview/list/items/Counter.vue";
import {priceFormatted, randomString} from "@/helpers";
import {throttle} from "lodash";
import CommentList from "@/components/order/comment/CommentList.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import ServingTime from "@/components/preview/list/items/ServingTime.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Product",
  components: {BaseIcon, CommentList, Counter},
  props: {
    fields: Array,
    productId: Number,
    batch: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      current: this.fields[0],
      rerendered: true,
      selectedVariantId: this.fields[0]?.variantId,
      showServingTime: true,
      timeVal: this.fields[0].serveAt,
      isTimeValid: this.timeValidate(this.fields[0].serveAt),
    };
  },
  computed: {
    ...mapGetters({
      theme: "theme/get",
    }),
    item() {
      return this.$store.getters['order/orderedProduct'](this.productId)
        ?? this.$store.getters['preview/product'](this.productId);
    },
    alternations() {
      if (this.variant) {
        return this.variant.pendingAlterations ?? [];
      }

      return this.item?.pendingAlterations ?? [];
    },
    variant() {
      if (!this.selectedVariantId) {
        return null;
      }

      return (this.item?.variants ?? []).find((v) => {
        return v.id === this.selectedVariantId;
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

      return priceFormatted(this.item?.price);
    },
    weight() {
      let unit = this.variant
          ? this.variant?.weightUnit : this.item?.weightUnit;
      let weight = this.variant
          ? this.variant?.weight : this.item?.weight;

      return this.weightFormatted(weight, unit);
    },
    variants() {
      if (!this.item || !this.item.variants || !this.item.variants.length) {
        return null;
      }

      const variants = [
        {
          id: null,
          productId: this.item.id,
          type: 'product-variants',
          price: this.item.price,
          weight: this.item.weight,
          weightUnit: this.item.weightUnit,
        },
        ...this.item.variants
      ];

      return variants.sort((v1, v2) => {
        if (v1.price < v2.price) {
          return -1;
        }
        if (v1.price > v2.price) {
          return 1;
        }
        return 0;
      });
    },
    comments() {
      if (!this.current || !this.current?.comments) {
        return [];
      }

      return this.current?.comments ?? [];
    },
    timeColor() {
      if (!this.isTimeValid) {
        return 'var(--red)';
      }

      return this.timeVal?.length > 0 ? 'currentColor' : 'var(--hint-color)';
    },
    timeErrors() {
      if (!this.isTimeValid) {
        return ['Invalid time'];
      }

      return [];
    },
  },
  watch: {
    current(newVal, oldVal) {
      console.log({newCurrent: newVal, oldCurrent: oldVal})
    },
    timeVal(newVal, oldVal) {
      if (newVal === ((oldVal ? oldVal : '') + ' ')) {
        if (/^\d+\s*$/.test(newVal)) {
          this.timeVal = newVal.trim(' ') + ':';
        }
      }

      this.isTimeValid = this.timeValidate(this.timeVal);
      this.timeOnUpdate({time: newVal});
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

      return this.weightFormatted(v.weight, v.weightUnit);
    },
    onVariantSelect(v) {
      const shouldRerender = this.variant !== v;

      this.selectedVariantId = v.id;

      this.current = this.fields.find((f) => {
        if (v.variantId === undefined) {
          return f.variantId === v?.id;
        }

        return f.variantId === v?.id;
      }) ?? null;

      this.timeVal = this.current?.serveAt;

      if (shouldRerender) {
        this.freshRender();
      }
    },
    async freshRender() {
      // Remove MyComponent from the DOM
      this.rerendered = false;

      // Wait for the change to get flushed to the DOM
      await this.$nextTick();

      // Add the component back in
      this.rerendered = true;
    },
    onChangeAmount({amount}) {
      if (amount === null) {
        this.unsetField({
          productId: this.id,
          variantId: this.variant?.id,
          batch: this.batch ?? this.current?.batch,
        });

        return;
      }

      const field = {
        productId: this.id,
        variantId: this.variant?.id,
        amount: amount,
        batch: this.batch ?? this.current?.batch,
        serveAt: this.current?.serveAt,
        comments: this.comments
      };

      this.setField(field);

      if (!this.current) {
        this.current = field;
      }
    },
    onAddServingTime() {
      this.showServingTime = true;
    },
    onAddComment() {
      if (!this.current) {
        return;
      }

      if (this.comments && this.comments.length) {
        if (!this.comments[this.comments.length - 1].text.trim().length) {
          return;
        }
      }

      this.current.comments.push({text: ''});
    },
    onDuplicate() {
      if (!this.current) {
        return;
      }

      const comments = structuredClone(this.comments);

      comments.forEach((comment) => {
        delete comment.id;
      });

      this.setField({
        productId: this.id,
        variantId: this.variant?.id,
        amount: this.current?.amount,
        batch: randomString(4),
        serveAt: this.current?.serveAt,
        comments: structuredClone(this.comments),
      });
    },
    onUpdateServingTime({time}) {
      if (this.current?.serveAt === time) {
        return;
      }

      this.setField({
        productId: this.id,
        variantId: this.variant?.id,
        amount: this.current?.amount,
        batch: this.current?.batch,
        serveAt: time,
        comments: this.comments
      });
    },
    onUpdateComment({comment, index}) {
      const comments = [...(this.comments ?? [])];
      comments[index].text = comment.text;

      if (comments && comments.length > 1) {
        let empties = 0;

        comments.forEach((c) => {
          if (c.text.trim().length) {
            empties = 0;
          } else {
            empties++;
          }
        });

        while (empties > 1) {
          comments.pop();
          empties--;
        }
      }

      this.setField({
        productId: this.id,
        variantId: this.variant?.id,
        amount: this.current?.amount,
        batch: this.current?.batch,
        serveAt: this.current?.serveAt,
        comments: comments
      });
    },
    timeOnUpdate({time}) {
      this.onUpdateServingTime({time});
    },
    onFocusOutOfTime() {
      this.timeVal = this.timeAutocomplete(this.timeVal);
      this.isTimeValid = this.timeValidate(this.timeVal);
    },
    timeValidate(time) {
      if (time === null || (time ?? '').trim().length === 0) {
        return true;
      }

      if (/^\s*\d\s*$/.test(time)) {
        return true;
      }

      if (/^\s*\d\d\s*$/.test(time)) {
        const val = time.trim(' ');

        let hours = val.slice(0, 1);
        let minutes = val.slice(1);

        if (hours >= 2) {
          return minutes < 6;
        }

        return true;
      }

      if (/^\s*\d\d\d\s*$/.test(time)) {
        const val = time.trim(' ');

        let hours = val.slice(0, 2);
        let minutes = val.slice(2);

        if (hours > 23) {
          hours = val.slice(0, 1);
          minutes = val.slice(1);

          return minutes < 59;
        } else {
          return minutes < 6;
        }
      }

      if (/^\s*\d\d\d\d\s*$/.test(time)) {
        const val = time.trim(' ');

        let hours = val.slice(0, 2);
        let minutes = val.slice(2);

        if (hours > 23) {
          return false;
        }

        if (minutes > 59) {
          return false;
        }

        return true;
      }

      let isValidMinute = /^.*:[0-5]?[0-9]?\s*$/.test(time);
      let isSingleDigitHour = /^[0-9]:?.*$/.test(time);
      let isDoubleDigitHour = /^[0-1][0-9]:?.*$/.test(time) || /^[2][0-3]:?.*$/.test(time);

      return isValidMinute &&
          (isSingleDigitHour || isDoubleDigitHour);
    },
    timeAutocomplete(time) {
      if (time === null) {
        return '';
      }


      if (/^\s*\d{3,4}\s*$/.test(time)) {
        const val = time.trim(' ');

        const hours = val.slice(0, 2);
        const minutes = val.slice(2);

        if (hours > 23) {
          return time;
        }

        if (minutes.length === 1) {
          if (minutes > 5) {
            return time;
          }
        } else if (minutes > 59) {
          return time;
        }

        return hours + ':' + minutes + (minutes.length === 1 ? '0' : '');
      }

      if (/^\d{1,2}\s*$/.test(time)) {
        if (time > 23) {
          return time;
        }

        return time.trim(' ') + ':' + '00';
      }

      if (/^\d{1,2}:$/.test(time)) {
        if (time.trim(':') > 23) {
          return time;
        }

        return time + '00';
      }

      if (/^\d{1,2}:\d$/.test(time)) {
        const hours = time.split(':')[0];
        const minutes = time.split(':')[1];

        if (hours > 23) {
          return time;
        }

        if (minutes > 59) {
          return time;
        }

        return hours + ':' + (minutes > 5 ? '0' + minutes : minutes + '0');
      }

      return time;
    },
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
