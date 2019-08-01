import React from 'react'
import { YAxis, Bar, Line } from 'recharts'

const PRICE_METRIC = 'historyPrice'

export const Metrics = {
  historyPrice: {
    node: Line,
    color: 'jungle-green',
    label: 'Price',
    dataKey: 'priceUsd',
    category: 'Financial'
  },
  volume: {
    category: 'Financial',
    node: Bar,
    label: 'Volume',
    fill: true,
    dataKey: 'volume',
    color: 'waterloo',
    opacity: 0.4
  },
  socialVolume: {
    category: 'Social',
    node: Bar,
    label: 'Social Volume',
    color: 'malibu'
  },
  tokenAgeConsumed: {
    category: 'On-chain',
    node: Bar,
    group: 'Token Flows/Movement/Activity',
    label: 'Token Age Consumed',
    fill: true,
    description:
      'The amount of movement of tokens between addresses. One use for this metric is to spot large amounts of tokens moving after sitting for a long period of time.'
  },
  exchangeFundsFlow: {
    category: 'On-chain',
    node: Line,
    label: 'Exchange Flow Balance',
    description:
      'The flows of tokens going in to and out of exchange wallets combined on one graph. If the value is positive, more tokens entered the exchange than left. If the value is negative, more flowed out of exchanges than flowed in.'
  },
  dailyActiveAddresses: {
    category: 'On-chain',
    node: Bar,
    group: 'Network Activity',
    label: 'Daily Active Addresses',
    description:
      'The number of unique addresses that participated in transactions for a given day.',
    color: 'texas-rose'
  },
  percentOfTokenSupplyOnExchanges: {
    category: 'On-chain',
    node: Line,
    group: 'Exchange Flow',
    label: 'Percent of Token Supply on Exchanges',
    dataKey: 'percentOnExchanges'
  },
  topHoldersPercentOfTotalSupply: {
    category: 'On-chain',
    node: Line,
    group: 'Exchange Flow',
    label: 'In Top Holders Total',
    // TODO: Add support for 3 datakeys of single metric:
    // inExchanges outsideExchanges inTopHoldersTotal
    dataKey: 'inTopHoldersTotal'
  },
  tokenCirculation: {
    category: 'On-chain',
    node: Line,
    group: 'Token Flows/Movement/Activity',
    label: 'Token Circulation',
    description:
      "The distribution of non-transacted tokens over time (in other words, how many tokens are being hodled, and for how long). The green line shows the token price. Each of the other coloured bands represents the number of tokens that haven't moved (have stayed in the same wallet) for the specified amount of time."
  },
  mvrvRatio: {
    category: 'On-chain',
    node: Line,
    group: 'Realized value',
    label: 'Market Value To Realized Value',
    dataKey: 'mvrv'
  },
  transactionVolume: {
    category: 'On-chain',
    node: Bar,
    group: 'Token Flows/Movement/Activity',
    label: 'Transaction Volume',
    description:
      'The total number of tokens within all transfers that have occurred on the network. This metric can show a large amount of tokens moving at once, and/or a large number of transactions in a short amount of time'
  },
  networkGrowth: {
    category: 'On-chain',
    node: Line,
    group: 'Network Activity',
    label: 'Network Growth',
    description:
      'The number of new addresses being created on the network each day.'
  },
  devActivity: {
    category: 'Development',
    node: Line,
    color: 'heliotrope',
    label: 'Development Activity',
    dataKey: 'activity',
    description:
      "Based on number of Github 'events' including issue interactions, PRs, comments, and wiki edits, plus the number of public repositories a project is maintaining",
    reqMeta: {
      transform: 'movingAverage',
      movingAverageIntervalBase: 7
    }
  },
  tokenVelocity: {
    category: 'On-chain',
    node: Line,
    group: 'Token Flows/Movement/Activity',
    label: 'Token Velocity',
    description:
      'Similar to velocity of money, Token Velocity is the frequency at which tokens change wallets in a given interval of time. This metric is derived by dividing transaction volume by the number of tokens in circulation, to get the average number of times a token changes hands each day.'
  },
  dailyActiveDeposits: {
    category: 'On-chain',
    node: Bar,
    label: 'Daily Active Deposits',
    dataKey: 'activeDeposits'
  },
  historyTwitterData: {
    category: 'Social',
    node: Line,
    label: 'Twitter',
    dataKey: 'followersCount'
  },
  socialDominance: {
    category: 'Social',
    node: Line,
    label: 'Social Dominance',
    dataKey: 'dominance'
  },
  realizedValue: {
    category: 'On-chain',
    node: Line,
    group: 'Realized value',
    label: 'Realized Value',
    dataKey: 'realizedValue'
  },
  ethSpentOverTime: {
    category: 'On-chain',
    node: Line,
    label: 'Eth Spent Over Time',
    dataKey: 'ethSpent'
  }
}

const DerivedMetrics = [
  {
    category: 'On-chain',
    parent: 'nvtRatio',
    key: 'nvtRatioCirculation',
    node: Line,
    group: 'Realized value',
    label: 'NVT Ratio Circulation'
  },
  {
    parent: 'nvtRatio',
    key: 'nvtRatioTxVolume',
    node: Bar,
    group: 'Realized value',
    label: 'NVT Ratio Transaction Volume',
    category: 'On-chain'
  }
]

DerivedMetrics.forEach(obj => {
  Metrics[obj.key] = obj
  const parentMetric = Metrics[obj.parent]
  if (parentMetric) {
    parentMetric.push(obj)
  } else {
    Metrics[obj.parent] = [obj]
  }
})

export const getMetricCssVarColor = metric => `var(--${Metrics[metric].color})`

export const METRIC_COLORS = [
  'texas-rose',
  'dodger-blue',
  'lima',
  'heliotrope',
  'waterloo'
]

export const findYAxisMetric = metrics =>
  (metrics.includes(PRICE_METRIC) && PRICE_METRIC) ||
  metrics.find(metric => Metrics[metric].node !== Bar) ||
  metrics[0]

export const generateMetricsMarkup = (
  metrics,
  { ref = {}, data = {} } = {}
) => {
  const metricWithYAxis = findYAxisMetric(metrics)
  let colorIndex = 0

  return metrics.reduce((acc, metric) => {
    const {
      node: El,
      label,
      color,
      orientation = 'left',
      dataKey = metric,
      opacity = 1
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
        hide={metric !== metricWithYAxis}
      />,
      <El
        key={`line-${dataKey}`}
        type='linear'
        yAxisId={`axis-${dataKey}`}
        name={label}
        strokeWidth={1.5}
        ref={ref[metric]}
        dataKey={dataKey}
        dot={false}
        isAnimationActive={false}
        opacity={opacity}
        connectNulls
        {...rest}
      />
    )

    return acc
  }, [])
}
