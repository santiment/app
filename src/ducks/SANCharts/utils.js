import React from 'react'
import { YAxis, Bar, Line } from 'recharts'

export const Metrics = {
  historyPrice: {
    node: Line,
    color: 'jungle-green',
    label: 'Price',
    dataKey: 'priceUsd',
    yAxisVisible: true,
    category: 'Financial'
  },
  volume: {
    node: Bar,
    label: 'Volume',
    fill: true,
    dataKey: 'volume',
    category: 'Financial'
  },
  socialVolume: {
    node: Line,
    label: 'Social Volume',
    category: 'Social'
  },
  tokenAgeConsumed: {
    node: Bar,
    label: 'Token Age Consumed',
    fill: true,
    category: 'On-chain',
    description:
      'The amount of movement of tokens between addresses. One use for this metric is to spot large amounts of tokens moving after sitting for a long period of time.'
  },
  exchangeFundsFlow: {
    node: Line,
    label: 'Exchange Flow Balance',
    category: 'On-chain',
    description:
      'The flows of tokens going in to and out of exchange wallets combined on one graph. If the value is positive, more tokens entered the exchange than left. If the value is negative, more flowed out of exchanges than flowed in.'
  },
  dailyActiveAddresses: {
    node: Bar,
    label: 'Daily Active Addresses',
    category: 'On-chain',
    description:
      'The number of unique addresses that participated in transactions for a given day.'
  },
  percentOfTokenSupplyOnExchanges: {
    node: Line,
    label: 'Percent of token supply on exchanges',
    dataKey: 'percentOnExchanges',
    category: 'On-chain'
  },
  topHoldersPercentOfTotalSupply: {
    node: Line,
    label: 'In top holders total',
    // TODO: Add support for 3 datakeys of single metric:
    // inExchanges outsideExchanges inTopHoldersTotal
    dataKey: 'inTopHoldersTotal',
    category: 'On-chain'
  },
  tokenCirculation: {
    node: Line,
    label: 'Token Circulation',
    category: 'On-chain',
    description:
      "The distribution of non-transacted tokens over time (in other words, how many tokens are being hodled, and for how long). The green line shows the token price. Each of the other coloured bands represents the number of tokens that haven't moved (have stayed in the same wallet) for the specified amount of time."
  },
  mvrvRatio: {
    node: Line,
    label: 'Market Value To Realized Value',
    category: 'On-chain'
  },
  transactionVolume: {
    node: Line,
    label: 'Transaction Volume',
    category: 'On-chain',
    description:
      'The total number of tokens within all transfers that have occurred on the network. This metric can show a large amount of tokens moving at once, and/or a large number of transactions in a short amount of time'
  },
  networkGrowth: {
    node: Line,
    label: 'Network Growth',
    category: 'On-chain',
    description:
      'The number of new addresses being created on the network each day.'
  },
  devActivity: {
    node: Line,
    label: 'Development Activity',
    dataKey: 'activity',
    category: 'Development',
    description:
      "Based on number of Github 'events' including issue interactions, PRs, comments, and wiki edits, plus the number of public repositories a project is maintaining"
  },
  tokenVelocity: {
    node: Line,
    label: 'Token Velocity',
    category: 'On-chain',
    description:
      'Similar to velocity of money, Token Velocity is the frequency at which tokens change wallets in a given interval of time. This metric is derived by dividing transaction volume by the number of tokens in circulation, to get the average number of times a token changes hands each day.'
  },
  dailyActiveDeposits: {
    node: Bar,
    label: 'Daily Active Deposits',
    dataKey: 'activeDeposits',
    category: 'On-chain'
  },
  ohlc: {},
  priceVolumeDiff: {},
  githubActivity: {},
  aveargeDevActivity: {},
  averageGithubActivity: {},
  historyTwitterData: {},
  twitterData: {}, // NOTE(vanguard): NOT A TIMESERIE
  socialGainersLosersStatus: {},
  socialDominance: {},
  historicalBalance: {},
  shareOfDeposits: {},
  tokenTopTransactions: {},
  realizedValue: {},
  burnRate: {},
  averageTokenAgeConsumedInDays: {},
  nvtRatio: {},
  ethSpent: {},
  ethSpentOverTime: {},
  ethTopTransactions: {},
  ethBalance: {},
  usdBalance: {},
  icos: {},
  icoPrice: {},
  initialIco: {},
  fundsRaisedUsdIcoEndPrice: {},
  fundsRaisedEthIcoEndPrice: {},
  fundsRaisedBtcIcoEndPrice: {}
}

export const getMetricCssVarColor = metric => `var(--${Metrics[metric].color})`

export const METRIC_COLORS = [
  'persimmon',
  'heliotrope',
  'texas-rose',
  'dodger-blue',
  'malibu'
]

export const generateMetricsMarkup = (metrics, data = {}) => {
  let colorIndex = 0
  return metrics.reduce((acc, metric) => {
    const {
      node: El,
      label,
      color,
      yAxisVisible = false,
      orientation = 'left',
      dataKey = metric
    } = typeof metric === 'object' ? metric : Metrics[metric]

    const rest = {
      [El === Bar ? 'fill' : 'stroke']: `var(--${color ||
        METRIC_COLORS[colorIndex++]})`
    }

    acc.push(
      <YAxis
        key={`axis-${dataKey}`}
        yAxisId={`axis-${dataKey}`}
        type='number'
        orientation={orientation}
        domain={['auto', 'dataMax']}
        hide={!yAxisVisible}
      />,
      <El
        key={`line-${dataKey}`}
        type='linear'
        yAxisId={`axis-${dataKey}`}
        name={label}
        data={data[dataKey]}
        strokeWidth={1.5}
        dataKey={dataKey}
        dot={false}
        isAnimationActive={false}
        {...rest}
      />
    )
    return acc
  }, [])
}
