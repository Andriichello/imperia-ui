<template>
  <div class="w-full flex justify-center items-center">
    <div class="form-control w-full flex flex-row justify-start items-start gap-2">
      <div class="flex flex-col justify-center items-center gap-1">
        <div class="flex justify-center start-center mt-1.5">
          <BaseIcon title="comment" color="currentColor" :width="24" :height="24" viewBox="0 0 24 24">
            <g id="comment">
              <g id="Chat">
                <g id="Group 3">
                  <mask id="mask0_60_13528" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                    <path id="Clip 2" fill-rule="evenodd" clip-rule="evenodd" d="M1 1.00024H22.493V22.494H1V1.00024Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_60_13528)">
                    <path id="Fill 1" fill-rule="evenodd" clip-rule="evenodd" d="M6.10844 19.6752C6.68844 19.6752 7.23544 19.8952 7.81444 20.1282C11.3614 21.7682 15.5564 21.0222 18.2894 18.2902C21.8954 14.6822 21.8954 8.81324 18.2894 5.20724C16.5434 3.46124 14.2214 2.50024 11.7494 2.50024C9.27644 2.50024 6.95344 3.46224 5.20844 5.20824C2.47444 7.94024 1.73044 12.1352 3.35544 15.6482C3.58944 16.2272 3.81544 16.7912 3.81544 17.3772C3.81544 17.9622 3.61444 18.5512 3.43744 19.0712C3.29144 19.4992 3.07044 20.1452 3.21244 20.2872C3.35144 20.4312 4.00144 20.2042 4.43044 20.0572C4.94544 19.8812 5.52944 19.6792 6.10844 19.6752ZM11.7244 22.4942C10.1964 22.4942 8.65844 22.1712 7.21944 21.5052C6.79544 21.3352 6.39844 21.1752 6.11344 21.1752C5.78544 21.1772 5.34444 21.3292 4.91844 21.4762C4.04444 21.7762 2.95644 22.1502 2.15144 21.3482C1.34944 20.5452 1.71944 19.4602 2.01744 18.5872C2.16444 18.1572 2.31544 17.7132 2.31544 17.3772C2.31544 17.1012 2.18244 16.7492 1.97844 16.2422C0.105437 12.1972 0.971437 7.32224 4.14844 4.14724C6.17644 2.11824 8.87544 1.00024 11.7484 1.00024C14.6214 1.00024 17.3214 2.11724 19.3494 4.14624C23.5414 8.33824 23.5414 15.1582 19.3494 19.3502C17.2944 21.4062 14.5274 22.4942 11.7244 22.4942Z"/>
                  </g>
                </g>
                <path id="Fill 4" fill-rule="evenodd" clip-rule="evenodd" d="M15.6964 13.1628C15.1444 13.1628 14.6924 12.7158 14.6924 12.1628C14.6924 11.6098 15.1354 11.1628 15.6874 11.1628H15.6964C16.2484 11.1628 16.6964 11.6098 16.6964 12.1628C16.6964 12.7158 16.2484 13.1628 15.6964 13.1628Z"/>
                <path id="Fill 6" fill-rule="evenodd" clip-rule="evenodd" d="M11.6876 13.1628C11.1356 13.1628 10.6836 12.7158 10.6836 12.1628C10.6836 11.6098 11.1256 11.1628 11.6786 11.1628H11.6876C12.2396 11.1628 12.6876 11.6098 12.6876 12.1628C12.6876 12.7158 12.2396 13.1628 11.6876 13.1628Z"/>
                <path id="Fill 8" fill-rule="evenodd" clip-rule="evenodd" d="M7.67832 13.1628C7.12632 13.1628 6.67432 12.7158 6.67432 12.1628C6.67432 11.6098 7.11732 11.1628 7.66932 11.1628H7.67832C8.23032 11.1628 8.67832 11.6098 8.67832 12.1628C8.67832 12.7158 8.23032 13.1628 7.67832 13.1628Z"/>
              </g>
            </g>
          </BaseIcon>
        </div>

<!--        <button class="btn btn-sm btn-ghost btn-square" @click="onDelete">-->
<!--          <BaseIcon class="text-error" width="24" height="24" viewBox="0 0 24 24" fill="none">-->
<!--            <path d="M18.8789 8.71882L18.9784 8.72017C19.3475 8.75069 19.6304 9.05716 19.65 9.42605L19.6405 9.63174L19.326 13.483L18.9961 17.2414C18.9263 17.9917 18.8638 18.6245 18.8099 19.1227C18.6225 20.8588 17.4955 21.9323 15.7966 21.9641C13.1494 22.013 10.6048 22.0125 8.13373 21.9591C6.48398 21.9244 5.37366 20.8393 5.18955 19.1297L5.0623 17.8702L4.83994 15.427L4.61216 12.7461L4.35172 9.52788C4.31935 9.11498 4.61951 8.75335 5.02215 8.72016C5.39123 8.68973 5.7183 8.94584 5.79519 9.30677L5.82511 9.60173L6.06966 12.6187L6.33669 15.7459C6.45646 17.0996 6.56034 18.1952 6.64346 18.9648C6.74838 19.939 7.26138 20.4404 8.16411 20.4593C10.6159 20.5124 13.1415 20.5129 15.7701 20.4643C16.7277 20.4464 17.2488 19.9499 17.356 18.9574L17.4827 17.7046C17.5198 17.3185 17.5594 16.8923 17.6013 16.4293L17.8686 13.3538L18.1906 9.4075C18.2204 9.02902 18.5192 8.7389 18.8789 8.71882ZM3.73139 6.98918C3.32745 6.98918 3 6.65338 3 6.23916C3 5.85945 3.27515 5.54564 3.63214 5.49597L3.73139 5.48913H6.91772C7.29636 5.48913 7.62785 5.23928 7.74642 4.87929L7.77543 4.76813L8.02304 3.50533C8.24111 2.66897 8.9492 2.07349 9.779 2.00633L9.93592 2H14.0639C14.9075 2 15.6523 2.54628 15.9391 3.39039L15.9874 3.55209L16.2243 4.76783C16.2987 5.14872 16.6025 5.4332 16.9701 5.48177L17.0821 5.48913H20.2686C20.6725 5.48913 21 5.82493 21 6.23916C21 6.61887 20.7248 6.93267 20.3679 6.98234L20.2686 6.98918H3.73139ZM14.0639 3.50006H9.93592C9.7307 3.50006 9.54829 3.62322 9.47252 3.77803L9.44682 3.84604L9.20979 5.06238C9.1808 5.21084 9.13879 5.3538 9.08512 5.49012L14.9148 5.49031C14.8813 5.40526 14.8523 5.31763 14.8282 5.22768L14.79 5.06208L14.5636 3.8928C14.5107 3.68991 14.3473 3.54138 14.1502 3.50742L14.0639 3.50006Z"/>-->
<!--          </BaseIcon>-->
<!--        </button>-->
      </div>

      <textarea class="textarea textarea-ghost textarea-xs w-full text-[16px] font-semibold px-1 bg-transparent"
                style="min-height: 1lh; resize: none; overflow-wrap: break-word; white-space: pre-wrap;"
                name="comment" type="text" v-model="commentVal" maxlength="255"
                :rows="rows"
                :placeholder="$t('banquet.comment') + '...'"/>

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BaseIcon from "@/components/icons/BaseIcon.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: 'Comment',
  emits: ["on-update", "on-delete"],
  components: {BaseIcon},
  props: {
    comment: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
    minRows: {
      type: Number,
      default: 2,
    }
  },
  data() {
    return {
      commentVal: this.comment?.text,
    }
  },
  computed: {
    rows() {
      if (!this.commentVal) {
        return this.minRows;
      }

      const newlines = this.commentVal.split('\n').length - 1;

      return Math.min(Math.max(this.minRows, newlines + (newlines > 0 ? 1 : 0)), 10);
    },
  },
  watch: {
    commentVal(newVal) {
      const comment = {...this.comment};
      comment.text = newVal;

      this.onUpdate({comment: comment, index: this.index});
    },
  },
  methods: {
    onUpdate({comment, index}) {
      this.$emit('on-update', {comment, index})
    },
    onDelete({comment}) {
      this.$emit('on-delete', {comment, index: this.index})
    },
  }

})
</script>

<style scoped>
  .customer {
    @apply flex flex-col justify-center items-center card bg-base-200/80 shadow-md w-full p-3;
  }

  .selected {
    @apply text-black;
    background-color: var(--yellow);
  }

  .selected:hover {
    background-color: var(--yellow);
  }
</style>
