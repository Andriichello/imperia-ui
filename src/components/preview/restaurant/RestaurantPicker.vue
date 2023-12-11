<template>
  <div class="container">
    <span class="text-xl font-bold text-center" v-if="items">
      {{ $t("preview.restaurants.select") }}
    </span>

    <template v-for="item in items" :key="item.id">
      <div :class="{'selected': item === selected}">
        <Restaurant :item="item" :short="true" @select-restaurant="onSelect"/>
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

      if (p && p.media && p.media.length) {
        return p.media[0].url;
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
  @apply flex flex-col flex-wrap justify-center items-stretch gap-3;

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
