<template>
 <div class="auth-container">
<!--    <div class="block">-->
<!--      <LogoIcon />-->
<!--    </div>-->

    <div class="auth-card">
      <div class="auth-card-body">
        <div class="auth-card-title">
          <h1>First time here?</h1>
        </div>
        
        <div class="auth-card-divider"></div>

        <label class="label flex-grow justify-center" v-if="!hasErrors && message">
          <span class="label-text-alt text-error text-sm">
            {{ message }}
          </span>
        </label>

        <form @submit.prevent="onRegister" class="form-control w-full max-w-md">
          <div class="form-control w-full max-w-md">
            <label class="label flex-col items-start">
              <span class="label-text">Name</span>
            </label>
            <input v-model="name" name="name" type="text" required placeholder="Name..." class="input input-bordered w-full max-w-md" />
            <label class="label flex-col items-start" v-if="nameErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in nameErrors" :key="error">
                {{ error }}
              </span>
            </label>
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label flex-col items-start">
              <span class="label-text">Surname</span>
            </label>
            <input v-model="surname" name="surname" type="text" required placeholder="Surname..." class="input input-bordered w-full max-w-md" />
            <label class="label flex-col items-start" v-if="surnameErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in surnameErrors" :key="error">
                {{ error }}
              </span>
            </label>
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label flex-col items-start">
              <span class="label-text">Email</span>
            </label>
            <input v-model="email" name="email" type="email" required placeholder="Email..." class="input input-bordered w-full max-w-md" />
            <label class="label flex-col items-start" v-if="emailErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in emailErrors" :key="error">
                {{ error }}
              </span>
            </label>
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label flex-col items-start">
              <span class="label-text">Password</span>
            </label>
            <input v-model="password" name="password" type="password" required placeholder="Password..." class="input input-bordered w-full max-w-md" />
            <label class="label flex-col items-start" v-if="passwordErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in passwordErrors" :key="error">
                {{ error }}
              </span>
            </label>
          </div>

            <div class="form-control w-full max-w-md">
            <label class="label flex-col items-start">
              <span class="label-text">Password Confirmation</span>
            </label>
            <input v-model="passwordConfirmation" name="passwordConfirmation" type="password" required placeholder="Password Confirmation..." class="input input-bordered w-full max-w-md" />
            <label class="label flex-col items-start" v-if="passwordConfirmationErrors">
              <span class="label-text-alt text-error text-sm" v-for="error in passwordConfirmationErrors" :key="error">
                {{ error }}
              </span>
            </label>
          </div>
        
          <router-link to="/login" class="link link-hover font-bold self-end mt-4 mb-4">Already have an account?</router-link>

          <div class="card-actions w-full">
            <button type="submit" class="btn btn-block btn-primary" :class="{ 'loading': registering }">Register</button>
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
  emits: ["on-register"],
  props: {
    errors: null,
    registering: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      phone: null,
      password: null,
      passwordConfirmation: null,
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
    nameErrors() {
      return this.getErrorsForAttribute('name');
    },
    surnameErrors() {
      return this.getErrorsForAttribute('surname');
    },
    emailErrors() {
      return this.getErrorsForAttribute('email');
    },
    passwordErrors() {
      return this.getErrorsForAttribute('password');
    },
    passwordConfirmationErrors() {
      return this.getErrorsForAttribute('password_confirmation');
    },
  },
  methods: {
    getErrorsForAttribute(attribute) {
      return this.hasErrors ? this.errors.about(attribute) : null;
    },
    onRegister() {
      this.$emit("on-register", this.$data);
    }
  }
});
</script>


<style scoped>
.auth-container {
  @apply w-full h-full;

  padding: 12px;
  padding-bottom: 80px;

  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.auth-card {
  @apply card shadow-xl block bg-base-300;
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
