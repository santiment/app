import React from 'react'
import { YAxis, Bar, Line, Area } from 'recharts'
import { formatNumber } from './../../utils/formatting'

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
    formatter: val => {
      switch (val) {
        case 'devActivity':
          return 'Development Activity'
        case 'socialVolume':
          return 'Social Volume'
        case 'DailyActiveAddresses':
          return 'Daily Active Addresses'

        default:
          return `${val}`
      }
    }
  }
}

export const getEventsTooltipInfo = events =>
  Object.keys(events).map(event => {
    const { label, ...rest } = Events[event]
    return {
      isEvent: true,
      color: 'var(--persimmon)',
      value: events[event],
      name: label,
      ...rest
    }
  })

export const usdFormatter = val => formatNumber(val, { currency: 'USD' })

export const Metrics = {
  historyPrice: {
    key: 'historyPrice',
    node: Line,
    color: 'jungle-green',
    label: 'Price',
    dataKey: 'priceUsd',
    category: 'Financial',
    formatter: usdFormatter
  },
  historyPricePreview: {
    key: 'historyPricePreview',
    node: Area,
    color: 'jungle-green',
    label: 'Price',
    dataKey: 'priceUsd',
    category: 'Financial',
    gradientUrl: 'url(#totalUp)',
    hideYAxis: true
  },
  volume: {
    key: 'volume',
    category: 'Financial',
    node: Bar,
    label: 'Volume',
    fill: true,
    dataKey: 'volume',
    color: 'mystic',
    formatter: usdFormatter
  },
  socialVolume: {
    key: 'socialVolume',
    category: 'Social',
    node: Bar,
    label: 'Social Volume',
    color: 'malibu',
    description: `Shows the amount of mentions of the coin on 1000+ crypto social media channels, including Telegram groups, crypto subreddits, discord groups, private traders chats and more.`
  },
  tokenAgeConsumed: {
    key: 'tokenAgeConsumed',
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
    key: 'exchangeFundsFlow',
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
    key: 'dailyActiveAddresses',
    alias: 'daily_active_addresses',
    dataKey: 'daily_active_addresses',
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
    key: 'percentOfTokenSupplyOnExchanges',
    category: 'On-chain',
    node: Line,
    group: 'Exchange Flow',
    label: 'Percent of Token Supply on Exchanges',
    dataKey: 'percentOnExchanges',
    description: 'The percent of the total token supply which is on exchanges.'
  },
  topHoldersPercentOfTotalSupply: {
    key: 'topHoldersPercentOfTotalSupply',
    category: 'On-chain',
    node: Line,
    group: 'Exchange Flow',
    label: 'In Top Holders Total',
    // TODO: Add support for 3 datakeys of single metric:
    // inExchanges outsideExchanges inTopHoldersTotal
    dataKey: 'inTopHoldersTotal'
  },
  tokenCirculation: {
    key: 'tokenCirculation',
    alias: 'circulation_1d',
    dataKey: 'circulation_1d',
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
    key: 'mvrvRatio',
    alias: 'mvrv_usd',
    dataKey: 'mvrv_usd',
    category: 'On-chain',
    node: Line,
    group: 'Network value',
    label: 'Market Value To Realized Value',
    video: 'https://www.youtube.com/watch?v=foMhhHbCgBE',
    description: `MVRV measures how much every holder originally paid for their coins, and compares that investment to the coin’s current price to calculate the average profit or loss across all holders. Example: if MVRV = 2, then, on average, all coin holders have (currently) doubled their initial investment.`
  },
  transactionVolume: {
    key: 'transactionVolume',
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
    key: 'networkGrowth',
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
    key: 'devActivity',
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
    key: 'tokenVelocity',
    alias: 'velocity',
    dataKey: 'velocity',
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
    key: 'dailyActiveDeposits',
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
    key: 'historyTwitterData',
    category: 'Social',
    node: Line,
    label: 'Twitter',
    dataKey: 'followersCount',
    description: `Shows the number of followers on the project's official Twitter account over time`
  },
  socialDominance: {
    key: 'socialDominance',
    category: 'Social',
    node: Line,
    label: 'Social Dominance',
    dataKey: 'dominance',
    description: `Shows the share (or %) of the coin’s mentions on crypto-related social media, compared to a pool of 50+ of the most talked-about projects online.`
  },
  realizedValue: {
    key: 'realizedValue',
    alias: 'realized_value_usd',
    dataKey: 'realized_value_usd',
    category: 'On-chain',
    node: Line,
    group: 'Network value',
    label: 'Realized Cap',
    description: `Realized Cap shows the total amount that all holders spent to purchase the coin (i.e. the total acquisition cost). While market cap = supply X current price of each coin, realized cap = supply X price of each coin when it last ‘moved’`
  },
  ethSpentOverTime: {
    key: 'ethSpentOverTime',
    category: 'On-chain',
    node: Line,
    label: 'Eth Spent Over Time',
    dataKey: 'ethSpent',
    description:
      'How much ETH has moved out of team wallets over time. While not tracked all the way to exchanges, this metric may suggest potential selling activity'
  },
  gasUsed: {
    key: 'gasUsed',
    category: 'On-chain',
    node: Line,
    label: 'Gas Used',
    description:
      'Used Gas by a blockchain. When you send tokens, interact with a contract or do anything else on the blockchain, you must pay for that computation. That payment is calculated in Gas.'
  }
}

const DerivedMetrics = [
  {
    category: 'On-chain',
    parent: 'nvtRatio',
    key: 'nvtRatioCirculation',
    node: Line,
    group: 'Network value',
    label: 'NVT Ratio Circulation',
    description: `NVT tries to determine how much ‘value’ is being transmitted on a coin’s network. This version of NVT is calculated by dividing the coin’s Market Cap by its Token Circulation. The higher the NVT, the more expensive the network relative to the value it transmits, indicating an overvalued asset.`
  },
  {
    parent: 'nvtRatio',
    key: 'nvtRatioTxVolume',
    node: Bar,
    group: 'Network value',
    label: 'NVT Ratio Transaction Volume',
    category: 'On-chain',
    description: `NVT tries to determine how much ‘value’ is being transmitted on a coin’s network. This version of NVT is calculated by dividing the coin’s Market Cap by its on-chain Transaction Volume. The higher the NVT, the more expensive the network relative to the value it transmits, indicating an overvalued asset.`
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

const MarketSegments = new Map()

export const getMarketSegment = key => {
  const target = MarketSegments.get(key)
  if (target) {
    return target
  }
  const newSegment = {
    key,
    type: 'marketSegments',
    category: 'Development',
    node: Line,
    label: `"${key}" Market Dev.Activity`,
    yAxisId: 'axis-activity',
    reqMeta: {
      transform: 'movingAverage',
      movingAverageIntervalBase: 7
    }
  }
  MarketSegments.set(key, newSegment)
  return newSegment
}

export const getMetricCssVarColor = metric => `var(--${Metrics[metric].color})`

export const METRIC_COLORS = [
  'texas-rose',
  'dodger-blue',
  'lima',
  'heliotrope',
  'waterloo'
]

export const findYAxisMetric = metrics =>
  (metrics.includes(Metrics.historyPrice) && Metrics.historyPrice) ||
  metrics.find(({ key, node }) => key !== 'mvrvRatio' && node !== Bar) ||
  metrics[0]

export const setupColorGenerator = () => {
  let colorIndex = 0

  return function (color) {
    return color || METRIC_COLORS[colorIndex++]
  }
}

export const chartBars = new WeakMap()

const StackedLogic = props => {
  const { fill, x, y, height, index, barsMap, value } = props

  if (value === undefined) return null

  let obj = barsMap.get(index)

  if (!obj) {
    obj = {
      index,
      metrics: new Map([[fill, { height, y, x }]])
    }
    barsMap.set(index, obj)
  } else {
    obj.metrics.set(fill, { height, y, x })
  }

  return null
}

const barMetricsSorter = ({ height: a }, { height: b }) => b - a

const mapToData = ([fill, { height, y, x }]) => ({
  fill,
  height,
  y,
  x
})

const getBarMargin = diff => {
  if (diff < 1.3) {
    return 0.3
  }

  if (diff < 4) {
    return 1
  }

  if (diff < 10) {
    return 3
  }
  return 6
}

export const generateMetricsMarkup = (
  metrics,
  {
    ref = {},
    data = {},
    chartRef: { current: chartRef } = {},
    coordinates
  } = {}
) => {
  const metricWithYAxis = findYAxisMetric(metrics)
  const generateColor = setupColorGenerator()

  // HACK(vanguard): Thanks recharts
  let barsMap = chartBars.get(chartRef)
  if (!barsMap && chartRef) {
    barsMap = new Map()
    chartBars.set(chartRef, barsMap)
  }

  const res = metrics.reduce((acc, metric) => {
    const {
      key,
      node: El,
      label,
      color,
      orientation = 'left',
      dataKey = key,
      hideYAxis,
      gradientUrl,
      formatter,
      yAxisId
    } = metric

    const rest = {
      [El === Bar ? 'fill' : 'stroke']: `var(--${generateColor(color)})`,
      [El === Area && gradientUrl && 'fill']: gradientUrl,
      [El === Area && gradientUrl && 'fillOpacity']: 1
    }

    if (chartRef !== undefined && El === Bar) {
      rest.shape = <StackedLogic barsMap={barsMap} />
    }

    acc.push(
      <YAxis
        key={`axis-${dataKey}`}
        yAxisId={yAxisId || `axis-${dataKey}`}
        type='number'
        orientation={orientation}
        domain={['auto', 'dataMax']}
        hide={metric !== metricWithYAxis || hideYAxis}
      />,
      <El
        key={`line-${dataKey}`}
        type='linear'
        yAxisId={yAxisId || `axis-${dataKey}`}
        name={label}
        strokeWidth={1.5}
        ref={ref[key]}
        dataKey={dataKey}
        dot={false}
        isAnimationActive={false}
        connectNulls
        formatter={formatter}
        {...rest}
      />
    )

    return acc
  }, [])

  if (coordinates && barsMap && coordinates.length > 1) {
    const [first, second, third] = coordinates
    let firstX, secondX
    if (!third) {
      firstX = first.x
      secondX = second.x
    } else {
      firstX = second.x
      secondX = third.x
    }

    const halfDif = (secondX - firstX) / 2
    const halfWidth = halfDif - getBarMargin(halfDif)

    res.unshift(
      <g key='barMetrics'>
        {[...barsMap.values()].map(({ metrics, index }) => {
          const coor = coordinates[index]
          if (!coor) return null

          const mapped = [...metrics.entries()].map(mapToData)
          let resX = coor.x - halfWidth
          let secondWidth = halfWidth

          if (resX < 40) {
            resX = 40
            secondWidth = 0
          } else if (resX + halfWidth * 2 > chartRef.offsetWidth) {
            secondWidth = 0
          }

          return mapped
            .sort(barMetricsSorter)
            .map(({ fill, height, y }) => (
              <rect
                key={fill + resX}
                opacity='1'
                fill={fill}
                width={halfWidth + secondWidth}
                height={height}
                x={resX}
                y={y}
                radius='0'
              />
            ))
        })}
      </g>
    )
  }

  return res
}
