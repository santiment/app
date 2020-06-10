import { updateTooltipSettings } from '../tooltipSettings'
import {
  usdFormatter,
  btcFormatter,
  ethFormatter,
  percentageFormatter,
  tooltipValueFormatter
} from '../../SANCharts/utils'
import { millify } from '../../../utils/formatting'

export const Metric = {
  price_usd: {
    node: 'line',
    label: 'Price',
    category: 'Financial',
    formatter: usdFormatter,
    historicalTriggersDataKey: 'price',
    advancedView: 'Spent Coin Cost'
  },
  price_btc: {
    node: 'line',
    label: 'Price BTC',
    category: 'Financial',
    formatter: btcFormatter,
    isBeta: true
  },
  price_eth: {
    node: 'line',
    label: 'Price ETH',
    category: 'Financial',
    formatter: ethFormatter,
    isBeta: true
  },
  historyPricePreview: {
    queryKey: 'price_usd',
    node: 'area',
    color: 'jungle-green',
    label: 'Price',
    dataKey: 'price_usd',
    category: 'Financial',
    gradientUrl: 'url(#totalUp)',
    formatter: usdFormatter,
    hideYAxis: true
  },
  historicalBalance: {
    category: 'Financial',
    node: 'bar',
    label: 'Balance',
    fill: true,
    dataKey: 'balance',
    color: 'mystic',
    strokeWidth: 0,
    hidden: true
  },
  marketcap_usd: {
    category: 'Financial',
    node: 'line',
    label: 'Marketcap',
    formatter: usdFormatter
  },
  volume_usd: {
    category: 'Financial',
    node: 'bar',
    label: 'Volume',
    fill: true,
    formatter: usdFormatter
  },
  social_volume_total: {
    category: 'Social',
    node: 'bar',
    label: 'Social Volume',
    shortLabel: 'Soc. Vol.',
    anomalyKey: 'SOCIAL_VOLUME',
    advancedView: 'Social Context',
    formatter: value => tooltipValueFormatter({ value })
  },
  age_destroyed: {
    category: 'On-chain',
    node: 'bar',
    group: 'Network Activity',
    label: 'Token Age Consumed',
    shortLabel: 'Token Age Cons.',
    abbreviation: 'tac',
    fill: true,
    video: 'https://www.youtube.com/watch?v=NZFtYT5QzS4',
    formatter: value => (value ? millify(value, 2) : 'No data')
  },
  exchange_balance: {
    category: 'On-chain',
    node: 'line',
    group: 'Exchanges',
    label: 'Exchange Flow Balance',
    shortLabel: 'Exc. Flow Bal.',
    abbreviation: 'efb',
    video: 'https://www.youtube.com/watch?v=0R6GDF2bg6A'
  },
  daily_active_addresses: {
    category: 'On-chain',
    node: 'daybar',
    group: 'Network Activity',
    label: 'Daily Active Addresses',
    shortLabel: 'Daily A.A.',
    anomalyKey: 'DAILY_ACTIVE_ADDRESSES',
    abbreviation: 'daa',
    video: 'https://www.youtube.com/watch?v=n3dUvWvQEpQ',
    historicalTriggersDataKey: 'active_addresses'
  },
  percent_of_total_supply_on_exchanges: {
    category: 'On-chain',
    node: 'line',
    group: 'Exchanges',
    label: 'Percent of Total Supply on Exchanges',
    shortLabel: '% TS on Exc.'
  },
  topHoldersPercentOfTotalSupply: {
    category: 'On-chain',
    node: 'line',
    label: 'Amount held by top addresses (as % of total supply)',
    shortLabel: 'ahta',
    group: 'Top Holders'
  },
  circulation: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Activity',
    label: 'Token Circulation',
    shortLabel: 'Token Circ.',
    abbreviation: 'tc'
  },
  mvrv_usd: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Value',
    label: 'MVRV',
    fullTitle: 'Market Value To Realized Value',
    shortLabel: 'MVRV',
    abbreviation: 'mvrv',
    video: 'https://www.youtube.com/watch?v=foMhhHbCgBE'
  },
  mvrv_long_short_diff_usd: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Value',
    label: 'MVRV Long-Short Difference',
    fullTitle: 'Market Value To Realized Value Long-Short Difference',
    shortLabel: 'MVRV L/S Diff',
    isBeta: true
  },
  transaction_volume: {
    category: 'On-chain',
    node: 'bar',
    group: 'Network Activity',
    label: 'Transaction Volume',
    abbreviation: 'trv',
    shortLabel: 'Trans. Vol.'
  },
  network_growth: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Activity',
    label: 'Network Growth',
    shortLabel: 'Net. Growth',
    video: 'https://www.youtube.com/watch?v=YaccxEEz8pg'
  },
  dev_activity: {
    category: 'Development',
    node: 'line',
    label: 'Development Activity',
    shortLabel: 'Dev. Activity',
    anomalyKey: 'DEV_ACTIVITY',
    reqMeta: {
      transform: {
        type: 'moving_average',
        movingAverageBase: 7
      }
    }
  },
  velocity: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Activity',
    label: 'Token Velocity',
    shortLabel: 'Token Vel.',
    abbreviation: 'tv'
  },
  active_deposits: {
    category: 'On-chain',
    node: 'bar',
    label: 'Daily Active Deposits',
    shortLabel: 'Daily A.D.',
    group: 'Exchanges'
  },
  twitter_followers: {
    category: 'Social',
    node: 'line',
    label: 'Twitter followers'
  },
  social_dominance_total: {
    category: 'Social',
    node: 'line',
    label: 'Social Dominance',
    shortLabel: 'Soc. Dom.',
    formatter: percentageFormatter
  },
  realized_value_usd: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Value',
    label: 'Realized Cap',
    shortLabel: 'Real. Cap'
  },
  ethSpentOverTime: {
    category: 'On-chain',
    node: 'line',
    label: 'Eth Spent Over Time',
    shortLabel: 'Eth Spent'
  },
  gasUsed: {
    category: 'On-chain',
    node: 'line',
    label: 'Gas Used'
  },
  mean_dollar_invested_age: {
    category: 'On-chain',
    node: 'line',
    label: 'Mean Dollar Invested Age',
    shortLabel: 'Mean D.I.A.',
    abbreviation: 'mdia',
    group: 'Network Value'
  },
  mean_age: {
    category: 'On-chain',
    node: 'line',
    label: 'Mean Coin Age',
    shortLabel: 'Mean C.A.',
    abbreviation: 'mca',
    isBeta: true,
    group: 'Network Value'
  },
  nvt: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Value',
    label: 'NVT Ratio Circulation',
    shortLabel: 'NVT R. Circ.'
  },
  nvt_transaction_volume: {
    node: 'bar',
    group: 'Network Value',
    label: 'NVT Ratio Transaction Volume',
    shortLabel: 'NVT R. T.V.',
    category: 'On-chain'
  },
  minersBalance: {
    node: 'line',
    label: 'Miners Balance',
    category: 'On-chain'
  },
  deposit_transactions: {
    node: 'line',
    label: 'Deposit Transactions',
    category: 'On-chain',
    group: 'Exchanges'
  },
  withdrawal_transactions: {
    node: 'line',
    label: 'Withdrawal Transactions',
    category: 'On-chain',
    group: 'Exchanges'
  },
  exchange_inflow: {
    node: 'line',
    label: 'Exchange Inflow',
    category: 'On-chain',
    group: 'Exchanges'
  },
  exchange_outflow: {
    node: 'line',
    label: 'Exchange Outflow',
    category: 'On-chain',
    group: 'Exchanges'
  },
  supply_on_exchanges: {
    node: 'line',
    label: 'Supply On Exchanges',
    category: 'On-chain',
    group: 'Exchanges'
  },
  supply_outside_exchanges: {
    node: 'line',
    label: 'Supply Outside Exchanges',
    category: 'On-chain',
    group: 'Exchanges'
  },
  amount_in_top_holders: {
    node: 'line',
    label: 'Amount held by top addresses',
    category: 'On-chain',
    group: 'Top Holders'
  },
  amount_in_exchange_top_holders: {
    node: 'line',
    label: 'Amount held by top exchange addresses',
    category: 'On-chain',
    group: 'Top Holders'
  },
  amount_in_non_exchange_top_holders: {
    node: 'line',
    label: 'Amount held by top non-exchange addresses',
    category: 'On-chain',
    group: 'Top Holders'
  },
  sentiment_positive_total: {
    node: 'line',
    label: 'Sentiment Positive Total',
    category: 'Social',
    group: 'Sentiment Total'
  },
  sentiment_positive_telegram: {
    node: 'line',
    label: 'Sentiment Positive Telegram',
    category: 'Social',
    group: 'Sentiment Telegram'
  },
  sentiment_positive_reddit: {
    node: 'line',
    label: 'Sentiment Positive Reddit',
    category: 'Social',
    group: 'Sentiment Reddit'
  },
  sentiment_positive_twitter: {
    node: 'line',
    label: 'Sentiment Positive Twitter',
    category: 'Social',
    group: 'Sentiment Twitter'
  },
  sentiment_negative_total: {
    node: 'line',
    label: 'Sentiment Negative Total',
    category: 'Social',
    group: 'Sentiment Total'
  },
  sentiment_negative_telegram: {
    node: 'line',
    label: 'Sentiment Negative Telegram',
    category: 'Social',
    group: 'Sentiment Telegram'
  },
  sentiment_negative_reddit: {
    node: 'line',
    label: 'Sentiment Negative Reddit',
    category: 'Social',
    group: 'Sentiment Reddit'
  },
  sentiment_negative_twitter: {
    node: 'line',
    label: 'Sentiment Negative Twitter',
    category: 'Social',
    group: 'Sentiment Twitter'
  },
  sentiment_balance_total: {
    node: 'filledLine',
    label: 'Sentiment Balance Total',
    category: 'Social',
    group: 'Sentiment Total'
  },
  sentiment_balance_reddit: {
    node: 'filledLine',
    label: 'Sentiment Balance Reddit',
    category: 'Social',
    group: 'Sentiment Reddit'
  },
  sentiment_balance_telegram: {
    node: 'filledLine',
    label: 'Sentiment Balance Telegram',
    category: 'Social',
    group: 'Sentiment Telegram'
  },
  sentiment_balance_twitter: {
    node: 'filledLine',
    label: 'Sentiment Balance Twitter',
    category: 'Social',
    group: 'Sentiment Twitter'
  },
  sentiment_volume_consumed_total: {
    node: 'filledLine',
    label: 'Weighted Social Sentiment Total',
    category: 'Social',
    group: 'Sentiment Total'
  },
  sentiment_volume_consumed_telegram: {
    node: 'filledLine',
    label: 'Weighted Social Sentiment Telegram',
    category: 'Social',
    group: 'Sentiment Telegram'
  },
  sentiment_volume_consumed_reddit: {
    node: 'filledLine',
    label: 'Weighted Social Sentiment Reddit',
    category: 'Social',
    group: 'Sentiment Reddit'
  },
  sentiment_volume_consumed_twitter: {
    node: 'filledLine',
    label: 'Weighted Social Sentiment Twitter',
    category: 'Social',
    group: 'Sentiment Twitter'
  }
}

Object.keys(Metric).forEach(key => {
  Metric[key].key = key
})

updateTooltipSettings(Object.values(Metric))
