import { useEffect } from 'react'
import { push } from 'react-router-redux'
import { useUser } from '../stores/user'
import { store } from '../redux'
import { PATHS } from '../paths'
import { useSocket } from '../utils/socketHooks'
import { useUserSubscriptionStatus } from '../stores/user/subscriptions'

const ignoredPages = ['/privacy-policy', '/roadmap']
const LIMIT_TAB_PAGES = ['/screener', '/watchlists', '/charts']
const TRY_WAIT_TIME_MS = 3000
const MAX_TABS_FREE = 2
const MAX_TABS_PRO = 4

const shouldCheckPage = pathname => LIMIT_TAB_PAGES.find(page => page.startsWith(pathname))

const ForceActionRedirector = ({ pathname }) => {
  const { user } = useUser()
  const { isPro, isProPlus } = useUserSubscriptionStatus()
  const { socket, setShowTabLimitModal } = useSocket()

  function checkOpenTabs () {
    if (!socket || isProPlus || !shouldCheckPage(pathname)) {
      setShowTabLimitModal(false)
      return
    }

    const channel = socket.channel(`open_restricted_tabs:${user.id}`, {})
    channel.join().receive('ok', () => {
      channel
        .push('open_restricted_tabs', {}, 10000)
        .receive('ok', ({ open_restricted_tabs }) => {
          const max_tabs = isPro ? MAX_TABS_PRO : MAX_TABS_FREE
          setShowTabLimitModal(open_restricted_tabs > max_tabs)
        })
        .receive('error', () => setTimeout(checkOpenTabs, TRY_WAIT_TIME_MS))
        .receive('timeout', () => setTimeout(checkOpenTabs, TRY_WAIT_TIME_MS))
    })
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
  }, [user, isPro, isProPlus, pathname, socket])

  return null
}

export default ForceActionRedirector
