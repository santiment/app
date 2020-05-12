import { Metric } from './index'

// NOTE: It's safe to pass it as reference, because it will not be modified [@vanguard | May12, 2020]
const TOP_HOLDERS = {
  key: 'holdersCount',
  label: 'Top Holders',
  defaultValue: 10,
  constraints: {
    min: 1,
    max: 1000000
  }
}

export const MetricSettings = {
  [Metric.amount_in_top_holders.key]: [TOP_HOLDERS],
  [Metric.amount_in_exchange_top_holders.key]: [TOP_HOLDERS],
  [Metric.amount_in_non_exchange_top_holders.key]: [TOP_HOLDERS]
}
