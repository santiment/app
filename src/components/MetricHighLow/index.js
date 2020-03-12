import React, { useState } from 'react'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import Label from '@santiment-network/ui/Label'
import Loader from '@santiment-network/ui/Loader/Loader'
import PercentChanges from '../PercentChanges'
import { METRIC_HIGH_LOW_QUERY } from './gql'
import styles from './index.module.scss'

const DEFAULT_RANGE_HOURS = [
  {
    range: '24h',
    hours: 24
  },
  {
    range: '7d',
    hours: 24 * 7
  }
]

function getPeriod (hours) {
  const to = new Date()
  const from = new Date()

  to.setHours(to.getHours(), 0, 0, 0)
  from.setHours(from.getHours() - hours, 0, 0, 0)

  return {
    from: from.toISOString(),
    to: to.toISOString()
  }
}

const Value = ({ loading, value, formatter }) =>
  loading ? (
    <Loader className={styles.loader} />
  ) : (
    <span>{formatter(value)}</span>
  )

const MetricHighLow = ({
  className,
  metric,
  slug,
  rangeHours,
  label,
  changes,
  selectedIndex,
  formatter,
  onRangeChange
}) => {
  const [index, setIndex] = useState(selectedIndex)
  const { range, hours } = rangeHours[index]
  const { loading, data = {} } = useQuery(METRIC_HIGH_LOW_QUERY, {
    skip: !(metric && slug),
    variables: {
      metric,
      slug,
      ...getPeriod(hours)
    }
  })

  const { min = 0, max = 0, last = 0 } = data.getMetric || {}

  let offset = ((last - min) * 100) / (max - min)

  if (!isFinite(offset)) return null

  if (offset < 0) {
    offset = 0
  } else if (offset > 100) {
    offset = 100
  }

  function cycleRange () {
    const newIndex = (index + 1) % rangeHours.length
    setIndex(newIndex)
    if (onRangeChange) {
      onRangeChange(rangeHours[newIndex].range)
    }
  }

  return (
    <section className={className}>
      <div className={styles.row}>
        {changes ? (
          <PercentChanges changes={changes} />
        ) : (
          <span className={styles.text}>High/Low {label}</span>
        )}
        <Label
          className={cx(
            styles.period,
            rangeHours.length === 1 && styles.period_only
          )}
          onClick={cycleRange}
        >
          {range}
        </Label>
      </div>
      <div className={styles.progress} style={{ '--progress': `${offset}%` }} />
      <div className={cx(styles.row, styles.values)}>
        <Value loading={loading} value={min} formatter={formatter} />
        <Value loading={loading} value={max} formatter={formatter} />
      </div>
    </section>
  )
}

MetricHighLow.defaultProps = {
  rangeHours: DEFAULT_RANGE_HOURS,
  selectedIndex: 0,
  formatter: v => v
}

export default MetricHighLow
