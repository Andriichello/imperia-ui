<template>
  <div class="waiter">
    <div class="w-full flex flex-row justify-start items-center gap-2">
      <div class="avatar p-2">
        <div class="w-16 mask mask-squircle">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>

      <div class="w-full flex flex-col justify-center items-start">
        <span class="text-lg font-semibold">
          {{ fullName }}
        </span>

        <p class="text-lg font-light" v-if="about?.length">
          {{ about }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {mapActions, mapGetters} from "vuex";
import {ThemeConfig} from "@/configs";

export default defineComponent({
  // eslint-disable-next-line
  name: 'Waiter',
  components: {
  },
  props: {
    waiter: {
      type: Object,
      default: null
    },
  },
  computed: {
    ThemeConfig() {
      return ThemeConfig
    },
    ...mapGetters({
      theme: 'theme/get',
    }),
    name() {
      return this.waiter?.name;
    },
    surname() {
      return this.waiter?.surname;
    },
    fullName() {
      return this.name + ' ' + this.surname;
    },
    about() {
      return this.waiter?.about;
    },
  },
})
</script>

<style scoped>
  .waiter {
    @apply flex flex-col justify-start items-start card w-full bg-base-100 shadow-md btn-ghost gap-1;
  }

  .selected {
    border: 4px solid currentColor;
  }

  .selected:hover {
    border: 4px solid currentColor;
  }

  .disabled-clicks {
    pointer-events: none;
  }
</style>
