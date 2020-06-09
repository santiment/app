import { FORMATTER, updateTooltipSettings } from '../tooltipSettings'
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
    label: 'Age Consumed',
    shortLabel: 'Age Cons.',
    abbreviation: 'tac',
    fill: true,
    video: 'https://www.youtube.com/watch?v=NZFtYT5QzS4',
    formatter: value => (value ? millify(value, 2) : 'No data'),
    moreInfoLink: 'https://academy.santiment.net/metrics/age-consumed/'
  },
  exchange_balance: {
    category: 'On-chain',
    node: 'line',
    group: 'Exchanges',
    label: 'Exchange Flow Balance',
    shortLabel: 'Exc. Flow Bal.',
    abbreviation: 'efb',
    video: 'https://www.youtube.com/watch?v=0R6GDF2bg6A',
    moreInfoLink: 'https://academy.santiment.net/metrics/exchange-funds-flow/'
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
    historicalTriggersDataKey: 'active_addresses',
    moreInfoLink:
      'https://academy.santiment.net/metrics/daily-active-addresses/'
  },
  percent_of_total_supply_on_exchanges: {
    category: 'On-chain',
    node: 'line',
    group: 'Exchanges',
    label: 'Coin Supply on Exchanges (as % of total supply)',
    shortLabel: '% TS on Exc.',
    moreInfoLink:
      'https://academy.santiment.net/metrics/supply-on-or-outside-exchanges/'
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
    label: 'Circulation',
    shortLabel: 'Circ.',
    abbreviation: 'tc',
    moreInfoLink: 'https://academy.santiment.net/metrics/circulation/'
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
    shortLabel: 'Trans. Vol.',
    moreInfoLink: 'https://academy.santiment.net/metrics/transaction-volume/'
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
    label: 'Velocity',
    shortLabel: 'Token Vel.',
    abbreviation: 'tv',
    moreInfoLink: 'https://academy.santiment.net/metrics/velocity/'
  },
  active_deposits: {
    category: 'On-chain',
    node: 'bar',
    label: 'Daily Active Deposits',
    shortLabel: 'Daily A.D.',
    group: 'Exchanges',
    moreInfoLink: 'https://academy.santiment.net/metrics/daily-active-deposits/'
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
    group: 'Network Value',
    moreInfoLink: 'https://academy.santiment.net/metrics/transaction-volume/'
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
    group: 'Exchanges',
    moreInfoLink: 'https://academy.santiment.net/metrics/exchange-funds-flow/'
  },
  exchange_outflow: {
    node: 'line',
    label: 'Exchange Outflow',
    category: 'On-chain',
    group: 'Exchanges',
    domainGroup: 'exchange_inflow',
    formatter: value => FORMATTER(value && Math.abs(value)),
    moreInfoLink: 'https://academy.santiment.net/metrics/exchange-funds-flow/'
  },
  supply_on_exchanges: {
    node: 'line',
    label: 'Coin Supply on Exchanges',
    category: 'On-chain',
    group: 'Exchanges',
    moreInfoLink:
      'https://academy.santiment.net/metrics/supply-on-or-outside-exchanges/'
  },
  supply_outside_exchanges: {
    node: 'line',
    label: 'Coin Supply outside of Exchanges',
    category: 'On-chain',
    group: 'Exchanges',
    moreInfoLink:
      'https://academy.santiment.net/metrics/supply-on-or-outside-exchanges/'
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
  }
}

Object.keys(Metric).forEach(key => {
  Metric[key].key = key
})

updateTooltipSettings(Object.values(Metric))
