<template>
  <div class="w-full flex flex-col justify-center items-center gap-1">
    <h1>Waiters & Reviews</h1>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {mapActions, mapGetters} from "vuex";
import {dateFormatted} from "../../../helpers";

export default defineComponent({
  // eslint-disable-next-line
  name: "Tips",
  data() {
    return {
      loadingMore: false,
    };
  },
  computed: {
    ...mapGetters({
      restaurant: "restaurants/selected",
      waiters: "waiters/waiters",
      waitersResponse: "waiters/getIndexResponse",
      waitersMoreResponse: "waiters/getMoreResponse",
    }),
  },
  methods: {
    ...mapActions({
      loadWaitersIfMissing: "waiters/loadWaitersIfMissing",
      loadMoreWaiters: "waiters/loadMoreWaiters",
    }),
    dateFormatted,
    onLoadMore() {
      this.loadingMore = true;

      this.loadMoreWaiters();
    },
  },
  mounted() {
    this.loadWaitersIfMissing();
  },
});
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
}
</style>
