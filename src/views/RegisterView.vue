<template>
  <RegisterForm @on-register="onRegister" :errors="errors" :registering="registering"/>
</template>

<script>
import { ResponseErrors } from "@/helpers";
import { instanceOfRegisterResponse } from "@/openapi";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import RegisterForm from "../components/forms/RegisterForm.vue";

export default defineComponent({
  name: "RegisterView",
  components: {
    RegisterForm,
  },
  data() {
    return {
      errors: null,
      registering: false,
    };
  },
  computed: {
    ...mapGetters({
      register: 'auth/register',
    }),
  },
  methods: {
    ...mapActions({
      apiRegister: 'auth/register',
    }),
    onRegister(form) {
      // todo: validate form

      this.registering = true;
      this.apiRegister(form);
    },
  },
  watch: {
    register: {
      async handler(newValue) {
        this.registering = false;
        this.errors = newValue 
          ? await ResponseErrors.from(newValue) : null;

        if (instanceOfRegisterResponse(newValue)) {
          this.$router.push('/login');
        }
      }
    },
  }
});
</script>
