<template>
  <AuthenticatedLayout>
    <div class="wrapper">
      <router-view />
    </div>
  </AuthenticatedLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import debounce from "lodash.debounce";
import { mapGetters, mapActions } from "vuex";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";

export default defineComponent({
  name: "App",
  components: {
    AuthenticatedLayout,
  },
  computed: {
    ...mapGetters({
      page: 'nav/get',
      authorized: 'auth/authorized',
    }),
  },
  methods: { 
    ...mapActions({
      setPage: 'nav/set',
      resolveAuth: 'auth/resolve',
      resolveTheme: 'theme/resolve',
      resolveRestaurant: 'restaurants/resolve',
      loadMoreItems: 'marketplace/loadMoreItems',
    }),
    handleScroll() {
      const full = document.documentElement.scrollHeight;
      const scrolled = window.innerHeight + window.scrollY;

      if (full <= scrolled) {
        console.log('scrolled to bottom');
      }
    }
  },
  watch: {
    authorized(newValue, oldValue) {
      const isLogin = this.$route.name === 'login'; 
      const isRegister = this.$route.name === 'register'; 

      if (newValue && (isLogin || isRegister)) {
        this.$router.push(this.$route.query.redirect ?? '/home');
      } else if (!newValue && newValue !== oldValue) {
         this.$router.push('/login');
      }
    }
  },
  mounted() {
    this.resolveAuth();
    this.resolveTheme();
    this.resolveRestaurant();

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
    @apply min-w-full min-h-screen;

    overflow-x: auto;
    overflow-y: auto;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    max-width: 100%;
    flex: 0 1 100%;
  }

  .nav {
    width: 80px;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;

    flex-grow: 0;
    flex-wrap: nowrap;
  }
</style>
