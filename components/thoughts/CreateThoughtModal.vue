<template>
  <Modal modal-width="" class="pb-10" @toggleModal="toggleCreateThoughtModal">
    <h1 class="title-text text-center mt-8 mb-8">Create a Thought</h1>
    <form
      action=""
      name="create-thought"
      method="post"
      class="ml-auto mr-auto w-full"
      @submit.prevent="createThought"
    >
      <div>
        <div>
          <h2 class="entry-title">Negative thought</h2>
          <textarea
            id="negative-thought"
            v-model="negativeThought"
            class="thought-entry negative-thought-entry"
            name="negative-thought"
            cols="12"
            rows="3"
            placeholder="If I don't get at least 6 hours of sleep, I won't be able to function tomorrow..."
            pattern="\w{10,}"
            oninput="setCustomValidity('')"
            oninvalid="setCustomValidity('A thought must be at least 10 characters long')"
          ></textarea>
          <p
            class="chars-left"
            :class="negativeApproachingLimit ? 'text-secondary' : 'text-white'"
          >
            {{ negativeCharsLeft }}
          </p>
        </div>
        <div>
          <h2 class="entry-title">Counter-thought</h2>
          <textarea
            id="counter-thought"
            v-model="counterThought"
            class="thought-entry counter-thought-entry"
            name="counter-thought"
            cols="12"
            rows="3"
            placeholder="If I don't get 6 hours of sleep, then I'll be tired but I'll get by and I'll fall asleep faster tomorrow..."
            pattern="\w{10,}"
            oninput="setCustomValidity('')"
            oninvalid="setCustomValidity('A thought must be at least 10 characters long')"
          ></textarea>
          <p
            class="chars-left"
            :class="counterApproachingLimit ? 'text-secondary' : 'text-white'"
          >
            {{ counterCharsLeft }}
          </p>
        </div>
      </div>
      <div>
        <div v-if="!allowedToSubmit" class="stop-submit">
          <font-awesome-icon :icon="['fa', 'exclamation-circle']" />
          Your text is too long!
        </div>
        <div v-if="allowedToSubmit" class="w-full text-center">
          <input
            class="action-btn w-28"
            type="submit"
            name="submit-thought"
            :value="buttonLabel"
            :class="isLoading ? 'animate-pulse' : ''"
          />
        </div>
      </div>
    </form>
  </Modal>
</template>

<script>
import { mapMutations } from 'vuex'
import Modal from '~/components/layout/Modal'
export default {
  // TODO: add "chars left"
  // TODO: change colour when limit is approaching
  // TODO: add warning when limit exceeded and hide the submit button
  components: { Modal },
  data() {
    return {
      isLoading: false,
      negativeThought: null,
      counterThought: null,
      charLimit: 150,
    }
  },
  computed: {
    buttonLabel() {
      return this.isLoading ? 'Processing...' : 'Submit'
    },
    allowedToSubmit() {
      return !this.negativeExceeded && !this.counterExceeded
    },
    negativeCharsLeft() {
      return this.displayCharsMessage(this.negativeThought, this.charLimit)
    },
    negativeApproachingLimit() {
      return this.approachingCharLimit(this.negativeThought, this.charLimit)
    },
    negativeExceeded() {
      return this.charLimitExceeded(this.negativeThought, this.charLimit)
    },
    counterCharsLeft() {
      return this.displayCharsMessage(this.counterThought, this.charLimit)
    },
    counterApproachingLimit() {
      return this.approachingCharLimit(this.counterThought, this.charLimit)
    },
    counterExceeded() {
      return this.charLimitExceeded(this.counterThought, this.charLimit)
    },
  },
  methods: {
    ...mapMutations(['toggleCreateThoughtModal']),
    displayCharsMessage(thought, limit) {
      if (thought == null) {
        return `${limit}/${limit} characters left`
      } else {
        return this.charLimitExceeded(thought, limit)
          ? `${thought.length - limit} characters over limit`
          : `${limit - thought.length}/${limit} characters left`
      }
    },
    charactersLeft(thought, limit) {
      return thought == null ? 0 : limit - thought.length
    },
    approachingCharLimit(thought, limit, threshold = 0.2) {
      return thought == null
        ? false
        : this.charactersLeft(thought, limit) / limit < threshold
    },
    charLimitExceeded(thought, limit) {
      return thought == null ? false : thought.length > limit
    },
    createThought() {
      if (!this.negativeExceeded && this.counterExceeded) {
        this.$emit('dataUpdated')
        this.$axios.$post('v1/thought', {
          negative_thought: this.negativeThought,
          counter_thought: this.counterThought,
        })
      }
    },
  },
}
</script>

<style scoped>
.entry-title {
  @apply text-center text-lg text-white font-bold;
}
.thought-entry {
  @apply w-full ml-auto mr-auto;
}
.negative-thought-entry {
  @apply bg-white;
}
.counter-thought-entry {
  @apply bg-white;
}
.chars-left {
  @apply text-center italic mb-5;
}
.stop-submit {
  @apply font-bold text-secondary text-center w-full;
}
</style>
