import { Metric } from './metrics'
import { updateTooltipSettings } from './tooltipSettings'

export const SOCIAL_TWITTER_INTERVALS = ['24h', '7d']

export const Submetrics = {
  [Metric.twitter_followers.key]: SOCIAL_TWITTER_INTERVALS.map(interval => ({
    ...Metric.twitter_followers,
    key: `twitter_followers_${interval}`,
    queryKey: 'twitter_followers',
    label: `Twitter Followers (${interval} change)`,
    description:
      "Shows the number changes of followers on the project's official Twitter account over time.",
    reqMeta: {
      interval,
      transform: { type: 'changes' }
    }
  }))
}

Object.values(Submetrics).forEach(submetrics =>
  updateTooltipSettings(submetrics)
)
