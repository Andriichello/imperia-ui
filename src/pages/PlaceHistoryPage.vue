<template>
  <div class="history-page w-full">
    <div class="w-full max-w-2xl flex flex-col justify-center items-start gap-2" v-if="isShowingFilters">
      <DatesFilter class="max-w-2xl"
                   :from="filters?.from"
                   :until="filters?.until"
                   @from-select="onFromChange"
                   @from-clicked="onSetModal('from')"
                   @until-select="onUntilChange"
                   @until-clicked="onSetModal('until')"/>
    </div>

    <div class="w-full max-w-2xl flex flex-col justify-center items-start gap-2" v-if="isShowingFilters">
      <StatesFilter class="max-w-2xl"
                   :states="['new', 'confirmed', 'postponed', 'cancelled', 'completed']"
                   :selected="filters?.states && filters?.states.length ? filters?.states[0] : null"
                   @state-select="onStateChanged"
                   @state-clicked="onStateClicked"/>
    </div>

    <div class="w-full max-w-xl flex flex-col justify-center items-start gap-2">
      <Search :search="filters?.search" :has-filters="hasFilters"
        @filters-click="isShowingFilters = !isShowingFilters"
        @search-change="onSearchChange"/>

      <div class="w-full flex justify-between items-center gap-2">
        <div class="btn btn-md btn-ghost"
             :class="{'selected': mode === 'selection'}"
             @click="onSelectionButtonClick">
          <div class="w-full flex justify-center items-center gap-1">
            <BaseIcon width="24" height="24" color="currentColor">
              <mask id="mask0_61_13176" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2H21.9999V22H2V2Z"/>
              </mask>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.664 3.5C5.135 3.5 3.5 5.233 3.5 7.916V16.084C3.5 18.767 5.135 20.5 7.664 20.5H16.332C18.864 20.5 20.5 18.767 20.5 16.084V7.916C20.5 5.233 18.864 3.5 16.334 3.5H7.664ZM16.332 22H7.664C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.664 2H16.334C19.723 2 22 4.378 22 7.916V16.084C22 19.622 19.723 22 16.332 22Z"/>
            </BaseIcon>

            <template v-if="mode !== 'selection'">
              <BaseIcon width="16" height="16" color="currentColor">
                <path d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
              </BaseIcon>
            </template>

            <template v-else>
              <span class="lowercase">
                {{ selected?.length ?? 0 }} {{ $t('history.selection.selected') }}
              </span>

              <BaseIcon width="16" height="16" color="currentColor">
                <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg); transform-origin: center;"/>
              </BaseIcon>
            </template>
          </div>
        </div>

        <div class="btn btn-md btn-ghost btn-square" v-if="selected && selected.length"
          @click="onSetModal('bill')">
          <BaseIcon width="24" height="24" color="currentColor">
<!--            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.334 2C19.723 2 22 4.378 22 7.916V16.084C22 19.622 19.723 22 16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2H16.334ZM16.334 3.5H7.665C5.135 3.5 3.5 5.233 3.5 7.916V16.084C3.5 18.767 5.135 20.5 7.665 20.5H16.333C18.864 20.5 20.5 18.767 20.5 16.084V7.916C20.5 5.233 18.864 3.5 16.334 3.5ZM15.9482 11.0137C16.5012 11.0137 16.9482 11.4607 16.9482 12.0137C16.9482 12.5667 16.5012 13.0137 15.9482 13.0137C15.3952 13.0137 14.9432 12.5667 14.9432 12.0137C14.9432 11.4607 15.3862 11.0137 15.9382 11.0137H15.9482ZM11.9385 11.0137C12.4915 11.0137 12.9385 11.4607 12.9385 12.0137C12.9385 12.5667 12.4915 13.0137 11.9385 13.0137C11.3855 13.0137 10.9345 12.5667 10.9345 12.0137C10.9345 11.4607 11.3765 11.0137 11.9295 11.0137H11.9385ZM7.9297 11.0137C8.4827 11.0137 8.9297 11.4607 8.9297 12.0137C8.9297 12.5667 8.4827 13.0137 7.9297 13.0137C7.3767 13.0137 6.9247 12.5667 6.9247 12.0137C6.9247 11.4607 7.3677 11.0137 7.9207 11.0137H7.9297Z"/>-->
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 8C1.25 6.48122 2.48122 5.25 4 5.25H20C21.5188 5.25 22.75 6.48122 22.75 8V16C22.75 17.5188 21.5188 18.75 20 18.75H18C17.5858 18.75 17.25 18.4142 17.25 18C17.25 17.5858 17.5858 17.25 18 17.25H20C20.6904 17.25 21.25 16.6904 21.25 16V8C21.25 7.30964 20.6904 6.75 20 6.75H4C3.30964 6.75 2.75 7.30964 2.75 8V16C2.75 16.6904 3.30964 17.25 4 17.25H6C6.41421 17.25 6.75 17.5858 6.75 18C6.75 18.4142 6.41421 18.75 6 18.75H4C2.48122 18.75 1.25 17.5188 1.25 16V8Z"/>
            <path d="M20 9.5C20 10.3284 19.3284 11 18.5 11C17.6716 11 17 10.3284 17 9.5C17 8.67157 17.6716 8 18.5 8C19.3284 8 20 8.67157 20 9.5Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 2C5.25 1.58579 5.58579 1.25 6 1.25H18C18.4142 1.25 18.75 1.58579 18.75 2V6C18.75 6.41421 18.4142 6.75 18 6.75H6C5.58579 6.75 5.25 6.41421 5.25 6V2ZM6.75 2.75V5.25H17.25V2.75H6.75Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 14C5.25 13.5858 5.58579 13.25 6 13.25H18C18.4142 13.25 18.75 13.5858 18.75 14V22C18.75 22.4142 18.4142 22.75 18 22.75H6C5.58579 22.75 5.25 22.4142 5.25 22V14ZM6.75 14.75V21.25H17.25V14.75H6.75Z"/>
          </BaseIcon>
        </div>
      </div>

      <template v-if="!indexResponse || isSearching">
        <Preloader :title="$t('history.loading')" class="p-2"/>
      </template>

      <template v-if="!isSearching">
        <List :banquets="banquets"
              @open-bill="onOpenBill"
              @toggle-selection="onToggleBanquetSelection"/>
      </template>

      <template v-if="indexResponse && banquetsCount === 0 && !isSearching">
        <div class="w-full flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center items-center gap-2">
            <span class="text-xl font-semibold">
              {{ $t("history.unfortunately_list_is_empty") }}
            </span>
          </div>
        </div>
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

    <div class="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-neutral/80 backdrop-blur-sm z-50"
         v-if="modal">

      <div class="grow w-full min-h-[8px]" @click="modal = null"></div>

      <div class="w-full flex justify-center items-center">
        <div class="grow h-full min-w-[8px]" @click="modal = null"></div>

        <div class="w-full max-w-md flex flex-col justify-center items-center card bg-base-100 p-2 gap-1"
             v-if="modal === 'from'">
          <Calendar :selected-date="filters?.from" :select-on-click="true"
                    :no-buttons="true"
                    :options="{disableAfter: filters?.until}"
                    @on-select="onFromChange"/>
        </div>

        <div class="w-full max-w-md flex flex-col justify-center items-center card bg-base-100 p-2 gap-1"
             v-if="modal === 'until'">
          <Calendar :selected-date="filters?.until" :select-on-click="true"
                    :no-buttons="true"
                    :options="{disableBefore: filters?.from}"
                    @on-select="onUntilChange"/>
        </div>

        <div class="flex flex-col justify-center items-center card bg-base-100 p-2 gap-1"
             v-if="modal === 'bill'">
          <BillPicker v-if="modal === 'bill'"
                      :menus="menus ?? []"
                      :tags="tags ?? []"
                      @on-select="onSelectBill"
                      @on-cancel="modal = null"/>
        </div>

        <div class="grow h-full min-w-[8px]" @click="modal = null"></div>
      </div>

      <div class="grow w-full min-h-[8px]" @click="modal = null"></div>

    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import List from "@/components/history/list/List.vue";
import Search from "@/components/history/filters/Search.vue";
import Preloader from "@/components/preview/loading/Preloader.vue";
import DatesFilter from "@/components/history/filters/DatesFilter.vue";
import Calendar from "@/components/order/date/Calendar.vue";
import StatesFilter from "@/components/history/filters/StatesFilter.vue";
import {throttle} from "lodash";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import BillPicker from "@/components/order/bill/BillPicker.vue";
import {instanceOfBanquetMultipleInvoiceUrlResponse} from "@/openapi";

export default defineComponent({
  name: "PlaceHistoryPage",
  components: {
    BillPicker,
    BaseIcon,
    StatesFilter,
    Calendar,
    DatesFilter,
    Preloader,
    Search,
    List
  },
  data() {
    return {
      modal: null,
      isUpdatingOrder: false,
      isLoadingRestaurant: false,
      isSearching: false,
      isLoadingMore: false,
      isShowingFilters: false,
      isLoadingPdfUrl: false,
      banquetForBill: null,
    };
  },
  computed: {
    ...mapGetters({
      mode: 'history/mode',
      menus: 'preview/menus',
      tags: 'preview/tags',
      selected: 'history/selected',
      restaurant: 'restaurants/selected',
      restaurantResponse: 'restaurants/getShowResponse',
      banquets: "history/banquets",
      banquetsTotal: "history/banquetsTotal",
      filters: "history/filters",
      indexResponse: "history/getIndexResponse",
      indexMoreResponse: "history/getIndexMoreResponse",
      pdfUrlResponse: "history/getPdfUrlResponse",
    }),
    banquetsCount() {
      return this.banquets?.length;
    },
    hasFilters() {
      if (!this.filters) {
        return true;
      }

      return !!(this.filters?.from || this.filters?.until || (this.filters?.states && this.filters?.states.length));
    },
    isSelectionMode() {
      return this.mode === 'selection';
    }
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
      setMode: 'history/setMode',
      setSelected: 'history/setSelected',
      selectRestaurant: 'restaurants/setSelected',
      loadAndSelectRestaurant: 'restaurants/loadAndSelectRestaurant',
      loadMenusIfMissing: 'preview/loadMenusIfMissing',
      loadTagsIfMissing: 'preview/loadTagsIfMissing',
      loadBanquets: 'history/loadBanquets',
      loadBanquetsIfMissing: 'history/loadBanquetsIfMissing',
      loadMoreBanquets: 'history/loadMoreBanquets',
      loadBanquetsPdfUrl: 'history/loadBanquetsPdfUrl',
      applySearch: 'history/applySearch',
      applyFrom: 'history/applyFrom',
      applyUntil: 'history/applyUntil',
      applyStates: 'history/applyStates',
      setIndexResponse: 'history/setBanquetsResponse',
      setIndexMoreResponse: 'history/setMoreBanquetsResponse',
    }),
    onLoadMore() {
      if (this.isLoadingMore) {
        return;
      }

      this.isLoadingMore = true;
      this.loadMoreBanquets();
    },
    onSearchChange({search}) {
      this.isSearching = true;
      this.applySearch({search});
    },
    onFromChange({date}) {
      this.isSearching = true;
      this.applyFrom({from: date});

      this.modal = null;
    },
    onUntilChange({date}) {
      this.isSearching = true;
      this.applyUntil({until: date});

      this.modal = null;
    },
    onStateChanged({state}) {
      const selected = this.filters?.states && this.filters?.states.length
          ? this.filters?.states[0] : null;

      if (selected === state) {
        this.applyStates({states: []});
      } else {
        this.applyStates({states: [state]});
      }
    },
    onStateClicked({state}) {
      // this.applyStates([state]);
    },
    onSelectionButtonClick() {
      if (this.mode === 'selection') {
        this.setMode({mode: null});
        this.setSelected({selected: []});
      } else {
        this.setMode({mode: 'selection'});
      }
    },
    onOpenBill({banquet}) {
      this.banquetForBill = banquet;
      this.onSetModal('bill');

      // if (banquet?.invoiceUrl) {
      //   window.open(banquet?.invoiceUrl, '_blank').focus();
      // }
    },
    async onSelectBill({tags, menus, sections}) {
      this.onSetModal(null);

      let url = this.banquetForBill?.invoiceUrl;

      if (this.mode === 'selection') {
        const banquets = this.selected;
        if (!banquets || !banquets.length) {
          return;
        }

        const ids = banquets.map((b) => b.id);

        await this.loadBanquetsPdfUrl({ids});
        if (this.pdfUrlResponse && instanceOfBanquetMultipleInvoiceUrlResponse(this.pdfUrlResponse)) {
          url = this.pdfUrlResponse.url;

          console.log({url});
        }
      }

      if (!url) {
        return;
      }

      if (tags) {
        url += '&tags=' + tags.join(',');
      }
      if (menus) {
        url += '&menus=' + menus.join(',');
      }
      if (sections) {
        url += '&sections=' + sections.join(',')
      }

      window.open(url, '_blank').focus();
    },
    onToggleBanquetSelection({banquet}) {
      let banquets = [...(this.selected ?? [])];
      const same = banquets.find((b) => b.id === banquet.id);

      if (!same) {
        banquets.push(banquet);
      } else {
        banquets = banquets.filter((b) => b.id !== banquet.id);
      }

      this.setSelected({selected: banquets});
    },
    onSetModal(modal) {
      this.modal = modal;
    },
    onKeyDown(e) {
      if (this.modal && e.key === 'Escape') {
        this.modal = null;
      }
    },
    onScroll() {
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Get the current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + clientHeight;

      if ((scrollBottom + 10) > scrollHeight) {
        this.onLoadMore();
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    document.addEventListener('keydown', this.onKeyDown);

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

    if (this.indexResponse && this.banquets) {
        this.loadBanquets()
    }

    this.loadBanquetsIfMissing();
    this.loadMenusIfMissing();
    this.loadTagsIfMissing();
    },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('keydown', this.onKeyDown);
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
