<template>
  <div class="centralize">
    <h1 class="heading-top text-center mb-10">Terms & Conditions</h1>
    <div class="prose-lg mb-10">
      <p>
        First and foremost, by using SleepRescue.org, you agree to the terms and
        conditions outlined on this page, as well as all amendments that may be
        introduced.
      </p>
      <p>
        SleepRescue.org provides self-help resources but it offers no
        guarantees. Furthermore, all recommendations that can be found on this
        website are not medical in nature. If you, the user, are concerned about
        your health, then you should see a medical professional and use all
        advice offered on this website at your own risk. SleepRescue.org takes
        no responsibility for any adverse effects that you may suffer by either
        using this website or following its advice.
      </p>
      <p>
        SleepRescue.org is owned and operated by a sole individual. Since the
        website is not generating any revenue, it is not backed up by a
        registered business.
      </p>
    </div>
    <NuxtLink :to="homePath">
      <div class="action-btn w-28 !bg-white font-bold">&lt; Back</div>
    </NuxtLink>
  </div>
</template>

<script>
import { HOME_PATH } from 'assets/js/constants'
export default {
  auth: false,
  data() {
    return {
      homePath: HOME_PATH,
    }
  },
  head: {
    title: 'Terms and Conditions',
    meta: [
      {
        hid: 'sleep-rescue-tc',
        name: 'Terms and Conditions',
        content: 'SleepRescue.org terms and conditions',
      },
    ],
  },
}
</script>
