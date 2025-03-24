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

        <button class="btn btn-sm btn-square btn-outline" :class="{'btn-active': this.field}"
                @click="onToggle">
          <BaseIcon width="32" height="32" color="currentColor">
            <path d="M16.8395 9.7857C17.1911 9.4341 17.1911 8.8653 16.8395 8.5137C16.4879 8.1621 15.9191 8.1621 15.5675 8.5137L10.5083 13.5717L8.29547 11.3613C7.94387 11.0097 7.37507 11.0097 7.02347 11.3613C6.67187 11.7129 6.67187 12.2817 7.02347 12.6333L9.87226 15.4809C10.0475 15.6573 10.2791 15.7449 10.5083 15.7449C10.7387 15.7449 10.9691 15.6573 11.1443 15.4809L16.8395 9.7857Z" fill="white"/>
          </BaseIcon>
        </button>
      </div>

      <div class="flex-grow">
        <p class="">
          {{ description }}
        </p>
      </div>



      <div class="card-actions justify-between items-end pt-2">
        <div class="flex flex-wrap flex-grow flex-row justify-start items-center gap-4">
          <div class="flex justify-center items-center gap-2">
            <span class="font-normal text-sm">{{$t('preview.space.floor')}}: </span>
            <span class="font-bold text-lg min-w-[16px]">{{ floor }}</span>
          </div>

          <div class="flex justify-center items-center gap-2">
            <span class="font-normal text-sm">{{$t('preview.space.number')}}: </span>
            <span class="font-bold text-lg min-w-[16px]">{{ number }}</span>
          </div>
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
import Space from "@/openapi/models/Space.ts";
import {mapActions, mapGetters} from "vuex";
import {priceFormatted} from "@/helpers";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Space",
  components: {BaseIcon},
  props: {
    item: Space,
  },
  data() {
    return {
      imageLoaded: false,
    };
  },
  computed: {
    ...mapGetters({
      theme: "theme/get",
      authorized: "auth/authorized",
      fields: "order/spaces",
    }),
    isPreview() {
      return (this.$route.name ?? '').startsWith('preview');
    },
    field() {
      return this.spaceFields[0] ?? null;
    },
    spaceFields() {
      return this.$store.getters['order/spaces'].filter(
          (s) => s.spaceId === this.id
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
    floor() {
      return this.item.floor;
    },
    number() {
      return this.item.number;
    },
    image() {
      const s = this.item;

      if (s && s.media && s.media.length) {
        return s.media[0].url;
      }

      return null;
    },
    price() {
      return priceFormatted(this.item?.price);
    },
    categories() {
      const ids = this.item.categoryIds ?? [];

      if (!ids.length) {
        return [];
      }

      return this.$store.getters['preview/spaceCategories']
          .filter(category => ids.includes(category.id));
    },
    alternations() {
      return this.item?.pendingAlterations ?? [];
    },
  },
  methods: {
    priceFormatted,
    ...mapActions({
      setField: 'order/setSpace',
      unsetField: 'order/unsetSpace',
    }),
    onToggle() {
      if (this.field) {
        this.unsetField({
          spaceId: this.id
        });
      } else {
        this.setField({
          spaceId: this.id,
          comments: this.field?.comments ?? [],
        });
      }
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
