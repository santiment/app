import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Dialog from '@santiment-network/ui/Dialog'
import { formatTooltipValue } from '../../ducks/SANCharts/CustomTooltip'
import { Metrics } from '../../ducks/SANCharts/data'
import PercentChanges from '../PercentChanges'
import { METRIC_ANOMALIE_QUERY } from '../../ducks/GetTimeSeries/queries/metric_anomaly_query'
import SwipeableCard from './SwipeableCard'
import styles from './MobileMetricCard.module.scss'

const MobileMetricCard = ({
  metric,
  name = '',
  value = 0,
  period = '',
  changes,
  measure = '',
  data: { metricAnomaly: anomalies = [] } = {},
  isSelected,
  hide,
  onToggleMetric
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false)

  const { length: anomaliesNumber } = anomalies

  const { label, description } = metric

  return (
    <SwipeableCard
      onLeftActionClick={() => setIsOpenDescription(true)}
      onRightActionClick={onToggleMetric}
      hasLeftAction={description}
      isSelected={isSelected}
      hide={hide}
    >
      <div className={styles.wrapper}>
        <div className={cx(styles.row, styles.row_top)}>
          <h3 className={styles.metric}>{name || label}</h3>
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
          {changes && (
            <>
              <PercentChanges changes={changes} />
              <Label accent='casper' className={styles.period}>
                , {period}
              </Label>
            </>
          )}
        </div>
      </div>
      {description && (
        <Dialog
          title={label}
          open={isOpenDescription}
          onClose={() => setIsOpenDescription(false)}
        >
          <Dialog.ScrollContent className={styles.dialog}>
            {description}
          </Dialog.ScrollContent>
        </Dialog>
      )}
    </SwipeableCard>
  )
}

export default graphql(METRIC_ANOMALIE_QUERY, {
  skip: ({ metric: { anomalyKey }, from }) => !anomalyKey || !from,
  options: ({ metric: { anomalyKey }, slug, from, to, interval }) => ({
    variables: {
      slug,
      from,
      to,
      interval,
      metric: anomalyKey
    }
  })
})(MobileMetricCard)
