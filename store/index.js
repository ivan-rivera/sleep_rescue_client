export const state = () => ({
  error: null,
  showScreenBlur: false,
  showSignInModal: false,
  showResetModal: false,
  showHeaderModal: false,
})

export const mutations = {
  setError(state, error) {
    state.error = error
    setTimeout(() => {
      state.error = null
    }, 5000)
  },
  toggleSignInModal(state) {
    state.showSignInModal = !state.showSignInModal
    state.showScreenBlur = !state.showScreenBlur
  },
  toggleResetModal(state) {
    state.showResetModal = !state.showResetModal
    state.showScreenBlur = !state.showScreenBlur
  },
  toggleHeaderModal(state) {
    state.showHeaderModal = !state.showHeaderModal
  },
  clearSignUpState(state) {
    state.showScreenBlur = false
    state.showSignInModal = false
    state.showResetModal = false
    state.showHeaderModal = false
  },
}
