<template>
  <div class="w-full flex flex-col justify-center items-start gap-4 h-full">

    <div class="w-full flex flex-col justify-center items-center">
      <div class="join max-w-md">
        <div class="min-w-[52px] max-w-[52px]">
          <input class="w-full input input-md input-bordered text-xl text-center join-item focus:outline-0"
                 :class="{ 'input-error' : errors?.amount }"
                 type="text" readonly
                 value="₴"/>
        </div>

        <div class="w-full">
          <input class="w-full input input-md input-bordered text-xl join-item"
                 :class="{ 'input-error' : errors?.amount }"
                 id="tip-amount"
                 type="number"
                 placeholder="Сума..."
                 v-model="amountVal"/>
        </div>
      </div>

      <label class="label flex-col items-start" v-if="errors?.amount">
            <span class="label-text-alt text-error text-sm" v-for="error in errors?.amount" :key="error">
              {{ error }}
            </span>
      </label>
    </div>

    <div class="w-full max-w-md flex flex-wrap justify-center items-center gap-2 self-center">
      <template v-for="increment in increments" :key="increment">
        <div class="flex btn btn-md btn-outline min-w-[90px]" @click="addToAmount(increment)">
          <h3 class="text-lg font-semibold text-center">+{{ priceFormatted(increment) }}</h3>
        </div>
      </template>
    </div>

<!--    <div class="w-full flex items-center justify-center">-->
<!--       <textarea v-model="note" name="description" class="w-full max-w-md textarea textarea-bordered bg-transparent" placeholder="Note..."/>-->
<!--    </div>-->

    <div class="w-full flex items-center justify-center">
      <div class="w-full flex justify-between btn btn-neutral max-w-md normal-case" @click="onLeaveTip">
        <BaseIcon width="24" height="24" viewBox="0 0 24 24" color="transparent"  :style="{stroke: 'currentColor'}" style="transform: rotate(180deg); visibility: hidden">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>

        <span class="text-lg">
          {{ $t('preview.tip.leave_tip') }}
        </span>

        <BaseIcon width="24" height="24" viewBox="0 0 24 24" color="transparent"  :style="{stroke: 'currentColor'}" style="transform: rotate(180deg);">
          <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </BaseIcon>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {priceFormatted} from "@/helpers";

export default defineComponent({
  // eslint-disable-next-line
  name: "Tip",
  components: {BaseIcon},
  props: {
    target: String,
    waiter: Number,
    increments: {
      type: Array,
      default: () => [10, 20, 50, 100, 200],
    },
  },
  data() {
    return {
      note: "",
      amount: 0,
      errors: null
    }
  },
  computed: {
    amountVal: {
      get() {
        return +this.amount;
      },
      set(val) {
        this.amount = +val;

        if (this.errors !== null) {
          this.validate();
        }

        const input = document.getElementById('tip-amount');
        if (input) {
          input.value = this.amount;
        }
      },
    }
  },
  methods: {
    priceFormatted,
    addToAmount(increment) {
      this.amountVal += increment;
    },
    validate() {
      this.errors = null;

      if (this.amount < 10) {
        this.errors = {
          amount: [this.$t('preview.tip.errors.amount.min', {amount: priceFormatted(10)})]
        }
      }

      return this.errors === null;
    },
    onLeaveTip() {
      if (!this.validate()) {
        return;
      }

      // todo: add logic for leaving a tip
    },
  }
});
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
