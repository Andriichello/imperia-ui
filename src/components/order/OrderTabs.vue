<template>
  <div class="switcher">
    <div class="btn btn-square btn-md btn-[yellow] btn-ghost rounded" :class="{'selected': selected === 'products'}" v-if="only.includes('products')"
         @click="onSwitch('products')">
      <BaseIcon title="products" :color="selected === 'products' ? 'text-black' : 'currentColor'" :width="32" :height="32" viewBox="0 0 64 64">
        <path d="M0,33.48c4-.48,5.13-3.12,6.07-6.71,2.53-9.65,9.06-15.7,18.54-18.53,1.73-.52,2.79-.88,2.9-3C27.68,2.7,30,3,31.74,2.94s3.87.14,3.82,2.68c0,1.77.84,2.11,2.28,2.48A25.85,25.85,0,0,1,52.67,18c.3.41.54.9.11,1.3s-.87,0-1.17-.33c-.78-.83-1.47-1.77-2.3-2.56C42.21,9.64,33.89,7.09,24.44,10c-9,2.71-14.7,8.89-17.15,18-.8,3-.75,3,2.12,4.6a5.37,5.37,0,0,1,.72.56c-.28.16-.54.46-.82.47-1.64.11-3.27.1-4.9.23-1.13.08-2.49.12-2.41,1.75C2.06,36.84,3.22,36.9,4.18,37s2,.08,3,.08q24.35,0,48.68,0a27.85,27.85,0,0,0,4.37-.4c.33,0,.73-.63.83-1a1.15,1.15,0,0,0-.9-1.49,30.57,30.57,0,0,0-4.38-.37q-18.43,0-36.87,0c-1.31,0-2.62-.06-3.92-.16-.28,0-.52-.35-.78-.54.27-.17.53-.47.81-.49,1.3-.09,2.61-.12,3.92-.12h32c1.15,0,2.3,0,3.44,0,1.52,0,2-.92,1.85-2.26A25.58,25.58,0,0,0,54.45,24,.74.74,0,0,1,55,22.92c.22,0,.62.25.76.5a21.17,21.17,0,0,1,2,6.53c.29,1.43.65,2.43,2.36,2.52,2,.1,2.87,1.43,2.7,3.34-.18,2.09-1.65,2.63-3.48,2.61-.82,0-1.64,0-2.46,0-2,0-3.15.51-4.64,2.41-5.38,6.85-12.5,10.94-21.62,10.51a72.64,72.64,0,0,0-8.34-.16c-2.52.17-2.7.65-2.81,3.7-.14,4.22-3.5,6.16-7,3.93C9.62,57,6.79,55,4,53,.51,50.53.8,46.55,4.91,45.42c3.33-.92,4.49-3.55,6.4-5.64.6-.66.11-1.23-.68-1.26-2-.08-3.94-.13-5.9-.07a9,9,0,0,1-4.69-1ZM36.59,44.39a11.47,11.47,0,0,1-1.54,0c-.63-.12-1.6-.11-1.79-.48-.29-.58.42-1.07,1-1.39a14.27,14.27,0,0,0,1.24-.77c.53-.4,1-.9.79-1.63a1.42,1.42,0,0,0-1.54-.89,6,6,0,0,0-1.94.18A17.93,17.93,0,0,1,20.36,39c-3.23-1.17-5.75.09-8,2.19-4.67,4.36-4.6,4.9.65,8.44.81.54,1.61,1.1,2.43,1.64a2,2,0,0,0,2.64.07c3.25-2.61,7-2.27,10.76-1.67a18,18,0,0,0,6.29-.07c5.14-1,9.67-3,13.21-6.86,1-1.07,3.55-1.83,2.24-3.57-.92-1.22-2.57.64-3.64,1.41A19.83,19.83,0,0,1,36.59,44.39Zm-18.88,11c-.22-.32-.4-.84-.77-1.09q-5.21-3.6-10.46-7.12c-1.4-.95-2,.17-2.67,1.09s-1.05,2,.24,2.89C7.4,53.41,10.75,55.7,14.11,58a1.58,1.58,0,0,0,2.2,0A4.34,4.34,0,0,0,17.71,55.36ZM45.61,39a1.41,1.41,0,0,0-.25-.29c-.66-.48-6.4-.35-6.69.29a4.65,4.65,0,0,0-.49,2.79c.25.95,1.36.63,2.12.38a12.08,12.08,0,0,0,4.81-2.35A3.52,3.52,0,0,0,45.61,39ZM31.69,4.32c-1.05.17-2.55-.09-2.56,1.46,0,1.09,1.13,1.4,2.19,1.41s2.53-.11,2.59-1.52C34,4.48,32.59,4.55,31.69,4.32Z" />
      </BaseIcon>
    </div>

    <div class="btn btn-square btn-md btn-[yellow] btn-ghost rounded" :class="{'selected': selected === 'spaces'}" v-if="only.includes('spaces')"
         @click="onSwitch('spaces')">
      <BaseIcon title="spaces" :color="selected === 'spaces' ? 'text-black' : 'currentColor'" :width="32" :height="32" viewBox="0 0 64 64">
        <path d="M64,19c-2.54,1.75-5,3.71-8,4.46-.48.11-1.05.35-1.3-.22-.38-.87.39-1,1-1.27,2-.84,4-1.47,5.59-3a1.47,1.47,0,0,0,.4-1.24c-.33-.7-.8,0-1.16.13-11.13,4.89-22.86,5.36-34.69,4.63-5-.32-10.13-.75-15-2.33-1.55-.5-3.09-1.08-4.65-1.56-.91-.28-2-1.86-2.65-.53C3,19,4.62,19.81,5.65,20.34A39.07,39.07,0,0,0,18.34,24a91.8,91.8,0,0,0,31.28-.59,3.14,3.14,0,0,1,1-.1c.31,0,.79.18.84.37a.9.9,0,0,1-.69,1.09,54.55,54.55,0,0,1-12.66,1.47c-2,0-2.91.88-2.88,3q.14,8.73,0,17.47a3.15,3.15,0,0,0,2.58,3.58,7.41,7.41,0,0,1,3.61,2.51c1.5,1.87,1.2,3.71-.8,5.08-3.61,2.47-12.35,2.48-16.09,0-2.2-1.44-2.47-3.48-.58-5.39a12.53,12.53,0,0,1,2.81-2c1.27-.69,2.76-.93,3.42-2.57.33-.84,1-.57,1.2.31a18,18,0,0,0,.26,2c.13.41.5.92,1.1.68a1.19,1.19,0,0,0,.62-.65,4.77,4.77,0,0,0,.2-1.46q0-10,0-20a2.15,2.15,0,0,0-.11-1c-.2-.38-.31-1-1-.85a1,1,0,0,0-.86,1c-.1,1.32-.11,2.66-.12,4,0,3.66,0,7.32,0,11,0,.43-.29,1.22-.48,1.23-.82.06-1.08-.65-1.09-1.33-.05-2.5-.05-5-.05-7.49,0-1.49,0-3,0-4.49,0-4.49,0-4.58-4.64-4.76A62,62,0,0,1,10.6,23.9a48.93,48.93,0,0,1-5.94-2.31c-5-2.15-4.75-10.56,0-12.51,1.81-.74,3.47-1.89,5.49-2,.29,0,.58.23.87.36-.16.26-.27.64-.51.75C8.73,9,6.85,9.67,5.17,10.67c-3.06,1.81-3.06,3.63-.09,5.53,3.4,2.17,7.29,3,11.15,3.66a95.18,95.18,0,0,0,36.11-.81,22.6,22.6,0,0,0,7.8-2.87c2.62-1.73,2.59-3.64-.06-5.36a21.6,21.6,0,0,0-6.81-2.76c-11-2.7-22.05-2.69-33.18-1.55-1.92.2-3.82,1-5.77.21,1.51-2,3.75-1.41,5.74-1.7A91.45,91.45,0,0,1,51.79,6.1C56.35,7,60.61,8.55,64,12ZM32.48,58.17a26.87,26.87,0,0,0,4.32-.56c1.47-.43,3.67-.51,3.62-2.62s-2.13-2.65-3.74-3.41a1.78,1.78,0,0,0-2.16.56C33.43,53.2,32,53.45,31,52.5c-2-1.91-3.55-.74-5.12.46-2,1.53-1.82,3,.41,4A14.93,14.93,0,0,0,32.48,58.17Z" />
      </BaseIcon>
    </div>

    <div class="btn btn-square btn-md btn-[yellow] btn-ghost rounded" :class="{'selected': selected === 'tickets'}" v-if="only.includes('tickets')"
         @click="onSwitch('tickets')">
      <BaseIcon title="tickets" :color="selected === 'tickets' ? 'text-black' : 'currentColor'" :width="32" :height="32" viewBox="0 0 64 64">
          <path d="M64,49.23a10.93,10.93,0,0,1-6.47,1.67c-2.78-.16-5.58.06-8.35-.07-1.76-.09-3.5-.52-5.43-.82a51.63,51.63,0,0,1-6.44.82c-10,.09-20,0-30,0-2.12,0-4.33.25-6-2.27V37.94c7.86-3.73,7.92-9,0-12.88V14.19C3.91,11.5,6.65,12,9.53,13.4l-6,.72C2.15,17.33,3,20.6,2.81,24c2.8,1.82,6.11,3.34,6,7.54-.11,3.84-2.6,5.77-5.74,7.13V48.4c3.67,1,33,1.24,38.63.31l1.94-4.42L45.4,49c2.58.1,5.15.22,7.72.27s5.23,0,7.46,0l3.42-3Z" />
          <path d="M64,43.32l-1.53-.54-.49-4c-3-1.64-6-3.39-5.79-7.58.16-3.86,3-5.52,5.83-7.07v-9.4c-3.41-1.19-10-1.4-16.52-.51l-2,4.39L41.75,14c-4.84-.56-9.73-.17-14.6-.26-4.66-.08-9.32-.07-14-.11l-.06-1a15.31,15.31,0,0,1,3-.5c9.12.31,18.3-.8,28.22.82,4.86-1.74,10.75-.72,16.58-.61,1,0,2,.91,3,1.39V25.6a20.11,20.11,0,0,0-3.55,1.33,5.27,5.27,0,0,0,0,9.15A21.39,21.39,0,0,0,64,37.42Z" />
          <path d="M36.13,31.8c-7,.58-14,.58-22.08.5C17.53,30.4,30.74,30.1,36.13,31.8Z" />
          <path d="M31.94,24a33.2,33.2,0,0,1-12.68.17A33.4,33.4,0,0,1,31.94,24Z" />
          <path d="M25,39.24H15.18v-.65H25Z" />
          <path d="M42.84,25.71l.34-3.7.89,0c0,1.14,0,2.27,0,3.41A6,6,0,0,1,42.84,25.71Z" />
          <path d="M44,36.72V40.9C42.67,39.68,42.35,38.48,44,36.72Z" />
          <path d="M36,39.23H29.56C32.32,37.76,34.17,38.41,36,39.23Z" />
          <path d="M43.2,33v-3.1l.8,0,.2,3.2Z" />
      </BaseIcon>
    </div>

    <div class="btn btn-square btn-md btn-[yellow] btn-ghost rounded" :class="{'selected': selected === 'services'}" v-if="only.includes('services')"
         @click="onSwitch('services')">
      <BaseIcon title="services" :color="selected === 'services' ? 'text-black' : 'currentColor'" :width="32" :height="32" viewBox="0 0 64 64">
          <path d="M27.57,0a13.09,13.09,0,0,1,.69,2.32c.38,3.17,2,5.08,5.22,5.58,1.22.2,2.21.6,2.42,2a2.1,2.1,0,0,1-2,1.84c-3.34.52-5.24,2.39-5.69,5.77a2.7,2.7,0,0,1-1.88,2.11c-2.56-1.18-1.74-4.17-3.4-5.84-1.31-2-4.15-1.4-6-3.07-.07-4.17,4.76-2,5.64-4.22,1.88-2,1.64-4.62,3.05-6.47ZM26.33,17.2c1-3.82,3-6,7.19-7.39-4.38-1.18-5.78-3.87-7.69-7.07C25.5,7,22.66,8.35,19.35,10.23,23.43,11.07,25.08,13.34,26.33,17.2Z" />
          <path d="M59,37,40,43.78c-2.81-1.4-4-4.3-6.84-5.59l-5.65,5.34A5.47,5.47,0,0,1,23,41.85c1.44-1.06,2.85.28,4.39-.28,1.34-1.29,3-2.58,4-4.78-5.2-2.15-10.4-4-16-5.7l-4.3,5c2.73,2.12,6.6,2.12,9.27,4.53C16,40.46,12.24,38.43,7.85,37c3.75-4.67,6.86-9.1,13.25-9.32,0,1.56-1.72,1.36-2.09,2.57,4.45,2.31,9.41,3.36,14.22,5.48L47.8,30.5c-.14-1.51-2.09-1.21-1.94-2.85C52.09,27.78,55.08,32.37,59,37ZM35,37c2,2.07,3.21,3.75,5.22,5,5.25-1.8,10.62-3.35,16.11-6-1.93-1.8-3.14-3.53-5.19-4.73A159.79,159.79,0,0,0,35,37Z" />
          <path d="M50.29,14.62c-1.85,2.16-1.45,4.45-3.36,5.16C44.6,19,45.42,16.44,44,15.41c-1.16-1.54-3.48-1.06-4.61-2.8.29-2.69,3.23-1.78,4.25-3.15,1.68-1.22,1-3.93,3.12-4.69,2.29.78,1.58,3.28,2.93,4.33,1.19,1.53,3.55,1,4.61,2.9C53.94,14.61,50.93,13.58,50.29,14.62Zm.64-2.31A17.93,17.93,0,0,1,46.7,8c-.89,2-2.45,3.11-4.18,4.41a10.57,10.57,0,0,1,4.32,4A14.05,14.05,0,0,1,50.93,12.31Z" />
          <path d="M15.05,42c1.45,4.05.38,8.29,1.1,12.78,5.39,2.71,11.41,4.17,16.87,6.37,3.77-.63,6.86-2.71,10.48-2.68-2.84,2.4-6.44,2.94-10,4.5L14.71,56.21A68.75,68.75,0,0,1,15.05,42Z" />
          <path d="M32.9,58.19v-17C34.58,44.72,34.77,53.58,32.9,58.19Z" />
          <path d="M25.89,30.13c-2.36-4.16-5.43-7.71-8.54-11.75C21.41,19.83,25.46,25.39,25.89,30.13Z" />
          <path d="M52,42.1V55.74c-1.38,1.53-3.38,1.5-5.89,2.87,1-3,3.45-2.51,4.82-4.89V42.13Z" />
          <path d="M36.75,27.46a23.52,23.52,0,0,1,1.52-11.81A25,25,0,0,1,36.75,27.46Z" />
          <path d="M30.3,18.71c1.42,2.92.77,5.93.5,8.92C29.35,24.74,29.33,24.38,30.3,18.71Z" />
          <path d="M46.38,22l-5.29,8.66C41,27.09,41.64,25.8,46.38,22Z" />
          <path d="M11.4,9.48c1.28,1.19,1.36,2.09,0,3.33A3,3,0,0,1,11.4,9.48Z" />
          <path d="M6.71,14.22c.92-.62,1.85-.3,3-.24C8.25,15.42,8.25,15.42,6.71,14.22Z" />
          <path d="M16.84,14.52c-1.54,1.07-2.53,1.18-3.46.17C14.26,13.26,15.33,13.85,16.84,14.52Z" />
          <path d="M11.17,16c1.59,1.36,1.26,2.34.64,3.89C10.55,18.49,10.91,17.37,11.17,16Z" />
      </BaseIcon>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  name: 'OrderTabs',
  components: {
    BaseIcon,
  },
  emits: ['switch-to-tab'],
  props: {
    selected: {
      type: String,
      default: 'products',
    },
    only: {
      type: Array,
      default: () => ['products', 'spaces'],
    }
  },
  methods: {
    onSwitch(to) {
      this.$emit('switch-to-tab', {from: this.selected, to});
    },
  },
})
</script>

<style scoped>
  .switcher {
    @apply flex flex-row justify-center items-center gap-6;

    flex-wrap: nowrap;

    flex: 0 1 auto;
    overflow-x: auto;

    margin-left: auto;
    margin-right: auto;
  }

  .selected {
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
