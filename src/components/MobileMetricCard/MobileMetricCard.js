import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Dialog from '@santiment-network/ui/Dialog'
import { formatTooltipValue } from '../../ducks/SANCharts/CustomTooltip'
import PercentChanges from '../PercentChanges'
import { DAY, getTimeIntervalFromToday } from '../../utils/dates'
import { calcPercentageChange } from '../../utils/utils'
import { METRIC_ANOMALIE_QUERY } from '../../ducks/GetTimeSeries/queries/metric_anomaly_query'
import { Metrics } from '../../ducks/SANCharts/data'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import SwipeableCard from './SwipeableCard'
import styles from './MobileMetricCard.module.scss'

const MobileMetricCard = ({
  metric,
  value = 0,
  period = '',
  changes,
  colors = {},
  ticker = '',
  data: { metricAnomaly: anomalies = [] } = {},
  isSelected,
  hide,
  onToggleMetric,
  slug
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false)

  const { length: anomaliesNumber } = anomalies

  const { label, description, reqMeta, key, dataKey } = metric
  const { from, to } = getTimeIntervalFromToday(-1, DAY, { isUTC: true })

  const requestedMetric = [
    {
      name: key,
      key,
      slug,
      from,
      to,
      interval: '1d',
      ...reqMeta
    }
  ]

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
          <h3 className={styles.metric}>{label}</h3>
          {anomaliesNumber && (
            <h4 className={styles.anomalies}>
              {`${anomaliesNumber} anomal${anomaliesNumber > 1 ? 'ies' : 'y'}`}
            </h4>
          )}
        </div>
        <GetTimeSeries
          metrics={requestedMetric}
          render={({ timeseries = [], errorMetrics = {}, isError }) => {
            const hasError = Object.keys(errorMetrics).includes(key) || isError

            let value

            let diff = null

            if (timeseries.length >= 2) {
              const lastIndex = timeseries.length - 1
              const today = timeseries[lastIndex][dataKey || key]
              const yesterday = timeseries[lastIndex - 1][dataKey || key]
              value = `${formatTooltipValue(false, today)} ${
                metric === Metrics['transaction_volume'] ? ticker : ''
              }`
              diff = calcPercentageChange(yesterday, today)
            }

            const color = colors[dataKey || key]

            return (
              <div
                className={cx(styles.row, styles.row_bottom)}
                style={{ '--color': color || '' }}
              >
                {hasError ? (
                  'Something is going wrong'
                ) : value ? (
                  <>
                    <h4 className={styles.value}>{value}</h4>
                    <PercentChanges changes={diff} />
                    <Label accent='casper' className={styles.period}>
                      , {period || '24h'}
                    </Label>
                  </>
                ) : (
                  <div className={styles.pro}>
                    Latest data available in PRO plan
                  </div>
                )}
              </div>
            )
          }}
        />
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
