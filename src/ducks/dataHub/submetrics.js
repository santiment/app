import { Metric } from './metrics'
import { updateTooltipSettings } from './tooltipSettings'
import {
  CONNECTED_WIDGET,
  SIDEPANEL,
  ICO_PRICE
} from '../Studio/Sidebar/Button/types'
import {
  SPENT_COIN_COST,
  SOCIAL_CONTEXT
} from '../Studio/Chart/Sidepanel/panes'

export const SOCIAL_TWITTER_INTERVALS = ['24h', '7d']

export const TopTransactionsTableMetric = {
  key: 'TopTransactionsTable',
  type: CONNECTED_WIDGET,
  label: 'Top Transactions Table',
  requiredMetric: Metric.transaction_volume,
  parentMetric: Metric.transaction_volume,
  abbreviation: 'ttt'
}

export const SOCIAL_ACTIVE_USERS_TELEGRAM = {
  ...Metric.social_active_users,
  showRoot: true,
  key: 'social_active_users_telegram',
  label: 'Social Active Users (Telegram)',
  shortLabel: 'Soc. Act. Us. Tg.',
  channel: 'telegram',
  reqMeta: {
    source: 'telegram'
  }
}

export const SOCIAL_ACTIVE_USERS_TWITTER = {
  ...Metric.social_active_users,
  showRoot: true,
  key: 'social_active_users_twitter',
  label: 'Social Active Users (Twitter)',
  shortLabel: 'Soc. Act. Us. Tw.',
  channel: 'twitter',
  reqMeta: {
    source: 'twitter_crypto'
  }
}

export const Submetrics = {
  [Metric.price_usd.key]: [
    {
      key: 'ico_price',
      type: ICO_PRICE,
      label: 'ICO Price',
      checkIsActive: ({ isICOPriceActive }) => isICOPriceActive,
      checkIsVisible: ({ isICOPriceDisabled }) =>
        isICOPriceDisabled !== undefined && !isICOPriceDisabled
    },
    {
      key: SPENT_COIN_COST,
      type: SIDEPANEL,
      label: 'Spent Coin Cost',
      checkIsActive: ({ sidepanel }) => sidepanel === SPENT_COIN_COST
    }
  ],

  [Metric.transaction_volume.key]: [TopTransactionsTableMetric],

  [Metric.social_volume_total.key]: [
    {
      key: SOCIAL_CONTEXT,
      type: SIDEPANEL,
      label: 'Social Context',
      checkIsActive: ({ sidepanel }) => sidepanel === SOCIAL_CONTEXT
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
  })),
  [Metric.social_active_users.key]: [
    SOCIAL_ACTIVE_USERS_TELEGRAM,
    SOCIAL_ACTIVE_USERS_TWITTER
  ]
}

Object.values(Submetrics).forEach(submetrics =>
  updateTooltipSettings(submetrics)
)
