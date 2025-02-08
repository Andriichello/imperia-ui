<template>
  <template v-if="isPreview">
    <PreviewLayout>
      <div class="wrapper">
        <router-view />
      </div>
    </PreviewLayout>
  </template>

  <template v-else>
    <AuthenticatedLayout>
      <div class="wrapper">
        <router-view />
      </div>
    </AuthenticatedLayout>
  </template>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import debounce from "lodash.debounce";
import { mapGetters, mapActions } from "vuex";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import PreviewLayout from "@/layouts/PreviewLayout.vue";
import {currentTimezone, dateTimezone} from "@/helpers";

export default defineComponent({
  name: "App",
  components: {
    PreviewLayout,
    AuthenticatedLayout,
  },
  computed: {
    ...mapGetters({
      page: 'nav/get',
      scrolled: 'nav/scrolled',
      authorized: 'auth/authorized',
    }),
    isPreview() {
      return this.$route.name && this.$route.name.startsWith('preview');
    },
  },
  methods: { 
    ...mapActions({
      setPage: 'nav/set',
      resolveAuth: 'auth/resolve',
      setScrolled: 'nav/setScrolled',
      resolveTheme: 'theme/resolve',
      resolveRestaurant: 'restaurants/loadResourcesIfMissing',
      loadMoreItems: 'marketplace/loadMoreItems',
    }),
    handleScroll() {
      const full = document.documentElement.scrollHeight;
      const scrolled = window.innerHeight + window.scrollY;

      if (full <= (scrolled + 1)) {
        this.setScrolled(true);
      } else if (this.scrolled) {
        this.setScrolled(false);
      }
    }
  },
  watch: {
    authorized(newValue, oldValue) {
      const isLogin = this.$route.name === 'login'; 
      const isRegister = this.$route.name === 'register'; 

      if (newValue && (isLogin || isRegister)) {
        this.$router.push(this.$route.query.redirect ?? '/place');
      } else if (!newValue && newValue !== oldValue) {
         this.$router.push('/login');
      }
    },
  },
  mounted() {
    this.resolveAuth();
    this.resolveTheme();
    this.resolveRestaurant({ params: { include: 'schedules' }});

    this.debouncedHandleScroll = debounce(this.handleScroll, 250);
    window.addEventListener('scroll', this.debouncedHandleScroll);
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.debouncedHandleScroll);
  },
});
</script>

<style scoped>
  .wrapper {
    @apply min-w-full h-full;

    overflow-x: auto;
    overflow-y: auto;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    max-width: 100%;
    flex: 0 1 100%;
  }
</style>
