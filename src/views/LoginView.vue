<template>
  <AuthForm @on-submit="onLogin" title="Welcome back!" link="Don't have an account?" button="Log In" to="/register">
    <template #inputs>
        <div class="form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input type="text" placeholder="Email..." class="input input-bordered w-full max-w-xs" />
      </div>

      <div class="form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input type="password" placeholder="Password..." class="input input-bordered w-full max-w-xs" />
      </div>
    </template>
  </AuthForm>
</template>

<script>
import { defineComponent } from "vue";
import AuthForm from "../components/forms/AuthForm.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    AuthForm,
  },
  methods: {
    onLogin(data) {
      console.log('onLogin: ', data);

      this.$router.push('/home');
    }
  }
});
</script>
