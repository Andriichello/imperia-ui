<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-card-body">
        <div class="avatar placeholder mb-2">
          <div class="bg-neutral-focus text-neutral-content rounded-full w-32">
            <BaseIcon title="avatar" width="52" height="52" viewBox="0 0 24 24" color="hsl(var(--nc) / var(--tw-text-opacity))">
              <mask id="mask0_60_12019" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="14" width="16" height="8">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 14.4961H19.8399V21.8701H4V14.4961Z"/>
              </mask>
              <g mask="url(#mask0_60_12019)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.921 15.9961C7.66 15.9961 5.5 16.7281 5.5 18.1731C5.5 19.6311 7.66 20.3701 11.921 20.3701C16.181 20.3701 18.34 19.6381 18.34 18.1931C18.34 16.7351 16.181 15.9961 11.921 15.9961ZM11.921 21.8701C9.962 21.8701 4 21.8701 4 18.1731C4 14.8771 8.521 14.4961 11.921 14.4961C13.88 14.4961 19.84 14.4961 19.84 18.1931C19.84 21.4891 15.32 21.8701 11.921 21.8701Z"/>
              </g>
              <mask id="mask1_60_12019" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="2" width="12" height="11">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.60986 2H17.2299V12.6186H6.60986V2Z"/>
              </mask>
              <g mask="url(#mask1_60_12019)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9209 3.42751C9.77989 3.42751 8.03789 5.16851 8.03789 7.30951C8.03089 9.44351 9.75989 11.1835 11.8919 11.1915L11.9209 11.9055V11.1915C14.0609 11.1915 15.8019 9.44951 15.8019 7.30951C15.8019 5.16851 14.0609 3.42751 11.9209 3.42751ZM11.9209 12.6185H11.8889C8.9669 12.6095 6.59989 10.2265 6.60989 7.30651C6.60989 4.38151 8.99189 1.99951 11.9209 1.99951C14.8489 1.99951 17.2299 4.38151 17.2299 7.30951C17.2299 10.2375 14.8489 12.6185 11.9209 12.6185Z"/>
              </g>        
            </BaseIcon>
          </div>
        </div> 

        <div class="form-control w-full max-w-md">
           <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input v-model="name" type="text" disabled placeholder="Name..." class="input input-bordered w-full max-w-md" />
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="email" type="text" disabled placeholder="Email..." class="input input-bordered w-full max-w-md" />
          </div>
        </div>

        <div class="w-full max-w-md gap-1 mt-2">
           <div v-if="getCreatedAt()" class="flex w-full max-w-md pt-1 pb-1 pl-2 pr-2">
            <span class="label-text">Created at:</span>
            <span class="font-semibold flex-grow text-end">{{ getCreatedAt() }}</span>
          </div>
           <div class="flex w-full max-w-md pt-1 pb-1 pl-2 pr-2">
            <span class="label-text">Verified at:</span>
            <span class="font-semibold flex-grow text-end">{{ getVerifiedAt() }}</span>
          </div>
        </div>

        <div class="card-actions w-full justify-end pt-4">
          <button @click="onUpdate" class="btn btn-group btn-primary flex-grow" v-show="nameChanged() || emailChanged()">Update</button>

          <button @click="onLogout" class="btn btn-group btn-error gap-1" :class="{ 'loading': loggingOut }">
            <BaseIcon title="logout" width="24" height="24" viewBox="0 0 24 24" color="var(--error-btn-text)" v-show="!loggingOut"> 
              <path d="M11.331 2.02148C13.7102 2.02148 15.6521 3.89542 15.7611 6.24772L15.766 6.45648V7.38948C15.766 7.8037 15.4302 8.13948 15.016 8.13948C14.6363 8.13948 14.3225 7.85733 14.2728 7.49125L14.266 7.38948V6.45648C14.266 4.89358 13.044 3.61575 11.5034 3.52647L11.331 3.52148H6.45597C4.89392 3.52148 3.61623 4.74362 3.52696 6.28406L3.52197 6.45648V17.5865C3.52197 19.1493 4.74388 20.4272 6.28363 20.5165L6.45597 20.5215H11.341C12.8983 20.5215 14.172 19.3039 14.261 17.7693L14.266 17.5975V16.6545C14.266 16.2403 14.6018 15.9045 15.016 15.9045C15.3957 15.9045 15.7095 16.1866 15.7591 16.5527L15.766 16.6545V17.5975C15.766 19.9687 13.8992 21.9046 11.5553 22.0164L11.341 22.0215H6.45597C4.07753 22.0215 2.13581 20.1474 2.0268 17.7952L2.02197 17.5865V6.45648C2.02197 4.07743 3.89573 2.13535 6.24728 2.02631L6.45597 2.02148H11.331ZM19.326 8.50234L19.4103 8.57478L22.3383 11.4898C22.3647 11.5159 22.3878 11.5426 22.409 11.5707L22.3383 11.4898C22.3689 11.5202 22.3963 11.5526 22.4205 11.5865C22.4376 11.6103 22.4533 11.6354 22.4676 11.6614C22.4702 11.6665 22.4728 11.6715 22.4754 11.6764C22.4881 11.7004 22.4993 11.7253 22.5092 11.7508C22.5132 11.762 22.5173 11.7733 22.5211 11.7847C22.5284 11.8058 22.5345 11.8274 22.5397 11.8494C22.5421 11.8612 22.5445 11.8729 22.5467 11.8846C22.5508 11.905 22.5538 11.9261 22.5559 11.9474C22.557 11.9623 22.558 11.977 22.5586 11.9917C22.5593 12.0016 22.5595 12.0115 22.5595 12.0214L22.5586 12.0497C22.5581 12.0651 22.557 12.0805 22.5555 12.0958L22.5595 12.0214C22.5595 12.0682 22.5552 12.1141 22.547 12.1585C22.5445 12.1696 22.5421 12.1814 22.5394 12.193C22.5343 12.2162 22.5279 12.2387 22.5205 12.2607C22.5167 12.2709 22.513 12.2813 22.509 12.2915C22.4997 12.3164 22.4889 12.3405 22.4769 12.3639C22.4739 12.3692 22.4708 12.3751 22.4675 12.381C22.4331 12.4443 22.39 12.5015 22.3398 12.5517L22.3384 12.5527L19.4104 15.4687C19.1169 15.761 18.642 15.76 18.3498 15.4665C18.084 15.1997 18.0607 14.783 18.2791 14.4898L18.3519 14.4059L19.991 12.7705L9.76847 12.7714C9.35426 12.7714 9.01847 12.4356 9.01847 12.0214C9.01847 11.6417 9.30063 11.3279 9.6667 11.2782L9.76847 11.2714L19.993 11.2705L18.352 9.63779C18.0852 9.37212 18.06 8.95551 18.2772 8.66142L18.3497 8.57714C18.6153 8.31028 19.0319 8.28514 19.326 8.50234Z"/>
            </BaseIcon>
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormatted } from "@/helpers";
import { defineComponent } from "vue";
import BaseIcon from "../icons/BaseIcon.vue";

export default defineComponent({
  name: "ProfileForm",
  components: {
    BaseIcon,
  },
  props: {
    user: null,
    loggingOut: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['on-update', 'on-logout'],
  data() {
    return {
      name: null,
      email: null,
    };
  },
  mounted() {
    if (this.user) {
      this.name = this.getName();
      this.email = this.getEmail();
    }
  },
  methods: {
    getName() {
      return this.user?.name;
    },
    getEmail() {
      return this.user?.email;
    },
    getCreatedAt() {
      return this.user?.createdAt;
    },
    getVerifiedAt() {
      return dateFormatted(this.user?.emailVerifiedAt) ?? 'Not verified';
    },
    nameChanged() {
      return this.name !== this.getName();
    },
    emailChanged() {
      return this.email !== this.getEmail();
    },
    onLogout() {
      this.$emit('on-logout');
    },
    onUpdate() {
      if (this.user) {
        this.name = this.getName();
        this.email = this.getEmail();
      }
    }
  }
});
</script>

<style scoped>
.profile-container {
  min-width: 100px;
  min-height: 100px;
  padding: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.profile-card {
  @apply card shadow-xl block bg-base-300;

  --rounded-box: 0.25rem;
  --padding-card: 1rem;
}

.profile-card-body {
  @apply card-body justify-center items-center gap-0;
}

.profile-card-title {
  @apply card-title pt-4;
}

.profile-card-divider {
  @apply divider p-3 pl-8 pr-8 m-0;
}
</style>
