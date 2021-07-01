<template>
  <div>
    <div v-if="loading" class="text-xl text-center">Loading...</div>
    <div
      v-if="!loading"
      class="flex flex-col lg:flex-row relative max-w-6xl justify-between"
    >
      <div class="flex flex-col">
        <div class="learning-content prose-sm sm:prose">
          <Foreword v-if="selectedPage === 1" />
          <LetsTalkAboutSleep v-if="selectedPage === 2" />
          <FactorsAffectingSleep v-if="selectedPage === 3" />
          <ReasonsWeCannotSleep v-if="selectedPage === 4" />
          <IsPoorSleepHurtingYou v-if="selectedPage === 5" />
          <TypesOfInsomnia v-if="selectedPage === 6" />
          <MedicalConditions v-if="selectedPage === 7" />
          <SleepingPills v-if="selectedPage === 8" />
          <ExpectationManagement v-if="selectedPage === 9" />
          <TacklingSelfTalk v-if="selectedPage === 10" />
          <SleepRestriction v-if="selectedPage === 11" />
          <StimulusControl v-if="selectedPage === 12" />
          <YourBedroom v-if="selectedPage === 13" />
          <LifestyleChanges v-if="selectedPage === 14" />
        </div>
        <div class="hidden lg:flex lg:flex-row justify-between pr-5">
          <div
            class="action-btn w-28 !bg-white font-bold"
            :class="{ hidden: !lastExists }"
            :title="lastTitle"
            @click="updateSelection(-1)"
          >
            &lt; Previous
          </div>
          <NuxtLink to="/">
            <div
              v-if="!$auth.loggedIn"
              class="action-btn w-28 !bg-secondary font-bold ml-5"
            >
              Sign up!
            </div>
          </NuxtLink>
          <div
            class="action-btn w-28 !bg-white font-bold"
            :class="{ hidden: !nextExists }"
            :title="nextTitle"
            @click="updateSelection(1)"
          >
            Next &gt;
          </div>
        </div>
      </div>
      <div class="small-device-nav">
        <div class="flex flex-col items-center">
          <div class="learning-center-nav-title">Learning Center</div>
          <transition name="slide">
            <ContentList
              v-if="showSmallNav"
              :sections="sections"
              :selected-page="selectedPage"
              :select="select"
              header-color="text-primary"
              class="!text-dark text-xs"
            />
          </transition>
          <div class="flex flex-row items-center">
            <div
              class="nav-btn nav-last"
              :class="lastExists ? 'active-nav-btn' : '!text-dark'"
              :title="lastTitle"
              @click="updateSelection(-1)"
            >
              &lt; Previous
            </div>
            <div
              class="nav-btn active-nav-btn nav-middle cursor-pointer"
              @click="showSmallNav = !showSmallNav"
            >
              <font-awesome-icon :icon="['fa', 'map-signs']" />
            </div>
            <div
              class="nav-btn nav-next"
              :class="nextExists ? 'active-nav-btn' : '!text-dark'"
              :title="nextTitle"
              @click="updateSelection(1)"
            >
              Next &gt;
            </div>
          </div>
          <NuxtLink
            v-if="!$auth.loggedIn"
            to="/"
            class="nav-btn active-nav-btn mt-1 rounded-2xl w-full"
          >
            Sign up!
          </NuxtLink>
        </div>
      </div>
      <div class="learning-toc">
        <div class="sticky top-36">
          <h1 class="text-4xl font-bold text-left pl-5 mb-5">
            Learning Center
          </h1>
          <ContentList
            :sections="sections"
            :selected-page="selectedPage"
            :select="select"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: open it up to unauthenticated users and conditionally display sign up
// TODO: decorate with metadata (for each component)
// TODO: write up!
import ContentList from '~/components/learn/ContentList'
import Foreword from '~/components/learn/Foreword'
import LetsTalkAboutSleep from '~/components/learn/LetsTalkAboutSleep'
import FactorsAffectingSleep from '~/components/learn/FactorsAffectingSleep'
import ReasonsWeCannotSleep from '~/components/learn/ReasonsWeCannotSleep'
import IsPoorSleepHurtingYou from '~/components/learn/IsPoorSleepHurtingYou'
import TypesOfInsomnia from '~/components/learn/TypesOfInsomnia'
import MedicalConditions from '~/components/learn/MedicalConditions'
import SleepingPills from '~/components/learn/SleepingPills'
import ExpectationManagement from '~/components/learn/ExpectationManagement'
import TacklingSelfTalk from '~/components/learn/TacklingSelfTalk'
import SleepRestriction from '~/components/learn/SleepRestriction'
import StimulusControl from '~/components/learn/StimulusControl'
import YourBedroom from '~/components/learn/YourBedroom'
import LifestyleChanges from '~/components/learn/LifestyleChanges'
export default {
  auth: false,
  components: {
    ContentList,
    Foreword,
    LetsTalkAboutSleep,
    FactorsAffectingSleep,
    ReasonsWeCannotSleep,
    IsPoorSleepHurtingYou,
    TypesOfInsomnia,
    MedicalConditions,
    SleepingPills,
    ExpectationManagement,
    TacklingSelfTalk,
    SleepRestriction,
    StimulusControl,
    YourBedroom,
    LifestyleChanges,
  },
  data() {
    return {
      loading: true,
      selectedPage: 1,
      showSmallNav: false,
      sections: [
        {
          id: 1,
          title: 'Introduction',
          content: [{ title: 'Foreword', id: 1 }],
        },
        {
          id: 2,
          title: 'Understanding Insomnia',
          content: [
            { title: 'Let us talk about sleep', id: 2 },
            { title: 'Factors affecting sleep', id: 3 },
            { title: 'Reasons we cannot sleep', id: 4 },
            { title: 'Is poor sleep hurting you?', id: 5 },
            { title: 'Types of insomnia', id: 6 },
            { title: 'Medical conditions', id: 7 },
            { title: 'Sleeping pills and natural remedies', id: 8 },
          ],
        },
        {
          id: 3,
          title: 'CBT-i',
          content: [
            { title: 'Expectation management', id: 9 },
            { title: 'Tackling self-talk', id: 10 },
            { title: 'Sleep restriction', id: 11 },
            { title: 'Stimulus control', id: 12 },
            { title: 'Your bedroom', id: 13 },
            { title: 'Lifestyle changes', id: 14 },
          ],
        },
      ],
    }
  },
  computed: {
    titles() {
      const flatSections = this.sections.map((s) => s.content.flat()).flat()
      return flatSections.map((k) => k.title)
    },
    nextExists() {
      return this.selectedPage !== this.titles.length
    },
    lastExists() {
      return this.selectedPage > 1
    },
    nextTitle() {
      return this.nextExists ? this.titles[this.selectedPage] : 'No content'
    },
    lastTitle() {
      return this.lastExists ? this.titles[this.selectedPage - 2] : 'No content'
    },
  },
  beforeMount() {
    this.selectedPage = this.getSelectedPage()
    this.loading = false
  },
  methods: {
    getSelectedPage() {
      return parseInt(localStorage.getItem('selectedPage'))
    },
    select(id) {
      this.selectedPage = id
      localStorage.setItem('selectedPage', id)
    },
    updateSelection(increment) {
      const newValue = this.selectedPage + increment
      if (newValue > 0 && newValue <= this.titles.length) {
        this.select(newValue)
      }
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
  @apply sticky bottom-10 ml-auto mr-auto
  bg-white rounded-2xl p-2
  max-w-sm
  lg:hidden;
}
.nav-btn {
  @apply shadow-md
  bg-dark
  text-white text-center font-bold;
}
.active-nav-btn {
  @apply cursor-pointer
  transition duration-150
  hover:bg-secondary hover:text-dark;
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
</style>
