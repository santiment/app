import { useMemo } from 'react'
import { Metric } from '../../dataHub/metrics'

const ALERT_METRICS = new Set([
  Metric.price_usd,
  Metric.daily_active_addresses,
  Metric.social_volume_total,
  Metric.exchange_balance,
  Metric.transaction_volume,
  Metric.volume_usd
])

const alertMetricsFilter = metric =>
  ALERT_METRICS.has(metric) || ALERT_METRICS.has(metric.base)

export function useAlertMetrics (metrics) {
  return useMemo(() => metrics.filter(alertMetricsFilter), [metrics])
}
