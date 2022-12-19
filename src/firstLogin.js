import { query } from 'webkit/api'

query(`{
  currentUser {
    firstLogin
  }
}`).then(({ currentUser }) => {
  window.isFirstLogin = Boolean(currentUser && currentUser.firstLogin)
})
