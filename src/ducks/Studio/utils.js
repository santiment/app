import { Metric } from '../dataHub/metrics'

export const transformExchangeOutflow = (data) =>
  data.map(({ datetime, exchange_outflow }) => ({
    datetime,
    exchange_outflow: -exchange_outflow,
  }))

export function extractMirrorMetricsDomainGroups(domainGroups) {
  if (!domainGroups) return

  const { length } = domainGroups
  for (let i = 0; i < length; i++) {
    const group = domainGroups[i]
    if (group.includes(Metric.exchange_outflow.key)) {
      return [group]
    }
  }

  return []
}
