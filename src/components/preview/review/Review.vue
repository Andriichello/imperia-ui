<template>
  <div>
    <div class="w-full flex flex-row justify-center items-center btn-ghost rounded px-2 py-1" @click="showReview = !showReview">
      <div class="grow flex flex-col justify-center items-start">
        <h2 class="text-md font-bold">Відгуки</h2>
        <p class="text-md">Було залишено більше 10ти відгуків</p>
      </div>

      <button class="flex justify-center items-center w-[40px] h-[40px]">
        <BaseIcon :width="20" :height="20" :color="currentColor" :class="{'rotated': showReview}">
          <path  d="M4.46967 7.96967C4.73594 7.7034 5.1526 7.6792 5.44621 7.89705L5.53033 7.96967L12 14.439L18.4697 7.96967C18.7359 7.7034 19.1526 7.6792 19.4462 7.89705L19.5303 7.96967C19.7966 8.23594 19.8208 8.6526 19.6029 8.94621L19.5303 9.03033L12.5303 16.0303C12.2641 16.2966 11.8474 16.3208 11.5538 16.1029L11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"/>
        </BaseIcon>
      </button>
    </div>

    <form @submit.prevent class="w-full flex flex-col justify-center items-center mt-2" v-if="showReview">
      <div class="w-full flex flex-col items-center bg-base-100 min-h-[100px] max-w-md p-2 gap-2">
        <span class="text-md font-bold">
          Оцініть даний заклад
        </span>

        <div class="rating rating-md gap-2 mb-2">
          <input type="radio" id="rating-0" name="rating-9" class="rating-hidden" checked/>
          <input type="radio" id="rating-1" name="rating-9" class="mask mask-star-2" />
          <input type="radio" id="rating-2" name="rating-9" class="mask mask-star-2" />
          <input type="radio" id="rating-3" name="rating-9" class="mask mask-star-2" />
          <input type="radio" id="rating-4" name="rating-9" class="mask mask-star-2" />
          <input type="radio" id="rating-5" name="rating-9" class="mask mask-star-2" />
        </div>

        <div class="w-full flex flex-col justify-start gap-1">
          <input v-model="reviewer" name="reviewer" type="text" required placeholder="Ваше ім'я..." class="input input-bordered input-md w-full"
                 :class="{'border-error': reviewerErrors && reviewerErrors.length}"/>

          <span class="label-text-alt text-error text-sm" v-for="error in reviewerErrors" :key="error">
            {{ error }}
          </span>
        </div>

        <div class="w-full flex flex-col justify-start gap-1">
          <textarea v-model="description" name="description" class="w-full textarea textarea-bordered" placeholder="Ваш відгук..."
                  :class="{'border-error': descriptionErrors && descriptionErrors.length}">
          </textarea>

          <span class="label-text-alt text-error text-sm" v-for="error in descriptionErrors" :key="error">
            {{ error }}
          </span>
        </div>

        <button class="w-full btn btn-md btn-outline">
          Зберегти відгук
        </button>
      </div>
    </form>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Review",
  components: {BaseIcon},
  props: {
    item: Restaurant,
  },
  data() {
    return {
      showReview: false,
      reviewer: null,
      reviewerErrors: ['Ім\'я має бути щонайменше 2 символи'],
      description: null,
      descriptionErrors: ['Відгук має бути щонайменше 2 символи'],
    };
  },
});
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
}
</style>
