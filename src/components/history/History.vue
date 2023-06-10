<template>
  <div class="history">
    <Filters :states="filters.states" :from="filters.from" :until="filters.until" @state-switch="onStateSwitch" @from-select="onFromSelect" @until-select="onUntilSelect"/>
    <SearchBar :search="filters.search" @search-change="onSearchChange" :delay="500" class="mt-2 mb-4"/>

    <HistoryList :banquets="banquets" class="history-list"/> 
    <HistoryListMore :count="banquetsCount" :total="banquetsTotal" :loading="loadingMore" v-if="banquets" @load-more="onLoadMoreBanquets"/>  
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import HistoryList from "./list/HistoryList.vue";
import HistoryListMore from "./list/HistoryListMore.vue";
import Filters from "@/components/history/filters/Filters.vue";
import SearchBar from "@/components/common/SearchBar.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "History",
  components: {
    SearchBar,
    Filters,
    HistoryList,
    HistoryListMore,
  },
  data() {
    return {
      loadingMore: false,
    };
  },
  computed: {
    ...mapGetters({
      selections: 'history/filters',
      banquets: 'history/banquets',
    }),
    banquetsCount() {
      return this.banquets ? this.banquets.length : 0;
    },
    banquetsTotal() {
      return this.$store.getters['history/banquetsTotal'];
    },
  },
  watch: {
    banquets: {
      async handler() {
        this.loadingMore = false;
      }
    },
  },
  methods: {
    ...mapActions({
      'loadBanquets': 'history/loadBanquets',
      'loadBanquetsIfMissing': 'history/loadBanquetsIfMissing',
      'loadMoreBanquets': 'history/loadMoreBanquets',
      'applySearch': 'history/applySearch',
      'applyStates': 'history/applyStates',
      'applyFrom': 'history/applyFrom',
      'applyUntil': 'history/applyUntil',
    }),
    onLoadMoreBanquets() {
      this.loadingMore = true;
      this.loadMoreBanquets();
    },
    onSearchChange({ search }) {
      this.applySearch({ search })
    },
    onStateSwitch({ state, wasSelected }) {
      this.applyStates({ states: wasSelected ? [] : [state] })
    },
    onFromSelect({ date }) {
      this.applyFrom({ from: date })
    },
    onUntilSelect({ date }) {
      this.applyUntil({ until: date })
    },
  },
});
</script>


<style scoped>
.history {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;

  max-width: 800px;
}

.history-list {
  flex-basis: 90%;

  margin-left: auto;
  margin-right: auto;
}
</style>