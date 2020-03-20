import { writable } from 'svelte/store'

const stores = {
  page: writable({
    query: {}
  }),
  session: writable({ currentUser: null })
}

const stores$ = () => stores

export { stores$ as stores }

export const goto = () => {}
