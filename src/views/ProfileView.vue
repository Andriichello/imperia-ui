<template>
  <div class="profile">
    <ProfileForm @on-logout="onLogout" :user="user" :loggingOut="loggingOut"/> 
  </div>
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
.profile {
  min-width: 100px;
  min-height: 100px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
  flex-shrink: 1;
}
</style>