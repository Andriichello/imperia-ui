<script setup lang="ts">
import {useStore} from 'vuex';
import {computed, watch} from "vue";
import {ThemeConfig} from "@/configs";
import {Menu} from "@/openapi";
import {X} from "lucide-vue-next";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import ShortSchedule from "@/components/preview/schedule/ShortSchedule.vue";
import {useRouter} from "vue-router";

const restaurantId: number | null = computed(() => {
    return +router.currentRoute.value.params['restaurantId'];
  });

  const isMenuPage: boolean = computed(() => {
    const name = router.currentRoute.value.name;

    return name && name.endsWith('-menu');
  })

  const router = useRouter();
  const store = useStore();

  const theme = computed(() => store.state.theme.theme);
  const restaurant = computed(() => store.state.restaurants.selected);

  const phone = computed(() => restaurant.value?.phone);

  const address = computed(() => {
    const r = restaurant.value;

    if (!r || !r?.place?.length || !r?.city?.length || !r?.country?.length)
      return null;

    const address = r.place + ', ' + r.city + ', ' + r.country;

    if (address.length > 70) {
      return address.substring(0, 70) + '…';
    }

    return address;
  });

  const menus = computed(() => store.state.preview.menus);

  const selectedMenu = computed(() => store.state.preview.selections.menu);

  watch(
      () => store.state.preview.isShowingAppDrawer,
      (newValue) => {
        if (newValue) {
          scrollToTop();
        }
      }
  );

  const onSwitchTheme = () => {
    store.dispatch('theme/toggle');
  };

  const onSelectMenu = (menu: Menu) => {
    if (!isMenuPage.value || menu.id !== selectedMenu.value?.id) {
      store.dispatch('preview/selectMenu', menu);

      router.push(`/preview/${restaurantId.value}/menu/${menu.id}`);
    }

    window.scrollTo(0, 0);
  };

  const onRestaurantClick = () => {
    router.push(`/preview/${restaurantId.value}`);

    window.scrollTo(0, 0);
  };

  const clickDrawer = () => {
    document.getElementById('app-drawer')?.click();
  }

  const clickPhone = () => {
    document.getElementById('phone-ref')?.click();
  };

  const scrollToTop = () => {
    document.getElementById("app-drawer-scroll")
        ?.scrollTo({top: 0});
  };
</script>

<template>
  <div class="drawer drawer-end">
    <input id="app-drawer" type="checkbox" class="drawer-toggle"
           @change="store.commit('preview/setIsShowingAppDrawer', $event.target.checked)"
           v-model="store.state.preview.isShowingAppDrawer"/>

    <div id="app-drawer-scroll" class="drawer-side z-[51]">
      <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"/>

      <ul tabindex="0" class="menu bg-base-200 text-base-content min-h-full text-md w-full min-w-md max-w-md px-4 py-2 overflow-y-auto"
          :class="{'bg-neutral': theme === 'dark', 'text-neutral-content': theme === 'dark'}">

        <div class="w-full max-w-md flex flex-row justify-end items-end mb-2 opacity-70">
          <button class="w-fit flex flex-row justify-end items-center btn btn-md btn-ghost"
                  @click="clickDrawer()">
            <X class="w-7 h-7"/>
          </button>
        </div>

        <li class="opacity-0 w-full"></li>


        <li v-if="restaurant" class="flex"
            @click="clickDrawer(); onRestaurantClick()">
          <h2 class="w-full menu-title text-lg pb-0">{{ $t('Restaurant') }}</h2>

          <div class="w-full flex flex-row justify-start items-center gap-5 mt-1">
            <div class="flex justify-center items-center min-h-[44px]">
              <BaseIcon width="28" height="28" :title="restaurant.name" view-box="0 0 64 64">
                <path d="M11 4C9.355 4 8 5.355 8 7v2.068a13.74 13.74 0 0 1-.465 3.541L4.531 23.875A15.741 15.741 0 0 0 4 27.932V30.5a7.502 7.502 0 0 0 4 6.63V57c0 1.645 1.355 3 3 3h42c1.645 0 3-1.355 3-3V37.13a7.502 7.502 0 0 0 4-6.629v-2.568c0-1.37-.178-2.733-.531-4.057L56.465 12.61A13.74 13.74 0 0 1 56 9.07V7c0-1.645-1.355-3-3-3H11zm0 2h42c.564 0 1 .436 1 1v2.068c0 .312.01.622.03.932H9.97c.019-.31.03-.62.03-.932V7c0-.564.435-1 1-1zm-1.277 6h44.555c.071.377.154.753.254 1.125l3.004 11.266c.053.202.098.406.142.61H6.323c.045-.204.089-.408.143-.61L9.47 13.125c.099-.372.182-.748.253-1.125zm-3.69 15h51.934c.021.31.033.62.033.932V30.5c0 3.064-2.435 5.5-5.5 5.5S47 33.564 47 30.5V30a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0v.5c0 3.064-2.435 5.5-5.5 5.5S6 33.564 6 30.5v-2.568c0-.312.012-.622.034-.932zM32 33.664C33.34 36.208 35.928 38 39 38c2.994 0 5.508-1.718 6.88-4.156C47.117 36.28 49.581 38 52.5 38a7.51 7.51 0 0 0 1.5-.15V57c0 .564-.436 1-1 1H30v-8c0-4.415-3.585-8-8-8s-8 3.585-8 8v8h-3c-.564 0-1-.436-1-1V37.85c.485.098.986.15 1.5.15 2.918 0 5.382-1.719 6.621-4.156C19.493 36.282 22.006 38 25.001 38c3.071 0 5.659-1.792 7-4.336zM22 44c3.341 0 6 2.659 6 6v8H16v-8c0-3.341 2.659-6 6-6z"
                      stroke="currentColor"
                      stroke-width="2"/>
              </BaseIcon>
            </div>

            <span class="w-full text-xl font-semibold">{{ restaurant.name }}</span>
          </div>

          <div class="w-full flex flex-row justify-start items-center py-0.5 gap-5 mt-1">
            <div class="flex justify-center items-center p-0">
              <BaseIcon width="28" height="28" color="currentColor" :title="restaurant.name" view-box="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4311 15.6925C15.3001 15.6925 15.1681 15.6585 15.0471 15.5875L11.2771 13.3385C11.0511 13.2025 10.9111 12.9575 10.9111 12.6935V7.84546C10.9111 7.43146 11.2471 7.09546 11.6611 7.09546C12.0761 7.09546 12.4111 7.43146 12.4111 7.84546V12.2675L15.8161 14.2975C16.1711 14.5105 16.2881 14.9705 16.0761 15.3265C15.9351 15.5615 15.6861 15.6925 15.4311 15.6925Z"/>
              </BaseIcon>
            </div>

            <ShortSchedule id="side-schedule" v-if="restaurant" :item="restaurant"
                           class="grow text-lg"/>
          </div>
        </li>


        <template v-if="menus?.length">
          <li class="opacity-0 w-full min-h-5"></li>

          <h2 class="w-full menu-title text-lg pb-0">{{ $t('Menus') }}</h2>

          <template v-for="menu in menus" :key="menu.id">
            <li @click="clickDrawer(); onSelectMenu(menu)">
              <div class="w-full flex flex-row justify-start items-center gap-5 mt-1"
                   :class="{'bg-[var(--yellow)] text-black hover:bg-[var(--yellow)]': isMenuPage && menu.id === selectedMenu?.id}">
                <div class="flex justify-center items-center gap-2 min-h-[44px]">
                  <BaseIcon color="currentColor" width="28" height="28" :title="menu.title" view-box="0 0 24 24">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Iconly/Light/Document">
                        <g id="Document">
                          <path id="Stroke 1" d="M15.7161 16.2234H8.49609" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path id="Stroke 2" d="M15.7161 12.0369H8.49609" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path id="Stroke 3" d="M11.2511 7.86011H8.49609" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path id="Stroke 4" fill-rule="evenodd" clip-rule="evenodd" d="M15.9085 2.74982C15.9085 2.74982 8.23149 2.75382 8.21949 2.75382C5.45949 2.77082 3.75049 4.58682 3.75049 7.35682V16.5528C3.75049 19.3368 5.47249 21.1598 8.25649 21.1598C8.25649 21.1598 15.9325 21.1568 15.9455 21.1568C18.7055 21.1398 20.4155 19.3228 20.4155 16.5528V7.35682C20.4155 4.57282 18.6925 2.74982 15.9085 2.74982Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                      </g>
                    </svg>
                  </BaseIcon>
                </div>

                <span class="text-lg font-semibold grow">{{ menu.title }}</span>
              </div>
            </li>
          </template>
        </template>

        <li class="opacity-0 w-full grow min-h-5"></li>

        <template v-if="(address?.length || phone?.length)">
          <h2 class="w-full menu-title text-lg pb-0">{{ $t('Contacts') }}</h2>

          <li v-if="phone?.length" @click="clickPhone" class="mt-1">
            <div class="w-full flex flex-row justify-start items-center gap-5">
              <div class="flex justify-center items-center min-h-[44px]">
                <BaseIcon :width="28" :height="28" title="phone" view-box="0 0 24 24">
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
              <a id="phone-ref grow" :href="'tel:' + phone" class="w-full text-lg">{{ phone }}</a>
            </div>
          </li>

          <li v-if="address?.length"
              class="p-0 mt-1" @click="window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')">
            <div class="w-full flex flex-row justify-start items-center gap-5">
              <div class="flex justify-center items-center min-h-[44px]">
                <BaseIcon :width="28" :height="28" title="address" view-box="0 0 24 24">
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
              <span class="text-lg max-w-xs grow">{{ address }}</span>
            </div>
          </li>
        </template>


        <h2 class="w-full menu-title text-lg pb-0">{{ $t('Theme') }}</h2>

        <li @click="onSwitchTheme()" class="p-0 mt-1">
          <div class="w-full flex flex-row justify-start items-center gap-5">
            <div v-if="theme === ThemeConfig.dark()" class="flex justify-center items-center min-h-[44px]">
              <BaseIcon :width="28" :height="28" title="theme">
                <svg class="swap-off h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              </BaseIcon>
            </div>

            <div v-else class="flex justify-center items-center min-h-[44px]">
              <BaseIcon :width="28" :height="28" title="theme">
                <svg class="swap-on h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </BaseIcon>
            </div>

            <span class="text-lg grow">
              {{ $t('Change to ' + (theme === ThemeConfig.dark() ? 'Light' : 'Dark'))}}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
