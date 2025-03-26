<script setup lang="ts">
import {useStore} from 'vuex';
import {computed, watch} from "vue";
import {Category, Menu, Restaurant} from "@/openapi";
import {X, Dot} from "lucide-vue-next";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import {useRouter} from "vue-router";

const router = useRouter();

  const restaurantId: number | null = computed(() => {
    return +router.currentRoute.value.params['restaurantId'];
  });

  const store = useStore();

  const theme = computed(() => store.state.theme.theme);
  const menus = computed(() => store.state.preview.menus);
  const categories = computed(() => store.getters['preview/categories']);

  const selectedMenu = computed(() => store.state.preview.selections.menu);
  const selectedCategory = computed(() => store.state.preview.selections.category);

  watch(
      () => store.state.preview.isShowingMenusDrawer,
      (newValue) => {
        if (newValue) {
          scrollToTop();
        }
      }
  );

  const onSelectMenu = (menu: Menu) => {
    if (menu.id !== selectedMenu.value?.id) {
      store.dispatch('preview/selectMenu', menu);

      router.push(`/preview/${restaurantId.value}/menu/${menu.id}`);
    }

    window.scrollTo(0, 0);
  };

  const onSelectCategory = (category: Category) => {
    if (category.id !== selectedCategory.value?.id) {
      store.dispatch('preview/selectCategory', category);
    }
  };

  const clickDrawer = () => {
    document.getElementById('menu-drawer')?.click();
  }

  const scrollToTop = () => {
    document.getElementById("menus-drawer-scroll")
        ?.scrollTo({top: 0});
  };
</script>

<template>
  <div class="drawer drawer-end">
    <input id="menu-drawer" type="checkbox" class="drawer-toggle"
           @change="store.commit('preview/setIsShowingMenusDrawer', $event.target.checked)"
           v-model="store.state.preview.isShowingMenusDrawer"/>

    <div id="menus-drawer-scroll" class="drawer-side z-[51]">
      <label for="menu-drawer" aria-label="close sidebar" class="drawer-overlay"/>

      <ul tabindex="0" class="menu bg-base-200 text-base-content min-h-full text-md w-full min-w-md max-w-md px-4 py-2 overflow-y-auto"
          :class="{'bg-neutral': theme === 'dark', 'text-neutral-content': theme === 'dark'}">

        <div class="w-full max-w-md flex flex-row justify-end items-end mb-2 opacity-70">
          <button class="w-fit flex flex-row justify-end items-center btn btn-md btn-ghost"
                  @click="clickDrawer()">
            <X class="w-7 h-7"/>
          </button>
        </div>

        <li class="opacity-0 w-full"></li>

        <template v-if="menus?.length">
          <li class="opacity-0 w-full"></li>

          <h2 class="w-full menu-title text-lg pt-1 pb-0">{{ $t('Menus') }}</h2>

          <template v-for="menu in menus" :key="menu.id">
            <li @click="clickDrawer(); onSelectMenu(menu)">
              <div class="w-full flex flex-row justify-start items-center gap-5 mt-1"
                   :class="{'bg-[var(--yellow)] text-black hover:bg-[var(--yellow)]': menu.id === selectedMenu?.id}">
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


        <template v-if="categories?.length">
          <h2 class="w-full menu-title text-lg pt-5 pb-0">{{ $t('Categories') }}</h2>

          <ul style="margin-left: 10px; margin-right: 10px;">
            <template v-for="c in categories" :key="c.id">
              <li class="text-lg w-full mt-1 first:mt-2 last:mb-20 rounded"
                  :class="{'bg-[var(--yellow)]': c.id === selectedCategory?.id, 'text-black': c.id === selectedCategory?.id}"
                  @click="clickDrawer(); onSelectCategory(c);">
                <a class="px-2"><Dot class="w-6 h-6 inline-block mr-3"/>{{ c.title }}</a>
              </li>
            </template>
          </ul>
        </template>


      </ul>
    </div>
  </div>
</template>
