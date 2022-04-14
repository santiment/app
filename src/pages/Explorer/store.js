import { writable } from 'svelte/store'

const currentUser = writable({})

export { currentUser }
