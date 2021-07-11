<template>
  <div>
    <h1 class="md-h1">Foreword</h1>
    <p>Welcome to SleepRescue.org!</p>
    <p>
      By visiting this page, you've taken the first and the most important step
      towards improving your sleep.
    </p>
    <p>
      SleepRescue offers both the learning resources as well as tools needed to
      practice
      <a
        class="font-bold"
        href="https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy_for_insomnia"
        >Cognitive Behavioural Therapy for Insomnia (CBT-i) </a
      >.
    </p>
    <p>In short, SleepRescue will help you</p>
    <ul>
      <li>Understand insomnia</li>
      <li>Challenge your relationship with your sleep</li>
      <li>Propose a strategy for getting your sleep on track</li>
      <li>Equip you with the tools to implement the above strategy</li>
    </ul>
  </div>
</template>

<script>
export default {
  head: {
    meta: [
      {
        hid: 'sleep-rescue-foreword',
        name: 'Foreword',
        content: 'What you can expect to learn on SleepRescue.org',
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
