<template>
  <div class="centralize">
    <h1 class="heading-top text-center mb-10">About Us</h1>
    <div class="prose-lg mb-10">
      <p>Hi there!</p>
      <p>
        SleepRescue.org was created by a single developer who, like you, also
        struggles to sleep at night (thankfully not so much anymore!). I was
        frustrated with the lack of available resources online which is why I
        decided to build this website. SleepRescue.org was largely inspired by
        <a class="web-link" href="sleepio.com">Sleepio.com</a>
        which admittedly is a better version of this site, however, sadly it is
        not available in all countries. If you can sign up to it for free, then
        I'd encourage you to try it out. In addition to Sleepio.com, this
        website was significantly inspired by the book
        <a
          href="https://www.amazon.com/Overcoming-Insomnia-Sleep-Problems-behavioural-ebook/dp/B0097AXVUU"
          >Overcoming Insomnia and Sleep Problems</a
        >
        by Collin Espie.
      </p>
      <p>
        I do not make a cent from operating this website but I do have to cover
        the costs of running it. Given that it is a costly side-project, this
        website may disappear without much of a warning -- please bear this in
        mind as a user.
      </p>
      <p>
        If you like this website, then please consider helping me and there are
        several ways that you can do it:
      </p>
      <ul>
        <li>Tell your friends about it</li>
        <li>
          <NuxtLink to="/contact" class="web-link">Contact</NuxtLink>
          me if you have any feedback or a suggestion
        </li>
        <li>
          If you are a web developer too, then consider joining me! This project
          is open-sourced and you can find the
          <a
            class="web-link"
            href="https://github.com/ivan-rivera/sleep_rescue_api"
            >backend</a
          >
          here and the
          <a
            class="web-link"
            href="https://github.com/ivan-rivera/sleep_rescue_client"
            >frontend</a
          >
          here.
        </li>
      </ul>
      <p>I hope you find value in this website. Sleep well!</p>
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
    title: 'About us',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'SleepRescue: who we are and what we do',
      },
      { charset: 'utf-8' },
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
