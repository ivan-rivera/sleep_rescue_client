<template>
  <div>
    <h1 class="md-h1">Sleep restriction</h1>
    <p>
      <a
        href="https://stanfordhealthcare.org/medical-treatments/c/cognitive-behavioral-therapy-insomnia/procedures/sleep-restriction.html"
        >Sleep restriction</a
      >, also known as sleep scheduling, is by far the toughest yet most
      effective and the most important element of CBT-i. It may take you several
      attempts to implement this properly and you may find yourself giving up.
      If you do, then don't get upset with yourself, just start again as if your
      are doing it for the first time.
    </p>
    <p>
      Before you can implement sleep restriction, you need to find out how much
      sleep you are getting on average. If you have an account with us, then
      consider using our <NuxtLink to="/dashboard">sleep diary</NuxtLink> to
      track each night. If you would like to keep a diary by yourself, then you
      should still consider creating an account to see what exactly we recommend
      to record each night -- like we said, this will require some commitment!
      Spend the following two weeks keeping track of your sleep. You might find
      this exercise illuminating as many insomniacs tend to understate how much
      sleep they are actually getting (one of those irrational negative
      thoughts!).
    </p>
    <p>
      By the end of the 2-week period you should have an average sleep time,
      let's say 6 hours. If your average is below 5 hours, then use 5 hours
      instead of your average. Next, you need to come up with your desired
      wake-up time. let's say that your desired wake-up time is 7am. The only
      thing that's left to decide now is what time you should go to bed and
      that's where your recorded average sleep time comes into the equation.
      Subtract your average sleep time from your desired wake-up time to find
      out the
      <em>earliest</em> time when you can go to bed, so in the above example
      that would be 1am -- 6 hours from 7am. However, if you are not sleepy at
      1am, then you should stay out of your bedroom. This schedule is meant to
      maximise the chances of you sleeping through the night.
    </p>
    <p>
      You will probably find that your first week or two is going to be pretty
      rough which is why we've warned you about what to do if you find yourself
      giving up. Hopefully, over time you will find that your sleep is becoming
      consolidated. To measure this, track your <em>sleep efficiency</em>, which
      is the proportion of time in bed that you were asleep for. If after a week
      your average sleep efficiency reaches or exceeds 90%, then you can go to
      bed 15 minutes earlier and spend another week on your updated schedule. On
      the other hand, if your average sleep efficiency dips below 85% then go to
      bed 15 minutes later (as long as your sleep window is no shorter than 5
      hours) for a week. You should continue incrementally updating your sleep
      schedule until your reach your desired sleep window.
    </p>
  </div>
</template>

<script>
export default {
  head: {
    meta: [
      {
        hid: 'sleep-rescue-sleep-restriction',
        name: 'Sleep Restriction Therapy',
        content:
          'What is Sleep Restriction Therapy and how you can use it to beat insomnia',
      },
    ],
  },
}
</script>
