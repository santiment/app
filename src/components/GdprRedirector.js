import { useEffect } from 'react'
import { push } from 'react-router-redux'
import { useUser } from '../stores/user'
import { store } from '../redux'

const ignoredPages = ['/privacy-policy', '/roadmap']

const GdprRedirector = ({ pathname }) => {
  const { user } = useUser()

  useEffect(
    () => {
      if (
        user &&
        !user.privacyPolicyAccepted &&
        !ignoredPages.includes(pathname)
      ) {
        store.dispatch(push('/gdpr'))
      }
    },
    [user, pathname]
  )

  return null
}

export default GdprRedirector
