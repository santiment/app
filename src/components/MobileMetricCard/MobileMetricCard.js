import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import cx from 'classnames'
import { Label } from '@santiment-network/ui'
import { formatNumber } from '../../utils/formatting'
import PercentChanges from '../PercentChanges'
import { getTimeIntervalFromToday, DAY } from '../../utils/dates'
import styles from './MobileMetricCard.module.scss'

const { from: FROM, to: TO } = getTimeIntervalFromToday(-7, DAY)

const METRIC_ANOMALIE_QUERY = gql`
  query metricAnomaly(
    $from: DateTime!
    $metric: AnomaliesMetricsEnum!
    $slug: String!
    $to: DateTime!
  ) {
    metricAnomaly(
      from: $from
      to: $to
      slug: $slug
      metric: $metric
      interval: "8h"
    ) {
      datetime
      metricValue
    }
  }
`

const ANOMALIES_METRICS_ENUM = {
  dailyActiveAddresses: 'DAILY_ACTIVE_ADDRESSES',
  devActivity: 'DEV_ACTIVITY'
}

const MobileMetricCard = ({
  metric,
  name,
  value,
  period,
  changes,
  measure = '',
  data: { metricAnomaly: anomalies } = {},
  onClick = () => {}
}) => {
  const [active, setActive] = useState(false)

  const onButtonClick = () => {
    const newState = !active
    setActive(newState)
    onClick(newState && { metric, anomalies })
  }

  return (
    <button
      className={cx(styles.wrapper, active && styles.active)}
      onClick={onButtonClick}
    >
      <div className={cx(styles.row, styles.row_top)}>
        <h3 className={styles.metric}>{name}</h3>
        <h4 className={styles.value}>
          {formatNumber(value)} {measure}
        </h4>
      </div>
      <div className={styles.row}>
        <h4 className={styles.anomalies}>
          {anomalies && anomalies.length ? `${anomalies.length} anomalies` : ''}
        </h4>
        <div className={styles.right}>
          <PercentChanges changes={changes} />
          <Label accent='casper'>, {period}</Label>
        </div>
      </div>
    </button>
  )
}

export default graphql(METRIC_ANOMALIE_QUERY, {
  skip: ({ metric }) => !metric,
  options: ({ metric, slug }) => {
    return {
      variables: {
        metric: ANOMALIES_METRICS_ENUM[metric],
        slug,
        from: FROM.toISOString(),
        to: TO.toISOString()
      }
    }
  }
})(MobileMetricCard)
