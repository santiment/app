import { useEffect } from 'react'
import { push } from 'react-router-redux'
import { useUser } from '../stores/user'
import { store } from '../redux'
import { PATHS } from '../paths'

const ignoredPages = ['/privacy-policy', '/roadmap']

const ForceActionRedirector = ({ pathname }) => {
  const { user } = useUser()

  useEffect(() => {
    if (!user || ignoredPages.includes(pathname)) return
    if (!user.privacyPolicyAccepted) {
      store.dispatch(push(PATHS.GDPR))
    } else if (!user.username) {
      store.dispatch(push(PATHS.USERNAME))
    }
  }, [user, pathname])

  return null
}

export default ForceActionRedirector
