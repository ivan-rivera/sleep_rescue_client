export const state = () => ({
  error: null,
  showScreenBlur: false,
  showSignInModal: false,
  showHeaderModal: false,
  showPasswordChangeModal: false,
  showEmailChangeModal: false,
  showAccountDeletionModal: false,
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
  togglePasswordChangeModal(state) {
    state.showScreenBlur = !state.showScreenBlur
    state.showPasswordChangeModal = !state.showPasswordChangeModal
  },
  toggleEmailChangeModal(state) {
    state.showScreenBlur = !state.showScreenBlur
    state.showEmailChangeModal = !state.showEmailChangeModal
  },
  toggleAccountDeletionModal(state) {
    state.showScreenBlur = !state.showScreenBlur
    state.showAccountDeletionModal = !state.showAccountDeletionModal
  },
}
