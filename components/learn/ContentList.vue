<template>
  <ul>
    <ul v-for="section in sections" :key="section.id">
      <li class="section-header" :class="headerColor">{{ section.title }}</li>
      <ul v-for="subsection in section.content" :key="subsection.id">
        <li
          class="class-subsection-header"
          :class="{
            'font-bold underline': subsection.id === selectedPage,
          }"
          @click="select(subsection.id)"
        >
          {{ subsection.title }}
        </li>
      </ul>
    </ul>
  </ul>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      required: true,
    },
    selectedPage: {
      type: Number,
      required: true,
    },
    select: {
      type: Function,
      required: true,
    },
    headerColor: {
      type: String,
      default: 'text-supplementary',
      required: false,
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
