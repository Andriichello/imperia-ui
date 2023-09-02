<template>
  <div class="bill-options h-full">
    <div class="bill-options-card h-full">
      <div class="bill-options-card-body grow overflow-y-auto h-full">
        <span class="w-full font-semibold text-xl text-center">
          {{ $t('banquet.bill.sections') }}
        </span>

        <div class="flex flex-col justify-center items-start gap-1">
          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" checked="checked" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text pl-2">{{ $t('banquet.bill.restaurant_and_client_info') }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" checked="checked" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text pl-2">{{ $t('banquet.bill.comments') }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" checked="checked" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text pl-2">{{ $t('banquet.bill.tickets') }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" checked="checked" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text pl-2">{{ $t('banquet.bill.menus') }}</span>
            </label>
          </div>

          <div class="w-full flex flex-col justify-center items-start gap-1">
            <span class="w-full font-semibold text-xl text-center">
              {{ $t('banquet.bill.menus') }}
            </span>

            <template v-for="menu in menus" :key="menu?.id">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <input type="checkbox" checked="checked" class="checkbox checkbox-sm checkbox-primary" />
                  <span class="label-text pl-2">{{ menu?.title }}</span>
                </label>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center items-center gap-1 mt-2">
        <button class="btn btn-md grow"
                @click="onCancelClick">
          {{ $t('banquet.bill.cancel') }}
        </button>
        <button class="btn btn-md btn-primary grow"
                @click="onSelectClick">
          {{ $t('banquet.bill.print') }}
        </button>
      </div>
    </div>
  </div>    
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BillPicker",
  emits: ["on-select", "on-cancel"],
  props: {
    menus: {
      type: Array,
    },
  },
  data() {
    return {
      menusVal: this.menus,
    }
  },
  methods: {
    iconColor() {
      return 'currentColor';
    },
    onChangeState({ state }) {
      this.stateVal = state;
    },
    onCancelClick() {
      this.$emit('on-cancel');
    },
    onSelectClick() {
      this.$emit('on-select', {menus: this.menusVal});
    },
  },
});
</script>


<style scoped>
.bill-options {
  @apply w-full;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;

  flex-wrap: wrap;
}

.selected {
  background-color: var(--yellow);
}

.selected:hover {
  background-color: var(--yellow);
}

.bill-options-card {
  @apply card flex flex-col justify-start items-start;
}

.bill-options-card-body {
  @apply w-full card flex flex-col p-2 gap-3;
}

.label-text {
  @apply text-lg;
}
</style>