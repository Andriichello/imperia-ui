<template>
  <div class="container btn-ghost" :class="{'selected': selected}" @click="onClick">
    <img
      class="main-img rounded-box w-[160px] h-[160px]"
      :alt="name"
      :src="image"
    />
    <div class="body">
      <div class="details">
        <span class="name">{{ name }}</span>
        <span class="address">{{ address }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Restaurant } from "@/openapi/models/Restaurant";

export default defineComponent({
  name: "RestaurantListItem",
  emits: ['restaurant-click'],
  props: {
    selected: Boolean,
    restaurant: Restaurant,
  },
  computed: {
    image() {
      if (this.restaurant.media && this.restaurant.media.length) {
        return this.restaurant.media[0].url;
      }

      return null;
    },
    name() {
      return this.restaurant.name;
    },
    address() {
      const parts = [
        this.restaurant.place,
        this.restaurant.city,
        this.restaurant.country,
      ]

      return parts.join(', ');
    },
  },
  methods: {
    onClick() {
      this.$emit('restaurant-click', { restaurant: this.restaurant });
    },
  },
});
</script>

<style scoped>
.container {
  @apply card shadow-lg flex flex-col flex-nowrap justify-center items-center gap-3 p-2 cursor-pointer;

  --rounded-box: 0.25rem;
  --padding-card: 1rem;
}

.body {
  @apply card-body flex flex-wrap flex-grow-0 flex-col justify-start items-center p-1;

  min-height: 120px;

  min-width: 100%;
}

.main-img {

}

.details {
  @apply flex flex-col flex-wrap items-center justify-start gap-1;

  min-width: 100%;
}

.name {
  @apply block text-xl text-center font-bold;
}
.address {
  @apply block text-center;
}

.slct {
  @apply btn btn-ghost btn-sm w-8 p-0;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>
