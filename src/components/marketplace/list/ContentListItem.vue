<template>
  <div class="list-item-container">
    <figure class="px-2 pt-2">
      <img
        class="list-item-img"
        alt="Margarita"
        :src="item.media[0].url"
      />
    </figure>
    <div class="list-item-body">
      <div class="list-item-details">
        <span class="list-item-title">{{ item.title }}</span>
        <span class="list-item-description">{{ item.description }}</span>
        <div class="list-item-info">
          <span class="list-item-weight">{{ weight() }}</span
          ><span class="list-item-price">{{ price() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentListItem",
  props: {
    type: String,
    item: Object,
  },
  computed: {},
  methods: {
    price() {
      return this.item.price === 0 
        ? 'Free' : '$' + this.item.price;
    },
    weight() {
      return this.item.weight > 1000 
        ? this.item.weight / 1000 + 'kg' : this.item.weight + 'g'; 
    },
  },
});
</script>

<style scoped>
.list-item-container {
  @apply card shadow-md bg-base-300 flex flex-col flex-nowrap justify-center items-center gap-3 p-2;

  --rounded-box: 0.25rem;
  --padding-card: 1rem;
}

.list-item-body {
  @apply card-body flex-col justify-center items-center p-1;

  min-height: 180px;
  max-height: 180px;

  min-width: 100%;
}

.list-item-img {
  @apply rounded-box;
}

.list-item-details {
  @apply flex flex-col grow flex-wrap items-center justify-between gap-1;

  min-width: 100%;
}

.list-item-title {
  @apply block text-xl text-center font-bold;
}

.list-item-description {
  @apply block text-lg text-center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
          line-clamp: 3; 
  -webkit-box-orient: vertical;
}

.list-item-info {
  @apply flex flex-row self-stretch pt-2 pb-2;
}

.list-item-weight {
  @apply block grow text-lg text-start;

  overflow: hidden;
  text-overflow: ellipsis;
}

.list-item-price {
  @apply block grow text-xl text-end font-bold;

  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
