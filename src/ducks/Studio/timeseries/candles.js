import { useMemo } from 'react'
import { PRICE_OHLC_QUERY, newOhlcPreTransformer } from './queries/price_ohlc'
import { Node } from '../../Chart/nodes'

export function useMetricSettingsAdjuster (MetricSettingMap) {
  return useMemo(
    () => {
      MetricSettingMap.forEach((MetricSettings, metric) => {
        if (MetricSettings.node !== Node.CANDLES) {
          delete MetricSettings.query
          delete MetricSettings.preTransform
          return
        }

        MetricSettings.query = PRICE_OHLC_QUERY
        MetricSettings.preTransform = newOhlcPreTransformer(metric)
      })

      return MetricSettingMap
    },
    [MetricSettingMap]
  )
}