import { writable } from 'svelte/store'

const currentUser = writable({})
const userSubscription = writable({})

export { currentUser, userSubscription }
