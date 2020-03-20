import { useState, useEffect } from 'react'
import { Metrics } from '../../data'

const ALERT_METRICS = [Metrics.price_usd, Metrics.daily_active_addresses]

const alertMetricsFilter = metric => ALERT_METRICS.includes(metric)

export function useAlertMetrics (metrics) {
  const [alertMetrics, setAlertMetrics] = useState([])

  useEffect(
    () => {
      setAlertMetrics(metrics.filter(alertMetricsFilter))
    },
    [metrics]
  )

  return alertMetrics
}
