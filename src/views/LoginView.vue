<template>
  <LoginForm @on-login="onLogin"/>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import LoginForm from "../components/forms/LoginForm.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    LoginForm,
  },
  methods: {
    ...mapGetters({
      getLogin: 'auth/login',
    }),
    ...mapActions({
      apiMe: 'auth/me',
      apiLogin: 'auth/login',
    }),
    onLogin(form) {
      // todo: validate form
      this.apiLogin(form);
    }
  },
  mounted() {
    console.log(this.$route)
  }
});
</script>
