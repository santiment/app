import {
  usdFormatter,
  btcFormatter,
  ethFormatter,
  percentageFormatter,
  absoluteToPercentsFormatter,
  tooltipValueFormatter,
  mvrvFormatter
} from './formatters'
import { updateTooltipSettings } from '../tooltipSettings'
import { Node } from '../../Chart/nodes'
import { millify } from '../../../utils/formatting'
import {
  HolderDistributionCombinedBalanceAbsoluteMetric,
  HolderDistributionMetric
} from '../../Studio/Chart/Sidepanel/HolderDistribution/metrics'
import {
  HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE,
  HOLDER_DISTRIBUTION_NODE
} from '../../Studio/Sidebar/nodes'

export function deriveMetric (baseMetric, newMetric) {
  const { key, queryKey = key, domainGroup = key } = baseMetric
  const { reqMeta } = newMetric

  newMetric.domainGroup = domainGroup
  newMetric.queryKey = queryKey

  if (reqMeta) {
    newMetric.reqMeta = Object.assign({}, baseMetric.reqMeta, reqMeta)
  }

  return Object.assign({}, baseMetric, newMetric)
}

function normalizeAxisPercent (value) {
  const percent = value * 100
  const absPercent = Math.abs(percent)

  if (absPercent >= 100) {
    return Math.trunc(percent)
  }

  if (absPercent >= 10) {
    return percent.toFixed(2)
  }

  return percent.toFixed(3)
}

const axisPercentFormatter = value => `${normalizeAxisPercent(value)}%`

export const METRIC_GROUPS = {
  REDDIT_SENTIMENT: 'Reddit sentiment',
  TELEGRAM_SENTIMENT: 'Telegram sentiment',
  TWITTER_SENTIMENT: 'Twitter sentiment',
  TOTAL_SENTIMENT: 'Total sentiment',
  MAKERDAO_STATS: 'Makerdao Stats'
}

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
    checkIsVisible: ({ slug }) => slug !== 'bitcoin'
  },
  price_eth: {
    node: 'line',
    label: 'Price ETH',
    category: 'Financial',
    formatter: ethFormatter,
    checkIsVisible: ({ slug }) => slug !== 'ethereum'
  },
  balance: {
    category: 'Financial',
    node: 'bar',
    label: 'Balance',
    fill: true,
    color: 'mystic',
    strokeWidth: 0
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
    advancedView: 'Social Context',
    formatter: value => tooltipValueFormatter({ value })
  },
  social_active_users: {
    queryKey: 'social_active_users',
    category: 'Social',
    shortLabel: 'Soc. Act. Us.',
    node: 'bar',
    withoutRoot: true,
    showRoot: false,
    isBeta: true,
    checkIsVisible: ({ isBeta: isBetaApp }) => isBetaApp,
    domainGroup: 'social_active_users'
  },
  age_consumed: {
    category: 'On-chain',
    node: 'bar',
    group: 'Long-term holders',
    label: 'Age Consumed',
    shortLabel: 'Age Cons.',
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
    video: 'https://www.youtube.com/watch?v=0R6GDF2bg6A',
    formatter: v => millify(v, 2)
  },
  daily_active_addresses: {
    category: 'On-chain',
    node: 'autoWidthBar',
    group: 'Network Activity',
    label: 'Daily Active Addresses',
    shortLabel: 'Daily A.A.',
    abbreviation: 'daa',
    video: 'https://www.youtube.com/watch?v=n3dUvWvQEpQ',
    historicalTriggersDataKey: 'active_addresses'
  },
  percent_of_total_supply_on_exchanges: {
    category: 'On-chain',
    node: 'line',
    group: 'Exchanges',
    label: 'Supply on Exchanges (as % of total supply)',
    shortLabel: '% TS on Exc.'
  },
  topHoldersPercentOfTotalSupply: {
    category: 'On-chain',
    node: 'line',
    label: 'Supply held by top addresses (as % of total supply)',
    shortLabel: 'ahta',
    group: 'Whales'
  },
  circulation: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Activity',
    label: 'Circulation',
    shortLabel: 'Circ.',
    abbreviation: 'tc'
  },
  dormant_circulation: {
    category: 'On-chain',
    node: 'line',
    group: 'Long-term holders',
    label: 'Dormant Circulation',
    rootLabel: 'Dormant Circulation (365d)',
    shortLabel: 'Dorm. Circ.',
    queryKey: 'dormant_circulation_365d',
    withoutRoot: true
  },
  stock_to_flow: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Value',
    label: 'Stock to Flow ratio',
    shortLabel: 'St. to Fl.',
    isBeta: true
  },
  mvrv_usd_z_score: {
    category: 'On-chain',
    node: 'filledLine',
    group: 'Network Value',
    label: 'MVRV Ratio (Z score)',
    formatter: mvrvFormatter,
    axisFormatter: mvrvFormatter
  },
  mvrv_usd: {
    category: 'On-chain',
    node: 'filledLine',
    group: 'Network Value',
    label: 'MVRV ratio',
    fullTitle: 'Market Value To Realized Value',
    shortLabel: 'MVRV',
    abbreviation: 'mvrv',
    video: 'https://www.youtube.com/watch?v=foMhhHbCgBE',
    formatter: mvrvFormatter,
    axisFormatter: mvrvFormatter
  },
  mvrv_usd_intraday: {
    category: 'On-chain',
    node: 'filledLine',
    group: 'Network Value',
    label: 'MVRV USD intraday',
    fullTitle: 'Market Value To Realized Value (USD, intraday)',
    shortLabel: 'MVRV(i)',
    abbreviation: 'mvrv_intraday',
    video: 'https://www.youtube.com/watch?v=foMhhHbCgBE',
    formatter: mvrvFormatter,
    axisFormatter: mvrvFormatter
  },
  mvrv_long_short_diff_usd: {
    category: 'On-chain',
    node: 'filledLine',
    group: 'Network Value',
    label: 'MVRV Long/Short Difference',
    fullTitle: 'Market Value To Realized Value Long-Short Difference',
    shortLabel: 'MVRV L/S Diff',
    formatter: v => (v ? `${(v * 100).toFixed(2)}%` : 'No data'),
    axisFormatter: axisPercentFormatter,
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
  transaction_volume_usd: {
    category: 'On-chain',
    node: 'bar',
    group: 'Network Activity',
    label: 'Transaction Volume USD',
    abbreviation: 'trvust',
    shortLabel: 'Trans. Vol. USD'
  },
  network_growth: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Activity',
    label: 'Network Growth',
    shortLabel: 'Net. Growth',
    video: 'https://www.youtube.com/watch?v=YaccxEEz8pg'
  },
  whale_transaction_count_100k_usd_to_inf: {
    category: 'On-chain',
    group: 'Whales',
    label: 'Whale Transaction Count (>100k USD)',
    node: 'autoWidthBar'
  },
  whale_transaction_count_1m_usd_to_inf: {
    category: 'On-chain',
    group: 'Whales',
    label: 'Whale Transaction Count (>1m USD)',
    node: 'autoWidthBar'
  },
  dev_activity: {
    category: 'Development',
    node: 'line',
    label: 'Development Activity',
    shortLabel: 'Dev. Activity',
    reqMeta: {
      transform: {
        type: 'moving_average',
        movingAverageBase: 7
      }
    }
  },
  dev_activity_contributors_count: {
    category: 'Development',
    node: 'bar',
    label: 'Dev. Activity Contributors Count',
    shortLabel: 'Dev. Act. Contr. Count'
  },
  velocity: {
    category: 'On-chain',
    node: 'line',
    group: 'Network Activity',
    label: 'Velocity',
    shortLabel: 'Token Vel.',
    abbreviation: 'tv'
  },
  active_deposits: {
    category: 'On-chain',
    node: 'autoWidthBar',
    label: 'Daily Active Deposits',
    shortLabel: 'Daily A.D.',
    group: 'Exchanges'
  },
  twitter_followers: {
    category: 'Social',
    node: 'line',
    label: 'Twitter Followers'
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
    label: 'NVT Ratio (with Circulation)',
    shortLabel: 'NVT R. Circ.'
  },
  nvt_transaction_volume: {
    node: 'bar',
    group: 'Network Value',
    label: 'NVT Ratio (with Transaction Volume)',
    shortLabel: 'NVT R. T.V.',
    category: 'On-chain'
  },
  network_profit_loss: {
    node: 'line',
    label: 'Network Realized Profit/Loss',
    shortLabel: 'NR P. or L.',
    group: 'Network Value',
    category: 'On-chain'
  },
  miners_balance: {
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
    label: 'Supply on Exchanges',
    category: 'On-chain',
    group: 'Exchanges'
  },
  supply_outside_exchanges: {
    node: 'line',
    label: 'Supply outside of Exchanges',
    category: 'On-chain',
    group: 'Exchanges'
  },
  amount_in_top_holders: {
    node: 'line',
    label: 'Supply held by top addresses',
    category: 'On-chain',
    group: 'Whales'
  },
  amount_in_exchange_top_holders: {
    node: 'line',
    label: 'Supply held by top exchange addresses',
    category: 'On-chain',
    group: 'Whales'
  },
  amount_in_non_exchange_top_holders: {
    node: 'line',
    label: 'Supply held by top non-exchange addresses',
    category: 'On-chain',
    group: 'Whales'
  },
  sentiment_positive_total: {
    node: 'line',
    label: 'Positive sentiment (Total)',
    category: 'Social',
    group: METRIC_GROUPS.TOTAL_SENTIMENT
  },
  sentiment_positive_telegram: {
    node: 'line',
    label: 'Positive sentiment (Telegram)',
    category: 'Social',
    group: METRIC_GROUPS.TELEGRAM_SENTIMENT
  },
  sentiment_positive_reddit: {
    node: 'line',
    label: 'Positive sentiment (Reddit)',
    category: 'Social',
    group: METRIC_GROUPS.REDDIT_SENTIMENT
  },
  sentiment_positive_twitter: {
    node: 'line',
    label: 'Positive sentiment (Twitter)',
    category: 'Social',
    group: METRIC_GROUPS.TWITTER_SENTIMENT
  },
  sentiment_negative_total: {
    node: 'line',
    label: 'Negative sentiment (Total)',
    category: 'Social',
    group: METRIC_GROUPS.TOTAL_SENTIMENT
  },
  sentiment_negative_telegram: {
    node: 'line',
    label: 'Negative sentiment (Telegram)',
    category: 'Social',
    group: METRIC_GROUPS.TELEGRAM_SENTIMENT
  },
  sentiment_negative_reddit: {
    node: 'line',
    label: 'Negative sentiment (Reddit)',
    category: 'Social',
    group: METRIC_GROUPS.REDDIT_SENTIMENT
  },
  sentiment_negative_twitter: {
    node: 'line',
    label: 'Negative sentiment (Twitter)',
    category: 'Social',
    group: METRIC_GROUPS.TWITTER_SENTIMENT
  },
  sentiment_balance_total: {
    node: 'filledLine',
    label: 'Average Sentiment (Total)',
    category: 'Social',
    group: METRIC_GROUPS.TOTAL_SENTIMENT
  },
  sentiment_balance_reddit: {
    node: 'filledLine',
    label: 'Average Sentiment (Reddit)',
    category: 'Social',
    group: METRIC_GROUPS.REDDIT_SENTIMENT
  },
  sentiment_balance_telegram: {
    node: 'filledLine',
    label: 'Average Sentiment (Telegram)',
    category: 'Social',
    group: METRIC_GROUPS.TELEGRAM_SENTIMENT
  },
  sentiment_balance_twitter: {
    node: 'filledLine',
    label: 'Average Sentiment (Twitter)',
    category: 'Social',
    group: METRIC_GROUPS.TWITTER_SENTIMENT
  },
  sentiment_volume_consumed_total: {
    node: 'filledLine',
    label: 'Weighted sentiment (Total)',
    category: 'Social',
    group: METRIC_GROUPS.TOTAL_SENTIMENT
  },
  sentiment_volume_consumed_telegram: {
    node: 'filledLine',
    label: 'Weighted sentiment (Telegram)',
    category: 'Social',
    group: METRIC_GROUPS.TELEGRAM_SENTIMENT
  },
  sentiment_volume_consumed_reddit: {
    node: 'filledLine',
    label: 'Weighted sentiment (Reddit)',
    category: 'Social',
    group: METRIC_GROUPS.REDDIT_SENTIMENT
  },
  sentiment_volume_consumed_twitter: {
    node: 'filledLine',
    label: 'Weighted sentiment (Twitter)',
    category: 'Social',
    group: METRIC_GROUPS.TWITTER_SENTIMENT
  },
  bitmex_perpetual_basis_ratio: {
    node: 'line',
    label: 'BitMEX Perpetual Basis Ratio',
    category: 'Derivatives'
  },
  bitmex_perpetual_basis: {
    node: 'line',
    label: 'BitMEX Perpetual Contract Basis',
    category: 'Derivatives'
  },
  bitmex_perpetual_open_interest: {
    node: 'line',
    label: 'BitMEX Perpetual Contracts Open Interest',
    category: 'Derivatives'
  },
  bitmex_perpetual_funding_rate: {
    node: 'filledLine',
    label: 'BitMEX Perpetual Contract Funding Rate',
    category: 'Derivatives',
    formatter: v => (v ? `${(v * 100).toFixed(2)}%` : 'No data'),
    axisFormatter: axisPercentFormatter
  },
  bitmex_perpetual_open_value: {
    node: 'line',
    label: 'BitMEX Perpetual Contracts Open Value',
    category: 'Derivatives'
  },
  defi_total_value_locked_usd: {
    category: 'On-chain',
    group: 'Defi',
    node: 'bar',
    label: 'Defi Total Value Locked in USD',
    shortLabel: 'Defi Locked',
    fill: true,
    isBeta: true
  },
  price_daa_divergence: {
    category: 'Indicators',
    label: 'Price DAA Divergence',
    node: Node.GREEN_RED_BAR,
    isBeta: true,
    formatter: absoluteToPercentsFormatter,
    axisFormatter: axisPercentFormatter
  },
  adjusted_price_daa_divergence: {
    category: 'Indicators',
    label: 'Adjusted Price DAA Divergence',
    node: Node.GREEN_RED_BAR,
    isBeta: true,
    formatter: absoluteToPercentsFormatter,
    axisFormatter: axisPercentFormatter
  },
  active_addresses_24h: {
    category: 'On-chain',
    node: 'autoWidthBar',
    group: 'Network Activity',
    label: 'Active Addresses 24h',
    shortLabel: 'A.A. 24h',
    abbreviation: 'aa24h'
  },
  active_addresses_1h: {
    category: 'On-chain',
    node: 'autoWidthBar',
    group: 'Network Activity',
    label: 'Active Addresses 1h',
    shortLabel: 'A.A. 1h',
    abbreviation: 'aa1h'
  },

  // uniswap
  uniswap_total_claims_amount: {
    category: 'On-chain',
    label: 'Total Amount Claimed',
    node: 'line',
    description:
      'Total amount claimed by all uniswap users (both users and Liquidity providers)',
    color: '#5275ff'
  },
  uniswap_total_user_claims_amount: {
    category: 'On-chain',
    node: 'line',
    label: 'Total Claimed Amount for Users',
    description:
      'Total amount claimed by all uniswap users (excluding Liquidity providers)',
    color: '#5275ff'
  },
  uniswap_total_lp_claims_amount: {
    category: 'On-chain',
    node: 'line',
    label: 'Total Claimed Amount for Liquidity Providers',
    description: 'Total amount claimed by all uniswap Liquidity providers',
    color: '#5275ff'
  },
  uniswap_total_claims_percent: {
    category: 'On-chain',
    node: 'line',
    label: 'Total Percent Claimed',
    description: 'Percent of total uniswap tokens claimed',
    color: '#5275ff'
  },
  uniswap_total_claims_count: {
    category: 'On-chain',
    node: 'line',
    label: 'Total Claims Count',
    color: '#5275ff'
  },
  uniswap_total_user_claims_count: {
    category: 'On-chain',
    node: 'line',
    label: 'Total Claims Count for Users',
    color: '#5275ff'
  },
  uniswap_total_lp_claims_count: {
    category: 'On-chain',
    node: 'line',
    label: 'Total Claims Count for Liquidity Providers',
    color: '#5275ff'
  },

  uniswap_claims_count: {
    category: 'On-chain',
    node: 'line',
    label: 'Number of claims',
    description: 'The number of uniq addresses and claimed UNI per timeframe',
    color: '#ffad4d'
  },
  uniswap_lp_claims_count: {
    category: 'On-chain',
    node: 'line',
    label: 'Number of claims by liquidity providers',
    description:
      'The number of uniq addresses that  provided liquidity and claimed  UNI per timeframe',
    color: '#ffad4d'
  },
  uniswap_claims_amount: {
    category: 'On-chain',
    node: 'line',
    label: 'Total Amount Claimed',
    description: 'Intraday metric of uniswap_amount_claimed',
    color: '#ffad4d'
  },
  uniswap_lp_claims_amount: {
    category: 'On-chain',
    node: 'line',
    label: 'Amount claimed by liquidity providers',
    description: 'Intraday metric of uniswap_amount_lp_claimed',
    color: '#ffad4d'
  },
  uniswap_user_claims_count: {
    category: 'On-chain',
    node: 'line',
    label: 'Number of claims by historical user',
    color: '#ffad4d'
  },
  uniswap_user_claims_amount: {
    category: 'On-chain',
    node: 'line',
    label: 'Amount claimed by historical users',
    color: '#ffad4d'
  },
  average_fees_usd: {
    category: 'On-chain',
    node: 'area',
    checkIsVisible: ({ slug }) => slug === 'ethereum',
    label: 'Average Fees (USD)'
  },
  median_fees_usd: {
    category: 'On-chain',
    node: 'area',
    checkIsVisible: ({ slug }) => slug === 'ethereum',
    label: 'Median Fees (USD)'
  },
  [HolderDistributionMetric.holders_distribution_1_to_10
    .key]: HOLDER_DISTRIBUTION_NODE,
  [HolderDistributionCombinedBalanceAbsoluteMetric
    .holders_distribution_combined_balance_1_to_10
    .key]: HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE,

  mcd_locked_token: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Token Locked in Multi-Collateral CDPs'
  },
  daily_sai_locked: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'WETH Locked in Single-Collateral CDPs'
  },
  mcd_debt: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Multi-Collateral DAI Total Supply'
  },
  daily_dai_collat_ratio: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Collateralization Ratio for BAT and USDC in Multi-Collateral CDPs'
  },
  daily_dai_collat_ratio_weth: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Collateralization Ratio for WETH in Multi-Collateral CDPs'
  },
  daily_dai_collat_ratio_sai: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Collateralization Ratio for SAI in Multi-Collateral CDPs'
  },
  daily_sai_collat_ratio: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Collateralization Ratio for Single-Collateral CDPs'
  },
  mcd_dsr: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Multi-Collateral DAI in DSR Saving Annual Rate'
  },
  mcd_stability_fee: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Multi-Collateral Stability Fee'
  },
  mcd_debt_created_5m: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Multi-Collateral DAI Created'
  },
  mcd_debt_repaid_5m: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Multi-Collateral DAI Repaid'
  },
  mcd_art_liquidation_5m: {
    category: 'On-chain',
    group: METRIC_GROUPS.MAKERDAO_STATS,
    node: 'bar',
    label: 'Makerdao Collateral Liquidation Amounts'
  }
}

Object.keys(Metric).forEach(key => {
  Metric[key].key = key
})

updateTooltipSettings(Object.values(Metric))
