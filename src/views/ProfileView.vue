<template>
  <ProfileForm @on-logout="onLogout"/> 
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import ProfileForm from "../components/forms/ProfileForm.vue";

export default defineComponent({
  name: "ProfileView",
  components: {
    ProfileForm
  },
  methods: {
    ...mapActions({
      apiLogout: 'auth/logout',
    }),
    onLogout() {
      this.apiLogout();
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
