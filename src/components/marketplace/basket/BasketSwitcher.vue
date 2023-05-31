<template>
  <div class="switcher">
    <button class="btn btn-ghost w-14 h-14 p-2" :class="{'selected': showing, 'blurred': true}"
      @click="onSwitchBasket(!showing)">
      <BaseIcon title="cart" :color="iconColor()" :width="28" :height="28" viewBox="0 0 24 24">
        <path d="M1.25 9C1.25 6.37665 3.37665 4.25 6 4.25H18C20.6234 4.25 22.75 6.37665 22.75 9V15C22.75 17.6234 20.6234 19.75 18 19.75H6C3.37665 19.75 1.25 17.6234 1.25 15V9ZM2.83697 8.25H21.163C20.8245 6.81665 19.5368 5.75 18 5.75H6C4.46321 5.75 3.17555 6.81665 2.83697 8.25ZM21.25 9.75H2.75V15C2.75 16.7949 4.20507 18.25 6 18.25H18C19.7949 18.25 21.25 16.7949 21.25 15V9.75ZM13.25 15C13.25 14.5858 13.5858 14.25 14 14.25H18C18.4142 14.25 18.75 14.5858 18.75 15C18.75 15.4142 18.4142 15.75 18 15.75H14C13.5858 15.75 13.25 15.4142 13.25 15Z"/>
      </BaseIcon>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BaseIcon from "../../icons/BaseIcon.vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: 'BasketSwitcher',
  components: {
    BaseIcon,
  },
  emits: ['switch-basket'],
  computed: {
     ...mapGetters({
      showing: 'basket/showing',
    }),
  },
  methods: {
    ...mapActions({
      setShowing: 'basket/setShowing',
    }),
    iconColor() {
      return this.showing ? 'var(--d-black)' : 'var(--icon-color)';
    },
    onSwitchBasket(showing) {
      this.setShowing(showing);
      this.$emit('switch-basket', showing);
    }
  },
})
</script>

<style scoped>
  .switcher {
    @apply flex flex-row items-center;

    flex-wrap: nowrap;

    flex: 0 1 auto;
    overflow-x: auto;

    margin-left: auto;
    margin-right: auto;
  }

  .blurred {
    --tw-border-opacity: 0;
    background-color: hsl(var(--bc) / var(--tw-bg-opacity));
    --tw-bg-opacity: 0.1;
  }

  .selected {
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
