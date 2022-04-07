import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { copy } from 'webkit/utils'
import { studio as settingsStore } from 'studio/stores/studio'
import { useHistory } from './stores'
import { useShortShareLink } from '../../components/Share/hooks'
import Calendar from '../../ducks/Studio/Header/Calendar'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import styles from '../../ducks/Studio/Header/Settings.module.scss'

const Header = ({ studio, settings, widgets, metrics, prevFullUrlRef }) => {
  const [calendarTarget, setCalendarTarget] = useState()
  const [isShareOpened, setIsShareOpened] = useState(false)
  const clearTimerRef = useRef()
  const History = useHistory(studio)
  const sharePath = '/charts' + window.location.search
  const { shortShareLink, getShortShareLink } = useShortShareLink(sharePath)

  useEffect(() => {
    if (!studio) return
    setCalendarTarget(document.querySelector('.studio-calendar'))

    window.onHeaderShareClick = onShareClick
    window.onHeaderCopyLinkClick = onCopyLinkClick

    return () => {
      if (clearTimerRef.current) clearTimerRef.current()
      window.onHeaderShareClick = null
      window.onHeaderCopyLinkClick = null
    }
  }, [studio])

  function changeTimePeriod(start, end) {
    const { from, to } = settings
    const undo = () => settingsStore.setPeriod(new Date(from), new Date(to))
    const redo = () => settingsStore.setPeriod(start, end)

    History.add('Period change', undo, redo)
    redo()
  }

  function onShareClick() {
    getShortShareLink(prevFullUrlRef.current)
    setIsShareOpened(true)
  }

  function onCopyLinkClick() {
    if (clearTimerRef.current) clearTimerRef.current()

    getShortShareLink(prevFullUrlRef.current).then((url) => {
      const node = document.querySelector('.copy .link')
      const clb = () => node && (node.ariaLabel = 'Copy link')

      if (node) node.ariaLabel = 'Copied!'
      clearTimerRef.current = copy(url, clb)
    })
  }

  return calendarTarget ? (
    <>
      {ReactDOM.createPortal(
        <Calendar settings={settings} changeTimePeriod={changeTimePeriod} />,
        calendarTarget,
      )}

      <ShareModalTrigger
        isDialogOnly
        classes={styles}
        shareLink={shortShareLink}
        open={isShareOpened}
        onClose={() => setIsShareOpened(false)}
      />
    </>
  ) : null
}

export default Header
