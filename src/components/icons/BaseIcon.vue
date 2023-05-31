<template>
 <svg :width="width" :height="height" :viewBox="viewBox"
    :aria-labelledby="title" role="presentation" xmlns="http://www.w3.org/2000/svg">
    <title :id="title" lang="en">{{ title }}</title>
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseIcon",
  props: {
    title: {
      type: String,
      default: "icon"
    },
    color: {
      type: String,
      default: "currentColor"
    },
    width: {
      default: 24
    },
    height: {
      default: 24
    },
    viewBox: {
      type: String,
      default: "0 0 24 24"
    }
  }
});
</script>
