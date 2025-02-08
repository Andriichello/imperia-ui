<template>
  <div class="container">

    <div class="flex flex-row justify-start w-full min-h-[80px] gap-2">
      <div class="details flex flex-col justify-start items-start gap-1 grow">
        <span class="font-semibold text-xl">{{ title }}</span>

        <div class="w-full flex flex-col justify-start items-start gap-1 mt-1 ml-1">

          <div class="w-full flex flex-row justify-start items-center gap-1" v-if="address?.length">
            <div class="flex justify-center items-center rounded">
              <BaseIcon width="16" height="16" title="address" view-box="0 0 24 24">
                <g id="Iconly/Light-Outline/Location">
                  <g id="Location">
                    <path id="Fill 1" fill-rule="evenodd" clip-rule="evenodd" d="M12.2505 8.5C11.2855 8.5 10.5005 9.285 10.5005 10.251C10.5005 11.216 11.2855 12 12.2505 12C13.2155 12 14.0005 11.216 14.0005 10.251C14.0005 9.285 13.2155 8.5 12.2505 8.5ZM12.2505 13.5C10.4585 13.5 9.00049 12.043 9.00049 10.251C9.00049 8.458 10.4585 7 12.2505 7C14.0425 7 15.5005 8.458 15.5005 10.251C15.5005 12.043 14.0425 13.5 12.2505 13.5Z"/>
                    <g id="Group 5">
                      <mask id="mask0_33437_4981" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="4" y="2" width="17" height="20">
                        <path id="Clip 4" fill-rule="evenodd" clip-rule="evenodd" d="M4 2H20.4995V21.5H4V2Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask0_33437_4981)">
                        <path id="Fill 3" fill-rule="evenodd" clip-rule="evenodd" d="M12.2495 3.5C8.52751 3.5 5.49951 6.557 5.49951 10.313C5.49951 15.092 11.1235 19.748 12.2495 19.996C13.3755 19.747 18.9995 15.091 18.9995 10.313C18.9995 6.557 15.9715 3.5 12.2495 3.5ZM12.2495 21.5C10.4555 21.5 3.99951 15.948 3.99951 10.313C3.99951 5.729 7.70051 2 12.2495 2C16.7985 2 20.4995 5.729 20.4995 10.313C20.4995 15.948 14.0435 21.5 12.2495 21.5Z"/>
                      </g>
                    </g>
                  </g>
                </g>
              </BaseIcon>
            </div>

            <span class="address text-sm">{{ address }}</span>
          </div>

          <div class="flex flex-row justify-start items-center gap-1" v-if="phone?.length">
            <div class="flex justify-center items-center rounded">
              <BaseIcon width="16" height="16" title="phone" view-box="0 0 24 24">
                <g id="Iconly/Light-Outline/Calling">
                  <g id="Calling">
                    <g id="Group 3">
                      <mask id="mask0_33437_4674" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="14" y="2" width="9" height="9">
                        <path id="Clip 2" fill-rule="evenodd" clip-rule="evenodd" d="M14.354 2.00024H22.893V10.5331H14.354V2.00024Z"/>
                      </mask>
                      <g mask="url(#mask0_33437_4674)">
                        <path id="Fill 1" fill-rule="evenodd" clip-rule="evenodd" d="M22.1427 10.5331C21.7657 10.5331 21.4417 10.2501 21.3987 9.86706C21.0197 6.49106 18.3977 3.87106 15.0207 3.49606C14.6097 3.45006 14.3127 3.08006 14.3587 2.66806C14.4037 2.25706 14.7707 1.95406 15.1867 2.00606C19.2647 2.45906 22.4317 5.62206 22.8887 9.69906C22.9347 10.1111 22.6387 10.4821 22.2277 10.5281C22.1997 10.5311 22.1707 10.5331 22.1427 10.5331Z"/>
                      </g>
                    </g>
                    <path id="Fill 4" fill-rule="evenodd" clip-rule="evenodd" d="M18.6026 10.5439C18.2506 10.5439 17.9376 10.2959 17.8676 9.93791C17.5796 8.45791 16.4386 7.31691 14.9606 7.02991C14.5536 6.95091 14.2886 6.55791 14.3676 6.15091C14.4466 5.74391 14.8466 5.47791 15.2466 5.55791C17.3276 5.96191 18.9346 7.56791 19.3396 9.64991C19.4186 10.0579 19.1536 10.4509 18.7476 10.5299C18.6986 10.5389 18.6506 10.5439 18.6026 10.5439Z"/>
                  </g>
                  <path id="Stroke 5" fill-rule="evenodd" clip-rule="evenodd" d="M3.28872 4.08785L3.36127 4.01204C5.28869 2.08444 6.54385 1.57351 7.88307 2.34362C8.2683 2.56515 8.62945 2.87523 9.12054 3.37401L10.6269 4.93603C11.4589 5.84393 11.6481 6.71478 11.3772 7.73465L11.3398 7.86967L11.2984 8.00392L11.097 8.59474C10.666 9.91972 10.846 10.6673 12.3795 12.2004C13.9742 13.7947 14.7186 13.9251 16.1457 13.4264L16.4001 13.338L16.7077 13.2381L16.8423 13.2007C17.9263 12.9115 18.842 13.1423 19.8132 14.1128L21.0269 15.2852L21.3842 15.6366C21.7803 16.0405 22.0421 16.3606 22.2355 16.6989C23.0008 18.0377 22.4893 19.2921 20.5063 21.2677L20.3177 21.4589C20.0216 21.7442 19.745 21.9486 19.3386 22.1416C18.6565 22.4655 17.8506 22.5876 16.9142 22.4573C14.6067 22.1364 11.6802 20.3158 7.97188 16.6085C7.67002 16.3067 7.3809 16.0107 7.10425 15.7205L6.56748 15.1476C1.53762 9.68285 1.09389 6.32588 3.15518 4.2205L3.28872 4.08785ZM7.90641 4.28093C7.58062 3.95973 7.34396 3.76394 7.13532 3.64396C6.67379 3.37856 6.1755 3.49074 5.25329 4.28448L4.96353 4.54334C4.91299 4.59 4.86129 4.63843 4.80838 4.68868L4.47611 5.01231L4.44617 5.04972L4.22091 5.27603C3.67656 5.83204 3.41871 6.51064 3.6409 7.67767C4.00551 9.59269 5.67442 12.1905 9.0324 15.5477C12.5313 19.0456 15.1972 20.7041 17.1208 20.9716C18.2422 21.1276 18.8142 20.856 19.3975 20.2584L19.8424 19.8095C20.051 19.5912 20.2292 19.3933 20.3797 19.2126L20.585 18.9539C21.1097 18.2551 21.1576 17.8358 20.9332 17.4433C20.8479 17.2939 20.7237 17.1302 20.5429 16.93L20.2977 16.671L20.1525 16.5258L18.6213 15.0472C18.1096 14.5753 17.7599 14.5084 17.229 14.65L17.0757 14.6941L16.4414 14.9094C14.6013 15.5037 13.2738 15.2155 11.3189 13.2612C9.29429 11.237 9.05685 9.88537 9.73522 7.93917L9.77874 7.81411L9.89908 7.45153L9.95823 7.22043C10.0631 6.71746 9.94337 6.36677 9.40269 5.82601C9.38043 5.80375 9.35555 5.77866 9.32847 5.7512L7.90641 4.28093Z"/>
                </g>
              </BaseIcon>
            </div>

            <a :href="'tel:' + phone" class="text-sm">{{ phone }}</a>
          </div>
        </div>
      </div>

      <div class="icon" :class="{'bg-neutral': !image, 'bg-transparent': image}">
        <BaseIcon width="48" height="48" :title="title" view-box="0 0 64 64">
          <path d="M11 4C9.355 4 8 5.355 8 7v2.068a13.74 13.74 0 0 1-.465 3.541L4.531 23.875A15.741 15.741 0 0 0 4 27.932V30.5a7.502 7.502 0 0 0 4 6.63V57c0 1.645 1.355 3 3 3h42c1.645 0 3-1.355 3-3V37.13a7.502 7.502 0 0 0 4-6.629v-2.568c0-1.37-.178-2.733-.531-4.057L56.465 12.61A13.74 13.74 0 0 1 56 9.07V7c0-1.645-1.355-3-3-3H11zm0 2h42c.564 0 1 .436 1 1v2.068c0 .312.01.622.03.932H9.97c.019-.31.03-.62.03-.932V7c0-.564.435-1 1-1zm-1.277 6h44.555c.071.377.154.753.254 1.125l3.004 11.266c.053.202.098.406.142.61H6.323c.045-.204.089-.408.143-.61L9.47 13.125c.099-.372.182-.748.253-1.125zm-3.69 15h51.934c.021.31.033.62.033.932V30.5c0 3.064-2.435 5.5-5.5 5.5S47 33.564 47 30.5V30a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0v.5c0 3.064-2.435 5.5-5.5 5.5S6 33.564 6 30.5v-2.568c0-.312.012-.622.034-.932zM32 33.664C33.34 36.208 35.928 38 39 38c2.994 0 5.508-1.718 6.88-4.156C47.117 36.28 49.581 38 52.5 38a7.51 7.51 0 0 0 1.5-.15V57c0 .564-.436 1-1 1H30v-8c0-4.415-3.585-8-8-8s-8 3.585-8 8v8h-3c-.564 0-1-.436-1-1V37.85c.485.098.986.15 1.5.15 2.918 0 5.382-1.719 6.621-4.156C19.493 36.282 22.006 38 25.001 38c3.071 0 5.659-1.792 7-4.336zM22 44c3.341 0 6 2.659 6 6v8H16v-8c0-3.341 2.659-6 6-6z"/>
        </BaseIcon>

        <img v-if="image" class="w-20 h-20 rounded"
             :alt="title" :src="image"
             @load="imageLoaded = true"/>
      </div>
    </div>

    <div class="h-1">

    </div>


    <template v-if="short">
      <div class="w-full flex items-end">
        <ShortSchedule class="grow"
                       v-if="item.schedules && item.schedules.length"
                       :item="item" />

        <div class="grow" v-else></div>

        <button class="btn btn-sm btn-outline" @click="$emit('select-restaurant', item)">
          {{ $t("preview.restaurants.select_button") }}
        </button>
      </div>
    </template>

    <template v-else-if="item.schedules && item.schedules.length">
<!--      <ShortReviews class="mt-2"-->
<!--                    :item="item"-->
<!--                    @click="$emit('open-reviews', item)"/>-->

      <Schedule class="w-full"
                :item="item" />
    </template>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";
import Schedule from "@/components/preview/schedule/Schedule.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import ShortSchedule from "@/components/preview/schedule/ShortSchedule.vue";
import ShortReviews from "@/components/preview/review/ShortReviews.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Restaurant",
  emits: ["select-restaurant", "open-reviews"],
  components: {
    // ShortReviews,
    ShortSchedule,
    Schedule,
    BaseIcon,
  },
  props: {
    item: Restaurant,
    short: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageLoaded: false,
    };
  },
  computed: {
    title() {
      return this.item.name;
    },
    address() {
      return this.item.place + ', ' + this.item.city +  ', ' + this.item.country;
    },
    phone() {
      return this.item.phone;
    },
    image() {
      const p = this.item;

      if (p && p.media && p.media.length) {
        return p.media[0].url;
      }

      return null;
    },
  },
});
</script>

<style scoped>
img {
  pointer-events: none
}

.container {
  @apply card shadow-xl flex flex-row flex-wrap justify-center items-start gap-3 p-4 bg-base-100;

  --rounded-box: 0.25rem;
  --padding-card: 16px;
}

.icon {
  @apply flex justify-center items-center rounded text-neutral-content min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px]
}

.title {
  @apply block text-xl text-center font-bold;
}
</style>
