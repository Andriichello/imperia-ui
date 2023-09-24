<template>
  <div class="w-full max-w-xl flex flex-col justify-center items-start gap-2">
    <div class="flex justify-between items-center w-full gap-2">
      <div class="form-control w-full">
        <input class="input input-md input-bordered w-full text-xl z-[1]"
               name="search" type="text" required v-model="searchVal"
               :placeholder="$t('banquet.customer.search') + '...'"/>
      </div>

      <div class="btn btn-square btn-neutral" :class="{'bg-[var(--yellow)]': hasFilters}"
           @click="$emit('filters-click')">
        <BaseIcon width="24" height="24" class="text-neutral-content">
          <mask id="mask0_1102_7953" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.00049 2H21.5001V21.5007H2.00049V2Z"/>
          </mask>
          <g mask="url(#mask0_1102_7953)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.77349 11.5988C8.79149 11.6148 8.80849 11.6298 8.82549 11.6478C9.90449 12.7538 10.4995 14.2188 10.4995 15.7738V19.7578L12.7355 18.5398C12.9115 18.4438 13.0205 18.2558 13.0205 18.0488V15.7618C13.0205 14.2128 13.6095 12.7528 14.6785 11.6528L19.5155 6.50776C19.8285 6.17476 20.0005 5.73776 20.0005 5.27676V4.34076C20.0005 3.87676 19.6345 3.49976 19.1865 3.49976H4.31549C3.86649 3.49976 3.50049 3.87676 3.50049 4.34076V5.27676C3.50049 5.73776 3.67249 6.17476 3.98549 6.50676L8.77349 11.5988ZM10.1465 21.5008C9.94449 21.5008 9.74449 21.4468 9.56249 21.3388C9.21049 21.1288 8.99949 20.7578 8.99949 20.3458V15.7738C8.99949 14.6388 8.57649 13.5698 7.80549 12.7508C7.78249 12.7318 7.75949 12.7108 7.73949 12.6888L2.89349 7.53576C2.31749 6.92376 2.00049 6.12076 2.00049 5.27676V4.34076C2.00049 3.04976 3.03949 1.99976 4.31549 1.99976H19.1865C20.4615 1.99976 21.5005 3.04976 21.5005 4.34076V5.27676C21.5005 6.11976 21.1835 6.92176 20.6095 7.53476L15.7625 12.6888C14.9595 13.5168 14.5205 14.6058 14.5205 15.7618V18.0488C14.5205 18.8048 14.1115 19.4968 13.4535 19.8568L10.6925 21.3608C10.5205 21.4538 10.3335 21.5008 10.1465 21.5008Z"/>
          </g>
        </BaseIcon>
      </div>

      <div class="btn btn-square btn-neutral"
           @click="$emit('search-change', {search: searchVal})">
        <BaseIcon width="24" height="24" class="text-neutral-content">
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
import {mapGetters} from "vuex";
import {ThemeConfig} from "@/configs";

export default defineComponent({
  // eslint-disable-next-line
  name: "Search",
  emits: ["search-change", "filters-click"],
  components: {
    BaseIcon,
  },
  props: {
    search: {
      type: String,
      default: null,
    },
    hasFilters: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchVal: this.search,
    };
  },
  computed: {
    ...mapGetters({
      theme: "theme/get",
      themes: "theme/list",
    }),
    ThemeConfig() {
      return ThemeConfig
    },
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
