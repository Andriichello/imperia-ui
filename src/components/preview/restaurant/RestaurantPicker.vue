<template>
  <div class="container">
    <span class="text-xl font-bold" v-if="items">Select restaurant</span>

    <template v-for="item in items" :key="item.id">
      <div class="btn-ghost rounded-box p-1" :class="{'selected': item === selected}" @click="onSelect(item)">
        <Restaurant :item="item"/>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/components/preview/restaurant/Restaurant.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "RestaurantPicker",
  emits: ['restaurant-select'],
  components: {
    Restaurant,
  },
  props: {
    items: Array,
    selected: Restaurant,
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
  methods: {
    onSelect(item) {
      this.$emit('restaurant-select', { restaurant: item })
    },
  },
});
</script>

<style scoped>
.container {
  @apply flex flex-row flex-wrap justify-center items-start gap-3 p-5 max-w-xl bg-base-200;

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

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>
