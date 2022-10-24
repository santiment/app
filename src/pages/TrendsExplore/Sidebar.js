import React, { useState } from 'react'
import cx from 'classnames'
import { getTimePeriod } from './utils'
import Calendar from '../../ducks/Studio/AdvancedView/Calendar'
import EnhancedWordCloud from './EnhancedWordCloud'
import AverageSocialVolume from '../../components/AverageSocialVolume'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import Footer from '../../components/Footer'
import { checkIsToday } from '../../utils/dates'
import TrendsTable from '../../ducks/TrendsTable'
import styles from './Sidebar.module.scss'

const MAX_DATE = new Date()

const Sidebar = ({ topics, linkedAssets, isDesktop, isEmptySearch, ...props }) => {
  const [trendDate, setTrendDate] = useState([MAX_DATE])
  const [trendPeriod, setTrendPeriod] = useState()

  function onTrendCalendarChange(date) {
    setTrendDate([date])
    let period
    if (!checkIsToday(date)) {
      period = getTimePeriod(date)
      period.interval = '1d'
    }
    setTrendPeriod(period)
  }

  return (
    <aside className={cx(styles.sidebar, 'column')}>
      {!isEmptySearch && (
        <>
          <AverageSocialVolume {...props} topics={topics} linkedAssets={linkedAssets} />
          <EnhancedWordCloud words={topics} isDesktop={isDesktop} />
        </>
      )}
      <div className='row v-center mrg-l mrg--b'>
        <h3 className='mrg-s mrg--r'>Trending words top 10</h3>
        <HelpPopup>
          <h4 className='txt-m mrg-xs mrg--b'>Trending words</h4>
          Top 10 words with the highest spike in mentions on crypto social media for a given day.
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
      <Footer
        classes={{
          footer: cx(styles.footer, 'column mrg-xxl mrg--t'),
          footerVersionDivider: styles.footerVersionDivider,
        }}
      />
    </aside>
  )
}

export default Sidebar
