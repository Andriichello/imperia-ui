<template>
  <div class="w-full flex flex-col justify-center items-center gap-1">

    <div class="w-full flex flex-col justify-center items-center">
      <div class="flex flex-col justify-center items-center gap-2">
        <span v-if="reviewsResponse && reviewsTotal === 0">На жаль, список порожній</span>
      </div>
    </div>

    <div class="w-full flex flex-col justify-center items-center" v-if="ip && myReviewsResponse && !myReviews?.length">
      <button class="btn btn-sm btn-outline mb-2"
              @click="showForm = !showForm">
        Натисніть, щоб залишити відгук
      </button>
    </div>

    <form @submit.prevent class="w-full flex flex-col justify-center items-center mb-2" v-if="ip && showForm && !myReviews?.length">
      <div class="card w-full flex flex-col items-center bg-base-100 min-h-[100px] p-4 gap-2">
        <span class="text-md font-bold">
          Оцініть даний заклад
        </span>

        <div class="w-full flex flex-col justify-center items-center gap-1 mb-2">
          <div class="rating rating-md gap-2">
            <input type="radio" id="rating-0" value="0" name="rating-9" class="rating-hidden" checked/>
            <input type="radio" id="rating-1" value="1" name="rating-9" class="mask mask-star-2" @click="score = 1"/>
            <input type="radio" id="rating-2" value="2" name="rating-9" class="mask mask-star-2" @click="score = 2"/>
            <input type="radio" id="rating-3" value="3" name="rating-9" class="mask mask-star-2" @click="score = 3"/>
            <input type="radio" id="rating-4" value="4" name="rating-9" class="mask mask-star-2" @click="score = 4"/>
            <input type="radio" id="rating-5" value="5" name="rating-9" class="mask mask-star-2" @click="score = 5"/>
            <input type="radio" id="rating-6" value="0" name="rating-9" class="rating-hidden"/>
          </div>

          <span class="label-text-alt text-error text-sm" v-for="error in (errors?.score ?? [])" :key="error">
            {{ error }}
          </span>
        </div>

        <div class="w-full flex flex-col justify-start gap-1">
          <input v-model="reviewer" name="reviewer" type="text" placeholder="Ваше ім'я..." class="input input-bordered input-md w-full"
                 :class="{'border-error': errors && errors.reviewer}"/>

          <span class="label-text-alt text-error text-sm" v-for="error in (errors?.reviewer ?? [])" :key="error">
            {{ error }}
          </span>
        </div>

        <div class="w-full flex flex-col justify-start gap-1">
          <textarea v-model="description" name="description" class="w-full textarea textarea-bordered" placeholder="Ваш відгук..."
                    :class="{'border-error': errors && errors.description}">
          </textarea>

          <span class="label-text-alt text-error text-sm" v-for="error in (errors?.description ?? [])" :key="error">
            {{ error }}
          </span>
        </div>

        <button class="self-end btn btn-md btn-outline" :class="{'loading': storingReview}"
                @click="onSubmitReview">
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

          <p class="w-full mt-2" v-if="r.description && r.description.length">
            {{ r.description }}
          </p>

        </div>
      </template>
    </div>


    <div class="w-full flex flex-col justify-center items-center mt-1">
      <div class="flex flex-col justify-center items-center gap-2">
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
import {instanceOfStoreRestaurantReviewResponse} from "@/openapi";

export default defineComponent({
  // eslint-disable-next-line
  name: "Reviews",
  props: {
    item: Restaurant,
  },
  data() {
    return {
      loadingMore: false,
      loadingMy: false,
      storingReview: false,
      showForm: false,
      score: null,
      reviewer: null,
      description: null,
      errors: null,
    };
  },
  watch: {
    ip: {
      handler(newVal) {
        if (this.loadingMy) {
          return;
        }

        this.loadMyReviewsIfMissing({ip: newVal, restaurantId: this.$route.params['restaurantId']})
      },
    },
    score: {
      handler() {
        if (this.errors) {
          this.errors = this.validateReviewForm(this.reviewForm);
        }
      },
    },
    reviewer: {
      handler() {
        if (this.errors) {
          this.errors = this.validateReviewForm(this.reviewForm);
        }
      },
    },
    description: {
      handler() {
        if (this.errors) {
          this.errors = this.validateReviewForm(this.reviewForm);
        }
      },
    },
    myReviewsResponse: {
      handler() {
        this.loadingMy = false;
      },
    },
    reviewsMoreResponse: {
      handler() {
        this.loadingMore = false;
      },
    },
    reviewsCreateResponse: {
      handler(newVal) {
        this.storingReview = false;

        if (!instanceOfStoreRestaurantReviewResponse(newVal)) {
          console.log(newVal?.message);
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      ip: "auth/ip",
      restaurant: "restaurants/selected",
      reviews: "reviews/reviews",
      reviewsOfMine: "reviews/myReviews",
      reviewsResponse: "reviews/getIndexResponse",
      myReviewsResponse: "reviews/getMyResponse",
      reviewsMoreResponse: "reviews/getMoreResponse",
      reviewsCreateResponse: "reviews/getCreateResponse",
    }),
    myReviews() {
      if (this.reviewsOfMine) {
        return this.reviewsOfMine;
      }

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
    reviewForm() {
      return {
        ip: this.ip,
        restaurantId: this.$route.params['restaurantId'],
        score: this.score,
        reviewer: this.reviewer,
        description: this.description,
      };
    },
  },
  methods: {
    ...mapActions({
      setIp: "auth/ip",
      loadMoreReviews: "reviews/loadMoreReviews",
      loadMyReviews: "reviews/loadMyReviews",
      loadReviewsIfMissing: "reviews/loadReviewsIfMissing",
      loadMyReviewsIfMissing: "reviews/loadMyReviewsIfMissing",
      storeReview: "reviews/storeReview",
    }),
    dateFormatted,
    onLoadMore() {
      this.loadingMore = true;

      this.loadMoreReviews();
    },
    validateReviewForm({ip, score, reviewer, description}) {
      const errors = {};

      if (!ip) {
        errors.ip = ['Не вдалося визначити вашу IP-адресу, тому ми не зможемо зберегти ваш відгук.'];
      }

      if (!score) {
        errors.score = ['Виберіть оцінку'];
      }

      if (!reviewer) {
        errors.reviewer = ['Введіть ваше ім\'я'];
      } else {
        if (reviewer.length < 2) {
          errors.reviewer = ['І\'я має містити щонайменше 2 символи']
        }
      }

      if (description) {
        if (description.length < 5) {
          errors.description = ['Відгук має містити щонайменше 5 символів']
        }
      }

      if (Object.keys(errors).length > 0) {
        return errors;
      }

      return null;
    },
    onSubmitReview() {
      this.errors = this.validateReviewForm(this.reviewForm);

      if (!this.errors) {
        this.storingReview = true;

        this.storeReview({request: this.reviewForm});
      }
    },
  },
  mounted() {
    this.loadReviewsIfMissing();

    if (!this.ip) {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      fetch('https://api.ipify.org?format=json')
          .then(x => x.json())
          .then(({ip}) => {
            if (ip) {
              this.loadingMy = true;

              this.loadMyReviews({ip, restaurantId: this.$route.params['restaurantId']});
            }

            this.setIp(ip);
          })
          .catch(function(e) {
            console.log('Fetch Error :-S', e);
          });
    } else {
      this.loadMyReviewsIfMissing({ip: this.ip, restaurantId: this.$route.params['restaurantId']});
    }
  },
});
</script>

<style scoped>
.rotated {
  transform: rotate(180deg);
}
</style>
