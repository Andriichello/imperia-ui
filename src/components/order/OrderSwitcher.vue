<template>
  <div class="switcher">
    <div class="w-full flex justify-start items-center p-3 rounded selected gap-2 cursor-pointer"
            @click="onSwitchOrder(!showing)">
      <div class="w-full flex justify-start items-center gap-2">
        <BaseIcon title="cart" color="text-black" :width="28" :height="28" viewBox="0 0 24 24">
          <path d="M1.25 9C1.25 6.37665 3.37665 4.25 6 4.25H18C20.6234 4.25 22.75 6.37665 22.75 9V15C22.75 17.6234 20.6234 19.75 18 19.75H6C3.37665 19.75 1.25 17.6234 1.25 15V9ZM2.83697 8.25H21.163C20.8245 6.81665 19.5368 5.75 18 5.75H6C4.46321 5.75 3.17555 6.81665 2.83697 8.25ZM21.25 9.75H2.75V15C2.75 16.7949 4.20507 18.25 6 18.25H18C19.7949 18.25 21.25 16.7949 21.25 15V9.75ZM13.25 15C13.25 14.5858 13.5858 14.25 14 14.25H18C18.4142 14.25 18.75 14.5858 18.75 15C18.75 15.4142 18.4142 15.75 18 15.75H14C13.5858 15.75 13.25 15.4142 13.25 15Z"/>
        </BaseIcon>

        <span class="text-black" v-if="productsCount">
          {{ productsCount }} {{ productsCount === 1 ? $t('preview.order.item_singular') : productsCount > 1 && productsCount < 5 ? $t('preview.order.item_plural2') : $t('preview.order.item_plural5') }} {{ $t('preview.order.for') }} {{ priceFormatted(total) }}
        </span>
      </div>

      <div v-if="productsCount">
        <BaseIcon title="cart" color="text-black" :width="24" :height="24" viewBox="0 0 24 24" style="transform: rotate(-90deg);">
          <path d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
        </BaseIcon>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from "vuex";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {priceFormatted} from "@/helpers";

export default defineComponent({
  name: 'OrderSwitcher',
  components: {
    BaseIcon,
  },
  emits: ['switch-to-order'],
  computed: {
     ...mapGetters({
      showing: 'order/showing',
      total: 'order/total',
      productsCount: 'order/productsCount',
    }),
  },
  methods: {
    priceFormatted,
    ...mapActions({
      setShowing: 'order/setShowing',
    }),
    iconColor() {
      return 'text-base-100';
    },
    onSwitchOrder(showing) {
      this.setShowing(showing);
      this.$emit('switch-to-order', showing);
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
    --tw-bg-opacity: 0.35;
  }

  .selected {
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
