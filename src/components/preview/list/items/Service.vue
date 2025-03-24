<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="w-full max-h-[180px] select-none" v-if="image">
      <figure class="w-full max-h-[180px] rounded-t-box" >
        <img :alt="title" :src="image"
             class="overflow-hidden"
             style="object-fit: cover;"
             @load="imageLoaded = true"/>
      </figure>
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

      <div class="card-actions justify-end items-start">
        <label class="form-control w-full max-w-[100px] max-h-[50px]">
          <input class="input input-bordered input-sm text-lg w-full max-w-xs"
                 type="number" min="0" v-model="duration"/>

          <div class="label translate-y-[-6px]">
            <span class="label-text-alt"></span>
            <span class="label-text-alt text-md">Тривалість (хв)</span>
          </div>
        </label>
      </div>

      <div class="card-actions justify-between items-start pt-2">
        <h2 class="card-title">
          {{ oncePaidPrice }}
        </h2>

        <h2 class="card-title">
          {{ hourlyPaidPrice }} / год.
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Service from "@/openapi/models/Service.ts";
import {mapActions, mapGetters} from "vuex";
import Counter from "@/components/preview/list/items/Counter.vue";
import {priceFormatted} from "@/helpers";

export default defineComponent({
  // eslint-disable-next-line
  name: "Service",
  components: {Counter},
  props: {
    item: Service,
  },
  data() {
    return {
      imageLoaded: false,
      rerendered: true,
      durationVal: null,
    };
  },
  computed: {
    ...mapGetters({
      theme: "theme/get",
      authorized: "auth/authorized",
      fields: "order/services",
    }),
    isPreview() {
      return (this.$route.name ?? '').startsWith('preview');
    },
    field() {
      return this.serviceFields[0];
    },
    serviceFields() {
      return this.$store.getters['order/services'].filter(
          (p) => p.serviceId === this.id
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
      const s = this.item;

      if (s && s.media && s.media.length) {
        return s.media[0].url;
      }

      return null;
    },
    amount() {
      return this.field?.amount;
    },
    oncePaidPrice() {
      return priceFormatted(this.item?.oncePaidPrice);
    },
    hourlyPaidPrice() {
      return priceFormatted(this.item?.hourlyPaidPrice);
    },
    duration: {
      get() {
        return this.durationVal ?? this.field?.duration;
      },
      set(value) {
        this.onChangeDuration(value);
      },
    },
    categories() {
      const ids = this.item.categoryIds ?? [];

      if (!ids.length) {
        return [];
      }

      return this.$store.getters['preview/serviceCategories']
          .filter(category => ids.includes(category.id));
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
      setField: 'order/setService',
      unsetField: 'order/unsetService',
    }),
    onChangeAmount({amount}) {
      if (amount === null) {
        this.unsetField({
          serviceId: this.id,
        });

        return;
      }

      this.setField({
        serviceId: this.id,
        amount: amount,
        duration: this.durationVal,
        comments: this.field?.comments ?? [],
      });
    },
    onChangeDuration(duration) {
      this.setField({
        serviceId: this.id,
        amount: this.amount,
        duration: duration,
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
