import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Calendar from './Calendar'
import WordCloud from '../../../components/WordCloud/WordCloudWithHeader'
import { INTERVAL_ALIAS } from '../../SANCharts/IntervalSelector'
import { parseIntervalString, ONE_MONTH_IN_MS } from '../../../utils/dates'
import TrendsTable from '../../../ducks/TrendsTable'
import styles from './SocialContext.module.scss'

function getTimePeriod (date, interval) {
  const { amount, format } = parseIntervalString(interval)
  const from = new Date(date)
  const to = new Date(date)

  if (format === 'd') {
    from.setDate(to.getDate() - amount)
  } else {
    from.setHours(to.getHours() - amount)
  }

  return {
    from: from.toISOString(),
    to: to.toISOString(),
    interval: '1d'
  }
}

const SocialContext = ({ interval, date, project: { slug } }) => {
  const [trendDate, setTrendDate] = useState([date])
  const [contextDate, setContextDate] = useState([date])
  const [contextPeriod, setContextPeriod] = useState({})
  const [trendPeriod, setTrendPeriod] = useState({})
  const constrainedInterval = INTERVAL_ALIAS[interval] ? '1h' : interval

  useEffect(
    () => {
      setContextDate([date])
      setTrendDate([date])

      const period = getTimePeriod(date, constrainedInterval)
      setContextPeriod(period)
      setTrendPeriod(period)
    },
    [date, interval]
  )

  function onTrendCalendarChange (datetime) {
    setTrendDate([datetime])
    setTrendPeriod(getTimePeriod(datetime, constrainedInterval))
  }

  function onContextCalendarChange (datetime) {
    setContextDate([datetime])
    setContextPeriod(getTimePeriod(datetime, constrainedInterval))
  }

  return (
    <div className={styles.content}>
      <Calendar
        dates={contextDate}
        onChange={onContextCalendarChange}
        className={styles.contextCalendar}
      />
      <WordCloud
        word={slug}
        size={12}
        className={cx(styles.item, styles.item_cloud)}
        infoClassName={styles.cloud__header}
        contentClassName={styles.cloud}
        {...contextPeriod}
      />
      <div className={cx(styles.item, styles.item_trends)}>
        <div className={styles.row}>
          <h3 className={styles.trend}>
            Trending words <span className={styles.trend__label}>top 10</span>
          </h3>
          <Calendar dates={trendDate} onChange={onTrendCalendarChange} />
        </div>

        <div className={styles.trends}>
          <TrendsTable
            className={styles.table}
            isCompact
            period={trendPeriod}
          />
        </div>
      </div>
    </div>
  )
}

SocialContext.Icon = <Icon type='cloud-small' />

SocialContext.defaultProps = {
  date: new Date(Date.now() - ONE_MONTH_IN_MS * 3),
  interval: '1d',
  project: {
    slug: 'bitcoin'
  }
}

export default SocialContext
