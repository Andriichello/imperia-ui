<template>
  <div class="container btn-ghost cursor-pointer">

    <div class="flex flex-row justify-between items-center w-full">
      <div class="flex flex-col justify-start items-start">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <p class="text-lg font-light" v-if="description && description.length">{{ description }}</p>
      </div>

      <BaseIcon width="24" height="24" :title="title" view-box="0 0 24 24" style="transform: rotate(180deg);">
        <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </BaseIcon>
    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Menu from "@/openapi/models/Menu";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Menu",
  props: {
    menu: Menu,
  },
  components: {
    BaseIcon,
  },
  computed: {
    title() {
      return this.menu.title;
    },
    description() {
      return this.menu.description;
    },

    image() {
      const p = this.item;

      if (p.media && p.media.length) {
        return p.media[0].url;
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
