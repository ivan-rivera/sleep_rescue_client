<template>
  <div
    class="flex flex-col lg:flex-row relative max-w-6xl justify-between centralize"
  >
    <div class="flex flex-col">
      <div class="learning-content prose">
        <h1 class="md-h1">{{ chapterTitle }}</h1>
        <slot></slot>
      </div>
      <div class="hidden lg:flex lg:flex-row justify-between pr-5">
        <NuxtLink
          class="action-btn w-28 !bg-white !text-dark font-bold"
          :class="{ hidden: lastTitle == null }"
          :title="lastTitle"
          :to="lastLink"
        >
          &lt; Previous
        </NuxtLink>
        <NuxtLink to="/">
          <div
            v-if="!$auth.loggedIn"
            class="action-btn w-28 !bg-secondary font-bold ml-5"
          >
            Sign up!
          </div>
        </NuxtLink>
        <NuxtLink
          class="action-btn w-28 !bg-white !text-dark font-bold"
          :class="{ hidden: nextTitle == null }"
          :title="nextTitle"
          :to="nextLink"
        >
          Next &gt;
        </NuxtLink>
      </div>
    </div>
    <div class="small-device-nav">
      <div class="flex flex-col items-center">
        <div class="learning-center-nav-title">Learning Center</div>
        <transition name="slide">
          <ContentList
            v-if="showSmallNav"
            :selected-title="chapterTitle"
            header-color="text-primary"
            class="!text-dark text-xs"
          />
        </transition>
        <div class="flex flex-row items-center">
          <NuxtLink
            class="nav-btn nav-last"
            :class="lastTitle != null ? 'active-nav-btn' : '!text-dark'"
            :title="lastTitle"
            :to="lastLink"
          >
            &lt; Previous
          </NuxtLink>
          <div
            class="nav-btn active-nav-btn nav-middle cursor-pointer"
            @click="showSmallNav = !showSmallNav"
          >
            <font-awesome-icon :icon="['fa', 'map-signs']" />
          </div>
          <NuxtLink
            class="nav-btn nav-next"
            :class="nextTitle != null ? 'active-nav-btn' : '!text-dark'"
            :title="nextTitle"
            :to="nextLink"
          >
            Next &gt;
          </NuxtLink>
        </div>
        <NuxtLink
          v-if="!$auth.loggedIn"
          to="/"
          class="nav-btn active-nav-btn mt-1 rounded-2xl w-64"
        >
          Sign up!
        </NuxtLink>
      </div>
    </div>
    <div class="learning-toc">
      <div class="sticky top-36">
        <h1 class="text-4xl font-bold text-left pl-5 mb-5">Learning Center</h1>
        <ContentList :selected-title="chapterTitle" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  chapters,
  getIdFromTitle,
  getNextTitleFromId,
  getLastTitleFromId,
  getNextLinkFromId,
  getLastLinkFromId,
} from '~/assets/js/chapters'
import ContentList from '~/components/learning/ContentList'
export default {
  auth: false,
  components: { ContentList },
  props: {
    chapterTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showSmallNav: false,
      chapters,
    }
  },
  computed: {
    chapterId() {
      return getIdFromTitle(this.chapterTitle)
    },
    nextTitle() {
      return getNextTitleFromId(this.chapterId)
    },
    nextLink() {
      return getNextLinkFromId(this.chapterId) ?? '/'
    },
    lastTitle() {
      return getLastTitleFromId(this.chapterId)
    },
    lastLink() {
      return getLastLinkFromId(this.chapterId) ?? '/'
    },
  },
}
</script>

<style scoped>
.learning-content {
  @apply pr-5;
}
.learning-toc {
  @apply border-l-2 border-white text-sm pl-5 hidden lg:block;
  min-width: 300px;
}
.small-device-nav {
  @apply sticky bottom-10 ml-auto mr-auto max-w-sm
  rounded-2xl
  bg-white p-2
  lg:hidden;
}
.nav-btn {
  @apply shadow-md
  bg-dark
  text-white text-center font-bold;
}
.active-nav-btn {
  @apply cursor-pointer
  transition duration-150;
}
.nav-last {
  @apply rounded-l-2xl w-24;
}
.nav-middle {
  @apply border-l-2 border-r-2 border-white pl-5 pr-5;
}
.nav-next {
  @apply rounded-r-2xl w-24;
}
.learning-center-nav-title {
  @apply text-dark
  font-bold
  text-lg
  text-center
  border-b-2 border-dark
  mb-1 pl-10 pr-10;
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.5s ease-in-out;
}

.slide-enter-to,
.slide-leave {
  max-height: 1000px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
.prose-sm:a {
  text-decoration: none;
  @apply text-secondary hover:underline;
}
li::before {
  content: '‣ ';
}
a {
  text-decoration: none;
  @apply text-secondary hover:underline;
}
</style>
