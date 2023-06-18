<template>
  <div class="w-full flex flex-col justify-center items-center gap-4">
    <form @submit.prevent class="w-full flex flex-col justify-center items-center" v-if="showForm">
      <div class="w-full flex flex-col items-center bg-base-100 min-h-[100px] p-2 gap-2">
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

        <button class="self-end btn btn-md btn-outline">
          Зберегти відгук
        </button>
      </div>
    </form>

    <div class="w-full flex flex-col justify-start items-start text-md gap-3">
      <template v-for="r in allReviews" :key="r.id">
        <div class="w-full card bg-base-100 max-w-full flex flex-col justify-start items-start p-3 gap-1">
          <div class="w-full flex flex justify-between items-center gap-1">
            <span class="grow font-bold">
              {{ r.reviewer }}
           </span>

            <span class="badge badge-sm badge-warning font-bold" v-if="myReviews.includes(r)">
                Ваш відгук
            </span>
          </div>


          <div class="flex justify-start items-start gap-1 grow basis-1/2">
            <div class="rating rating-sm">
              <template v-for="i in [0, 1, 2, 3, 4, 5]" :key="i">
                <input type="radio" name="rating-9" class="mask mask-star-2"
                       :class="{'rating-hidden': i === 0, 'bg-base-content': r.score >= i, 'bg-base-content/20': r.score < i}"
                       :value="i"
                       v-if="i !== 0"
                       disabled/>
              </template>
            </div>

            <span class="grow text-xs self-end">
              {{ dateFormatted(r.createdAt) }}
            </span>
          </div>

          <p class="w-full mt-2">
            {{ r.description }}
          </p>

        </div>
      </template>
    </div>


    <div class="w-full flex flex-col justify-center items-center">
      <div class="flex flex-col justify-center items-center gap-2">
        <span v-if="reviewsResponse && reviewsTotal === null">На жаль, список порожній</span>
        <span v-if="reviewsCount && reviewsTotal && reviewsCount !== reviewsTotal">Показано {{ reviewsCount }} з {{ reviewsTotal }} відгуків</span>
        <span v-else-if="reviewsCount && reviewsTotal && reviewsCount === reviewsTotal">Показано всі відгуки ({{ reviewsTotal }})</span>

        <div class="list-more-btn" v-if="reviewsCount < reviewsTotal">
          <button class="btn btn-block btn-ghost" :class="{ 'loading': loadingMore }" @click="onLoadMore">Завантажити ще...</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Restaurant from "@/openapi/models/Restaurant";
import {mapActions, mapGetters} from "vuex";
import {dateFormatted} from "../../../helpers";

export default defineComponent({
  // eslint-disable-next-line
  name: "Reviews",
  props: {
    item: Restaurant,
  },
  data() {
    return {
      showForm: false,
      reviewer: null,
      reviewerErrors: ['Ім\'я має бути щонайменше 2 символи'],
      description: null,
      descriptionErrors: ['Відгук має бути щонайменше 2 символи'],
      loadingMore: false,
    };
  },
  watch: {
    reviewsMoreResponse: {
      handler() {
        this.loadingMore = false;
      },
    }
  },
  computed: {
    ...mapGetters({
      ip: "auth/ip",
      reviews: "reviews/reviews",
      reviewsResponse: "reviews/getIndexResponse",
      reviewsMoreResponse: "reviews/getMoreResponse",
    }),
    myReviews() {
      if (!this.ip) {
        return [];
      }

      return (this.reviews ?? []).filter(r => r.ip === this.ip);
    },
    otherReviews() {
      if (!this.ip) {
        return this.reviews;
      }

      return (this.reviews ?? []).filter(r => r.ip !== this.ip);
    },
    allReviews() {
      if (this.myReviews && this.myReviews.length) {
        return this.myReviews.concat(this.otherReviews);
      }

      return (this.reviews ?? []);
    },
    reviewsCount() {
      if (!this.reviews) {
        return null;
      }

      return this.reviews.length;
    },
    reviewsTotal() {
      if (!this.reviewsResponse || !this.reviewsResponse.meta) {
        return null;
      }

      return this.reviewsResponse.meta?.total;
    },
  },
  methods: {
    ...mapActions({
      setIp: "auth/ip",
      loadMoreReviews: "reviews/loadMoreReviews",
    }),
    dateFormatted,
    onLoadMore() {
      this.loadingMore = true;

      this.loadMoreReviews();
    },
  },
  mounted() {
    if (!this.ip) {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      fetch('https://api.ipify.org?format=json')
          .then(x => x.json())
          .then(({ip}) => {
            this.setIp(ip);
          });
    }
  }
});
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
}
</style>
