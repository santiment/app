import React, { useState, useRef, useEffect } from 'react'
import { getTimePeriod } from './utils'
import Calendar from '../../ducks/Studio/AdvancedView/Calendar'
import EnhancedWordCloud from './EnhancedWordCloud'
import AverageSocialVolume from '../../components/AverageSocialVolume'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import Footer from '../../components/Footer'
import { checkIsToday } from '../../utils/dates'
import TrendsTable from '../../ducks/TrendsTable'
import styles from './Sidebar.module.scss'
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.scss'

const MAX_DATE = new Date()

const Sidebar = ({
  topics,
  linkedAssets,
  isDesktop,
  isEmptySearch,
  ...props
}) => {
  const asideRef = useRef(null)
  const [trendDate, setTrendDate] = useState([MAX_DATE])
  const [trendPeriod, setTrendPeriod] = useState()

  useEffect(() => {
    const sidebar = asideRef.current
    const header = document.querySelector('header')

    if (!header) {
      sidebar.style.top = 0
      return
    }

    const { offsetHeight } = header

    function fixSidebar () {
      requestAnimationFrame(() => {
        const dif = offsetHeight - window.scrollY
        sidebar.classList.toggle(styles.fixed, dif < 0)
      })
    }

    fixSidebar()

    window.addEventListener('scroll', fixSidebar)
    return () => window.removeEventListener('scroll', fixSidebar)
  }, [])

  function onTrendCalendarChange (date) {
    setTrendDate([date])
    let period
    if (!checkIsToday(date)) {
      period = getTimePeriod(date)
      period.interval = '1d'
    }
    setTrendPeriod(period)
  }

  return (
    <aside className={styles.sidebar} ref={asideRef}>
      {!isEmptySearch && (
        <>
          <AverageSocialVolume
            {...props}
            topics={topics}
            linkedAssets={linkedAssets}
          />
          <EnhancedWordCloud words={topics} isDesktop={isDesktop} />
        </>
      )}
      <div className={styles.trends}>
        <div className={styles.row}>
          <h3 className={styles.trend}>Trending words top 10</h3>
          <HelpPopup>
            <h4 className={stylesTooltip.title}>Trending words</h4>
            Top 10 words with the highest spike in mentions on crypto social
            media for a given day.
          </HelpPopup>
          {isDesktop && (
            <Calendar
              dates={trendDate}
              onChange={onTrendCalendarChange}
              className={styles.calendar}
              maxDate={MAX_DATE}
            />
          )}
        </div>
        <TrendsTable isCompact period={trendPeriod} />
      </div>
      <Footer classes={styles} />
    </aside>
  )
}

export default Sidebar
