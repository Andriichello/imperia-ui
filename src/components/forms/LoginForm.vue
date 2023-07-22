<template>
 <div class="auth-container">
    <div class="auth-card">
      <div class="auth-card-body">
        <div class="auth-card-title">
          <h1>{{ $t('login.title') }}</h1>
        </div>

        <div class="auth-card-divider"></div>

        <label class="label flex-grow justify-center" v-if="!hasErrors && message">
          <span class="label-text-alt text-error text-sm">
            {{ message }}
          </span>
        </label>

        <form @submit.prevent="onLogin" class="form-control w-full max-w-md">
          <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">{{ $t('login.email') }}</span>
            </label>
            <input v-model="email" name="email" type="email" required placeholder="Email..." class="input input-bordered w-full max-w-xs" :class="{ 'input-error' : emailErrors !== null }"/>
            <label class="label flex-col items-start" v-if="emailErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in emailErrors" :key="error">
                {{ error }}
              </span>
            </label>
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label flex-col items-start">
              <span class="label-text">{{ $t('login.password') }}</span>
            </label>
            <input v-model="password" name="password" type="password" required placeholder="Password..." class="input input-bordered w-full max-w-xs" />
            <label class="label flex-col items-start" v-if="passwordErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in passwordErrors" :key="error">
                {{ error }}
              </span>
            </label>
          </div>
        
          <router-link to="/register" class="link link-hover font-bold self-end mt-4 mb-4">{{ $t('login.register_link') }}</router-link>

          <div class="card-actions w-full">
            <button type="submit" class="btn btn-block btn-primary" :class="{ 'loading': loggingIn }">{{ $t('login.login_button') }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginForm",
  emits: ["on-login"],
  props: {
    errors: null,
    loggingIn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    hasMessage() {
      return this.errors && this.errors.hasMessage()
    },
    message() {
      return this.hasMessage ? this.errors.message : null;
    },
    hasErrors() {
      return this.errors && this.errors.hasErrors()
    },
    emailErrors() {
      return this.getErrorsForAttribute('email');
    },
    passwordErrors() {
      return this.getErrorsForAttribute('password');
    },
  },
  methods: {
    getErrorsForAttribute(attribute) {
      return this.hasErrors ? this.errors.about(attribute) : null;
    },
    onLogin() {
      this.$emit("on-login", this.$data);
    }
  }
});
</script>

<style scoped>
.auth-container {
  @apply w-full h-full;

  padding: 12px;
  padding-bottom: 80px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.auth-card {
  @apply card shadow-xl block bg-base-100;
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