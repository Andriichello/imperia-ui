<template>
  <div class="container">

    <div class="flex flex-row justify-start items-start gap-5 w-full">
      <div class="flex justify-center items-center w-20 h-20 rounded bg-neutral text-neutral-content">
        <img v-if="image" class="img w-20 h-20 rounded"
             :alt="title" :src="image"/>

        <BaseIcon v-else width="64" height="64" :title="title" view-box="0 0 64 64">
          <path d="M11 4C9.355 4 8 5.355 8 7v2.068a13.74 13.74 0 0 1-.465 3.541L4.531 23.875A15.741 15.741 0 0 0 4 27.932V30.5a7.502 7.502 0 0 0 4 6.63V57c0 1.645 1.355 3 3 3h42c1.645 0 3-1.355 3-3V37.13a7.502 7.502 0 0 0 4-6.629v-2.568c0-1.37-.178-2.733-.531-4.057L56.465 12.61A13.74 13.74 0 0 1 56 9.07V7c0-1.645-1.355-3-3-3H11zm0 2h42c.564 0 1 .436 1 1v2.068c0 .312.01.622.03.932H9.97c.019-.31.03-.62.03-.932V7c0-.564.435-1 1-1zm-1.277 6h44.555c.071.377.154.753.254 1.125l3.004 11.266c.053.202.098.406.142.61H6.323c.045-.204.089-.408.143-.61L9.47 13.125c.099-.372.182-.748.253-1.125zm-3.69 15h51.934c.021.31.033.62.033.932V30.5c0 3.064-2.435 5.5-5.5 5.5S47 33.564 47 30.5V30a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0v.5c0 3.064-2.435 5.5-5.5 5.5S6 33.564 6 30.5v-2.568c0-.312.012-.622.034-.932zM32 33.664C33.34 36.208 35.928 38 39 38c2.994 0 5.508-1.718 6.88-4.156C47.117 36.28 49.581 38 52.5 38a7.51 7.51 0 0 0 1.5-.15V57c0 .564-.436 1-1 1H30v-8c0-4.415-3.585-8-8-8s-8 3.585-8 8v8h-3c-.564 0-1-.436-1-1V37.85c.485.098.986.15 1.5.15 2.918 0 5.382-1.719 6.621-4.156C19.493 36.282 22.006 38 25.001 38c3.071 0 5.659-1.792 7-4.336zM22 44c3.341 0 6 2.659 6 6v8H16v-8c0-3.341 2.659-6 6-6z"/>
        </BaseIcon>
      </div>

      <div class="flex flex-col justify-start items-start gap-2">
        <span class="title">{{ title }}</span>
        <span class="address">{{ address }}</span>
      </div>
    </div>

    <Schedule :item="item" class="w-full"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";
import Schedule from "@/components/preview/schedule/Schedule.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Restaurant",
  components: {
    Schedule,
    BaseIcon,
  },
  props: {
    type: String,
    item: Restaurant,
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

      if (p.media && p.media.length) {
        return p.media[0].url;
      }

      if (p.defaultMedia && p.defaultMedia.length) {
        return p.defaultMedia[0].url;
      }

      return null;
    },
  },
});
</script>

<style scoped>
.container {
  @apply card shadow-xl flex flex-row flex-wrap justify-center items-start gap-3 p-5 max-w-2xl bg-base-100;

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}

@media screen and (max-width: 480px) {
  .card {
    padding: 8px;
  }
}

.body {
  @apply card-body flex-col justify-center items-center p-1;

  min-height: 180px;
  max-height: 180px;

  min-width: 100%;
}

.details {
  @apply flex flex-col grow flex-wrap items-center justify-between gap-1;

  min-width: 100%;
}

.title {
  @apply block text-xl text-center font-bold;
}

.description {
  @apply block text-lg text-center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.info {
  @apply flex flex-row self-stretch pt-2 pb-2;
}
</style>
