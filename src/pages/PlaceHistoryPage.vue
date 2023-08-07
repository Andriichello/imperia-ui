<template>
  <div class="history-page w-full">
    <div class="w-full max-w-xl flex flex-col justify-center items-start gap-2">
      <Search :search="filters?.search"
        @search-change="onSearchChange"/>

      <template v-if="!indexResponse || isSearching">
        <Preloader :title="$t('history.loading')" class="p-2"/>
      </template>

      <template v-if="!isSearching">
        <List :banquets="banquets"/>
      </template>

      <div class="w-full flex flex-col justify-center items-center mt-1" v-if="!isSearching">
        <div class="w-full flex flex-col justify-center items-center gap-2">
          <span v-if="banquetsCount && banquetsTotal && banquetsCount !== banquetsTotal">
            {{ $t('history.showing_C_of_T', {count: banquetsCount, total: banquetsTotal}) }}
          </span>
          <span v-else-if="banquetsCount && banquetsTotal && banquetsCount === banquetsTotal">
            {{ $t('history.showing_all_C', {count: banquetsCount}) }}
          </span>

          <div class="w-full" v-if="banquetsCount < banquetsTotal">
            <button class="w-full btn btn-ghost" @click="onLoadMore">
              {{ $t('history.load_more') }}
              <span class="loading loading-spinner" v-if="isLoadingMore"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import List from "@/components/hist/list/List.vue";
import Search from "@/components/hist/filters/Search.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";

export default defineComponent({
  name: "PlaceHistoryPage",
  components: {
    Preloader,
    Search,
    List
  },
  data() {
    return {
      isUpdatingOrder: false,
      isLoadingRestaurant: false,
      isSearching: false,
      isLoadingMore: false,
    };
  },
  computed: {
    ...mapGetters({
      restaurant: 'restaurants/selected',
      restaurantResponse: 'restaurants/getShowResponse',
      banquets: "history/banquets",
      banquetsTotal: "history/banquetsTotal",
      filters: "history/filters",
      indexResponse: "history/getIndexResponse",
      indexMoreResponse: "history/getIndexMoreResponse",
    }),
    banquetsCount() {
      return this.banquets?.length;
    },
  },
  watch: {
    restaurantResponse() {
      this.isLoadingRestaurant = false;
    },
    indexResponse() {
      this.isSearching = false;
    },
    indexMoreResponse() {
      this.isLoadingMore = false;
    },
  },
  methods: {
    ...mapActions({
      selectRestaurant: 'restaurants/setSelected',
      loadAndSelectRestaurant: 'restaurants/loadAndSelectRestaurant',
      loadBanquets: 'history/loadBanquets',
      loadBanquetsIfMissing: 'history/loadBanquetsIfMissing',
      loadMoreBanquets: 'history/loadMoreBanquets',
      applySearch: 'history/applySearch',
      setIndexResponse: 'history/setBanquetsResponse',
      setIndexMoreResponse: 'history/setMoreBanquetsResponse',
    }),
    onLoadMore() {
      this.isLoadingMore = true;
      this.loadMoreBanquets();
    },
    onSearchChange({search}) {
      this.isSearching = true;
      this.applySearch({search});
    },
  },
  mounted() {
    const restaurantId = +this.$route.params['restaurantId'];
    if (restaurantId < 0) {
      return;
    }

    if (!this.restaurant || (this.restaurant && this.restaurant.id !== restaurantId)) {
      const target = (this.restaurants ?? []).find(r => r.id === restaurantId);

      if (target) {
        this.selectRestaurant(target);
      } else {
        this.isLoadingRestaurant = true;
        this.loadAndSelectRestaurant({ id: restaurantId });
      }
    }

    this.loadBanquetsIfMissing();
  },
});
</script>

<style scoped>
.history-page {
  @apply flex flex-col w-full gap-3 px-2 pt-4 pb-10;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}

.blurred {
  --tw-border-opacity: 0;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.1;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}
</style>
