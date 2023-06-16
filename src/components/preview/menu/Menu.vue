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
  @apply card shadow-xl flex flex-row flex-wrap justify-center items-start w-full gap-3 p-4 bg-base-100;

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}

@media screen and (max-width: 480px) {
  .card {
    @apply p-3;
  }
}
</style>
