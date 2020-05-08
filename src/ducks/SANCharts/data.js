import React from 'react'
import { Line, Bar, Area } from 'recharts'
import { usdFormatter } from './utils'
import { millify } from '../../utils/formatting'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import MoreInfoLink from '../../components/MoreInfoLink/MoreInfoLink'

export const Events = {
  trendPositionHistory: {
    key: 'trendPositionHistory',
    type: 'events',
    label: 'Trending Position',
    category: 'Social',
    dataKey: 'position',
    description:
      'Shows the appearance (and position) of the project on our list of top 10 emerging words on crypto social media on a given date'
  },
  position: {
    label: 'Trending Position',
    formatter: val => {
      switch (val) {
        case 1:
          return `1st`
        case 2:
          return '2nd'
        case 3:
          return '3rd'

        default:
          return `${val}th`
      }
    }
  },
  metricAnomalyKey: {
    label: 'Anomaly',
    isAnomaly: true,
    formatter: val => Metrics[val].label
  }
}

export const Metrics = {
  price_usd: {
    node: 'line',
    Component: Line,
    label: 'Price',
    category: 'Financial',
    formatter: usdFormatter,
    historicalTriggersDataKey: 'price'
  },
  historyPricePreview: {
    // TODO: Replace to 'area' when san-chart will support it [@vanguard | Jan 23, 2020]
    queryKey: 'price_usd',
    node: 'line',
    Component: Area,
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
    Component: Bar,
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
    Component: Line,
    label: 'Marketcap',
    formatter: usdFormatter
  },
  volume_usd: {
    category: 'Financial',
    node: 'bar',
    Component: Bar,
    label: 'Volume',
    fill: true,
    formatter: usdFormatter
  },
  social_volume_total: {
    category: 'Social',
    node: 'bar',
    Component: Bar,
    label: 'Social Volume',
    shortLabel: 'Soc. Volume',
    anomalyKey: 'SOCIAL_VOLUME',
    description: (
      <>
        Shows the amount of mentions of the coin on 1000+ crypto social media
        channels, including Telegram groups, crypto subreddits, discord groups,
        private traders chats and more.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/social-volume/' />
      </>
    ),
    advancedView: 'Social Context'
  },
  age_destroyed: {
    category: 'On-chain',
    node: 'bar',
    Component: Bar,
    group: 'Token Flows/Movement/Activity',
    label: 'Token Age Consumed',
    shortLabel: 'Token Age Cons.',
    abbreviation: 'tac',
    fill: true,
    video: 'https://www.youtube.com/watch?v=NZFtYT5QzS4',
    description: (
      <>
        Shows the amount of tokens changing addresses on a certain date,
        multiplied by the number of days since they last moved.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/age-consumed/' />
      </>
    ),
    formatter: value => (value ? millify(value, 2) : 'No data')
  },
  exchange_balance: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    group: 'Exchange Flow',
    label: 'Exchange Flow Balance',
    shortLabel: 'Exc. Flow Bal.',
    abbreviation: 'efb',
    video: 'https://www.youtube.com/watch?v=0R6GDF2bg6A',
    description: (
      <>
        The flows of tokens going in to and out of exchange wallets combined on
        one graph. If the value is positive, more tokens entered the exchange
        than left. If the value is negative, more flowed out of exchanges than
        flowed in.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/exchange-funds-flow' />
      </>
    )
  },
  daily_active_addresses: {
    category: 'On-chain',
    node: 'daybar',
    Component: Bar,
    group: 'Network Activity',
    label: 'Daily Active Addresses',
    shortLabel: 'Daily A.A.',
    anomalyKey: 'DAILY_ACTIVE_ADDRESSES',
    abbreviation: 'daa',
    video: 'https://www.youtube.com/watch?v=n3dUvWvQEpQ',
    description: (
      <>
        Shows the number of unique network addresses involved in transactions on
        a certain date. Simply put, DAA indicates the daily level of crowd
        interaction (or speculation) with a certain token.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/daily-active-addresses/' />
      </>
    ),

    historicalTriggersDataKey: 'active_addresses',
    minInterval: '1d'
  },
  percentOfTokenSupplyOnExchanges: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    group: 'Exchange Flow',
    label: 'Percent of Token Supply on Exchanges',
    shortLabel: '% TS on Exc.',
    // dataKey: 'percentOnExchanges',
    description: (
      <>
        The percent of the total token supply which is on exchanges.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/supply-on-or-outside-exchanges/' />
      </>
    )
  },
  topHoldersPercentOfTotalSupply: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    label: 'In Top Holders Total',
    shortLabel: 'In T.H. Total',
    // dataKey: 'inTopHoldersTotal'
    insights: [5618, 5637, 5647]
  },
  circulation: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    group: 'Token Flows/Movement/Activity',
    label: 'Token Circulation',
    shortLabel: 'Token Circ.',
    abbreviation: 'tc',
    description: (
      <>
        Shows the number of unique tokens being used during each day. If one
        token changes hands 5 times on a given day, it will be counted once by
        the token circulation, but 5 times by the transaction volume.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/circulation/' />
      </>
    ),
    minInterval: '1d'
  },
  mvrv_usd: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    group: 'Network value',
    label: 'MVRV',
    fullTitle: 'Market Value To Realized Value',
    shortLabel: 'MVRV',
    abbreviation: 'mvrv',
    video: 'https://www.youtube.com/watch?v=foMhhHbCgBE',
    description: (
      <>
        MVRV measures how much every holder originally paid for their coins, and
        compares that investment to the coin’s current price to calculate the
        average profit or loss across all holders. Example: if MVRV = 2, then,
        on average, all coin holders have (currently) doubled their initial
        investment.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/mvrv/' />
      </>
    ),
    minInterval: '1d'
  },
  transaction_volume: {
    category: 'On-chain',
    node: 'bar',
    Component: Bar,
    group: 'Token Flows/Movement/Activity',
    label: 'Transaction Volume',
    abbreviation: 'trv',
    shortLabel: 'Trans. Vol.',
    description: (
      <>
        Shows the aggregate amount of tokens across all transactions that
        happened on the network on a certain date.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/transaction-volume/' />
      </>
    )
    // advancedView: 'Histogram'
  },
  network_growth: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    group: 'Network Activity',
    label: 'Network Growth',
    shortLabel: 'Net. Growth',
    video: 'https://www.youtube.com/watch?v=YaccxEEz8pg',
    description: (
      <>
        Shows the number of new addresses being created on the network each day.
        Essentially, this chart illustrates user adoption over time, and can be
        used to identify when the project is gaining - or losing - traction.
        <MoreInfoLink href='https://academy.santiment.net/metrics/network-growth/' />
      </>
    ),
    minInterval: '1d'
  },
  dev_activity: {
    category: 'Development',
    node: 'line',
    Component: Line,
    label: 'Development Activity',
    shortLabel: 'Dev. Activity',
    anomalyKey: 'DEV_ACTIVITY',
    description: (
      <>
        Based on number of Github 'events' including PRs, comments, and wiki
        edits, plus the number of public repositories a project is maintaining.
        <MoreInfoLink href='https://academy.santiment.net/metrics/developer-activity/' />
      </>
    ),
    reqMeta: {
      transform: 'movingAverage',
      movingAverageIntervalBase: 7
    }
  },
  velocity: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    group: 'Token Flows/Movement/Activity',
    label: 'Token Velocity',
    shortLabel: 'Token Vel.',
    abbreviation: 'tv',
    description: (
      <>
        Shows the average number of times that a token changes wallets each day.
        Simply put, a higher token velocity means that a token is used in
        transactions more often within a set time frame.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/velocity/' />
      </>
    ),
    minInterval: '1d'
  },
  dailyActiveDeposits: {
    category: 'On-chain',
    node: 'bar',
    Component: Bar,
    label: 'Daily Active Deposits',
    shortLabel: 'Daily A.D.',
    // dataKey: 'activeDeposits',
    description: (
      <>
        Shows the number of unique deposit addresses that participated in
        transactions for a given day. A deposit address is an address belonging
        to an exchange that users use to deposit assets.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/metrics-for-deposit-addresses/#daily-active-deposits' />
      </>
    )
  },
  historyTwitterData: {
    category: 'Social',
    node: 'line',
    Component: Line,
    label: 'Twitter',
    // dataKey: 'followersCount',
    description: `Shows the number of followers on the project's official Twitter account over time`
  },
  social_dominance_total: {
    category: 'Social',
    node: 'line',
    Component: Line,
    label: 'Social Dominance',
    shortLabel: 'Soc. Domin.',
    // dataKey: 'dominance',
    description: `Shows the share (or %) of the coin’s mentions on crypto-related social media, compared to a pool of 50+ of the most talked-about projects online.`
  },
  realized_value_usd: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    group: 'Network value',
    label: 'Realized Cap',
    shortLabel: 'Real. Cap',
    description: `Realized Cap shows the total amount that all holders spent to purchase the coin (i.e. the total acquisition cost). While market cap = supply X current price of each coin, realized cap = supply X price of each coin when it last ‘moved’`,
    minInterval: '1d'
  },
  ethSpentOverTime: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    label: 'Eth Spent Over Time',
    shortLabel: 'Eth Spent',
    // dataKey: 'ethSpent',
    description:
      'How much ETH has moved out of team wallets over time. While not tracked all the way to exchanges, this metric may suggest potential selling activity'
  },
  gasUsed: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    label: 'Gas Used',
    description:
      'Used Gas by a blockchain. When you send tokens, interact with a contract or do anything else on the blockchain, you must pay for that computation. That payment is calculated in Gas.'
  },
  mean_dollar_invested_age: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    label: 'Mean Dollar Invested Age',
    shortLabel: 'Mean D.I.A.',
    abbreviation: 'mdia',
    description: (
      <>
        For each coin we see how long it has stayed at its current address and
        we compute the average of all those ages. The difference between "coin
        age" and "dollar age" comes from the different way that we compute the
        averages.{' '}
        <MoreInfoLink href='https://insights.santiment.net/read/%F0%9F%93%A2-mean-age-653' />
        .
      </>
    ),
    minInterval: '1d'
  },
  mean_age: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    label: 'Mean Coin Age',
    shortLabel: 'Mean C.A.',
    abbreviation: 'mca',
    description: (
      <>
        The average age of all coins/tokens on the blockchain.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/mean-coin-age/' />
      </>
    ),
    minInterval: '1d',
    isBeta: true
  },
  nvt: {
    category: 'On-chain',
    node: 'line',
    Component: Line,
    group: 'Network value',
    label: 'NVT Ratio Circulation',
    shortLabel: 'NVT R. Circ.',
    description: (
      <>
        NVT tries to determine how much ‘value’ is being transmitted on a coin’s
        network. This version of NVT is calculated by dividing the coin’s Market
        Cap by its Token Circulation. The higher the NVT, the more expensive the
        network relative to the value it transmits, indicating an overvalued
        asset.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/nvt/' />
      </>
    ),
    minInterval: '1d'
  },
  nvt_transaction_volume: {
    node: 'bar',
    Component: Bar,
    group: 'Network value',
    label: 'NVT Ratio Transaction Volume',
    shortLabel: 'NVT R. T.V.',
    category: 'On-chain',
    description: `NVT tries to determine how much ‘value’ is being transmitted on a coin’s network. This version of NVT is calculated by dividing the coin’s Market Cap by its on-chain Transaction Volume. The higher the NVT, the more expensive the network relative to the value it transmits, indicating an overvalued asset.`,
    minInterval: '1d'
  }
}

Object.keys(Metrics).forEach(key => {
  Metrics[key].key = key
})

const DerivedMetrics = []

DerivedMetrics.forEach(obj => {
  Metrics[obj.key] = obj
  const parentMetric = Metrics[obj.parent]
  if (parentMetric) {
    parentMetric.push(obj)
  } else {
    Metrics[obj.parent] = [obj]
  }
})

export const compatabilityMap = {
  // old              : new
  socialDominance: Metrics.social_dominance_total,
  socialVolume: Metrics.social_volume_total,
  devActivity: Metrics.dev_activity,
  historyPrice: Metrics.price_usd,
  volume: Metrics.volume_usd,
  marketcap: Metrics.marketcap_usd,
  dailyActiveAddresses: Metrics.daily_active_addresses,
  tokenCirculation: Metrics.circulation,
  mvrvRatio: Metrics.mvrv_usd,
  transactionVolume: Metrics.transaction_volume,
  tokenVelocity: Metrics.velocity,
  realizedValue: Metrics.realized_value_usd,
  networkGrowth: Metrics.network_growth,
  nvtRatioCirculation: Metrics.nvt,
  nvtRatioTxVolume: Metrics.nvt_transaction_volume,
  tokenAgeConsumed: Metrics.age_destroyed,
  exchangeFundsFlow: Metrics.exchange_balance
}

export const SOCIAL_SIDEBAR = 'SOCIAL_SIDEBAR'
export const ASSETS_SIDEBAR = 'ASSETS_SIDEBAR'
export const HISTOGRAM_SIDEBAR = 'HISTOGRAM_SIDEBAR'

const LARGE_NUMBER_THRESHOLD = 99999

const FORMATTER = value => {
  if (!value && typeof value !== 'number') {
    return 'No data'
  }

  if (value > LARGE_NUMBER_THRESHOLD) {
    return millify(value, 2)
  }

  return Number.isInteger(value) ? value : value.toFixed(2)
}

export const tooltipSettings = {
  datetime: {
    formatter: value => {
      const date = new Date(value)
      const { HH, mm } = getTimeFormats(date)
      const { MMMM, DD, YYYY } = getDateFormats(date)
      return `${HH}:${mm}, ${MMMM} ${DD}, ${YYYY}`
    }
  },
  isAnomaly: {
    label: 'Anomaly',
    formatter: v => v
  },
  trendingPosition: {
    label: 'Trending Position',
    formatter: ([val]) => Events.position.formatter(val)
  }
}

Object.values(Metrics).forEach(metric => {
  const { key, dataKey = key, formatter = FORMATTER, label } = metric
  metric.formatter = formatter
  tooltipSettings[dataKey] = {
    label,
    formatter
  }
})
