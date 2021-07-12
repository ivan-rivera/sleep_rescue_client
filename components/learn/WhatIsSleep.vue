<template>
  <div>
    <h1 class="md-h1">What is sleep?</h1>
    <p>We all need to sleep.</p>
    <p>
      Contrary to what many people think, sleep is an active process and the
      activities that your body performs while you are asleep are important to
      your survival. However, if at this point you are worried that your poor
      sleep is causing you substantial harm, then please don't be, we will talk
      more about this in a later section.
    </p>
    <p>
      There are several
      <a
        class="web-link"
        href="https://www.sleepfoundation.org/how-sleep-works/stages-of-sleep"
        >stages</a
      >
      of sleep which are characterized by electrical activity occurring in your
      brain. Over the course of a regular night you cycle through these stages.
      They are:
    </p>
    <ul>
      <li>
        <span class="text-highlight">Stage 1:</span> This stage only lasts a
        matter of minutes and if you are awoken during this phase, then you
        might claim that you were not asleep at all.
      </li>
      <li>
        <span class="text-highlight">Stage 2:</span> your entirely body slows
        and cools down. Adults spend about half of their night in this stage.
      </li>
      <li>
        <span class="text-highlight">Stages 3 and 4:</span> these stages are
        known as deep sleep or delta-wave sleep. Stage 3 lasts minutes, while
        stage 4 makes up about 15% of your sleep and serves a vital restorative
        role. We tend to enter these deep sleep phases in the first half of the
        night only.
      </li>
      <li>
        <span class="text-highlight">REM:</span> REM stands for Rapid Eye
        Movement and this is the stage where we are believed to be seeing
        dreams. Remarkably, based on the EEG electrical wavelength analysis,
        this phase does not look that different from wakefulness or Stage 1
        sleep
      </li>
    </ul>
    <p>
      As you age, you
      <a href="https://medlineplus.gov/ency/article/004018.htm"
        >sleep habits change</a
      >. You begin to spend less time in deep sleep and you require less sleep
      per night. Bear this in mind when setting your goals!
    </p>
  </div>
</template>

<script>
export default {
  head: {
    meta: [
      {
        hid: 'sleep-rescue-what-is-sleep',
        name: 'What is sleep?',
        content: 'Everything you need to know about sleep',
      },
    ],
  },
}
</script>

<style scoped>
li::before {
  content: '‣ ';
}
a {
  text-decoration: none;
  @apply text-secondary hover:underline;
}
</style>
