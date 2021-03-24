import { useMemo } from 'react'
import { PRICE_OHLC_QUERY, newOhlcPreTransformer } from './queries/price_ohlc'
import { Node } from '../../Chart/nodes'
import {
  getIntervals,
  getValidInterval,
  getCandlesMinInterval
} from '../Chart/MetricSettings/hooks'

export function useMetricSettingsAdjuster (MetricSettingMap, { from, to }) {
  return useMemo(
    () => {
      MetricSettingMap.forEach((MetricSettings, metric) => {
        if (MetricSettings.node !== Node.CANDLES) {
          delete MetricSettings.query
          delete MetricSettings.preTransform
          return
        }

        const validInterval = getValidInterval(
          MetricSettings.interval,
          getIntervals(getCandlesMinInterval(from, to))
        )

        MetricSettings.query = PRICE_OHLC_QUERY
        MetricSettings.interval = validInterval
        MetricSettings.preTransform = newOhlcPreTransformer(metric)
      })

      return MetricSettingMap
    },
    [MetricSettingMap, from, to]
  )
}
