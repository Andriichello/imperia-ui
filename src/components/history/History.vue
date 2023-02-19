<template>
  <div class="history"> 
    <HistoryList :banquets="banquets" class="history-list"/> 
    <HistoryListMore :count="banquetsCount" :total="banquetsTotal" :loading="loadingMore" v-if="banquets" @load-more="onLoadMoreBanquets"/>  
  </div>    
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import HistoryList from "./list/HistoryList.vue";
import HistoryListMore from "./list/HistoryListMore.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "History",
  components: {
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
      filters: 'history/filters',
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
    }),
    onLoadMoreBanquets() {
      this.loadingMore = true;
      this.loadMoreBanquets();
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
}

.history-list {
  flex-basis: 90%;

  margin-left: auto;
  margin-right: auto;
}
</style>