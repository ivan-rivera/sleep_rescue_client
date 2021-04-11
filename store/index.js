export const state = () => ({
  error: null,
  showScreenBlur: false,
  showSignInModal: false,
  showHeaderModal: false,
})

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  toggleSignInModal(state) {
    state.showSignInModal = !state.showSignInModal
    state.showScreenBlur = !state.showScreenBlur
  },
  toggleHeaderModal(state) {
    state.showHeaderModal = !state.showHeaderModal
  },
  clearSignUpState(state) {
    state.showScreenBlur = false
    state.showSignInModal = false
    state.showHeaderModal = false
  },
}
