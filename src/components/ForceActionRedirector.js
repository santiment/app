import { useEffect } from 'react'
import { push } from 'react-router-redux'
import { useUser } from '../stores/user'
import { store } from '../redux'
import { PATHS } from '../paths'
import { useChannel } from '../utils/socketHooks'
import { useUserSubscriptionStatus } from '../stores/user/subscriptions'

const ignoredPages = ['/privacy-policy', '/roadmap']
const LIMIT_TAB_ALLOWED_PAGES = [...ignoredPages, '/pricing']
const TRY_WAIT_TIME_MS = 3000
const MAX_TABS_FREE = 2
const MAX_TABS_PRO = 4

const ForceActionRedirector = ({ pathname }) => {
  const { user } = useUser()
  const { isPro, isProPlus } = useUserSubscriptionStatus()
  const { channel, setShowTabLimitModal } = useChannel()

  const checkOpenTabs = () => {
    if (!channel || isProPlus || LIMIT_TAB_ALLOWED_PAGES.includes(pathname)) {
      setShowTabLimitModal(false)
      return
    }

    channel
      .push('open_tabs', {}, 10000)
      .receive('ok', ({ open_tabs }) => {
        const max_tabs = isPro ? MAX_TABS_PRO : MAX_TABS_FREE
        setShowTabLimitModal(open_tabs > max_tabs)
      })
      .receive('error', () => setTimeout(checkOpenTabs, TRY_WAIT_TIME_MS))
      .receive('timeout', () => setTimeout(checkOpenTabs, TRY_WAIT_TIME_MS))
  }

  useEffect(() => {
    if (!user || ignoredPages.includes(pathname)) return
    if (!user.privacyPolicyAccepted) {
      store.dispatch(push(PATHS.GDPR))
    } else if (!user.username) {
      store.dispatch(push(PATHS.USERNAME))
    } else {
      checkOpenTabs()
    }
  }, [user, isPro, isProPlus, pathname, channel])

  return null
}

export default ForceActionRedirector
