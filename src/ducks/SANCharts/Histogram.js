import React, { useState, useEffect } from 'react'
import { Query } from 'react-apollo'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import SidecarExplanationTooltip from './SidecarExplanationTooltip'
import {
  parseIntervalString,
  DAY,
  getTimeIntervalFromToday
} from '../../utils/dates'
import { HISTOGRAM_SIDEBAR } from './data'
import { HISTOGRAM_DATA_QUERY } from './gql'
import { INTERVAL_ALIAS } from './IntervalSelector'
import { useDebounceEffect } from '../../hooks'
import sharedStyles from './ChartSidecar.module.scss'
import styles from './Histogram.module.scss'

const getDateFromLabel = label => {
  const start = label.indexOf('201')
  const end = label.indexOf(' ', start)
  return label.slice(start, end)
}

const Content = ({ slug, interval, date }) => {
  const [period, setPeriod] = useState({})
  const constrainedInterval = INTERVAL_ALIAS[interval] ? '1h' : interval

  useDebounceEffect(
    () => {
      const { from, to } = getTimeIntervalFromToday(-5, DAY, {
        to: new Date(date),
        from: new Date(date)
      })
      /* to.setHours(24, 0, 0, 0) */

      setPeriod({
        from: from.toISOString(),
        to: to.toISOString()
      })
    },
    400,
    [date, slug]
  )

  return (
    <div className={styles.wrapper}>
      <Query
        skip={!period.from}
        query={HISTOGRAM_DATA_QUERY}
        variables={{
          slug,
          interval: '1d',
          ...period
        }}
      >
        {({ loading, data: { getMetric } = {} }) => {
          if (!getMetric) {
            return 'loading'
          }

          const data = getMetric.histogramData
          const res = data.labels.map((label, i) => ({
            label,
            value: data.values.data[i]
          }))

          return (
            <>
              <h2 className={styles.title}>Histogram</h2>
              <div className={styles.content}>
                <ResponsiveContainer
                  width='43%'
                  height={200}
                  className={styles.chart}
                >
                  <BarChart
                    layout='vertical'
                    data={res}
                    margin={{
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }}
                  >
                    <XAxis type='number' hide minTickGap={23} />
                    <YAxis dataKey='label' type='category' hide />
                    <Bar dataKey='value' barSize={4} fill='var(--lima)' />
                  </BarChart>
                </ResponsiveContainer>
                <div className={styles.labels}>
                  {res.map(({ label }) => (
                    <div key={label} className={styles.label}>
                      Tokens moved last on{' '}
                      <span className={styles.date}>
                        {getDateFromLabel(label)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )
        }}
      </Query>
    </div>
  )
}

const Histogram = ({
  onSidebarToggleClick,
  isAdvancedView,
  classes,
  isWideChart,
  ...rest
}) => {
  return (
    <div
      className={cx(
        sharedStyles.wrapper,
        isAdvancedView && sharedStyles.opened
      )}
    >
      <SidecarExplanationTooltip
        title='Age Distribution histogram'
        description=''
        localStorageSuffix={HISTOGRAM_SIDEBAR}
        classes={{
          wrapper: cx(
            sharedStyles.toggle,
            isAdvancedView || classes.sidecar__toggle_social,
            !isAdvancedView &&
              isWideChart &&
              classes.sidecar__toggle_social_wide
          )
        }}
      >
        <div
          className={sharedStyles.toggle__btn}
          onClick={() => onSidebarToggleClick(HISTOGRAM_SIDEBAR)}
        >
          <div className={cx(styles.toggle__icons, sharedStyles.toggle__icons)}>
            <Icon type='arrow-left' className={sharedStyles.toggle__arrow} />H
          </div>
        </div>
      </SidecarExplanationTooltip>
      {!isAdvancedView ? null : <Content {...rest} />}
    </div>
  )
}

Histogram.defaultProps = {
  date: Date.now(),
  interval: '1d',
  projectName: 'bitcoin'
}

export default Histogram
