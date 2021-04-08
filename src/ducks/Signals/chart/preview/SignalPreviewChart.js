import React, { useEffect, useMemo } from 'react'
import { clearCache } from '../../../Chart/Synchronizer'
import {
  getNewMetricsByType,
  getOldMetricsByType,
  getSlugFromSignalTarget,
  getTimeRangeForChart,
  isNewTypeSignal
} from '../../utils/utils'
import { DAILY_ACTIVE_ADDRESSES } from '../../utils/constants'
import {
  cleanByDatakeys,
  makeSameRange,
  mapToRequestedMetrics,
  mapWithTimeseriesAndYCoord,
  getAvailableCooldown
} from './utils'
import VisualBacktestChart, { GetReferenceDots } from '../VisualBacktestChart'
import { getMetricYAxisId } from '../../../SANCharts/utils'
import { useTimeseries } from '../../../Studio/timeseries/hooks'
import { Skeleton } from '../../../../components/Skeleton'
import styles from './SignalPreviewChart.module.scss'

const SignalPreviewChart = ({
  target,
  type: oldSignalType,
  points,
  showTitle,
  trigger
}) => {
  const { label, from, to } = useMemo(
    () => getTimeRangeForChart(oldSignalType),
    [oldSignalType]
  )

  useEffect(() => clearCache, [])

  const isNew = isNewTypeSignal(trigger)

  const { metrics, triggersBy } = isNew
    ? getNewMetricsByType(trigger)
    : getOldMetricsByType(oldSignalType)

  const isStrongDaily = oldSignalType === DAILY_ACTIVE_ADDRESSES

  const { cooldown } = trigger

  const metricsInterval = isStrongDaily ? '1d' : getAvailableCooldown(cooldown)

  const { eth_address, address = eth_address } = target || {}

  const slug = getSlugFromSignalTarget(trigger)

  const { settings: { selector: { infrastructure } = {} } = {} } = trigger

  const settings = useMemo(
    () => {
      return {
        interval: metricsInterval,
        slug,
        address,
        from,
        to
      }
    },
    [metricsInterval, slug, address, from, to]
  )

  const requestedMetrics = useMemo(
    () => {
      return mapToRequestedMetrics(metrics, {
        reqMeta: {
          infrastructure
        }
      })
    },
    [infrastructure, metrics]
  )

  const [data, loadings] = useTimeseries(requestedMetrics, settings)

  const merged = useMemo(
    () => cleanByDatakeys(data, triggersBy.dataKey || triggersBy.key),
    [data, triggersBy]
  )

  let triggeredSignals = useMemo(
    () => {
      const filtered = points.filter(point => point['triggered?'])

      return makeSameRange(filtered, merged)
    },
    [points, merged]
  )

  const signals = useMemo(
    () => {
      return mapWithTimeseriesAndYCoord(
        triggeredSignals,
        triggersBy,
        merged,
        isStrongDaily
      )
    },
    [triggeredSignals, triggersBy, merged, isStrongDaily]
  )

  const referenceDots = useMemo(
    () =>
      triggeredSignals.length > 0 && triggersBy
        ? GetReferenceDots(signals, getMetricYAxisId(triggersBy))
        : null,
    [signals, triggersBy, triggeredSignals]
  )

  if (!slug) {
    return null
  }

  if (loadings && loadings.length > 0) {
    return <Skeleton show={true} className={styles.skeleton} />
  }

  return (
    <VisualBacktestChart
      data={merged}
      dataKeys={triggersBy}
      label={label}
      triggeredSignals={triggeredSignals}
      metrics={metrics}
      referenceDots={referenceDots}
      showTitle={showTitle}
    />
  )
}

export default SignalPreviewChart
