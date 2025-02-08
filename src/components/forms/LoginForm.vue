<template>
 <div class="w-full h-full p-5 flex justify-center items-center">
    <div class="card shadow-xl bg-base-100 flex flex-col justify-center items-center max-w-md ">
      <div class="card-body justify-center items-center gap-0">
        <div class="card-title pt-4">
          <h1>{{ $t('login.title') }}</h1>
        </div>

        <div class="divider p-3 pl-8 pr-8 m-0"/>

        <label class="label flex-grow justify-center"
               v-if="hasErrors &&  message && !emailErrors?.length && !passwordErrors?.length">
          <span class="label-text-alt text-error text-sm">
            {{ $t('error.' + message) }}
          </span>
        </label>

        <form @submit.prevent="onLogin" class="flex flex-col w-full">
          <div class="flex flex-col w-full">
            <label class="label">
              <span class="label-text">{{ $t('login.email') }}</span>
            </label>
            <input autofocus v-model="email" name="email" type="email" required placeholder="Email..." class="input input-bordered w-full max-w-xs" :class="{ 'input-error' : emailErrors !== null }"/>
            <label class="label flex-col items-start" v-if="emailErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in emailErrors" :key="error">
                {{ error }}
              </span>
            </label>
          </div>

          <div class="flex flex-col w-full">
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
        
          <div class="card-actions w-full mt-8">
            <button type="submit" class="btn btn-block btn-primary">
              {{ $t('login.login_button') }}
              <span class="loading loading-spinner" v-if="loggingIn"></span>
            </button>
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
</style>