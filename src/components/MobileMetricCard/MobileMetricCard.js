import React from 'react'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { formatTooltipValue } from '../../ducks/SANCharts/CustomTooltip'
import { Metrics, compatabilityMap } from '../../ducks/SANCharts/data'
import PercentChanges from '../PercentChanges'
import { METRIC_ANOMALIE_QUERY } from '../../ducks/GetTimeSeries/queries/metric_anomaly_query'
import styles from './MobileMetricCard.module.scss'

const MobileMetricCard = ({
  metric,
  name,
  value,
  period,
  changes,
  measure = '',
  data: { metricAnomaly: anomalies = [] } = {},
  onClick,
  activeMetric
}) => {
  const onButtonClick = () => {
    onClick({ name: metric, anomalies })
  }

  const { length: anomaliesNumber } = anomalies

  return (
    <button
      className={cx(
        styles.wrapper,
        activeMetric && activeMetric.name === metric && styles.active
      )}
      onClick={onClick ? onButtonClick : undefined}
    >
      <div className={cx(styles.row, styles.row_top)}>
        <h3 className={styles.metric}>{name}</h3>
        <h4 className={styles.anomalies}>
          {anomaliesNumber
            ? `${anomaliesNumber} anomal${anomaliesNumber > 1 ? 'ies' : 'y'}`
            : ''}
        </h4>
      </div>
      <div className={cx(styles.row, styles.row_bottom)}>
        <h4 className={styles.value}>
          {formatTooltipValue(false, value)} {measure}
        </h4>
        <PercentChanges changes={changes} />
        <Label accent='casper' className={styles.period}>
          , {period}
        </Label>
      </div>
    </button>
  )
}

export default graphql(METRIC_ANOMALIE_QUERY, {
  skip: ({ metric, from }) => {
    const res = Metrics[metric] || compatabilityMap[metric]
    return !res.anomalyKey || !from
  },
  options: ({ metric, slug, from, to }) => {
    const res = Metrics[metric] || compatabilityMap[metric]
    return {
      variables: {
        metric: res.anomalyKey,
        slug,
        from: from.toISOString(),
        to: to.toISOString()
      }
    }
  }
})(MobileMetricCard)
