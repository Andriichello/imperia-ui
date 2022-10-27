<template>
  <ProfileForm @on-logout="onLogout" :user="user" :loggingOut="loggingOut"/> 
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import ProfileForm from "../components/forms/ProfileForm.vue";

export default defineComponent({
  name: "ProfileView",
  components: {
    ProfileForm
  },
  data() {
    return {
      loggingOut: false,
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      logout: 'auth/logout',
    }),
  },
  methods: {
    ...mapActions({
      apiLogout: 'auth/logout',
    }),
    onLogout() {
      this.loggingOut = true;
      this.apiLogout();
    }
  },
  watch: {
    logout: {
      handler() {
        this.loggingOut = false;
      }
    }
  }
});
</script>

<style scoped>
.base-div {
  @apply rounded-box bg-base-300;
  min-width: 100px;
  min-height: 100px;
  padding: 12px;
  
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
