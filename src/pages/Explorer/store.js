import { writable } from 'svelte/store'

const currentUser = writable({})
const userSubscription = writable({})
const trendingWords = writable([])
const trendingWordsVolume = writable({})
const alertMessage = writable('')

export { currentUser, userSubscription, trendingWords, trendingWordsVolume, alertMessage }
