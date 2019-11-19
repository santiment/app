import React from 'react'
import { Bar, Line, Area } from 'recharts'
import { usdFormatter } from './utils'

export const Events = {
  trendPositionHistory: {
    key: 'trendPositionHistory',
    type: 'events',
    label: 'Trending Position',
    category: 'Social',
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
  historyPrice: {
    node: Line,
    color: 'jungle-green',
    label: 'Price',
    dataKey: 'priceUsd',
    category: 'Financial',
    formatter: usdFormatter,
    historicalTriggersDataKey: 'price'
  },
  historyPricePreview: {
    node: Area,
    color: 'jungle-green',
    label: 'Price',
    dataKey: 'priceUsd',
    category: 'Financial',
    gradientUrl: 'url(#totalUp)',
    hideYAxis: true
  },
  marketcap: {
    category: 'Financial',
    node: Line,
    label: 'Marketcap',
    color: 'malibu',
    formatter: usdFormatter
  },
  volume: {
    category: 'Financial',
    node: Bar,
    label: 'Volume',
    fill: true,
    dataKey: 'volume',
    color: 'mystic',
    formatter: usdFormatter
  },
  socialVolume: {
    category: 'Social',
    node: Bar,
    label: 'Social Volume',
    anomalyKey: 'SOCIAL_VOLUME',
    color: 'malibu',
    description: `Shows the amount of mentions of the coin on 1000+ crypto social media channels, including Telegram groups, crypto subreddits, discord groups, private traders chats and more.`
  },
  age_destroyed: {
    category: 'On-chain',
    node: Bar,
    group: 'Token Flows/Movement/Activity',
    label: 'Token Age Consumed',
    fill: true,
    video: 'https://www.youtube.com/watch?v=NZFtYT5QzS4',
    description: `
          Shows the amount of tokens changing addresses on a certain date,
          multiplied by the number of days since they last moved`
  },
  exchange_balance: {
    category: 'On-chain',
    node: Line,
    group: 'Exchange Flow',
    label: 'Exchange Flow Balance',
    video: 'https://www.youtube.com/watch?v=0R6GDF2bg6A',
    description: `The flows of tokens going in to and out of exchange wallets combined on one graph.
          If the value is positive, more tokens entered the exchange than left.
          If the value is negative, more flowed out of exchanges than flowed in.
`
  },
  daily_active_addresses: {
    category: 'On-chain',
    node: Bar,
    group: 'Network Activity',
    label: 'Daily Active Addresses',
    anomalyKey: 'DAILY_ACTIVE_ADDRESSES',
    video: 'https://www.youtube.com/watch?v=n3dUvWvQEpQ',
    description: `Shows the number of unique network addresses involved in transactions
    on a certain date.
    Simply put, DAA indicates the daily level of crowd interaction (or
    speculation) with a certain token.`,
    color: 'texas-rose',
    dataKey: 'daily_active_addresses',
    historicalTriggersDataKey: 'active_addresses',
    minInterval: '1d'
  },
  percentOfTokenSupplyOnExchanges: {
    category: 'On-chain',
    node: Line,
    group: 'Exchange Flow',
    label: 'Percent of Token Supply on Exchanges',
    dataKey: 'percentOnExchanges',
    description: 'The percent of the total token supply which is on exchanges.'
  },
  topHoldersPercentOfTotalSupply: {
    category: 'On-chain',
    node: Line,
    label: 'In Top Holders Total',
    // TODO: Add support for 3 datakeys of single metric:
    // inExchanges outsideExchanges inTopHoldersTotal
    dataKey: 'inTopHoldersTotal'
  },
  circulation_1d: {
    category: 'On-chain',
    node: Line,
    group: 'Token Flows/Movement/Activity',
    label: 'Token Circulation',
    description: `
          Shows the number of unique tokens being used during each day.
          If one token changes hands 5 times on a given day,
          it will be counted once by the token circulation,
          but 5 times by the transaction volume.`,
    minInterval: '1d'
  },
  mvrv_usd: {
    category: 'On-chain',
    node: Line,
    group: 'Network value',
    label: 'Market Value To Realized Value',
    video: 'https://www.youtube.com/watch?v=foMhhHbCgBE',
    description: `MVRV measures how much every holder originally paid for their coins, and compares that investment to the coin’s current price to calculate the average profit or loss across all holders. Example: if MVRV = 2, then, on average, all coin holders have (currently) doubled their initial investment.`,
    minInterval: '1d'
  },
  transaction_volume: {
    category: 'On-chain',
    node: Bar,
    group: 'Token Flows/Movement/Activity',
    label: 'Transaction Volume',
    description: `
    Shows the aggregate amount of tokens across all transactions that
    happened on the network on a certain date.`
  },
  network_growth: {
    category: 'On-chain',
    node: Line,
    group: 'Network Activity',
    label: 'Network Growth',
    video: 'https://www.youtube.com/watch?v=YaccxEEz8pg',
    description: `Shows the number of new addresses being created on the network each day.
    Essentially, this chart illustrates user adoption over time, and can
    be used to identify when the project is gaining - or losing - traction.`,
    minInterval: '1d'
  },
  devActivity: {
    category: 'Development',
    node: Line,
    color: 'heliotrope',
    label: 'Development Activity',
    anomalyKey: 'DEV_ACTIVITY',
    dataKey: 'activity',
    description:
      "Based on number of Github 'events' including PRs, comments, and wiki edits, plus the number of public repositories a project is maintaining",
    reqMeta: {
      transform: 'movingAverage',
      movingAverageIntervalBase: 7
    }
  },
  velocity: {
    category: 'On-chain',
    node: Line,
    group: 'Token Flows/Movement/Activity',
    label: 'Token Velocity',
    description: `
          Shows the average number of times that a token changes wallets each
          day.

          Simply put, a higher token velocity means that a token is used in
          transactions more often within a set time frame.
`,
    minInterval: '1d'
  },
  dailyActiveDeposits: {
    category: 'On-chain',
    node: Bar,
    label: 'Daily Active Deposits',
    dataKey: 'activeDeposits',
    description: `
          Shows the number of unique deposit addresses that participated in
          transactions for a given day. A <b>deposit address</b> is an address
          belonging to an exchange that users use to deposit assets`
  },
  historyTwitterData: {
    category: 'Social',
    node: Line,
    label: 'Twitter',
    dataKey: 'followersCount',
    description: `Shows the number of followers on the project's official Twitter account over time`
  },
  socialDominance: {
    category: 'Social',
    node: Line,
    label: 'Social Dominance',
    dataKey: 'dominance',
    description: `Shows the share (or %) of the coin’s mentions on crypto-related social media, compared to a pool of 50+ of the most talked-about projects online.`
  },
  realized_value_usd: {
    category: 'On-chain',
    node: Line,
    group: 'Network value',
    label: 'Realized Cap',
    description: `Realized Cap shows the total amount that all holders spent to purchase the coin (i.e. the total acquisition cost). While market cap = supply X current price of each coin, realized cap = supply X price of each coin when it last ‘moved’`,
    minInterval: '1d'
  },
  ethSpentOverTime: {
    category: 'On-chain',
    node: Line,
    label: 'Eth Spent Over Time',
    dataKey: 'ethSpent',
    description:
      'How much ETH has moved out of team wallets over time. While not tracked all the way to exchanges, this metric may suggest potential selling activity'
  },
  gasUsed: {
    category: 'On-chain',
    node: Line,
    label: 'Gas Used',
    description:
      'Used Gas by a blockchain. When you send tokens, interact with a contract or do anything else on the blockchain, you must pay for that computation. That payment is calculated in Gas.'
  },
  mean_dollar_invested_age: {
    category: ['Financial', 'On-chain'],
    node: Line,
    label: 'Mean Dollar Invested Age',
    description: (
      <>
        For each coin we see how long it has stayed at its current address and
        we compute the average of all those ages. The difference between "coin
        age" and "dollar age" comes from the different way that we compute the
        averages. More info{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://insights.santiment.net/read/%F0%9F%93%A2-mean-age-653'
        >
          here
        </a>
        .
      </>
    ),
    minInterval: '1d'
  },
  nvt: {
    category: 'On-chain',
    node: Line,
    group: 'Network value',
    label: 'NVT Ratio Circulation',
    description: `NVT tries to determine how much ‘value’ is being transmitted on a coin’s network. This version of NVT is calculated by dividing the coin’s Market Cap by its Token Circulation. The higher the NVT, the more expensive the network relative to the value it transmits, indicating an overvalued asset.`,
    minInterval: '1d'
  },
  nvt_transaction_volume: {
    node: Bar,
    group: 'Network value',
    label: 'NVT Ratio Transaction Volume',
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
  dailyActiveAddresses: Metrics.daily_active_addresses,
  tokenCirculation: Metrics.circulation_1d,
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
