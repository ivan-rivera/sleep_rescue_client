export const state = () => ({
  error: null,
  goalToDelete: null,
  thoughtToDelete: null,
  accountConfirmed: false,
  showSignInModal: false,
  showHeaderModal: false,
  showPasswordChangeModal: false,
  showEmailChangeModal: false,
  showAccountDeletionModal: false,
  showNightFormModal: false,
  showGoalsModal: false,
  showDeleteGoalModal: false,
  showDeleteThoughtModal: false,
  showCreateThoughtModal: false,
})

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  setGoalToDelete(state, goalId) {
    state.goalToDelete = goalId
  },
  setThoughtToDelete(state, thoughtId) {
    state.thoughtToDelete = thoughtId
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
  toggleNightFormModal(state) {
    state.showNightFormModal = !state.showNightFormModal
  },
  toggleGoalsModal(state) {
    state.showGoalsModal = !state.showGoalsModal
  },
  toggleDeleteGoalModal(state) {
    state.showDeleteGoalModal = !state.showDeleteGoalModal
  },
  toggleDeleteThoughtModal(state) {
    state.showDeleteThoughtModal = !state.showDeleteThoughtModal
  },
  toggleCreateThoughtModal(state) {
    state.showCreateThoughtModal = !state.showCreateThoughtModal
  },
  confirmAccount(state) {
    state.accountConfirmed = true
  },
  resetAccount(state) {
    state.accountConfirmed = false
  },
}
