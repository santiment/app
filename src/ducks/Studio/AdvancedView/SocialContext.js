import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import WordCloud from '../../../components/WordCloud/WordCloud'
import TrendsTable from '../../../components/Trends/TrendsTable/TrendsTable'
import GetHypedTrends from '../../../components/Trends/GetHypedTrends'
import { INTERVAL_ALIAS } from '../../SANCharts/IntervalSelector'
import { useDebounceEffect } from '../../../hooks'
import { parseIntervalString } from '../../../utils/dates'
import styles from './SocialContext.module.scss'

const SocialContext = ({ interval, date, slug }) => {
  const [period, setPeriod] = useState({})
  const constrainedInterval = INTERVAL_ALIAS[interval] ? '1h' : interval

  useDebounceEffect(
    () => {
      const { amount, format } = parseIntervalString(constrainedInterval)
      const from = new Date(date)
      const to = new Date(date)

      if (format === 'd') {
        from.setDate(to.getDate() - amount)
      } else {
        from.setHours(to.getHours() - amount)
      }

      setPeriod({
        from: from.toISOString(),
        to: to.toISOString()
      })
    },
    200,
    [date, interval, slug]
  )

  return (
    <div className={styles.content}>
      <WordCloud
        word={slug}
        size={12}
        className={cx(styles.item, styles.item_cloud)}
        infoClassName={styles.cloud__header}
        contentClassName={styles.cloud}
        {...period}
      />
      <div className={cx(styles.item, styles.item_trends)}>
        <h3 className={styles.trend}>
          Trending words <span className={styles.trend__label}>top 10</span>
        </h3>
        <GetHypedTrends
          interval={constrainedInterval}
          {...period}
          render={({ isLoading, items }) => {
            const trends = items[0]
            return (
              <TrendsTable
                trendWords={trends && trends.topWords}
                className={styles.table}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

SocialContext.Icon = <Icon type='cloud-small' />

SocialContext.defaultProps = {
  date: Date.now(),
  interval: '1d',
  slug: 'bitcoin'
}

export default SocialContext
