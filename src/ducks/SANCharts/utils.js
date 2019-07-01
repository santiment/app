import React from 'react'
import { YAxis, Bar, Line } from 'recharts'

export const Metrics = {
  historyPrice: {
    node: Line,
    color: 'jungle-green',
    label: 'Price',
    dataKey: 'priceUsd',
    yAxisVisible: true
  },
  volume: {
    node: Bar,
    label: 'Volume',
    fill: true,
    dataKey: 'volume'
  },
  socialVolume: {
    node: Line,
    label: 'Social Volume'
  },
  tokenAgeConsumed: {
    node: Bar,
    label: 'Token Age Consumed',
    fill: true
  },
  exchangeFundsFlow: {
    node: Line,
    label: 'Exchange Flow Balance'
  },
  dailyActiveAddresses: {
    node: Bar,
    label: 'Daily Active Addresses'
  },
  percentOfTokenSupplyOnExchanges: {
    node: Line,
    label: 'Percent of token supply on exchanges',
    dataKey: 'percentOnExchanges'
  },
  topHoldersPercentOfTotalSupply: {
    node: Line,
    label: 'In top holders total',
    // TODO: Add support for 3 datakeys of single metric:
    // inExchanges outsideExchanges inTopHoldersTotal
    dataKey: 'inTopHoldersTotal'
  },
  tokenCirculation: {
    node: Line,
    label: 'Token Circulation'
  },
  mvrvRatio: {
    node: Line,
    label: 'Market Value To Realized Value'
  },
  transactionVolume: {
    node: Line,
    label: 'Transaction Volume'
  },
  networkGrowth: {
    node: Line,
    label: 'Network Growth'
  },
  devActivity: {
    node: Line,
    label: 'Development Activity',
    dataKey: 'activity'
  },
  tokenVelocity: {
    node: Line,
    label: 'Token Velocity'
  },
  dailyActiveDeposits: {
    node: Bar,
    label: 'Daily Active Deposits',
    dataKey: 'activeDeposits'
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

const METRIC_COLORS = [
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
