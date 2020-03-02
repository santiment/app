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

const MetricHighLow = ({
  className,
  metric,
  slug,
  rangeHours,
  label,
  changes,
  selectedIndex,
  isDesktop,
  formatter,
  onRangeChange
}) => {
  const [index, setIndex] = useState(selectedIndex)
  const { range, hours } = rangeHours[index]
  const { loading, data = {} } = useQuery(METRIC_HIGH_LOW_QUERY, {
    skip: !(metric && slug && range),
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
    setIndex((index + 1) % rangeHours.length)
  }

  return (
    <section className={cx(styles.wrapper, className)}>
      <div className={styles.top}>
        {isDesktop && changes ? (
          <span className={styles.text}>High/Low {label}</span>
        ) : (
          <PercentChanges changes={changes} />
        )}
        <Label className={styles.period} onClick={cycleRange}>
          {range}
        </Label>
      </div>
      <div className={styles.progress}>
        <span className={styles.line} style={{ '--progress': `${offset}%` }} />
        <span className={styles.min}>
          {loading ? <Loader className={styles.loader} /> : formatter(min)}
        </span>
        <span className={styles.max}>
          {loading ? <Loader className={styles.loader} /> : formatter(max)}
        </span>
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
