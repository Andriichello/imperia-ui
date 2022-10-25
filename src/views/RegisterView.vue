<template>
  <AuthForm @on-submit="onRegister" title="First time here?" link="Already have an account?" button="Register" to="/login">
    <template #inputs>
      <div class="form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input type="text" placeholder="Name..." class="input input-bordered w-full max-w-md" />
      </div>

      <div class="form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">Surname</span>
        </label>
        <input type="text" placeholder="Surname..." class="input input-bordered w-full max-w-md" />
      </div>

      <div class="form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input type="text" placeholder="Email..." class="input input-bordered w-full max-w-md" />
      </div>

      <div class="form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">Phone</span>
        </label>
        <input type="text" placeholder="Phone..." class="input input-bordered w-full max-w-md" />
      </div>

      <div class="form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input type="password" placeholder="Password..." class="input input-bordered w-full max-w-md" />
      </div>

       <div class="form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">Password Confirmation</span>
        </label>
        <input type="password" placeholder="Password Confirmation..." class="input input-bordered w-full max-w-md" />
      </div>
    </template>
  </AuthForm>
</template>

<script>
import { defineComponent } from "vue";
import AuthForm from "../components/forms/AuthForm.vue";

export default defineComponent({
  name: "RegisterView",
  components: {
    AuthForm,
  },
  methods: {
    onRegister(data) {
      console.log('onRegister: ', data);

      this.$router.push('/login');
    }
  }
});
</script>
