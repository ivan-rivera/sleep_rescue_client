export default async function (context) {
  if (context.$auth.loggedIn) {
    const response = await context.$axios.get('v1/confirmation/status')
    const isConfirmed = response?.data?.email_is_confirmed ?? false
    context.store.commit('setConfirmedUserStatus', isConfirmed)
    if (!isConfirmed && !context.route.name.includes('confirm')) {
      context.redirect('confirm')
    }
  }
}
