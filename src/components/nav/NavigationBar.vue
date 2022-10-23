<template>
  <nav class="flex flex-row-reverse space-x-4 p-2">
    <ThemeSwitcher />
  </nav>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import ThemeSwitcher from '../theme/ThemeSwitcher.vue';

export default defineComponent({
  name: 'NavigationBar',
  components: {
    ThemeSwitcher,
  },
  methods: {
    ...mapGetters({
      getTheme: "theme/get",
      getThemes: "theme/list",
    }),
    ...mapActions({
      applyTheme: "theme/apply",
    }),
  },
})
</script>
