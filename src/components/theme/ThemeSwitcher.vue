<template>
  <div class="dropdown dropdown-right dropdown-end">
    <label tabindex="0" class="btn btn-ghost w-14 h-14">
      <BaseIcon title="theme" color="transparent" width="32" height="32" viewBox="0 0 24 24" :style="{stroke: color}">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
      </BaseIcon>
    </label>
    <ul tabindex="0" class="dropdown-content menu ml-6 gap-1 pt-1 pb-1 text-center">
      <li v-for="theme in getThemes()" :key="theme" class="justify-center items-center">
        <button :disabled="theme === this.getTheme()" @click="applyTheme(theme)" class="rounded-box">{{ theme }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import BaseIcon from "../icons/BaseIcon.vue";

export default defineComponent({
  name: "ThemeSwitcher",
  components: {
    BaseIcon,
  },
  props: {
    color: {
      type: String,
      default: 'var(--icon-color)',
    }
  },
  methods: {
    ...mapGetters({
      getTheme: "theme/get",
      getThemes: "theme/list",
    }),
    ...mapActions({
      applyTheme: "theme/apply",
    }),
  },
});
</script>