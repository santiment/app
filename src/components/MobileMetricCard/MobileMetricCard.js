import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Dialog from '@santiment-network/ui/Dialog'
import Loader from '@santiment-network/ui/Loader/Loader'
import { formatTooltipValue } from '../../ducks/SANCharts/CustomTooltip'
import PercentChanges from '../PercentChanges'
import {
  DAY,
  getTimeIntervalFromToday,
  dateDifference
} from '../../utils/dates'
import { calcPercentageChange } from '../../utils/utils'
import { makeRequestedData } from '../../pages/Detailed/mobile/utils'
import { METRIC_ANOMALIE_QUERY } from '../../ducks/GetTimeSeries/queries/metric_anomaly_query'
import { Metrics, Events } from '../../ducks/SANCharts/metrics/data'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import SwipeableCard from './SwipeableCard'
import styles from './MobileMetricCard.module.scss'

const MobileMetricCard = ({
  metric,
  value = 0,
  colors = {},
  ticker = '',
  data: { metricAnomaly: anomalies = [] } = {},
  onToggleMetric,
  hasPremium,
  errorsMetricsKeys,
  slug,
  ...rest
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false)
  const { length: anomaliesNumber } = anomalies

  const { label, description, key, dataKey = key } = metric
  let { from, to } = getTimeIntervalFromToday(-1, DAY, { isUTC: true })
  let interval = '1d'

  const isTrendingPosition = metric === Events.trendPositionHistory
  if (isTrendingPosition) {
    from = rest.from
    to = rest.to
    interval = rest.interval
  }

  const requestedData = makeRequestedData({
    metrics: [metric],
    slug,
    from,
    to,
    interval
  })

  return (
    <SwipeableCard
      onLeftActionClick={() => setIsOpenDescription(true)}
      onRightActionClick={onToggleMetric}
      hasLeftAction={description}
      {...rest}
    >
      <GetTimeSeries
        {...requestedData}
        render={({
          timeseries = [],
          eventsData = [],
          errorMetrics = {},
          isError,
          isLoading
        }) => {
          const errorOnChart = errorsMetricsKeys.includes(key)
          let errorText = ''

          if (
            Object.keys(errorMetrics).includes(key) ||
            isError ||
            errorOnChart
          ) {
            errorText = `Failed to fetch the ${
              errorOnChart ? '' : 'latest '
            }data`
          }

          let value = null
          let diff = null
          let period = '24h'

          const eventsTotalNumber = isTrendingPosition
            ? eventsData.length
            : anomaliesNumber

          const eventsTotalText = isTrendingPosition
            ? `${eventsTotalNumber} time${eventsTotalNumber > 1 ? 's' : ''}`
            : `${eventsTotalNumber} anomal${
              eventsTotalNumber > 1 ? 'ies' : 'y'
            }`

          if (timeseries.length >= 2) {
            const lastIndex = timeseries.length - 1
            const today = timeseries[lastIndex][dataKey]
            const yesterday = timeseries[lastIndex - 1][dataKey]
            value = `${formatTooltipValue(false, today)} ${
              metric === Metrics.transaction_volume ? ticker : ''
            }`
            diff = calcPercentageChange(yesterday, today)
          }

          const color = isTrendingPosition ? '#505573' : colors[dataKey]

          if (isTrendingPosition) {
            if (eventsData.length > 0) {
              const latestData = eventsData[eventsData.length - 1]
              value = Events.position.formatter(latestData.position)

              const { diff, format } = dateDifference({
                from: new Date(latestData.datetime)
              })
              period = `${diff}${format} ago`
            } else {
              errorText = "Didn't was in trends in selected interval"
            }
          }

          if (metric === Metrics.dev_activity) {
            const { devActivity60: first, devActivity30: second } = rest.project
            if (first != null && second != null) {
              diff = calcPercentageChange(first * 2 - second, second)
              value = second.toFixed(2)
              period = '30d'
            } else {
              errorText = 'No data'
            }
          }

          return (
            <div className={styles.wrapper}>
              <div className={cx(styles.row, styles.row_top)}>
                <h3 className={styles.metric}>{label}</h3>
                {eventsTotalNumber > 0 && (
                  <h4
                    className={cx(
                      styles.events,
                      isTrendingPosition && styles.events__trends
                    )}
                  >
                    {eventsTotalText}
                  </h4>
                )}
              </div>
              <div
                className={cx(styles.row, styles.row_bottom)}
                style={{ '--color': color || '' }}
              >
                {isLoading ? (
                  <Loader className={styles.loader} />
                ) : errorText ? (
                  <div className={styles.text}>{errorText}</div>
                ) : value ? (
                  <>
                    <h4
                      className={cx(
                        styles.value,
                        isTrendingPosition && styles.value__trends
                      )}
                    >
                      {value}
                    </h4>
                    {diff !== null && (
                      <PercentChanges changes={diff} className={styles.diff} />
                    )}
                    {period && (
                      <Label accent='casper' className={styles.period}>
                        , {period}
                      </Label>
                    )}
                  </>
                ) : !hasPremium ? (
                  <div className={styles.text}>
                    Go PRO to see the latest data
                  </div>
                ) : null}
              </div>
            </div>
          )
        }}
      />
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
