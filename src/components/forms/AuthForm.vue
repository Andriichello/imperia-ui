<template>
  <div class="auth-container">
    <div class="block">
      <LogoIcon />
    </div>

    <div class="auth-card">
      <div class="auth-card-body">
        <div class="auth-card-title">
          <h1>{{ title }}</h1>
        </div>
        <div class="auth-card-divider"></div>

        <div class="form-control w-full max-w-md">
          <slot name="inputs"></slot>
        </div>

        <router-link :to="to" class="link link-hover font-bold self-end mt-4 mb-4">{{ link }}</router-link>

        <div class="card-actions w-full">
          <button @click="onSubmit" class="btn btn-block btn-primary">{{ button }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LogoIcon from "../icons/LogoIcon.vue";

export default defineComponent({
  name: "AuthForm",
    components: {
    LogoIcon,
  },
  emits: ['on-submit'],
  props: {
    title: {
      type: String,
      default: "Welcome Back!",
    },
    button: {
      type: String,
      default: "Submit",
    },
    link: {
      type: String,
      default: "Have an account?",
    },
    to: {
      type: String,
      default: "/register",
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      this.$emit('on-submit', { });
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
