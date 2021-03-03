import { Metric, deriveMetric } from '../../dataHub/metrics'
import { updateTooltipSetting } from '../../dataHub/tooltipSettings'
import { Description } from '../../dataHub/metrics/descriptions'

const MarketSegments = new Map()

export const getMarketSegment = key => {
  const target = MarketSegments.get(key)
  if (target) {
    return target
  }

  const metric = deriveMetric(Metric.dev_activity, {
    key,
    label: `Dev. Activity (${key})`,
    reqMeta: {
      market_segments: [key]
    }
  })
  MarketSegments.set(key, metric)

  updateTooltipSetting(metric)

  Description[
    key
  ] = `Shows the combined development activity of all projects in the ${key} market segment`

  return metric
}
