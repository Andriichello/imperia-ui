<template>
  <div class="preview">
    <Divider :lines="false"
             :title="title"/>

    <template v-if="waiterId">
      <Tip target="waiter" v-if="true"/>
    </template>

    <template v-else>
      <div class="flex justify-between items-center w-full gap-2 max-w-md">
        <div class="form-control w-full">
          <input class="input input-md input-bordered w-full text-xl z-[1]"
                 autocomplete="off"
                 name="search" type="text" required v-model="searchVal"
                 :placeholder="$t('preview.tip.search') + '...'"/>
        </div>

        <div class="btn btn-square btn-neutral"
             @click="onSearch">
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

      <div class="w-full flex flex-col max-w-md py-3 px-1">
        <template v-if="!indexResponse">
          <Preloader :title="$t('preview.tip.loading')" class="p-2"/>
        </template>

        <div class="w-full flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center items-center gap-2">
        <span class="text-xl"
            v-if="indexResponse && waitersTotal === 0">
          {{ $t("preview.tip.unfortunately_list_is_empty") }}
        </span>
          </div>
        </div>

        <List class="max-w-md"
              :waiters="waiters"/>

        <div class="w-full flex flex-col justify-center items-center mt-1 mb-3">
          <div class="w-full flex flex-col justify-center items-center gap-2">
              <span v-if="waitersCount && waitersTotal && waitersCount !== waitersTotal">
                {{ $t('preview.tip.showing_C_of_T', {count: waitersCount, total: waitersTotal}) }}
              </span>
            <span v-else-if="waitersCount && waitersTotal && waitersCount === waitersTotal">
                {{ $t('preview.tip.showing_all_C', {count: waitersCount}) }}
              </span>

            <div class="w-full list-more-btn max-w-xl" v-if="waitersCount < waitersTotal">
              <button class="w-full btn btn-sm btn-ghost" @click="onLoadMore">
                {{ $t('banquet.customer.load_more') }}
                <span class="loading loading-spinner" v-if="isLoadingMore"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import Tip from "@/components/preview/tips/Tip.vue";
import Divider from "@/layouts/divider/Divider.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import List from "@/components/preview/tips/list/List.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";
import debounce from "lodash/debounce";

export default defineComponent({
  // eslint-disable-next-line
  name: "PreviewTipsForWaiter",
  components: {
    Preloader,
    List,
    BaseIcon,
    Divider,
    Tip
    // Tips,
    // Preloader,
  },
  data() {
    return {
      searchVal: '',
      isLoadingMore: false
    };
  },
  computed: {
   ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurants: 'restaurants/restaurants',
      isLoadingWaiters: 'waiters/isLoadingWaiters',
      indexResponse: 'waiters/getIndexResponse',
      indexMoreResponse: 'waiters/getMoreResponse',
      waiter: 'waiters/waiter',
      waiters: 'waiters/waiters',
      selected: 'waiters/selected',
    }),
    title() {
      return `${this.$t('preview.tip.title')} "${this.$t('preview.tip.for.waiter')}"`
    },
    waiterId() {
      return +this.$route.params['waiterId']
    },
    waitersCount() {
      return this.waiters?.length;
    },
    waitersTotal() {
      return this.indexResponse?.meta?.total;
    },
  },
  watch: {
    indexMoreResponse: {
      async handler(response) {
        this.isLoadingMore = false;
      }
    },
    searchVal: debounce(
        function (newVal) {
          this.applySearch({search: newVal});
        }, 500
    ),
  },
  methods: {
    ...mapActions({
      selectRestaurant: "restaurants/setSelected",
      setWaiters: "waiters/setWaiters",
      setIndexResponse: "waiters/setIndexResponse",
      loadWaitersIfMissing: "waiters/loadWaitersIfMissing",
      loadMoreWaiters: "waiters/loadMoreWaiters",
      loadAndSelectRestaurant: "restaurants/loadAndSelectRestaurant",
      applySearch: "waiters/applySearch",
    }),
    onSearch() {
      this.applySearch({search: null});
    },
    onLoadMore() {
      this.isLoadingMore = true;
      this.loadMoreWaiters();
    },
  },
  async mounted() {
    const restaurantId = +this.$route.params['restaurantId'];

    if (restaurantId < 1) {
      this.$router.replace(`/preview`);
      return;
    }

    if (!this.restaurant || (this.restaurant && this.restaurant.id !== restaurantId)) {
      const target = (this.restaurants ?? []).find(r => r.id === restaurantId);

      if (target) {
        this.selectRestaurant(target);
      } else {
        this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }

    this.loadWaitersIfMissing();
  },
});
</script>

<style scoped>
.preview {
  @apply flex flex-col w-full gap-0 px-2 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}

.tip-box {
  @apply card shadow-md flex flex-col flex-wrap justify-center items-center gap-0 bg-base-100 btn-ghost py-5 px-3 rounded cursor-pointer min-h-[120px];

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}
</style>
