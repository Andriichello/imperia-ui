<template>
  <div class="flex flex-nowrap justify-center items-center gap-2 min-h-[28px]">
    <div class="btn btn-sm btn-square btn-outline" v-if="amountVal > 0"
         @click="onChange(amountVal < 2 ? null : amountVal - 1)">
      <span class="font-bold text-lg">
        -
      </span>
    </div>

    <div class="flex justify-center items-center min-w-[20px]" v-if="amountVal > 0">
       <span class="text-md font-semibold">
        {{ amountVal }}
      </span>
    </div>

    <div class="btn btn-sm btn-square btn-outline normal-case gap-1" v-if="amountVal === null"
         @click="onChange(1)">
      <span class="font-bold text-md">
        <span class="font-bold text-lg">
          +
        </span>
      </span>
    </div>

    <div class="btn btn-sm btn-square btn-outline" v-else
         @click="onChange(amountVal + 1)">
      <span class="font-bold text-lg">
        +
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Counter",
  emits: ["on-change"],
  props: {
    amount: {
      type: Number,
      default: null
    },
  },
  data() {
    return {
      amountVal: this.amount,
    };
  },
  computed: {

  },
  methods: {
    onChange(amount) {
      this.amountVal = amount;
      this.$emit('on-change', { amount });
    },
  },
});
</script>

<style scoped>

img {
  pointer-events: none
}

.btn-selected {
  @apply btn-outline border-base-content bg-base-content text-base-100;
}
</style>
