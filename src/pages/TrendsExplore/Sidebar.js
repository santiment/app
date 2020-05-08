import React, { useState, useRef, useEffect } from 'react'
import Calendar from '../../ducks/Studio/AdvancedView/Calendar'
import TrendsTable from '../../components/Trends/TrendsTable/TrendsTable'
import GetHypedTrends from '../../components/Trends/GetHypedTrends'
import WordCloud from '../../components/WordCloud/WordCloud'
import AverageSocialVolume from '../../components/AverageSocialVolume'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import Footer from '../../components/Footer'
import styles from './Sidebar.module.scss'
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.scss'

const MAX_DATE = new Date()

function getTimePeriod (date) {
  const from = new Date(date)
  const to = new Date(date)

  from.setHours(0, 0, 0, 0)
  to.setHours(24, 0, 0, 0)

  return {
    from: from.toISOString(),
    to: to.toISOString()
  }
}

const Sidebar = ({
  topics,
  linkedAssets,
  isDesktop,
  isEmptySearch,
  ...props
}) => {
  const asideRef = useRef(null)
  const [trendDate, setTrendDate] = useState([MAX_DATE])
  const [trendPeriod, setTrendPeriod] = useState(getTimePeriod(MAX_DATE))

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
    setTrendPeriod(getTimePeriod(date))
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
          <WordCloud
            hideWord
            className={styles.cloud}
            infoClassName={styles.cloud__header}
            word={topics[0]}
          />
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
        <GetHypedTrends
          interval='1d'
          {...trendPeriod}
          render={({ isLoading, items }) => {
            const trends = items[0]
            return (
              <TrendsTable
                isCompactView
                trendWords={trends && trends.topWords}
                isLoading={isLoading}
                className={styles.table}
              />
            )
          }}
        />
      </div>
      <Footer classes={styles} />
    </aside>
  )
}

export default Sidebar
