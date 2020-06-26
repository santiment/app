import { Metric } from './metrics'
import { updateTooltipSettings } from './tooltipSettings'
import {
  SPENT_COIN_COST,
  SOCIAL_CONTEXT
} from '../Studio/Chart/Sidepanel/panes'

export const SOCIAL_TWITTER_INTERVALS = ['24h', '7d']

export const Submetrics = {
  [Metric.price_usd.key]: [
    {
      key: 'ico_price',
      type: 'ico_price',
      label: 'ICO Price'
    },
    {
      key: SPENT_COIN_COST,
      type: 'sidepanel',
      label: 'Spent Coin Cost'
    }
  ],

  [Metric.social_volume_total.key]: [
    {
      key: SOCIAL_CONTEXT,
      type: 'sidepanel',
      label: 'Social Context'
    }
  ],

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
    },
    replacements: {
      timebound: interval
    }
  }))
}

Object.values(Submetrics).forEach(submetrics =>
  updateTooltipSettings(submetrics)
)
