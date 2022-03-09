import React, { useEffect, useCallback } from 'react'
import { push } from 'react-router-redux'
import { track } from 'webkit/analytics'
import { useUser } from '../stores/user'
import { store } from '../redux'
import { PATHS } from '../paths'
import { useSocket } from '../utils/socketHooks'
import { useUserSubscriptionStatus } from '../stores/user/subscriptions'
import TabLimitModal from './TabLimitModal'

const ignoredPages = ['/privacy-policy', '/roadmap']
const LIMIT_TAB_PAGES = ['/charts', '/screener']
const TRY_WAIT_TIME_MS = 10000
const MAX_TABS_FREE = 2
const MAX_TABS_PRO = 4
const PUSH_TIMEOUT = 10000 // The push timeout in milliseconds

const shouldCheckPage = pathname =>
  LIMIT_TAB_PAGES.find(page => pathname.startsWith(page))

const ForceActionRedirector = ({ pathname }) => {
  const { user } = useUser()
  const { isPro, isProPlus } = useUserSubscriptionStatus()
  const { socket, showTabLimitModal, setShowTabLimitModal } = useSocket()
  const MAX_TABS = isPro ? MAX_TABS_PRO : MAX_TABS_FREE

  const upgradeButtonClick = useCallback(() => {
    if (showTabLimitModal) {
      track.event('tab_limit_modal_upgrade_button_clicked')
    }
  }, [showTabLimitModal])

  function checkOpenTabs () {
    if (!socket || isProPlus || !shouldCheckPage(pathname)) {
      if (showTabLimitModal) {
        track.event('tab_limit_modal_closed')
      }
      setShowTabLimitModal(false)
      return
    }

    const channel = socket.channel(`open_restricted_tabs:${user.id}`, {})
    channel.join().receive('ok', () => {
      channel
        .push('open_restricted_tabs', {}, PUSH_TIMEOUT)
        .receive('ok', ({ open_restricted_tabs }) => {
          const showShowModal = open_restricted_tabs > MAX_TABS
          setShowTabLimitModal(showShowModal)
          if (showShowModal) {
            track.event('tab_limit_modal_showed', { open_restricted_tabs })
          }
        })
        .receive('error', () => setTimeout(checkOpenTabs, TRY_WAIT_TIME_MS))
        .receive('timeout', () => setTimeout(checkOpenTabs, TRY_WAIT_TIME_MS))
    })
  }

  // Prevents user cheat.
  // If user removed modal from dom, this reverts back the modal
  useEffect(() => {
    let handCheck
    if (showTabLimitModal) {
      handCheck = setInterval(() => {
        const modal = document.getElementById('tabLimitModalButtons')
        if (!modal) {
          clearInterval(handCheck)
          setShowTabLimitModal(false)
          checkOpenTabs()
        }
      }, 1000)
    }
    return () => handCheck && clearInterval(handCheck)
  }, [showTabLimitModal])

  useEffect(() => {
    let timer = null

    if (!user || ignoredPages.includes(pathname)) return
    if (!user.privacyPolicyAccepted) {
      store.dispatch(push(PATHS.GDPR))
    } else if (!user.username) {
      store.dispatch(push(PATHS.USERNAME))
    } else {
      checkOpenTabs()
      timer = setInterval(checkOpenTabs, 5000)
    }

    return () => clearInterval(timer)
  }, [user, isPro, isProPlus, pathname, socket])

  return showTabLimitModal ? (
    <TabLimitModal
      maxTabsCount={MAX_TABS}
      isPro={isPro}
      onOpen={upgradeButtonClick}
    />
  ) : null
}

export default ForceActionRedirector
