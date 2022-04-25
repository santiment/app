import { writable } from 'svelte/store'

const currentUser = writable({})
const userSubscription = writable({})
const trendingWords = writable({})
const explorerItems = writable([])

export { currentUser, userSubscription, trendingWords, explorerItems }
