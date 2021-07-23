export const chapters = [
  {
    id: 1,
    title: 'Introduction',
    content: [{ id: 1, title: 'Foreword', link: '/learning/foreword' }],
  },
  {
    id: 2,
    title: 'Understanding Insomnia',
    content: [
      { id: 2, title: 'What is sleep?', link: '/learning/what-is-sleep' },
      {
        id: 3,
        title: 'Factors affecting sleep',
        link: '/learning/factors-affecting-sleep',
      },
      {
        id: 4,
        title: 'Is poor sleep hurting you?',
        link: '/learning/is-poor-sleep-hurting-you',
      },
      {
        id: 5,
        title: 'Types of insomnia',
        link: '/learning/types-of-insomnia',
      },
      {
        id: 6,
        title: 'Medical conditions',
        link: '/learning/medical-conditions',
      },
      {
        id: 7,
        title: 'Sleeping pills and natural remedies',
        link: '/learning/sleeping-pills',
      },
    ],
  },
  {
    id: 3,
    title: 'CBT-i',
    content: [
      { id: 8, title: 'What is CBT-i?', link: '/learning/what-is-cbti' },
      {
        id: 9,
        title: 'Expectation management',
        link: '/learning/expectation-management',
      },
      {
        id: 10,
        title: 'Tackling self-talk',
        link: '/learning/tackling-self-talk',
      },
      {
        id: 11,
        title: 'Lifestyle changes',
        link: '/learning/lifestyle-changes',
      },
      { id: 12, title: 'Your bedroom', link: '/learning/your-bedroom' },
      { id: 13, title: 'Stimulus control', link: '/learning/stimulus-control' },
      {
        id: 14,
        title: 'Sleep restriction',
        link: '/learning/sleep-restriction',
      },
    ],
  },
]

const flatChapters = chapters.map((s) => s.content.flat()).flat()

const getAttributeFromId = (attribute, id) => {
  const targetChapter = flatChapters.find((c) => c.id === id)
  return targetChapter === undefined ? null : targetChapter[attribute]
}

export const getNextTitleFromId = (id) => getAttributeFromId('title', id + 1)
export const getLastTitleFromId = (id) => getAttributeFromId('title', id - 1)
export const getNextLinkFromId = (id) => getAttributeFromId('link', id + 1)
export const getLastLinkFromId = (id) => getAttributeFromId('link', id - 1)
export const getIdFromTitle = (title) =>
  flatChapters.find((c) => c.title === title)?.id ?? null
