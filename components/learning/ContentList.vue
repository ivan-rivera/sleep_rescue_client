<template>
  <ul>
    <ul v-for="section in chapters" :key="section.id">
      <li class="section-header" :class="headerColor">{{ section.title }}</li>
      <ul v-for="subsection in section.content" :key="subsection.id">
        <li
          class="class-subsection-header"
          :class="{
            'font-bold text-dark lg:text-secondary':
              subsection.id === selectedId,
          }"
        >
          <NuxtLink :to="subsection.link">{{ subsection.title }}</NuxtLink>
        </li>
      </ul>
    </ul>
  </ul>
</template>

<script>
import { chapters, getIdFromTitle } from '~/assets/js/chapters'
export default {
  props: {
    selectedTitle: {
      type: String,
      required: true,
    },
    headerColor: {
      type: String,
      default: 'text-supplementary',
      required: false,
    },
  },
  data() {
    return {
      chapters,
    }
  },
  computed: {
    selectedId() {
      return getIdFromTitle(this.selectedTitle)
    },
  },
}
</script>

<style scoped>
.section-header {
  @apply font-bold text-base;
}
.class-subsection-header {
  @apply hover:underline cursor-pointer;
}
ul > ul > li {
  @apply ml-5;
}
ul {
  @apply pb-2;
}
ul > ul > ul > li::before {
  content: '‣ ';
}
</style>
