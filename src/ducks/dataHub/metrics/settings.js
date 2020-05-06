import { Metric } from './index'

export const MetricSettings = Object.assign(Object.create(null), {
  [Metric.amount_in_top_holders.key]: [
    {
      key: 'holdersCount',
      label: 'Top Holders',
      defaultValue: 10,
      constraints: {
        min: 1,
        max: 1000000,
      },
    },
  ],
})
