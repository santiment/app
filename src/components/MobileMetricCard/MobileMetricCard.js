import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Dialog from '@santiment-network/ui/Dialog'
import { formatTooltipValue } from '../../ducks/SANCharts/CustomTooltip'
import PercentChanges from '../PercentChanges'
import { DAY, getTimeIntervalFromToday } from '../../utils/dates'
import { calcPercentageChange } from '../../utils/utils'
import { makeRequestedData } from '../../pages/Detailed/mobile/utils'
import { METRIC_ANOMALIE_QUERY } from '../../ducks/GetTimeSeries/queries/metric_anomaly_query'
import Loader from '@santiment-network/ui/Loader/Loader'
import { Metrics, Events } from '../../ducks/SANCharts/data'
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
  onToggleMetric,
  hasPremium,
  slug,
  width,
  useInitialAnimation
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false)

  const { length: anomaliesNumber } = anomalies

  const { label, description, key, dataKey } = metric
  const { from, to } = getTimeIntervalFromToday(-1, DAY, { isUTC: true })

  const requestedData = makeRequestedData({
    metrics: [metric],
    slug,
    from,
    to,
    interval: '1d'
  })

  return (
    <SwipeableCard
      useInitialAnimation={useInitialAnimation}
      onLeftActionClick={() => setIsOpenDescription(true)}
      onRightActionClick={onToggleMetric}
      hasLeftAction={description}
      isSelected={isSelected}
      width={width}
    >
      <div className={styles.wrapper}>
        <div className={cx(styles.row, styles.row_top)}>
          <h3 className={styles.metric}>{label}</h3>
          {anomaliesNumber > 0 && (
            <h4 className={styles.anomalies}>
              {`${anomaliesNumber} anomal${anomaliesNumber > 1 ? 'ies' : 'y'}`}
            </h4>
          )}
        </div>
        <GetTimeSeries
          {...requestedData}
          render={({
            timeseries = [],
            eventsData = [],
            errorMetrics = {},
            isError,
            isLoading
          }) => {
            const hasError = Object.keys(errorMetrics).includes(key) || isError

            if (hasError) {
              return (
                <div className={styles.text}>Failed fetch the latest data</div>
              )
            }

            let value = null
            let diff = null

            if (timeseries.length >= 2) {
              const lastIndex = timeseries.length - 1
              const today = timeseries[lastIndex][dataKey || key]
              const yesterday = timeseries[lastIndex - 1][dataKey || key]
              value = `${formatTooltipValue(false, today)} ${
                metric === Metrics.transaction_volume ? ticker : ''
              }`
              diff = calcPercentageChange(yesterday, today)
            }

            const color =
              metric === Events.trendPositionHistory
                ? '#505573'
                : colors[dataKey || key]

            return (
              <div
                className={cx(styles.row, styles.row_bottom)}
                style={{ '--color': color || '' }}
              >
                {value && (
                  <>
                    <h4 className={styles.value}>{value}</h4>
                    <PercentChanges changes={diff} />
                    <Label accent='casper' className={styles.period}>
                      , {period || '24h'}
                    </Label>
                  </>
                )}
                {isLoading && !value && <Loader className={styles.loader} />}
                {false && !hasPremium && !isLoading && !value && (
                  <div className={styles.text}>
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
