<template>
  <div class="container">

    <div class="flex flex-row justify-start w-full min-h-[80px] gap-2">
      <div class="details flex flex-col justify-start items-start gap-1 grow">
        <span class="font-semibold text-xl">{{ title }}</span>
        <span class="address text-sm">{{ address }}</span>
      </div>

      <div class="icon" :class="{'bg-neutral': !image, 'bg-transparent': image}">
        <BaseIcon width="48" height="48" :title="title" view-box="0 0 64 64" v-if="!imageLoaded">
          <path d="M11 4C9.355 4 8 5.355 8 7v2.068a13.74 13.74 0 0 1-.465 3.541L4.531 23.875A15.741 15.741 0 0 0 4 27.932V30.5a7.502 7.502 0 0 0 4 6.63V57c0 1.645 1.355 3 3 3h42c1.645 0 3-1.355 3-3V37.13a7.502 7.502 0 0 0 4-6.629v-2.568c0-1.37-.178-2.733-.531-4.057L56.465 12.61A13.74 13.74 0 0 1 56 9.07V7c0-1.645-1.355-3-3-3H11zm0 2h42c.564 0 1 .436 1 1v2.068c0 .312.01.622.03.932H9.97c.019-.31.03-.62.03-.932V7c0-.564.435-1 1-1zm-1.277 6h44.555c.071.377.154.753.254 1.125l3.004 11.266c.053.202.098.406.142.61H6.323c.045-.204.089-.408.143-.61L9.47 13.125c.099-.372.182-.748.253-1.125zm-3.69 15h51.934c.021.31.033.62.033.932V30.5c0 3.064-2.435 5.5-5.5 5.5S47 33.564 47 30.5V30a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0v.5c0 3.064-2.435 5.5-5.5 5.5S6 33.564 6 30.5v-2.568c0-.312.012-.622.034-.932zM32 33.664C33.34 36.208 35.928 38 39 38c2.994 0 5.508-1.718 6.88-4.156C47.117 36.28 49.581 38 52.5 38a7.51 7.51 0 0 0 1.5-.15V57c0 .564-.436 1-1 1H30v-8c0-4.415-3.585-8-8-8s-8 3.585-8 8v8h-3c-.564 0-1-.436-1-1V37.85c.485.098.986.15 1.5.15 2.918 0 5.382-1.719 6.621-4.156C19.493 36.282 22.006 38 25.001 38c3.071 0 5.659-1.792 7-4.336zM22 44c3.341 0 6 2.659 6 6v8H16v-8c0-3.341 2.659-6 6-6z"/>
        </BaseIcon>

        <img v-if="image" class="w-20 h-20 rounded"
             :alt="title" :src="image"
             @load="imageLoaded = true"/>
      </div>
    </div>

    <template v-if="short">
      <div class="w-full flex items-end">
        <ShortSchedule class="grow"
                       v-if="item.schedules && item.schedules.length"
                       :item="item" />

        <div class="grow" v-else></div>

        <button class="btn btn-sm btn-outline" @click="$emit('select-restaurant', item)">
          {{ $t("preview.restaurants.select_button") }}
        </button>
      </div>
    </template>

    <template v-else-if="item.schedules && item.schedules.length">
<!--      <ShortReviews class="mt-2"-->
<!--                    :item="item"-->
<!--                    @click="$emit('open-reviews', item)"/>-->

      <Schedule class="w-full"
                :item="item" />
    </template>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";
import Schedule from "@/components/preview/schedule/Schedule.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import ShortSchedule from "@/components/preview/schedule/ShortSchedule.vue";
import ShortReviews from "@/components/preview/review/ShortReviews.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Restaurant",
  emits: ["select-restaurant", "open-reviews"],
  components: {
    // ShortReviews,
    ShortSchedule,
    Schedule,
    BaseIcon,
  },
  props: {
    item: Restaurant,
    short: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageLoaded: false,
    };
  },
  computed: {
    title() {
      return this.item.name;
    },
    address() {
      return this.item.place + ', ' + this.item.city +  ', ' + this.item.country;
    },
    image() {
      const p = this.item;

      if (p && p.media && p.media.length) {
        return p.media[0].url;
      }

      return null;
    },
  },
});
</script>

<style scoped>
img {
  pointer-events: none
}

.container {
  @apply card shadow-xl flex flex-row flex-wrap justify-center items-start gap-3 p-4 bg-base-100;

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}

.icon {
  @apply flex justify-center items-center rounded text-neutral-content min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px]
}

.title {
  @apply block text-xl text-center font-bold;
}
</style>
