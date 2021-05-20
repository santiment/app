import { useMemo } from 'react'
import { Metric } from '../../dataHub/metrics'

const ALERT_METRICS = new Set([
  Metric.price_usd.key,
  Metric.daily_active_addresses.key,
  Metric.social_volume_total.key,
  Metric.exchange_balance.key,
  Metric.transaction_volume.key,
  Metric.volume_usd.key
])

const alertMetricsFilter = metric =>
  !metric.indicator &&
  (ALERT_METRICS.has(metric.key) ||
    (metric.base && ALERT_METRICS.has(metric.base.key)))

export function useAlertMetrics (metrics) {
  return useMemo(() => metrics.filter(alertMetricsFilter), [metrics])
}
