export const state = () => ({
  error: null,
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
  },
  toggleHeaderModal(state) {
    state.showHeaderModal = !state.showHeaderModal
  },
  clearSignUpState(state) {
    state.showSignInModal = false
    state.showHeaderModal = false
  },
  togglePasswordChangeModal(state) {
    state.showPasswordChangeModal = !state.showPasswordChangeModal
  },
  toggleEmailChangeModal(state) {
    state.showEmailChangeModal = !state.showEmailChangeModal
  },
  toggleAccountDeletionModal(state) {
    state.showAccountDeletionModal = !state.showAccountDeletionModal
  },
}
