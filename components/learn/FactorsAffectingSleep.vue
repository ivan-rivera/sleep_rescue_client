<template>
  <div>
    <h1>Factors affecting sleep</h1>
    <p>
      There are
      <a
        href="http://healthysleep.med.harvard.edu/healthy/science/how/external-factors"
        >many factors affecting your sleep</a
      >, but they can all be grouped into one of the following 4 categories:
    </p>
    <ul>
      <li>
        <span class="text-highlight">Environmental:</span> you need an
        appropriate environment for sleeping. While it may not surprise you to
        learn that you need a dark and quiet environment with comfortable room
        temperature to be able to sleep well, there is more to it than that! For
        example, if you work in the same room where you sleep, you may find it
        difficult to switch off in your bedroom.
      </li>
      <li>
        <span class="text-highlight">Medical:</span> sleep problems may be
        caused by underlying medical conditions which is why it is important to
        see a doctor if you are having trouble sleeping.
      </li>
      <li>
        <span class="text-highlight">Physiological:</span> this category covers
        all sleep-related problems that do not constitute a medical condition.
        For example, you may find it difficult to fall asleep when you are
        hungry or if you've had coffee.
      </li>
      <li>
        <span class="text-highlight">Psychological:</span> if you are suffering
        from chronic insomnia and you've ruled out potential medical conditions
        that may interfere with your sleep, chances are that your sleep problems
        are psychological. In fact, it is not uncommon for insomniacs to become
        fearful of their bedrooms!
      </li>
    </ul>
    <p>
      Note that each of the above categories is covered in the future sections,
      however, you may already begin to evaluate your own problem by considering
      these categories.
    </p>
  </div>
</template>

<script>
export default {
  head: {
    meta: [
      {
        hid: 'sleep-rescue-factors-affecting-sleep',
        name: 'Factors Affecting Sleep',
        content:
          'Learn what factors negatively influence your sleep and what you can do about it',
      },
    ],
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  @apply text-secondary hover:underline;
}
</style>
