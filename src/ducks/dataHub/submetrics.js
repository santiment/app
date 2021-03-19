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

export const FeesDistributionMetric = {
  key: 'FeesDistribution',
  type: CONNECTED_WIDGET,
  checkIsVisible: ({ slug }) => slug === 'ethereum',
  requiredMetric: Metric.transaction_volume,
  label: 'Fees Destribution'
}

export const SOCIAL_ACTIVE_USERS_TELEGRAM = {
  ...Metric.social_active_users,
  showRoot: true,
  key: 'social_active_users_telegram',
  label: 'Active social users (Telegram)',
  shortLabel: 'Act. Soc. Us. Tg.',
  channel: 'telegram',
  reqMeta: {
    source: 'telegram'
  }
}

export const SOCIAL_ACTIVE_USERS_TWITTER = {
  ...Metric.social_active_users,
  showRoot: true,
  key: 'social_active_users_twitter',
  label: 'Active social users (Twitter)',
  shortLabel: 'Act. Soc. Us. Tw.',
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

  [Metric.transaction_volume.key]: [
    TopTransactionsTableMetric,
    FeesDistributionMetric
  ],

  [Metric.social_volume_total.key]: [
    {
      key: SOCIAL_CONTEXT,
      type: SIDEPANEL,
      label: 'Social Context',
      checkIsActive: ({ sidepanel }) => sidepanel === SOCIAL_CONTEXT
    },
    SOCIAL_ACTIVE_USERS_TELEGRAM,
    SOCIAL_ACTIVE_USERS_TWITTER
  ],

  [Metric.twitter_followers.key]: SOCIAL_TWITTER_INTERVALS.map(interval => ({
    ...Metric.twitter_followers,
    key: `twitter_followers_${interval}`,
    queryKey: 'twitter_followers',
    label: `Twitter Followers ${interval}`,
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
