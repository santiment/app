import { Line } from 'recharts'

export const SOCIAL_TWITTER_INTERVALS = ['24h', '7d']

export const TWITTER_FOLLOWERS_METRIC = {
  queryKey: 'twitter_followers',
  category: 'Social',
  node: 'line',
  Component: Line,
  description:
    "Shows the number changes of followers on the project's official Twitter account over time."
}

export const Submetrics = {
  [TWITTER_FOLLOWERS_METRIC.queryKey]: SOCIAL_TWITTER_INTERVALS.map(
    interval => {
      return {
        ...TWITTER_FOLLOWERS_METRIC,
        key: `${TWITTER_FOLLOWERS_METRIC.queryKey}_${interval}`,
        label: `Twitter Changes (${interval})`,
        shortLabel: `Twitter ${interval} changes`,
        reqMeta: {
          interval,
          transform: { type: 'changes' }
        }
      }
    }
  )
}
