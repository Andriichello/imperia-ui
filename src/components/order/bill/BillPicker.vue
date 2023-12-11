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
              <input type="checkbox" v-model="showInfoVal" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text pl-2">{{ $t('banquet.bill.restaurant_and_client_info') }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" v-model="showCommentsVal" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text pl-2">{{ $t('banquet.bill.comments') }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" v-model="showTicketsVal" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text pl-2">{{ $t('banquet.bill.tickets') }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" v-model="showSpacesVal" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text pl-2">{{ $t('banquet.bill.spaces') }}</span>
            </label>
          </div>


          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" v-model="showServicesVal" class="checkbox checkbox-sm checkbox-primary" />
              <span class="label-text pl-2">{{ $t('banquet.bill.services') }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <input type="checkbox" v-model="showMenusVal" class="checkbox checkbox-sm checkbox-primary" />
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
                  <input :id="menu?.id" type="checkbox" :checked="!this.excludedMenus.includes(menu?.id)" class="checkbox checkbox-sm checkbox-primary" @change="onToggleMenu" />
                  <span class="label-text pl-2">{{ menu?.title }}</span>
                </label>
              </div>
            </template>
          </div>

          <div class="w-full flex flex-col justify-center items-start gap-1">
            <span class="w-full font-semibold text-xl text-center">
              {{ $t('banquet.bill.tags') }}
            </span>

            <template v-for="tag in tags" :key="tag?.id">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <input :id="tag?.id" type="checkbox" :checked="this.includedTags.includes(tag?.id)" class="checkbox checkbox-sm checkbox-primary" @change="onToggleTag" />
                  <span class="label-text pl-2">
                    {{ tag?.title }}<br/>
                    <p class="font-light text-sm">{{ tag?.description }}</p>
                  </span>

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
    showInfo: {
      type: Boolean,
      default: true,
    },
    showComments: {
      type: Boolean,
      default: true,
    },
    showTickets: {
      type: Boolean,
      default: true,
    },
    showServices: {
      type: Boolean,
      default: true,
    },
    showSpaces: {
      type: Boolean,
      default: true,
    },
    showMenus: {
      type: Boolean,
      default: true,
    },
    menus: {
      type: Array,
    },
    tags: {
      type: Array,
    },
  },
  data() {
    return {
      excludedMenus: [],
      includedTags: [],
      showInfoVal: this.showInfo,
      showCommentsVal: this.showComments,
      showTicketsVal: this.showTickets,
      showSpacesVal: this.showSpaces,
      showServicesVal: this.showServices,
      showMenusVal: this.showMenus,
    }
  },
  methods: {
    iconColor() {
      return 'currentColor';
    },
    onToggleMenu(event) {
      const id = parseInt(event.target.id);
      const checked = event.target.checked;

      const filtered = this.excludedMenus
          .filter((mId) => mId !== id);

      if (checked) {
        this.excludedMenus = filtered;
      } else {
        this.excludedMenus = [...filtered, id];
      }
    },
    onToggleTag(event) {
      const id = parseInt(event.target.id);
      const checked = event.target.checked;

      const filtered = this.includedTags
          .filter((tId) => tId !== id);

      if (checked) {
        this.includedTags = [...filtered, id];
      } else {
        this.includedTags = filtered;
      }
    },
    onCancelClick() {
      this.$emit('on-cancel');
    },
    onSelectClick() {
      const sections = [];
      let allSections = this.showInfoVal
          && this.showCommentsVal
          && this.showTicketsVal
          && this.showSpacesVal
          && this.showServicesVal
          && this.showMenusVal;

      if (this.showInfoVal) {
        sections.push('info');
      }
      if (this.showCommentsVal) {
        sections.push('comments');
      }

      if (this.showTicketsVal) {
        sections.push('tickets');
      }
      if (this.showSpacesVal) {
        sections.push('spaces');
      }
      if (this.showServicesVal) {
        sections.push('services');
      }


      if (this.showMenusVal) {
        sections.push('menus');
      }

      const menus = this.menus
          .filter(m => !this.excludedMenus.includes(m?.id))
          .map(m => m?.id);
      let allMenus = !this.excludedMenus.length;

      const tags = this.tags
          .filter(m => this.includedTags.includes(m?.id))
          .map(m => m?.id);
      let allTags = !this.includedTags.length;

      this.$emit('on-select', {
        tags: allTags ? null : tags,
        menus: allMenus ? null : menus,
        sections: allSections ? null : sections,
      });
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