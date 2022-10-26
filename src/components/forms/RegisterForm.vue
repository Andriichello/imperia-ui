<template>
 <div class="auth-container">
    <div class="block">
      <LogoIcon />
    </div>

    <div class="auth-card">
      <div class="auth-card-body">
        <div class="auth-card-title">
          <h1>First time here?</h1>
        </div>
        <div class="auth-card-divider"></div>

        <form @submit.prevent="onRegister" class="form-control w-full max-w-md">
          <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input v-model="name" name="name" type="text" placeholder="Name..." class="input input-bordered w-full max-w-md" />
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Surname</span>
            </label>
            <input v-model="surname" name="surname" type="text" placeholder="Surname..." class="input input-bordered w-full max-w-md" />
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="email" name="email" type="email" placeholder="Email..." class="input input-bordered w-full max-w-md" />
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Phone</span>
            </label>
            <input v-model="phone" name="phone" type="tel" placeholder="Phone..." class="input input-bordered w-full max-w-md" />
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input v-model="password" name="password" type="password" placeholder="Password..." class="input input-bordered w-full max-w-md" />
          </div>

            <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Password Confirmation</span>
            </label>
            <input v-model="password_confirmation" name="password_confirmation" type="password" placeholder="Password Confirmation..." class="input input-bordered w-full max-w-md" />
          </div>
        
          <router-link to="/login" class="link link-hover font-bold self-end mt-4 mb-4">Don't have an account?</router-link>

          <div class="card-actions w-full">
            <button type="submit" class="btn btn-block btn-primary">Log In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LogoIcon from "../icons/LogoIcon.vue";

export default defineComponent({
  name: "RegisterForm",
  components: {
    LogoIcon
  },
  emits: ["on-login"],
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      phone: null,
      password: null,
      password_confirmation: null,
    };
  },
  methods: {
     onLogin() {
      this.$emit("on-login", this.$data);
    }
  }
});
</script>


<style scoped>
.auth-container {
  min-width: 100px;
  min-height: 100px;
  padding: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.auth-card {
  @apply card shadow-xl block bg-base-300;

  --rounded-box: 0.25rem;
  --padding-card: 1rem;
}

.auth-card-body {
  @apply card-body justify-center items-center gap-0;
}

.auth-card-title {
  @apply card-title pt-4;
}

.auth-card-divider {
  @apply divider p-3 pl-8 pr-8 m-0;
}
</style>
