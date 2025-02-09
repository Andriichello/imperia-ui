<template>
  <div class="authenticated-layout">

    <div class="drawer drawer-end">
      <input id="app-drawer" type="checkbox" class="drawer-toggle"/>

      <div class="drawer-side z-[51]">
        <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

        <ul tabindex="0" class="menu bg-base-200 text-base-content min-h-full text-md max-w-full"
            :class="{'bg-neutral': theme === 'dark', 'text-neutral-content': theme === 'dark'}"
            id="navbar-menu-dropdown-list">

          <li @click="clickDrawer">
            <div class="flex justify-end">
              <BaseIcon color="currentColor" width="24" height="24" title="close" style="transform: rotate(45deg);">
                <svg width="24" height="24" viewBox="0 0 24 24" xmxlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </BaseIcon>
            </div>
          </li>

          <li class="opacity-0 w-[300px]"></li>

          <template v-if="authorized">
            <li v-if="restaurant" class="max-w-[300px]">
<!--              <h2 class="menu-title">{{ $t('Restaurant') }}</h2>-->
              <ul>
                <li @click="clickDrawer(); $router.replace(`/preview/${restaurantId}`)">
                  <div class="w-full flex flex-row justify-start items-center w-[270px] max-w-[270px]">
                    <div class="flex justify-center items-center gap-2">
                      <BaseIcon width="20" height="20" :title="restaurant.name" view-box="0 0 64 64">
                        <path d="M11 4C9.355 4 8 5.355 8 7v2.068a13.74 13.74 0 0 1-.465 3.541L4.531 23.875A15.741 15.741 0 0 0 4 27.932V30.5a7.502 7.502 0 0 0 4 6.63V57c0 1.645 1.355 3 3 3h42c1.645 0 3-1.355 3-3V37.13a7.502 7.502 0 0 0 4-6.629v-2.568c0-1.37-.178-2.733-.531-4.057L56.465 12.61A13.74 13.74 0 0 1 56 9.07V7c0-1.645-1.355-3-3-3H11zm0 2h42c.564 0 1 .436 1 1v2.068c0 .312.01.622.03.932H9.97c.019-.31.03-.62.03-.932V7c0-.564.435-1 1-1zm-1.277 6h44.555c.071.377.154.753.254 1.125l3.004 11.266c.053.202.098.406.142.61H6.323c.045-.204.089-.408.143-.61L9.47 13.125c.099-.372.182-.748.253-1.125zm-3.69 15h51.934c.021.31.033.62.033.932V30.5c0 3.064-2.435 5.5-5.5 5.5S47 33.564 47 30.5V30a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0c0 3.341-2.658 6-6 6s-6-2.659-6-6a1 1 0 0 0-2 0v.5c0 3.064-2.435 5.5-5.5 5.5S6 33.564 6 30.5v-2.568c0-.312.012-.622.034-.932zM32 33.664C33.34 36.208 35.928 38 39 38c2.994 0 5.508-1.718 6.88-4.156C47.117 36.28 49.581 38 52.5 38a7.51 7.51 0 0 0 1.5-.15V57c0 .564-.436 1-1 1H30v-8c0-4.415-3.585-8-8-8s-8 3.585-8 8v8h-3c-.564 0-1-.436-1-1V37.85c.485.098.986.15 1.5.15 2.918 0 5.382-1.719 6.621-4.156C19.493 36.282 22.006 38 25.001 38c3.071 0 5.659-1.792 7-4.336zM22 44c3.341 0 6 2.659 6 6v8H16v-8c0-3.341 2.659-6 6-6z"
                              stroke="currentColor"
                              stroke-width="2"/>
                      </BaseIcon>
                    </div>

                    <span class="text-lg font-bold grow">{{ restaurant.name }}</span>
                  </div>
                </li>
                <li>
                  <div class="w-full flex flex-row justify-start items-center p-0 w-[270px] max-w-[270px]">
                    <div class="flex justify-center items-center p-0">
                      <BaseIcon width="20" height="20" color="currentColor" :title="restaurant.name" view-box="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4311 15.6925C15.3001 15.6925 15.1681 15.6585 15.0471 15.5875L11.2771 13.3385C11.0511 13.2025 10.9111 12.9575 10.9111 12.6935V7.84546C10.9111 7.43146 11.2471 7.09546 11.6611 7.09546C12.0761 7.09546 12.4111 7.43146 12.4111 7.84546V12.2675L15.8161 14.2975C16.1711 14.5105 16.2881 14.9705 16.0761 15.3265C15.9351 15.5615 15.6861 15.6925 15.4311 15.6925Z"/>
                      </BaseIcon>
                    </div>

                    <ShortSchedule id="side-schedule" v-if="restaurant" :item="restaurant" class="grow"/>
                  </div>
                </li>
              </ul>
          </li>

            <li>
              <h2 class="menu-title text-md">{{ $t('Delivery') }}</h2>
              <ul>
                <li @click="clickDrawer(); onNewDelivery();">
                  <div class="w-full flex flex-row justify-start items-center w-[270px] max-w-[270px]">
                    <div>
                      <BaseIcon color="currentColor" width="16" height="16">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmxlns="http://www.w3.org/2000/svg">
                          <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </BaseIcon>
                    </div>

                    <span class="text-md grow font-semibold">
                      {{ $t('Delivery') }}
                    </span>
                  </div>
                </li>
                <li @click="clickDrawer(); $router.replace(`/place/${restaurantId}/delivery/history`)">
                  <div class="w-full flex flex-row justify-start items-center w-[270px] max-w-[270px]">
                    <div>
                      <BaseIcon width="16" height="16" class="currentColor">
                        <mask id="mask0_1102_7955" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
                          <path d="M2 2H21.4768V21.477H2V2Z"/>
                        </mask>
                        <path d="M11.739 3.5C7.196 3.5 3.5 7.195 3.5 11.738C3.5 16.281 7.196 19.977 11.739 19.977C16.281 19.977 19.977 16.281 19.977 11.738C19.977 7.195 16.281 3.5 11.739 3.5ZM11.739 21.477C6.369 21.477 2 17.108 2 11.738C2 6.368 6.369 2 11.739 2C17.109 2 21.477 6.368 21.477 11.738C21.477 17.108 17.109 21.477 11.739 21.477Z"/>
                        <mask id="mask1_1102_7955" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="17" y="17" width="6" height="6">
                          <path d="M17.2397 17.707H22.2638V22.7218H17.2397V17.707Z"/>
                        </mask>
                        <path d="M21.514 22.7218C21.323 22.7218 21.131 22.6488 20.984 22.5028L17.46 18.9888C17.167 18.6958 17.166 18.2208 17.459 17.9278C17.751 17.6328 18.226 17.6348 18.52 17.9258L22.044 21.4408C22.337 21.7338 22.338 22.2078 22.045 22.5008C21.899 22.6488 21.706 22.7218 21.514 22.7218Z"/>
                      </BaseIcon>
                    </div>


                    <span class="text-md grow font-semibold">
                      {{ $t('History') }}
                    </span>
                  </div>
                </li>
              </ul>
            </li>

            <li>
              <h2 class="menu-title text-md">{{ $t('Banquets') }}</h2>
              <ul>
                <li @click="clickDrawer(); onNewOrder();">
                  <div class="w-full flex flex-row justify-start items-center w-[270px] max-w-[270px]">
                    <div>
                      <BaseIcon color="currentColor" width="16" height="16">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmxlns="http://www.w3.org/2000/svg">
                          <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </BaseIcon>
                    </div>

                    <span class="text-md grow font-semibold">
                    {{ $t('Banquet')}}
                  </span>
                  </div>
                </li>
                <li @click="clickDrawer(); $router.replace(`/place/${restaurantId}/history`)">
                  <div class="w-full flex flex-row justify-start items-center w-[270px] max-w-[270px]">
                    <div>
                      <BaseIcon width="16" height="16" class="currentColor">
                        <mask id="mask0_1102_7955" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
                          <path d="M2 2H21.4768V21.477H2V2Z"/>
                        </mask>
                        <path d="M11.739 3.5C7.196 3.5 3.5 7.195 3.5 11.738C3.5 16.281 7.196 19.977 11.739 19.977C16.281 19.977 19.977 16.281 19.977 11.738C19.977 7.195 16.281 3.5 11.739 3.5ZM11.739 21.477C6.369 21.477 2 17.108 2 11.738C2 6.368 6.369 2 11.739 2C17.109 2 21.477 6.368 21.477 11.738C21.477 17.108 17.109 21.477 11.739 21.477Z"/>
                        <mask id="mask1_1102_7955" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="17" y="17" width="6" height="6">
                          <path d="M17.2397 17.707H22.2638V22.7218H17.2397V17.707Z"/>
                        </mask>
                        <path d="M21.514 22.7218C21.323 22.7218 21.131 22.6488 20.984 22.5028L17.46 18.9888C17.167 18.6958 17.166 18.2208 17.459 17.9278C17.751 17.6328 18.226 17.6348 18.52 17.9258L22.044 21.4408C22.337 21.7338 22.338 22.2078 22.045 22.5008C21.899 22.6488 21.706 22.7218 21.514 22.7218Z"/>
                      </BaseIcon>
                    </div>

                    <span class="text-md grow font-semibold">
                    {{ $t('History')}}
                  </span>
                  </div>
                </li>
              </ul>
            </li>
          </template>

          <li class="opacity-0 w-[300px] grow"></li>

          <li v-if="(address?.length || phone?.length)" class="max-w-[300px]">
            <h2 class="menu-title">{{ $t('Contacts') }}</h2>
            <ul>
              <li v-if="phone?.length" @click="clickPhone">
                <div class="w-full flex flex-row justify-start items-center w-[270px] max-w-[270px]">
                  <div>
                    <BaseIcon :width="20" :height="20" title="phone" view-box="0 0 24 24">
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
                  <a id="phone-ref grow" :href="'tel:' + phone" class="w-full text-md">{{ phone }}</a>
                </div>
              </li>
              <li v-if="address?.length"
                  class="p-0" @click="window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')">
                <div class="w-full flex flex-row justify-start items-center w-[270px] max-w-[270px]">
                  <div>
                    <BaseIcon :width="20" :height="20" title="address" view-box="0 0 24 24">
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
                  <span class="text-md max-w-xs grow">{{ address }}</span>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <h2 class="menu-title text-md">{{ $t('Theme') }}</h2>
            <ul>
              <li @click="onSwitchTheme()">
                <div class="w-full flex flex-row justify-start items-center w-[270px] max-w-[270px]">
                  <div v-if="theme === ThemeConfig.dark()">
                    <BaseIcon :width="20" :height="20" title="theme">
                      <svg class="swap-off h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                      </svg>
                    </BaseIcon>
                  </div>

                  <div v-else>
                    <BaseIcon :width="20" :height="20" title="theme">
                      <svg class="swap-on h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                      </svg>
                    </BaseIcon>
                  </div>

                  <span class="text-md grow">
                    {{ $t('Change to ' + (theme === ThemeConfig.dark() ? 'Light' : 'Dark'))}}
                  </span>
                </div>
              </li>
            </ul>
          </li>

          <li v-if="authorized">
            <h2 class="menu-title text-md">{{ $t('User') }}</h2>
            <ul>
              <li @click="clickDrawer(); onLogout();">
                <div class="w-full flex flex-row justify-start items-center">
                  <div>
                    <BaseIcon width="20" height="20" title="logout">
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.331 2.02148C13.7102 2.02148 15.6521 3.89542 15.7611 6.24772L15.766 6.45648V7.38948C15.766 7.8037 15.4302 8.13948 15.016 8.13948C14.6363 8.13948 14.3225 7.85733 14.2728 7.49125L14.266 7.38948V6.45648C14.266 4.89358 13.044 3.61575 11.5034 3.52647L11.331 3.52148H6.45597C4.89392 3.52148 3.61623 4.74362 3.52696 6.28406L3.52197 6.45648V17.5865C3.52197 19.1493 4.74388 20.4272 6.28363 20.5165L6.45597 20.5215H11.341C12.8983 20.5215 14.172 19.3039 14.261 17.7693L14.266 17.5975V16.6545C14.266 16.2403 14.6018 15.9045 15.016 15.9045C15.3957 15.9045 15.7095 16.1866 15.7591 16.5527L15.766 16.6545V17.5975C15.766 19.9687 13.8992 21.9046 11.5553 22.0164L11.341 22.0215H6.45597C4.07753 22.0215 2.13581 20.1474 2.0268 17.7952L2.02197 17.5865V6.45648C2.02197 4.07743 3.89573 2.13535 6.24728 2.02631L6.45597 2.02148H11.331ZM19.326 8.50234L19.4103 8.57478L22.3383 11.4898C22.3647 11.5159 22.3878 11.5426 22.409 11.5707L22.3383 11.4898C22.3689 11.5202 22.3963 11.5526 22.4205 11.5865C22.4376 11.6103 22.4533 11.6354 22.4676 11.6614C22.4702 11.6665 22.4728 11.6715 22.4754 11.6764C22.4881 11.7004 22.4993 11.7253 22.5092 11.7508C22.5132 11.762 22.5173 11.7733 22.5211 11.7847C22.5284 11.8058 22.5345 11.8274 22.5397 11.8494C22.5421 11.8612 22.5445 11.8729 22.5467 11.8846C22.5508 11.905 22.5538 11.9261 22.5559 11.9474C22.557 11.9623 22.558 11.977 22.5586 11.9917C22.5593 12.0016 22.5595 12.0115 22.5595 12.0214L22.5586 12.0497C22.5581 12.0651 22.557 12.0805 22.5555 12.0958L22.5595 12.0214C22.5595 12.0682 22.5552 12.1141 22.547 12.1585C22.5445 12.1696 22.5421 12.1814 22.5394 12.193C22.5343 12.2162 22.5279 12.2387 22.5205 12.2607C22.5167 12.2709 22.513 12.2813 22.509 12.2915C22.4997 12.3164 22.4889 12.3405 22.4769 12.3639C22.4739 12.3692 22.4708 12.3751 22.4675 12.381C22.4331 12.4443 22.39 12.5015 22.3398 12.5517L22.3384 12.5527L19.4104 15.4687C19.1169 15.761 18.642 15.76 18.3498 15.4665C18.084 15.1997 18.0607 14.783 18.2791 14.4898L18.3519 14.4059L19.991 12.7705L9.76847 12.7714C9.35426 12.7714 9.01847 12.4356 9.01847 12.0214C9.01847 11.6417 9.30063 11.3279 9.6667 11.2782L9.76847 11.2714L19.993 11.2705L18.352 9.63779C18.0852 9.37212 18.06 8.95551 18.2772 8.66142L18.3497 8.57714C18.6153 8.31028 19.0319 8.28514 19.326 8.50234Z"
                            fill="currentColor" stroke-width="1"/>
                      </svg>
                    </BaseIcon>
                  </div>

                  <span class="text-md">
                    {{ $t('Logout')}}
                  </span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <template v-if="isShowingMenusModal && !failed && tab === 'products'">
      <div class="w-full max-w-full h-full flex flex-col justify-start items-center gap-2 py-2 px-2">
        <div class="w-full flex justify-between items-center gap-2 p-1">
        <span class="font-semibold text-xl">
          {{ $t('preview.menu.switcher.title') }}
        </span>

          <div class="btn btn-sm btn-square" @click="setIsShowingMenusModal(false)">
            <BaseIcon width="24" height="24" view-box="0 0 24 24" style="transform: rotate(45deg)">
              <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </BaseIcon>
          </div>
        </div>

        <div class="w-full flex flex-col justify-start items-center gap-2 overflow-y-auto">
          <template v-for="m in menus" :key="m.id">
            <Menu :menu="m" v-if="m" @click="onSelectMenu(m)" class="w-full"/>
          </template>
        </div>

      </div>
    </template>

    <template v-else>
      <NavBar class="z-50"/>
    </template>

    <div class="preview-layout" v-show="!isShowingMenusModal || !isMenuPage">
      <template v-if="isMenuPage && !failed">
        <OrderTabs class="bg-base-100 p-2 h-auto w-full overflow-y-hidden"
                   :selected="tab"
                   :only="['products', 'spaces', 'services']"
                   @switch-to-tab="onSwitchTab"/>

        <PreviewMenuNavBar class="w-full" id="preview-menu-bar"
                           v-if="pinMenus && isShortScreen"/>

        <div class="w-full sticky top-0 z-40" v-if="tab === 'products'">
          <PreviewMenuNavBar class="w-full" id="preview-menu-bar"
                             v-if="pinMenus && !isShortScreen"/>

          <PreviewCategoryNavBar class="w-full"/>
        </div>

      </template>

      <template v-if="failed">
        <Error :back-to-page="isMenuPage || isRestaurantPage || isHomePage"
               @on-back-to="onErrorBackTo"/>
      </template>

      <template v-else>
        <slot />
      </template>

      <div class="w-full sticky bottom-[68px] left-[8px] ml-4 z-50" v-if="!isWideScreen">
        <button class="btn btn-sm btn-square btn-ghost rounded up opacity-75"
                v-show="isMenuPage && products && products.length > 10 && showGoToTop"
                @click="goToTop()">
          <BaseIcon :title="$t('preview.navbar.back')" color="transparent" width="20" height="20" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}" style="transform: rotate(90deg); transform-origin: center;">
            <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </BaseIcon>
        </button>
      </div>
      <div class="w-fit sticky bottom-2 left-2 z-50 self-start" v-else>
        <button class="btn btn-sm btn-square btn-ghost rounded up opacity-75"
                v-show="isMenuPage && products && products.length > 10 && showGoToTop"
                @click="goToTop()">
          <BaseIcon :title="$t('preview.navbar.back')" color="transparent" width="20" height="20" viewBox="0 0 24 24" :style="{stroke: 'currentColor'}" style="transform: rotate(90deg); transform-origin: center;">
            <path d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </BaseIcon>
        </button>
      </div>

    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "@/layouts/navbar/NavBar.vue";
import PreviewMenuNavBar from "@/components/preview/menu/PreviewMenuNavBar.vue";
import PreviewCategoryNavBar from "@/components/preview/category/PreviewCategoryNavBar.vue";
import Error from "@/components/common/Error.vue";
import {mapActions, mapGetters} from "vuex";
import Menu from "@/components/preview/menu/Menu.vue";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import OrderTabs from "@/components/order/OrderTabs.vue";
import PreviewNavBar from "@/layouts/navbar/PreviewNavBar.vue";
import {ThemeConfig} from "@/configs";
import ShortSchedule from "@/components/preview/schedule/ShortSchedule.vue";

export default defineComponent({
  name: "AuthenticatedLayout",
  components: {
    ShortSchedule,
    OrderTabs,
    BaseIcon, Menu,
    Error,
    PreviewCategoryNavBar,
    PreviewMenuNavBar,
    NavBar,
  },
  data() {
    return {
      isShortScreen: window.innerHeight < 800,
      isWideScreen: window.innerWidth > 920,
      pinMenus: true,
      scrolledDistance: 0,
      lastScrollPosition: null,
      wasLastScrollUp: null,
      showGoToTop: false,
    };
  },
  computed: {
    ThemeConfig() {
      return ThemeConfig
    },
    ...mapGetters({
      me: "auth/me",
      user: "auth/user",
      authorized: "auth/authorized",
      theme: "theme/get",
      themes: "theme/list",
      failed: 'error/present',
      tab: 'preview/tab',
      menu: 'preview/menu',
      menus: 'preview/menus',
      products: 'preview/products',
      restaurant: 'restaurants/selected',
      restaurantId: "restaurants/restaurantId",
      isShowingMenusModal: 'preview/isShowingMenusModal',
    }),
    isHomePage() {
      return this.$route['name'] === 'home';
    },
    isMenuPage() {
      return this.$route['name'] === 'place-menu'
          || this.$route['name'] === 'place-order-menu';
    },
    isRestaurantPage() {
      return this.$route['name'] === 'place-restaurant';
    },
    address() {
      if (!this.restaurant || !this.restaurant?.place?.length || !this.restaurant?.city?.length || !this.restaurant?.country?.length) {
        return null;
      }

      const address = this.restaurant?.place + ', ' + this.restaurant?.city + ', ' + this.restaurant?.country;

      if (address.length > 70) {
        return address.substring(0, 70) + '…';
      }

      return address;
    },
    phone() {
      return this.restaurant?.phone;
    },
  },
  watch: {
    isShowingMenusModal(newValue) {
      if (newValue) {
        window.scrollTo(0, 0);
      }
    }
  },
  methods: {
    ...mapActions({
      applyTheme: 'theme/apply',
      logout: 'auth/logout',
      selectTab: 'preview/selectTab',
      selectMenu: 'preview/selectMenu',
      setIsShowingMenusModal: 'preview/setIsShowingMenusModal',
      clearOrder: 'order/clear',
      clearBanquet: 'basket/clear',
    }),
    clickDrawer() {
      document.getElementById('app-drawer')?.click()
    },
    clickPhone() {
      document.getElementById('phone-ref')?.click()
    },
    onResize() {
      this.isShortScreen = window.innerHeight < 800;
      this.isWideScreen = window.innerWidth > 920;
    },
    onScroll() {
      if (this.isShowingMenusModal) {
        return;
      }

      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Get the current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + clientHeight;

      if (scrollTop <= 68) {
        this.pinMenus = true;
        this.showGoToTop = false;
        return;
      }

      if (!this.isShortScreen) {
        if (scrollBottom < (scrollHeight - 160)) {
          this.showGoToTop = true;
        }

        return;
      }

      if (scrollBottom < (scrollHeight - 160) && this.lastScrollPosition !== null) {
        const diff = scrollTop - this.lastScrollPosition;

        if (diff > 0) {
          if (this.wasLastScrollUp) {
            this.scrolledDistance = 0;
          }

          this.wasLastScrollUp = false;
        } else {
          if (!this.wasLastScrollUp) {
            this.scrolledDistance = 0;
          }

          this.wasLastScrollUp = true;
        }

        this.scrolledDistance += diff;

        if (this.wasLastScrollUp && this.scrolledDistance < -50) {
          // this.pinMenus = true;
        } else if (this.scrolledDistance > 10) {
          // this.pinMenus = false
        }

        this.showGoToTop = true;
      }

      this.lastScrollPosition = scrollTop;
    },
    onSwitchTab({to}) {
      this.selectTab(to);
    },
    onSelectMenu(menu) {
      this.setIsShowingMenusModal(false);
      this.selectMenu(menu);

      const restaurantId = this.$route.params['restaurantId'];
      this.$router.push(`/place/${restaurantId}/menu/${menu.id}`);

      window.scrollTo(0, 0);
    },
    onErrorBackTo() {
      if (this.isHomePage) {
        this.$router.replace(`/place`);
        setTimeout(
            function () {
              document.location.reload();
            },
            200
        );
      } else if (this.isMenuPage) {
        const restaurantId = this.$route.params['restaurantId'];
        this.$router.push(`/place/${restaurantId}`);
      } else if (this.isRestaurantPage) {
        this.$router.replace(`/place`);
        setTimeout(
            function () {
              document.location.reload();
            },
            200
        );
      }

      this.$store.dispatch('error/clear');
    },
    goToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    onNewOrder() {
      this.clearOrder();
      this.clearBanquet();

      this.$router.push(`/place/${this.restaurantId}/order`);
    },
    onNewDelivery() {
      this.clearOrder();

      this.$router.push(`/place/${this.restaurantId}/delivery/order`);
    },
    onSwitchTheme() {
      if (this.theme === this.themes[0]) {
        this.applyTheme(this.themes[1])
      } else {
        this.applyTheme(this.themes[0])
      }
    },
    async onLogout() {
      if (this.user && this.authorized) {
        await this.logout();

        this.$router.push('/login');
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  },
});
</script>

<style scoped>
.authenticated-layout {
  @apply flex flex-col min-w-full max-w-full bg-base-200;

  display: flex;
  flex-basis: 100%;
  justify-content: start;
  align-items: center;
}

.preview-layout {
  @apply flex flex-col w-full max-w-full bg-base-200 p-0;

  display: flex;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
}

.up {
  @apply text-black;
  background-color: var(--yellow);
}

.up:hover {
  background-color: var(--yellow);
}

.menu-title {
  @apply p-0 ml-3 mt-2 mb-1;
}

.menu ul {
  @apply p-0 ml-3;
}

.menu ul li {
  @apply mx-2;
}

.menu ul li div {
  @apply px-1 m-0;

  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
