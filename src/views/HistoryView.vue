<template>
  <div class="preview">
    <History />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import History from "@/components/history/History.vue";

export default defineComponent({
  name: "HistoryView",
  components: {
    History,
  },
  mounted() {
    this.loadBanquetsIfMissing();
  },
  methods: {
    ...mapActions({
      loadBanquetsIfMissing: 'history/loadBanquetsIfMissing',
    })
  },
  computed: {
    ...mapGetters({
      filters: 'history/filters',
      banquets: 'history/banquets',
    })
  }

});
</script>

<style scoped>
.preview {
  @apply p-3;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}
</style>
