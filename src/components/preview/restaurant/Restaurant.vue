<template>
  <div class="container">

    <div class="flex flex-row justify-start items-start gap-5 w-full">
      <img class="img w-20 h-20 rounded"
           :alt="title"
           :src="image"/>

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

export default defineComponent({
  // eslint-disable-next-line
  name: "Restaurant",
  components: {Schedule},
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
  @apply card shadow-xl flex flex-row flex-wrap justify-center items-start gap-3 p-5 max-w-xl bg-base-200;

  --rounded-box: 0.25rem;
  --padding-card: 1rem;
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
