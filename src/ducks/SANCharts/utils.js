import React from 'react'
import { YAxis, Bar, Line, Area, ReferenceDot } from 'recharts'
import { formatNumber, millify } from './../../utils/formatting'
import { Metrics, Events } from './data'
import styles from './Chart.module.scss'

export const mapDatetimeToNumber = timeseries =>
  timeseries.map(({ datetime, ...rest }) => ({
    ...rest,
    datetime: +new Date(datetime)
  }))

export const usdFormatter = val => formatNumber(val, { currency: 'USD' })

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
    label: `Dev. Activity (${key})`,
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

export const getMetricYAxisId = ({ yAxisId, key, dataKey = key }) => {
  return yAxisId || `axis-${dataKey}`
}

export const generateMetricsMarkup = (
  metrics,
  {
    ref = {},
    data = {},
    chartRef: { current: chartRef } = {},
    coordinates,
    scale
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
      formatter
    } = metric

    const rest = {
      [El === Bar ? 'fill' : 'stroke']: `var(--${generateColor(color)})`,
      [El === Area && gradientUrl && 'fill']: gradientUrl,
      [El === Area && gradientUrl && 'fillOpacity']: 1
    }

    if (chartRef !== undefined && El === Bar) {
      rest.shape = <StackedLogic barsMap={barsMap} />
    }

    const currentYAxisId = getMetricYAxisId(metric)

    const isHidden = metric !== metricWithYAxis || hideYAxis

    acc.push(
      <YAxis
        key={`axis-${dataKey}`}
        yAxisId={currentYAxisId}
        type='number'
        orientation={orientation}
        domain={['auto', 'dataMax']}
        hide={isHidden}
        tickFormatter={yAxisTickFormatter}
        scale={scale}
      />,
      <El
        key={`line-${dataKey}`}
        type='linear'
        yAxisId={currentYAxisId}
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

export const mapToRequestedMetrics = (
  metrics,
  { interval, slug, from, to, timeRange }
) =>
  metrics.map(({ key, alias: name = key, reqMeta }) => ({
    name,
    slug,
    from,
    to,
    timeRange,
    interval,
    ...reqMeta
  }))

export const makeSignalPriceReferenceDot = (
  price,
  signal,
  index,
  onMouseEnter,
  onMouseLeave,
  onClick,
  posX
) => {
  return (
    <ReferenceDot
      className={styles.signalPoint}
      key={index}
      y={price}
      x={posX}
      onMouseEnter={evt => onMouseEnter && onMouseEnter(evt, price, signal)}
      onMouseLeave={evt => onMouseLeave && onMouseLeave(evt, price, signal)}
      onMouseDown={onClick}
      yAxisId='axis-priceUsd'
      r={6}
      fill='url(#signalPointerImage)'
      stroke='none'
    />
  )
}

export const getSlugPriceSignals = (signals, slug, price = undefined) => {
  let filtered = signals.filter(
    ({
      settings: {
        target: { slug: signalSlug } = {},
        operation: { above, below } = {}
      } = {}
    }) => {
      let result = (!!above || !!below) && slug === signalSlug

      if (result && price !== undefined) {
        result = above === price || below === price
      }

      return result
    }
  )

  return filtered
}

export const mapToPriceSignalLines = ({
  data,
  slug,
  signals,
  onSignalHover,
  onSignalLeave,
  onSignalClick
}) => {
  if (!signals || !data) return []

  const first = data[0]

  if (!first) {
    return
  }

  const {
    payload: { datetime: dotPositionX }
  } = first

  const filtered = getSlugPriceSignals(signals, slug)

  let index = 0

  const res = filtered.reduce((acc, item) => {
    const { id, settings: { operation = {} } = {} } = item
    const priceAbove = operation['above']
    const priceBelow = operation['below']

    acc.push(
      makeSignalPriceReferenceDot(
        priceAbove || priceBelow,
        item,
        ++index,
        onSignalHover,
        onSignalLeave,
        (target, evt) => {
          onSignalClick(target, evt, id)
        },
        dotPositionX
      )
    )

    return acc
  }, [])

  return res
}

export const getSignalPrice = (xToYCoordinates, crossY) => {
  const minYItem = xToYCoordinates.reduce(function (prev, current) {
    return prev.y > current.y ? prev : current
  })

  const maxYItem = xToYCoordinates.reduce(function (prev, current) {
    return prev.y < current.y ? prev : current
  })

  const yValStep = (maxYItem.value - minYItem.value) / (minYItem.y - maxYItem.y)
  const priceUsd = yValStep * (minYItem.y - crossY) + minYItem.value
  return priceUsd
}

const MIN_TICK_MILLIFY_VALUE = 1000000

export const yAxisTickFormatter = value =>
  value > MIN_TICK_MILLIFY_VALUE
    ? millify(value)
    : formatNumber(value, {
      minimumFractionDigits: 0
    })

export const getCrossYValue = yValue => {
  if (yValue < 1) {
    return formatNumber(yValue, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4
    })
  }

  return yValue ? millify(yValue, 1) : '-'
}
