import React, { useState } from 'react'
import { Query } from 'react-apollo'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import {
  BarChart,
  Bar,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import { HISTOGRAM_DATA_QUERY } from './gql'
import { useDebounceEffect } from '../../../hooks'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import { millify } from '../../../utils/formatting'
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

const Histogram = ({ slug, date }) => {
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
            return <Loader className={styles.load} />
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
                {loading && <Loader className={styles.inlineLoader} />}
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

Histogram.Icon = 'H'

Histogram.defaultProps = {
  date: Date.now(),
  interval: '1d',
  slug: 'bitcoin'
}

export default Histogram
