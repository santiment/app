import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Dialog from '@santiment-network/ui/Dialog'
import Loader from '@santiment-network/ui/Loader/Loader'
import { formatTooltipValue } from '../../ducks/SANCharts/CustomTooltip'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import PercentChanges from '../PercentChanges'
import { calcPercentageChange } from '../../utils/utils'
import { Metric } from '../../ducks/dataHub/metrics'
import { Description } from '../../ducks/dataHub/metrics/descriptions'
import MetricDescription from '../../ducks/SANCharts/MetricDescription/MetricDescription'
import SwipeableCard from './SwipeableCard'
import { DEFAULT_SETTINGS } from './settings'
import styles from './MobileMetricCard.module.scss'

const MobileMetricCard = ({
  metric,
  colors = {},
  ticker = '',
  onToggleMetric,
  hasPremium,
  errorsMetricsKeys,
  slug,
  ...rest
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false)
  const { label, key, dataKey = key } = metric
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS, slug })
  const [data, loadings, ErrorMsg] = useTimeseries([metric], settings)

  useEffect(
    () => {
      setSettings({ ...settings, slug })
    },
    [slug]
  )

  // const errorOnChart = errorsMetricsKeys.includes(key)
  let errorText = ''

  // if (
  //   Object.keys(errorMetrics).includes(key) ||
  //   isError ||
  //   errorOnChart
  // ) {
  //   errorText = `Failed to fetch the ${
  //     errorOnChart ? '' : 'latest '
  //   }data`
  // }

  let value = null
  let diff = null
  let period = '24h'

  if (data.length >= 2) {
    const lastIndex = data.length - 1
    const today = data[lastIndex][dataKey]
    const yesterday = data[lastIndex - 1][dataKey]
    value = `${formatTooltipValue(false, today)} ${
      metric === Metric.transaction_volume ? ticker : ''
    }`
    diff = calcPercentageChange(yesterday, today)
  }

  if (metric === Metric.dev_activity) {
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
    <SwipeableCard
      onLeftActionClick={() => setIsOpenDescription(true)}
      onRightActionClick={onToggleMetric}
      hasLeftAction={Description[dataKey]}
      {...rest}
    >
      <div className={styles.wrapper}>
        <div className={cx(styles.row, styles.row_top)}>
          <h3 className={styles.metric}>{label}</h3>
        </div>
        <div
          className={cx(styles.row, styles.row_bottom)}
          style={{ '--color': colors[metric.key] || '' }}
        >
          {loadings.length > 0 ? (
            <Loader className={styles.loader} />
          ) : errorText ? (
            <div className={styles.text}>{errorText}</div>
          ) : value ? (
            <>
              <h4 className={styles.value}>{value}</h4>
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
            <div className={styles.text}>Go PRO to see the latest data</div>
          ) : null}
        </div>
      </div>
      {Description[dataKey] && (
        <Dialog
          title={label}
          open={isOpenDescription}
          onClose={() => setIsOpenDescription(false)}
        >
          <Dialog.ScrollContent className={styles.dialog}>
            <MetricDescription metric={metric} project={rest.project} />
          </Dialog.ScrollContent>
        </Dialog>
      )}
    </SwipeableCard>
  )
}

export default MobileMetricCard
