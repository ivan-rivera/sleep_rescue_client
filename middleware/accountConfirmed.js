export default async function (context) {
  if (context.$auth.loggedIn) {
    const response = await context.$axios.get('v1/confirmation/status')
    const confirmed = response?.data?.email_is_confirmed ?? false
    if (!confirmed && !context.route.name.includes('confirm')) {
      context.redirect('confirm')
    }
  }
}
