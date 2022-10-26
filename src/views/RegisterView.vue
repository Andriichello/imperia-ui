<template>
  <RegisterForm @on-register="onRegister"/>
</template>

<script>
import { defineComponent } from "vue";
import RegisterForm from "../components/forms/RegisterForm.vue";

export default defineComponent({
  name: "RegisterView",
  components: {
    RegisterForm,
  },
  
  methods: {
    onRegister(form) {
     // todo: validate form

      console.log('onRegister: ', form);
      // this.$router.push('/login');
    }
  }
});
</script>
