<template>
  <section class="modal-content">
    <h1 class="title-text">Password Reset</h1>
    <form action="" name="passwordReset" method="post" class="form-entry">
      <FormEntry form-type="text" placeholder="E-mail" icon="at" />
      <input class="action-btn" type="submit" name="reset" value="Continue" />
    </form>
    <p class="text-style">We will send you the instructions</p>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import FormEntry from '~/components/layout/FormEntry'
export default {
  components: { FormEntry },
  methods: {
    ...mapMutations({
      toggleSignInModal: 'toggleResetModal',
    }),
  },
}
</script>

<style scoped>
.text-style {
  @apply text-center;
}
</style>
