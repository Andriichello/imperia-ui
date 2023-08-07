<template>
  <div class="w-full max-w-xl flex flex-col justify-center items-start gap-2">
    <div class="flex justify-between items-center w-full gap-2">
      <div class="form-control w-full">
        <input class="input input-md input-bordered w-full text-xl z-[1]"
               name="search" type="text" required v-model="searchVal"
               :placeholder="$t('banquet.customer.search') + '...'"/>
      </div>

      <div class="btn btn-square btn-neutral">
        <BaseIcon width="24" height="24" class="text-neutral-content" @click="$emit('search-change', {search: searchVal})">
          <mask id="mask0_1102_7955" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
            <path d="M2 2H21.4768V21.477H2V2Z"/>
          </mask>
          <path d="M11.739 3.5C7.196 3.5 3.5 7.195 3.5 11.738C3.5 16.281 7.196 19.977 11.739 19.977C16.281 19.977 19.977 16.281 19.977 11.738C19.977 7.195 16.281 3.5 11.739 3.5ZM11.739 21.477C6.369 21.477 2 17.108 2 11.738C2 6.368 6.369 2 11.739 2C17.109 2 21.477 6.368 21.477 11.738C21.477 17.108 17.109 21.477 11.739 21.477Z"/>
          <mask id="mask1_1102_7955" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="17" y="17" width="6" height="6">
            <path d="M17.2397 17.707H22.2638V22.7218H17.2397V17.707Z"/>
          </mask>
          <path d="M21.514 22.7218C21.323 22.7218 21.131 22.6488 20.984 22.5028L17.46 18.9888C17.167 18.6958 17.166 18.2208 17.459 17.9278C17.751 17.6328 18.226 17.6348 18.52 17.9258L22.044 21.4408C22.337 21.7338 22.338 22.2078 22.045 22.5008C21.899 22.6488 21.706 22.7218 21.514 22.7218Z"/>
        </BaseIcon>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import debounce from "lodash/debounce";

export default defineComponent({
  // eslint-disable-next-line
  name: "Search",
  emits: ["search-change"],
  components: {
    BaseIcon,
  },
  props: {
    search: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      searchVal: this.search,
    };
  },
  watch: {
    searchVal: debounce(
        function (newVal) {
          this.$emit('search-change', {search: newVal});
        }, 500
    ),
  },
});
</script>

<style scoped>
</style>
