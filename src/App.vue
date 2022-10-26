<template>
  <div class="wrapper">
    <router-view />
  </div>
  <NavBar />
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
      authorized: 'auth/authorized',
    }),
  },
  methods: { 
    ...mapActions({
      resolveAuth: 'auth/resolve',
      resolveTheme: 'theme/resolve',
    }),
  },
  watch: {
    authorized(newValue) {
      const isLogin = this.$route.name === 'login'; 
      const isRegister = this.$route.name === 'register'; 

      if (newValue && (isLogin || isRegister)) {
        this.$router.push(this.$route.query.redirect ?? '/home');
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
    @apply pl-20;

    display: flex;
    flex-grow: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-self: center;
    align-self: center;
  }
</style>
