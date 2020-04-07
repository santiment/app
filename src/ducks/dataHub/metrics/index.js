import { updateTooltipSettings } from '../tooltipSettings'
import {
  usdFormatter,
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
    advancedView: 'Spent coin cost'
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
    shortLabel: 'Soc. Volume',
    anomalyKey: 'SOCIAL_VOLUME',
    advancedView: 'Social Context',
    formatter: value => tooltipValueFormatter({ value })
  },
  age_destroyed: {
    category: 'On-chain',
    node: 'bar',
    group: 'Token Flows/Movement/Activity',
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
    group: 'Exchange Flow',
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
    group: 'Exchange Flow',
    label: 'Percent of Total Supply on Exchanges',
    shortLabel: '% TS on Exc.'
  },
  topHoldersPercentOfTotalSupply: {
    category: 'On-chain',
    node: 'line',
    label: 'In Top Holders Total',
    shortLabel: 'In T.H. Total'
  },
  circulation: {
    category: 'On-chain',
    node: 'line',
    group: 'Token Flows/Movement/Activity',
    label: 'Token Circulation',
    shortLabel: 'Token Circ.',
    abbreviation: 'tc'
  },
  mvrv_usd: {
    category: 'On-chain',
    node: 'line',
    group: 'Network value',
    label: 'MVRV',
    fullTitle: 'Market Value To Realized Value',
    shortLabel: 'MVRV',
    abbreviation: 'mvrv',
    video: 'https://www.youtube.com/watch?v=foMhhHbCgBE'
  },
  transaction_volume: {
    category: 'On-chain',
    node: 'bar',
    group: 'Token Flows/Movement/Activity',
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
    group: 'Token Flows/Movement/Activity',
    label: 'Token Velocity',
    shortLabel: 'Token Vel.',
    abbreviation: 'tv'
  },
  active_deposits: {
    category: 'On-chain',
    node: 'bar',
    label: 'Daily Active Deposits',
    shortLabel: 'Daily A.D.'
  },
  twitter_followers: {
    category: 'Social',
    node: 'line',
    label: 'Twitter'
  },
  social_dominance_total: {
    category: 'Social',
    node: 'line',
    label: 'Social Dominance',
    shortLabel: 'Soc. Domin.',
    formatter: percentageFormatter
  },
  realized_value_usd: {
    category: 'On-chain',
    node: 'line',
    group: 'Network value',
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
    abbreviation: 'mdia'
  },
  nvt: {
    category: 'On-chain',
    node: 'line',
    group: 'Network value',
    label: 'NVT Ratio Circulation',
    shortLabel: 'NVT R. Circ.'
  },
  nvt_transaction_volume: {
    node: 'bar',
    group: 'Network value',
    label: 'NVT Ratio Transaction Volume',
    shortLabel: 'NVT R. T.V.',
    category: 'On-chain'
  },
  minersBalance: {
    node: 'line',
    label: 'Miners balance',
    category: 'On-chain'
  }
}

Object.keys(Metric).forEach(key => {
  Metric[key].key = key
})

updateTooltipSettings(Object.values(Metric))
