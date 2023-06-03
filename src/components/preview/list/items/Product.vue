<template>
  <div class="container">

    <figure class="px-2 pt-2">
      <img class="img"
        :alt="title"
        :src="image"/>
    </figure>

    <div class="body">
      <div class="details">
        <span class="title">{{ title }}</span>
        <span class="description">{{ description }}</span>

        <div class="info">
          <span class="weight">{{ weight }}</span>
          <span class="price">{{ price }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Product from "@/openapi/models/Product";

export default defineComponent({
  // eslint-disable-next-line
  name: "Product",
  props: {
    type: String,
    item: Product,
  },
  computed: {
    title() {
      return this.item.title;
    },
    description() {
      return this.item.description;
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
    price() {
      const p = this.item;

      return p.price === 0
        ? 'Free' : '$' + p.price;
    },
    weight() {
      const p = this.item;

      return p.weight > 1000
        ? p.weight / 1000 + 'kg' : p.weight + 'g';
    },
  },
});
</script>

<style scoped>
.container {
  @apply card shadow-lg flex flex-col flex-nowrap justify-center items-center gap-3 p-2;

  --rounded-box: 0.25rem;
  --padding-card: 1rem;
}

.body {
  @apply card-body flex-col justify-center items-center p-1;

  min-height: 180px;
  max-height: 180px;

  min-width: 100%;
}

.img {
  @apply rounded-box max-h-[350px];
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

.weight {
  @apply block grow text-lg text-start;

  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  @apply block grow text-xl text-end font-bold;

  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
