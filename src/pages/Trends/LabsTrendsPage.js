import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import cx from 'classnames'
import { track } from 'webkit/analytics'
import Button from '@santiment-network/ui/Button'
import TrendsSearchForm from '../../components/Trends/Search'
import Suggestions from '../../components/Trends/Search/Suggestions'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import Trends from '../../components/Trends/Trends'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import { getDatetimeFromUrl } from './url'
import { getTimePeriod } from '../TrendsExplore/utils'
import externalStyles from '../StablecoinsPage/StablecoinsPage.module.scss'
// import DaysSelector from '../../ducks/Studio/FeesDistribution/DaySelector'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import { updateHistory } from '../../utils/utils'
import styles from './LabsTrendsPage.module.scss'

const OBJ = {}

const TrendsHeader = () => {
  return (
    <div className={styles.titleWrapper}>
      <div className={styles.title}>Social Trends</div>
    </div>
  )
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const { DD, MMM, YY } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)
  return `${DD} ${MMM}, ${YY}, ${HH}:${mm}`
}

const LabsTrendsPage = ({ history, datetime, defaultSelectedPeriod }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultSelectedPeriod)

  useEffect(() => {
    track.pageview('sanbase')
  }, [])

  useEffect(() => {
    if (selectedPeriod && datetime !== selectedPeriod.to) {
      const { origin } = window.location
      const pathname = `/labs/trends?datetime=${selectedPeriod.to}`
      updateHistory(origin + pathname)
    }

    if (!selectedPeriod && datetime) {
      const { origin } = window.location
      const pathname = `/labs/trends`
      updateHistory(origin + pathname)
    }
  }, [selectedPeriod])

  // function changeDay (date) {
  //   setSelectedPeriod({...getTimePeriod(date, '4h'), interval: '1h' })
  // }

  return (
    <DashboardLayout showMobileHeader={false} classes={styles}>
      <Helmet>
        <title>Today’s Top Social Gainers in Crypto - Sanbase</title>
        <meta property='og:title' content='Today’s Top Social Gainers in Crypto - Sanbase' />
        <meta
          property='og:description'
          content='Top 10 words with the biggest spike on crypto social media (compared to their previous 2-week average). These are the biggest developing stories in crypto.'
        />
      </Helmet>

      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={styles}
          title={<TrendsHeader />}
        />
      </MobileOnly>

      <div className={externalStyles.header}>
        <div className={cx(externalStyles.inner, externalStyles.content, styles.headerContent)}>
          <div className={externalStyles.pageDescription}>
            <h3 className={externalStyles.title}>
              <DesktopOnly>
                <TrendsHeader />
              </DesktopOnly>
            </h3>
            <DesktopOnly>
              <div className={externalStyles.description}>
                Explore the social volume of any word on crypto social media
              </div>
            </DesktopOnly>

            <TrendsSearchForm classes={{ wrapper: styles.search }} withButton />
            <DesktopOnly>
              <Suggestions className={styles.suggestions} />
            </DesktopOnly>
          </div>
        </div>
      </div>

      <div className={externalStyles.body}>
        <div className={cx(externalStyles.inner, styles.inner)}>
          {/* <DaysSelector */}
          {/*  className={styles.daysSelector} */}
          {/*  daysClassName={styles.daysSelectorDays} */}
          {/*  onDayChange={changeDay} */}
          {/* /> */}
          <div className={cx(styles.daysSelector, !selectedPeriod && styles.daysSelectorHide)}>
            {selectedPeriod && (
              <>
                <span>{`You are observing Top 10 word for ${formatDate(selectedPeriod.to)}`}</span>
                <Button border className={styles.switch} onClick={() => setSelectedPeriod(null)}>
                  Switch to the latest trends
                </Button>
              </>
            )}
          </div>
          <Trends {...(selectedPeriod || OBJ)} period={selectedPeriod || OBJ} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default (props) => {
  const datetime = getDatetimeFromUrl()
  const defaultSelectedPeriod = datetime
    ? { ...getTimePeriod(datetime.toString(), '4h'), interval: '1h' }
    : null

  return (
    <LabsTrendsPage datetime={datetime} defaultSelectedPeriod={defaultSelectedPeriod} {...props} />
  )
}
