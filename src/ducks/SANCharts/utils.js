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
    color: 'persimmon',
    label: 'Social Volume'
  },
  tokenAgeConsumed: {
    node: Bar,
    color: 'texas-rose',
    label: 'Token Age Consumed',
    fill: true
  },
  exchangeFundsFlow: {
    node: Line,
    color: 'heliotrope',
    label: 'Exchange Flow Balance'
  },
  dailyActiveAddresses: {
    node: Bar,
    color: 'malibu',
    label: 'Daily Active Addresses'
  },
  percentOfTokenSupplyOnExchanges: {
    node: Line,
    color: 'malibu',
    label: 'Percent of token supply on exchanges',
    dataKey: 'percentOnExchanges'
  },
  topHoldersPercentOfTotalSupply: {
    node: Line,
    color: 'malibu',
    label: 'In top holders total',
    // TODO: Add support for 3 datakeys of single metric:
    // inExchanges outsideExchanges inTopHoldersTotal
    dataKey: 'inTopHoldersTotal'
  },
  tokenCirculation: {
    node: Line,
    color: 'dodger-blue',
    label: 'Token Circulation'
  },
  mvrvRatio: {
    node: Line,
    color: 'waterloo',
    label: 'Market Value To Realized Value'
  },
  transactionVolume: {
    node: Line,
    color: 'texas-rose',
    label: 'Transaction Volume'
  },
  networkGrowth: {
    node: Line,
    label: 'Network Growth'
  },
  devActivity: {
    node: Line,
    color: 'heliotrope',
    label: 'Development Activity',
    dataKey: 'activity'
  },
  tokenVelocity: {
    node: Line,
    color: 'persimmon',
    label: 'Token Velocity'
  },
  dailyActiveDeposits: {
    node: Bar,
    color: 'jungle-green',
    label: 'Daily Active Deposits',
    dataKey: 'activeDeposits'
  },
  ohlc: {},
  priceVolumeDiff: {},
  githubActivity: {},
  aveargeDevActivity: {},
  averageGithubActivity: {},
  historyTwitterData: {
    label: 'Twitter'
  },
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
  ethSpentOverTime: {
    label: 'ETH spent over time'
  },
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

export const generateMetricsMarkup = (metrics, data = {}) => {
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
      [El === Bar ? 'fill' : 'stroke']: `var(--${color})`
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
