<template>
  <div class="holder"></div>
  
  <div class="wrapper">
    <router-view />
  </div>

  <NavBar :page="page" class="nav"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import NavBar from "./components/nav/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
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
    }),
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
  },
});
</script>

<style scoped>
  .wrapper {
    overflow-x: auto;
    overflow-y: auto;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    max-width: 100%;
    flex: 0 1 100%;
  }

  .holder {
    @apply bg-green-200;

    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 80px;
    min-height: 100vh;
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
