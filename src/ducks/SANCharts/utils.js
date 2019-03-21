import React from 'react'
import { YAxis, Bar, Line } from 'recharts'

export const Metrics = {
  price: {
    node: Line,
    color: 'jungle-green',
    label: 'Price'
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
    node: Line,
    color: 'malibu',
    label: 'Daily Active Addresses'
  },
  tokenCirculation: {
    node: Line,
    color: 'dodger-blue',
    label: 'Token Circulation'
  },
  mvrv: {
    node: Line,
    color: 'waterloo',
    label: 'Market Value To Realized Value'
  }
}

export const getMetricCssVarColor = metric => `var(--${Metrics[metric].color})`

export const generateMetricsMarkup = metrics => {
  return metrics
    .filter(metric => metric !== 'price')
    .reduce((acc, metric) => {
      const { node: El, label, color } = Metrics[metric]
      const rest = {
        [El === Bar ? 'fill' : 'stroke']: `var(--${color})`
      }
      acc.push(
        <YAxis
          key={`axis-${metric}`}
          yAxisId={`axis-${metric}`}
          type='number'
          domain={['auto', 'dataMax']}
          hide
        />,
        <El
          key={`line-${metric}`}
          type='linear'
          yAxisId={`axis-${metric}`}
          name={label}
          strokeWidth={1.5}
          dataKey={metric}
          dot={false}
          isAnimationActive={false}
          {...rest}
        />
      )
      return acc
    }, [])
}
