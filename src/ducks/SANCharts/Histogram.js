import React, { useState } from 'react'
import { Query } from 'react-apollo'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Loader from '@santiment-network/ui/Loader/Loader'
import {
  BarChart,
  Bar,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import { DAY, getTimeIntervalFromToday } from '../../utils/dates'
import { HISTOGRAM_SIDEBAR } from './data'
import { HISTOGRAM_DATA_QUERY } from './gql'
import { useDebounceEffect } from '../../hooks'
import { millify } from '../../utils/formatting'
import sharedStyles from './ChartSidecar.module.scss'
import styles from './Histogram.module.scss'

const getDateFromLabel = label => {
  const start = label.indexOf('20')
  const end = label.indexOf(' ', start)
  return label.slice(start, end)
}

const HistogramDate = ({ y, height, value }) => {
  return (
    <text y={y - height} x={4} className={styles.label}>
      Tokens moved last on{' '}
      <tspan className={styles.date}>{getDateFromLabel(value)}</tspan>
    </text>
  )
}

const Content = ({ slug, date }) => {
  const [period, setPeriod] = useState({})
  const [hoveredValue, setHoveredValue] = useState()

  useDebounceEffect(
    () => {
      const { from, to } = getTimeIntervalFromToday(-4, DAY, {
        to: new Date(date),
        from: new Date(date)
      })

      to.setHours(to.getHours() + 72, 0, 0, 0)

      setPeriod({
        from: from.toISOString(),
        to: to.toISOString()
      })
    },
    200,
    [date, slug]
  )

  function updateHoveredValue ({ value }) {
    setHoveredValue(value)
  }

  function clearHoveredValue () {
    setHoveredValue()
  }

  function formatter (value) {
    return value === hoveredValue ? millify(value, 1) : ''
  }

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
        {({ loading, error, data: { getMetric } = {} }) => {
          if (error) {
            return (
              <div className={cx(styles.load, styles.action)}>
                Please, hover on a date inside the allowed interval
              </div>
            )
          }

          if (!getMetric) {
            return (
              <div className={styles.load}>
                <Loader />
              </div>
            )
          }

          const data = getMetric.histogramData
          const res = data.labels.map((label, i) => ({
            label,
            value: data.values.data[i]
          }))

          return (
            <>
              <h2 className={styles.title}>
                Histogram
                {loading ? <Loader className={styles.inlineLoader} /> : ''}
              </h2>
              <div className={styles.content}>
                <ResponsiveContainer
                  width='90%'
                  height={260}
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
                    <Bar
                      dataKey='value'
                      barSize={4}
                      fill='var(--lima)'
                      onMouseEnter={updateHoveredValue}
                      onMouseOut={clearHoveredValue}
                    >
                      <LabelList
                        dataKey='label'
                        position='top'
                        offset={6}
                        content={HistogramDate}
                      />
                      <LabelList
                        dataKey='value'
                        position='right'
                        offset={6}
                        formatter={formatter}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
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
      <div
        className={cx(
          sharedStyles.toggle,
          isAdvancedView || classes.sidecar__toggle_histogram,
          !isAdvancedView &&
            isWideChart &&
            classes.sidecar__toggle_histogram_wide
        )}
      >
        <div
          className={sharedStyles.toggle__btn}
          onClick={() => onSidebarToggleClick(HISTOGRAM_SIDEBAR)}
        >
          <div className={cx(styles.toggle__icons, sharedStyles.toggle__icons)}>
            <Icon type='arrow-left' className={sharedStyles.toggle__arrow} />H
          </div>
        </div>
      </div>
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
