<template>
  <div class="wrapper">
    <input type="text" placeholder="Search..." class="input input-bordered input-sm" v-model="searchVal"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import debounce from 'lodash/debounce'

export default defineComponent({
  name: 'SearchBar',
  emits: ['search-change'],
  props: {
    search: String,
  },
  data() {
    return {
      searchVal: this.search,
    };
  },
  watch: {
    searchVal: debounce(
      function (newVal) {
        console.log('search-change');
        this.$emit('search-change', {search: newVal});
      }, 500
    ),
  },
})
</script>

<style scoped>
  .wrapper {
    @apply flex w-full justify-center;
  }
</style>
