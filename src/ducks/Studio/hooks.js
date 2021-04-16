import { useMemo, useEffect } from 'react'
import { useCandleMetricSettings } from './timeseries/candles'
import { MetricIntervalGetter } from '../dataHub/metrics/intervals'

export function useKeyDown (clb, key) {
  useEffect(() => {
    function onKeyDown (e) {
      if (e.key === key) {
        clb(e)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}

export function useKeyboardCmdShortcut (key, clb, target = window) {
  useEffect(
    () => {
      function onKeyDown (e) {
        const { ctrlKey, metaKey } = e

        if ((metaKey || ctrlKey) && key === e.key) {
          e.preventDefault()
          clb()
        }
      }

      target.addEventListener('keydown', onKeyDown)

      return () => target.removeEventListener('keydown', onKeyDown)
    },
    [clb, target]
  )
}

export function useMetricSettingsAdjuster (MetricSettingMap, settings, metrics) {
  const { from, to } = settings
  useMemo(
    () => {
      metrics.forEach(metric => {
        const intervalGetter = MetricIntervalGetter[metric.key]
        if (!intervalGetter) return

        const metricSettings = MetricSettingMap.get(metric) || {}
        metricSettings.interval = intervalGetter(from, to)
        MetricSettingMap.set(metric, metricSettings)
      })
    },
    [MetricSettingMap, metrics, from, to]
  )

  useCandleMetricSettings(MetricSettingMap, settings)

  return MetricSettingMap
}
