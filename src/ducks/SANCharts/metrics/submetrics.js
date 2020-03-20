import { Line } from 'recharts'

export const SOCIAL_TWITTER_INTERVALS = ['24h', '7d']

export const TWITTER_METRIC = {
  queryKey: 'twitter_followers',
  category: 'Social',
  node: 'line',
  Component: Line
}

export const Submetrics = {
  [TWITTER_METRIC.key]: SOCIAL_TWITTER_INTERVALS.map(interval => {
    return {
      ...TWITTER_METRIC,
      key: `${TWITTER_METRIC.queryKey}_${interval}`,
      label: `Twitter Changes (${interval})`,
      shortLabel: `Twitter ${interval} changes`,
      description:
        "Shows the number changes of followers on the project's official Twitter account over time.",
      reqMeta: {
        interval,
        transform: { type: 'changes' }
      }
    }
  })
}
