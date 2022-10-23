<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-xs sm:btn-sm md:btn-md lg:btn-lg m-1">Theme</label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
      <template v-for="theme in getThemes()" :key="theme">
        <li>
          <button :disabled="theme === getTheme()" @click="applyTheme(theme)">{{ theme }}</button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: 'ThemeSwitcher',
  methods: {
    ...mapGetters({
      getTheme: "theme/get",
      getThemes: "theme/list",
    }),
    ...mapActions({
      applyTheme: "theme/apply",
    }),
  },
})
</script>
