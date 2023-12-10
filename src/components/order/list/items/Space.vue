<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="w-full max-h-[180px] select-none" v-if="image">
      <figure class="w-full max-h-[180px] rounded-t-box" >
        <img :alt="title" :src="image"
             class="overflow-hidden"
             style="object-fit: cover;"
             @load="imageLoaded = true"/>
      </figure>
    </div>

    <div class="card-body min-h-[100px]">
      <div class="flex justify-between items-center card-title">
        <div class="grow flex justify-center items-start card-title">
          <h2 class="grow line-clamp-2 text-ellipsis flex justify-start items-center">
            {{ title }}
          </h2>
          <div class="badge badge-warning mt-1 select-none" v-if="badge && badge.length">
            {{ badge }}
          </div>
        </div>

        <div class="flex flex-nowrap justify-end items-end gap-2">
          <div class="btn btn-square btn-ghost btn-sm flex justify-center start-center self-start"
               @click="onAddComment">
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

          <button class="btn btn-sm btn-square btn-outline" :class="{'btn-active': this.field}"
                  @click="onToggle">
            <BaseIcon width="32" height="32" color="currentColor">
              <path d="M16.8395 9.7857C17.1911 9.4341 17.1911 8.8653 16.8395 8.5137C16.4879 8.1621 15.9191 8.1621 15.5675 8.5137L10.5083 13.5717L8.29547 11.3613C7.94387 11.0097 7.37507 11.0097 7.02347 11.3613C6.67187 11.7129 6.67187 12.2817 7.02347 12.6333L9.87226 15.4809C10.0475 15.6573 10.2791 15.7449 10.5083 15.7449C10.7387 15.7449 10.9691 15.6573 11.1443 15.4809L16.8395 9.7857Z" fill="white"/>
            </BaseIcon>
          </button>
        </div>
      </div>

      <div class="flex-grow">
        <p class="">
          {{ description }}
        </p>
      </div>

      <div class="card-actions justify-between items-end pt-2">
        <div class="flex flex-wrap flex-grow flex-row justify-start items-center gap-4">
          <div class="flex justify-center items-center gap-2">
            <span class="font-normal text-sm">{{$t('preview.space.floor')}}: </span>
            <span class="font-bold text-lg min-w-[16px]">{{ floor }}</span>
          </div>

          <div class="flex justify-center items-center gap-2">
            <span class="font-normal text-sm">{{$t('preview.space.number')}}: </span>
            <span class="font-bold text-lg min-w-[16px]">{{ number }}</span>
          </div>
        </div>

        <div class="breadcrumbs p-0 justify-end">
          <ul>
            <li>
              <h2 class="card-title grow">
                {{ price }}
              </h2>
            </li>

            <template v-for="alternation in alternations" :key="alternation.id">
              <li v-if="alternation.metadata?.price">
                <h2 class="card-title text-sm grow self-end">
                  {{ priceFormatted(alternation.metadata?.price) }}
                </h2>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <CommentList :comments="comments" class="w-full" v-if="comments?.length"
                   @on-update="onUpdateComment"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {mapActions, mapGetters} from "vuex";
import {priceFormatted} from "@/helpers";
import BaseIcon from "@/components/icons/BaseIcon.vue";
import CommentList from "@/components/order/comment/CommentList.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Space",
  components: {CommentList, BaseIcon},
  props: {
    spaceId: Number,
  },
  data() {
    return {
      imageLoaded: false,
    };
  },
  computed: {
    ...mapGetters({
      theme: "theme/get",
      authorized: "auth/authorized",
      fields: "order/spaces",
    }),
    isPreview() {
      return (this.$route.name ?? '').startsWith('preview');
    },
    field() {
      const fields = this.fields.filter(
          (s) => s.spaceId === this.id
      );

      return fields[0] ?? null;
    },
    id() {
      return this.spaceId;
    },
    item() {
      return this.$store.getters['order/orderedSpace'](this.spaceId)
          ?? this.$store.getters['preview/space'](this.spaceId);
    },
    title() {
      return this.item.title;
    },
    badge() {
      return this.item.badge;
    },
    description() {
      return this.item.description;
    },
    floor() {
      return this.item.floor;
    },
    number() {
      return this.item.number;
    },
    image() {
      const s = this.item;

      if (s.media && s.media.length) {
        return s.media[0].url;
      }

      return null;
    },
    price() {
      return priceFormatted(this.item?.price);
    },
    categories() {
      const ids = this.item.categoryIds ?? [];

      if (!ids.length) {
        return [];
      }

      return this.$store.getters['preview/spaceCategories']
          .filter(category => ids.includes(category.id));
    },
    alternations() {
      return this.item?.pendingAlterations ?? [];
    },
    comments() {
      if (!this.field || !this.field?.comments) {
        return [];
      }

      return this.field?.comments ?? [];
    },
  },
  methods: {
    priceFormatted,
    ...mapActions({
      setField: 'order/setSpace',
      unsetField: 'order/unsetSpace',
    }),
    onAddComment() {
      if (!this.field) {
        return;
      }

      if (this.comments && this.comments.length) {
        if (!this.comments[this.comments.length - 1].text.trim().length) {
          return;
        }
      }

      this.field.comments.push({text: ''});
    },
    onUpdateComment({comment, index}) {
      const comments = [...(this.comments ?? [])];
      comments[index].text = comment.text;

      if (comments && comments.length > 1) {
        let empties = 0;

        comments.forEach((c) => {
          if (c.text.trim().length) {
            empties = 0;
          } else {
            empties++;
          }
        });

        while (empties > 1) {
          comments.pop();
          empties--;
        }
      }

      this.setField({
        spaceId: this.spaceId,
        comments: comments
      });
    },
    onToggle() {
      if (this.field) {
        this.unsetField({
          spaceId: this.id
        });
      } else {
        this.setField({
          spaceId: this.id,
          comments: this.field?.comments ?? [],
        });
      }
    },
  },
});
</script>

<style scoped>

.indicator-center {
  --tw-translate-y: -55%;
}

img {
  pointer-events: none
}

.btn-selected {
  @apply btn-outline border-base-content bg-base-content text-base-100;
}
</style>
