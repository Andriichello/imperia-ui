<template>
  <LoginForm @on-login="onLogin" :errors="errors" :loggingIn="loggingIn"/>
</template>

<script>
import { ResponseErrors } from "@/helpers";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import LoginForm from "../components/forms/LoginForm.vue";

export default defineComponent({
  name: "LoginPage",
  components: {
    LoginForm,
  },
  data() {
    return {
      errors: null,
      loggingIn: false,
    };
  },
  computed: {
    ...mapGetters({
      login: 'auth/login',
    }),
  },
  methods: {
    ...mapActions({
      apiMe: 'auth/me',
      apiLogin: 'auth/login',
    }),
    onLogin(form) {
      // todo: validate form
      this.loggingIn = true;
      this.apiLogin(form);
    },
  },
  watch: {
    login: {
      async handler(newValue) {
        this.loggingIn = false;
        this.errors = newValue 
          ? await ResponseErrors.from(newValue) : null;
      }
    },
  }
});
</script>
