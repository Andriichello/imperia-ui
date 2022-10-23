<template>
  <nav>
    <div class="nav-block">
      <NavBarIcon @item-click="onItemClick" page="home" path="/home">
        <img src="../../assets/home.svg">
      </NavBarIcon>

      <NavBarIcon @item-click="onItemClick" page="marketplace" path="/marketplace">
        <img src="../../assets/marketplace.svg">
      </NavBarIcon>

      <NavBarIcon @item-click="onItemClick" page="history" path="/history">
        <img src="../../assets/history.svg">
      </NavBarIcon>
    </div>

    <div class="nav-block">
      <NavBarIcon @item-click="onItemClick" page="profile" path="/profile">
        <img src="../../assets/person.svg">
      </NavBarIcon>

      <ThemeSwitcher />
    </div>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import NavBarIcon from "./NavBarIcon.vue";
import ThemeSwitcher from "../theme/ThemeSwitcher.vue";

export default defineComponent({
  name: "NavBar",
  components: {
    NavBarIcon,
    ThemeSwitcher,
  },
  methods: {
    ...mapGetters({
      getPage: "nav/get",
    }),
    ...mapActions({
      setPage: "nav/set",
    }),
    isSelected(page) {
      return page === this.getPage();
    },
    onItemClick({ page }) {
      if (this.isSelected(page)) {
        return;
      }

      this.setPage(page);
    }
  },
});
</script>


<style scoped>
nav {
  @apply fixed top-0 left-0 h-screen w-20 p-3 flex flex-col items-center justify-between gap-3 bg-gray-900;
  background-color: var(--l-black);
}

.nav-block {
  @apply flex flex-col items-center gap-3;
}
</style>