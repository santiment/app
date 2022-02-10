import { useEffect } from 'react'
import { push } from 'react-router-redux'
import { useUser } from '../stores/user'
import { store } from '../redux'
import { PATHS } from '../paths'
import { useChannel } from '../utils/socketHooks'
import { useUserSubscriptionStatus } from '../stores/user/subscriptions'

const ignoredPages = ['/privacy-policy', '/roadmap']
const PRICING_PAGE = '/pricing'
const TRY_WAIT_TIME_MS = 3000
const MAX_TABS_FREE = 2
const MAX_TABS_PRO = 4

const ForceActionRedirector = ({ pathname }) => {
  const { user } = useUser()
  const { isPro, isProPlus } = useUserSubscriptionStatus()
  const channel = useChannel()

  const checkOpenTabs = () => {
    if (!channel || isProPlus || ignoredPages.includes(PRICING_PAGE)) return
    channel
      .push('open_tabs', {}, 10000)
      .receive('ok', ({ open_tabs }) => {
        const max_tabs = isPro ? MAX_TABS_PRO : MAX_TABS_FREE
        if (open_tabs > max_tabs) {
          console.log('TODO: SHOW MODAL NOW')
        }
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
