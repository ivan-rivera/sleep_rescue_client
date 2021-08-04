<template>
  <div class="centralize">
    <h1 class="heading-top text-center mb-10">Privacy</h1>
    <div class="prose-lg mb-10">
      <p>
        Since SleepRescue.org does not generate any revenue, it is not backed up
        by a registered business, instead it is owned and operated by a single
        developer who created the website as a side-project.
      </p>
      <p>
        In order to provide the functionality that this website offers, it
        records your email address, a hashed version of your password (one-way
        encryption) as well as all the data that you choose to save (nightly
        records, goals, ISI surveys and thoughts). This data is stored in a
        protected, 3rd-party database. We also use Google Analytics to track
        aggregate-level events such as daily registrations, total unique
        visitors and similar metrics.
      </p>
      <p>
        SleepRescue.org will not, under any circumstances either sell or share
        your data with any other organisation. If you would like to remove all
        your data from the website's database, then you can delete your account
        which would permanently erase all of your records.
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
    title: 'Privacy',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Matters concerning your privacy',
      },
      { charset: 'utf-8' },
    ],
  },
}
</script>
