<template>
  <div class="w-full">
    <div class="w-full flex flex-row justify-center items-center rounded px-2 py-1">
      <div class="grow flex flex-col justify-center items-start cursor-pointer">
        <h2 class="text-lg font-bold">{{ $t('preview.tip.title') }}</h2>
          <p class="text-sm">
            {{ $t('preview.tip.for.all') }}
          </p>
      </div>

      <button class="flex justify-center items-center w-[40px] h-[40px]">
        <BaseIcon width="20" height="20" view-box="0 0 24 24" style="transform: rotate(180deg);">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {mapGetters} from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "ShortTips",
  components: {BaseIcon},
  computed: {
    ...mapGetters({
      waiters: "waiters/waiters",
      waitersResponse: "waiters/getIndexResponse",
    }),
    waitersCount() {
      if (!this.waiters) {
        return null;
      }

      return this.waiters.length;
    },
    waitersTotal() {
      if (!this.waitersResponse || !this.waitersResponse.meta) {
        return null;
      }

      return this.waitersResponse.meta?.total;
    },
  },
});
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
}
</style>
