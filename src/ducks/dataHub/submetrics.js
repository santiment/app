import { Metric } from './metrics'
import { updateTooltipSettings } from './tooltipSettings'
import TopTransactionsTable from '../Studio/Widget/TopTransactionsTable'
import {
  CONNECTED_WIDGET,
  SIDEPANEL,
  ICO_PRICE
} from '../Studio/Sidebar/MetricSelector/types'
import {
  SPENT_COIN_COST,
  SOCIAL_CONTEXT
} from '../Studio/Chart/Sidepanel/panes'

export const SOCIAL_TWITTER_INTERVALS = ['24h', '7d']

export const AVAILABLE_TIMEBOUNDS = {
  dormant_circulation_: {
    base: Metric.dormant_circulation
  }
}

export const Submetrics = {
  [Metric.price_usd.key]: [
    {
      key: 'ico_price',
      type: ICO_PRICE,
      label: 'ICO Price',
      checkIsVisible: ({ isICOPriceDisabled }) => !isICOPriceDisabled,
      checkIsActive: ({ isICOPriceActive }) => isICOPriceActive
    },
    {
      key: SPENT_COIN_COST,
      type: SIDEPANEL,
      label: 'Spent Coin Cost',
      checkIsActive: ({ sidepanel }) => sidepanel === SPENT_COIN_COST
    }
  ],

  [Metric.transaction_volume.key]: [
    {
      key: 'TopTransactionsTable',
      type: CONNECTED_WIDGET,
      label: 'Top Transactions Table',
      widget: TopTransactionsTable,
      requiredMetric: Metric.transaction_volume
    }
  ],

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
  }))
}

Object.values(Submetrics).forEach(submetrics =>
  updateTooltipSettings(submetrics)
)
