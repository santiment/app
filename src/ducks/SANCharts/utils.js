import React from 'react'
import { YAxis, Bar, Line, Area } from 'recharts'
import { formatNumber } from './../../utils/formatting'

const PRICE_METRIC = 'historyPrice'

export const Events = {
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
  }
}

export const getEventsTooltipInfo = events =>
  Object.keys(events).map(event => {
    const { label, formatter } = Events[event]
    return {
      isEvent: true,
      color: 'var(--persimmon)',
      value: events[event],
      name: label,
      formatter
    }
  })

export const Metrics = {
  historyPrice: {
    node: Line,
    color: 'jungle-green',
    label: 'Price',
    dataKey: 'priceUsd',
    category: 'Financial',
    formatter: val => formatNumber(val, { currency: 'USD' })
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
    video: 'https://www.youtube.com/watch?v=NZFtYT5QzS4',
    description: `
          Shows the amount of tokens changing addresses on a certain date,
          multiplied by the number of days since they last moved`
  },
  exchangeFundsFlow: {
    category: 'On-chain',
    node: Line,
    label: 'Exchange Flow Balance',
    video: 'https://www.youtube.com/watch?v=0R6GDF2bg6A',
    description: `The flows of tokens going in to and out of exchange wallets combined on one graph.
          If the value is positive, more tokens entered the exchange than left.
          If the value is negative, more flowed out of exchanges than flowed in.
`
  },
  dailyActiveAddresses: {
    category: 'On-chain',
    node: Bar,
    group: 'Network Activity',
    label: 'Daily Active Addresses',
    video: 'https://www.youtube.com/watch?v=n3dUvWvQEpQ',
    description: `Shows the number of unique network addresses involved in transactions
    on a certain date.
    Simply put, DAA indicates the daily level of crowd interaction (or
    speculation) with a certain token.`,
    color: 'texas-rose'
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
    description: `
          Shows the number of unique tokens being used during each day.
          If one token changes hands 5 times on a given day,
          it will be counted once by the token circulation,
          but 5 times by the transaction volume.`
  },
  mvrvRatio: {
    category: 'On-chain',
    node: Line,
    group: 'Network value',
    label: 'Market Value To Realized Value',
    dataKey: 'mvrv',
    video: 'https://www.youtube.com/watch?v=foMhhHbCgBE'
  },
  transactionVolume: {
    alias: 'transaction_volume',
    dataKey: 'transaction_volume',
    category: 'On-chain',
    node: Bar,
    group: 'Token Flows/Movement/Activity',
    label: 'Transaction Volume',
    description: `
    Shows the aggregate amount of tokens across all transactions that
    happened on the network on a certain date.`
  },
  networkGrowth: {
    category: 'On-chain',
    node: Line,
    group: 'Network Activity',
    label: 'Network Growth',
    video: 'https://www.youtube.com/watch?v=YaccxEEz8pg',
    description: `Shows the number of new addresses being created on the network each day.
    Essentially, this chart illustrates user adoption over time, and can
    be used to identify when the project is gaining - or losing - traction.`
  },
  devActivity: {
    category: 'Development',
    node: Line,
    color: 'heliotrope',
    label: 'Development Activity',
    dataKey: 'activity',
    description:
      "Based on number of Github 'events' including PRs, comments, and wiki edits, plus the number of public repositories a project is maintaining",
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
    description: `
          Shows the average number of times that a token changes wallets each
          day.

          Simply put, a higher token velocity means that a token is used in
          transactions more often within a set time frame.
`
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
    group: 'Network value',
    label: 'Realized Value',
    dataKey: 'realizedValue'
  },
  ethSpentOverTime: {
    category: 'On-chain',
    node: Line,
    label: 'Eth Spent Over Time',
    dataKey: 'ethSpent',
    description:
      'How much ETH has moved out of team wallets over time. While not tracked all the way to exchanges, this metric may suggest potential selling activity'
  }
}

const DerivedMetrics = [
  {
    category: 'On-chain',
    parent: 'nvtRatio',
    key: 'nvtRatioCirculation',
    node: Line,
    group: 'Network value',
    label: 'NVT Ratio Circulation'
  },
  {
    parent: 'nvtRatio',
    key: 'nvtRatioTxVolume',
    node: Bar,
    group: 'Network value',
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

export const setupColorGenerator = () => {
  let colorIndex = 0

  return function (color) {
    return color || METRIC_COLORS[colorIndex++]
  }
}

const StackedLogic = props => {
  const { fill, x, y, width, height, index, barsMap, value } = props

  const indexes = barsMap.get('indexes')
  let obj = indexes.get(index)

  if (index - 1 <= 0) {
  }

  if (value === undefined) return null

  if (!obj) {
    obj = {
      x,
      metrics: new Map([[fill, { height, y, x }]])
    }
    indexes.set(index, obj)
  } else {
    obj.metrics.set(fill, { height, y, x })
  }

  const { size } = obj.metrics
  let newWidth = width
  if (size > 1) {
    const { x: lastX } = [...obj.metrics.values()][0]
    newWidth = Math.abs(x - lastX) / size
  }
  if (newWidth > (barsMap.get('width') || 0)) {
    barsMap.set('width', newWidth)
  }

  return null
}

export const chartBars = new WeakMap()

const barMetricsSorter = ({ height: a }, { height: b }) => b - a
const sortByX = ({ x: a }, { x: b }) => a - b
const mapToData = ([fill, { height, y, x }]) => ({
  fill,
  height,
  y,
  x
})

export const generateMetricsMarkup = (
  metrics,
  { current: chartRef },
  { ref = {}, data = {} } = {}
) => {
  const metricWithYAxis = findYAxisMetric(metrics)
  const generateColor = setupColorGenerator()

  // HACK(vanguard): Thanks recharts
  let barsMap = chartBars.get(chartRef)
  if (!barsMap && chartRef) {
    console.log('creating')
    barsMap = new Map([['indexes', new Map()], ['width', 0]])
    chartBars.set(chartRef, barsMap)
  }

  const res = metrics.reduce((acc, metric) => {
    const {
      node: El,
      label,
      color,
      orientation = 'left',
      dataKey = metric,
      hideYAxis,
      gradientUrl,
      opacity = 1,
      formatter
    } = typeof metric === 'object' ? metric : Metrics[metric]

    const rest = {
      [El === Bar ? 'fill' : 'stroke']: `var(--${generateColor(color)})`,
      [El === Area && gradientUrl && 'fill']: gradientUrl,
      [El === Area && gradientUrl && 'fillOpacity']: 1
    }

    if (El === Bar) {
      rest.shape = <StackedLogic barsMap={barsMap} />
    }

    acc.push(
      <YAxis
        key={`axis-${dataKey}`}
        yAxisId={`axis-${dataKey}`}
        type='number'
        orientation={orientation}
        domain={['auto', 'dataMax']}
        hide={metric !== metricWithYAxis || hideYAxis}
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
        formatter={formatter}
        {...rest}
      />
    )

    return acc
  }, [])

  if (barsMap) {
    res.unshift(
      <g key='barMetrics'>
        {[...barsMap.get('indexes').values()].map(
          ({ x: initX, metrics, width }) => {
            const mapped = [...metrics.entries()].map(mapToData).sort(sortByX)
            let resX = initX
            const { size } = metrics

            if (size % 2 === 0) {
              const xSum = mapped.reduce((acc, { x }) => {
                return acc + x
              }, 0)
              resX = xSum / size
            } else {
              resX = mapped[(size - 1) / 2].x
            }

            let resWidth = Math.ceil(barsMap.get('width'))

            if (resX < 40) {
              resWidth = resWidth - (40 - resX)
              resX = 40
            } else if (resX + resWidth > chartRef.offsetWidth) {
              resWidth = resWidth - (resX + resWidth - chartRef.offsetWidth)
              if (resWidth < 0) {
                resWidth += resWidth
                resX += resWidth
                resWidth = Math.abs(resWidth)
              }
            }

            return mapped
              .sort(barMetricsSorter)
              .map(({ fill, height, y }) => (
                <rect
                  key={fill + initX}
                  opacity='1'
                  fill={fill}
                  width={resWidth}
                  height={height}
                  x={resX}
                  y={y}
                  radius='0'
                />
              ))
          }
        )}
      </g>
    )
  }

  return res
}
