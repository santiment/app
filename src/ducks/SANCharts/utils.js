import React from 'react'
import { YAxis, Bar, Line, Area, ReferenceDot } from 'recharts'
import { ONE_DAY_IN_MS } from '../../utils/dates'
import { formatNumber, millify } from './../../utils/formatting'
import ActiveLine from './tooltip/ActiveLine'
import { Metrics, Events } from './data'
import styles from './Chart.module.scss'

export const mapDatetimeToNumber = timeseries =>
  timeseries.map(({ datetime, ...rest }) => ({
    ...rest,
    datetime: +new Date(datetime)
  }))

export const usdFormatter = val => formatNumber(val, { currency: 'USD' })

const getEventColor = (isAnomaly, value) => {
  if (isAnomaly || value < 4) {
    return 'var(--persimmon)'
  }
  if (value < 7) {
    return 'var(--texas-rose-hover)'
  }
  return 'var(--bright-sun)'
}

export const getEventsTooltipInfo = events =>
  Object.keys(events).map(event => {
    const { label, isAnomaly, ...rest } = Events[event]
    const value = events[event]
    return {
      isAnomaly,
      value,
      isEvent: true,
      name: label,
      color: getEventColor(isAnomaly, value),
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
  'dodger-blue',
  'lima',
  'heliotrope',
  'waterloo',
  'sheets-hover',
  'texas-rose'
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
  const { metric, fill, x, y, height, index, barsMap, value } = props

  if (value === undefined) return null

  let obj = barsMap.get(index)

  if (!obj) {
    obj = {
      index,
      metrics: new Map([[metric, { fill, height, y, x }]])
    }
    barsMap.set(index, obj)
  } else {
    obj.metrics.set(metric, { fill, height, y, x })
  }

  return null
}

const barMetricsSorter = ({ height: a }, { height: b }) => b - a

const getBarMargin = diff => {
  if (diff < 1.3) {
    return 0.2
  }

  if (diff < 2) {
    return 0.5
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

const getDayMetricWidth = (bars, dayMetric, margin) => {
  let lastX
  for (let i = 0; i < bars.length; i++) {
    const metric = bars[i].metrics.get(dayMetric)
    if (metric) {
      if (lastX) {
        return metric.x - lastX - margin - margin
      }
      lastX = metric.x
    }
  }
}

export const alignDayMetrics = ({ chartRef, bars, dayMetrics, margin }) => {
  const oneDayMetricsKeys = dayMetrics.map(([key]) => key)
  const lastMetrics = {}
  const dayWidth = getDayMetricWidth(bars, oneDayMetricsKeys[0], margin)

  for (let i = 0; i < bars.length; i++) {
    const { metrics } = bars[i]
    for (let y = 0; y < oneDayMetricsKeys.length; y++) {
      const key = oneDayMetricsKeys[y]
      const metric = metrics.get(key)
      if (metric) {
        metric.width = dayWidth
        lastMetrics[key] = metric
      }
    }
  }

  oneDayMetricsKeys.forEach(key => {
    const lastMetric = lastMetrics[key]
    if (lastMetric) {
      const boundWidth = chartRef.offsetWidth - lastMetric.x
      lastMetric.width = boundWidth < dayWidth ? boundWidth : dayWidth
    }
  })
}

export const generateMetricsMarkup = (
  metrics,
  {
    isMultiChartsActive,
    ref = {},
    chartRef: { current: chartRef } = {},
    coordinates,
    scale,
    dayMetrics,
    syncedColors,
    showActiveDot = true,
    activeLineDataKey
  } = {}
) => {
  const metricWithYAxis = isMultiChartsActive
    ? metrics[0]
    : findYAxisMetric(metrics)

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
      orientation = 'left',
      dataKey = key,
      hideYAxis,
      gradientUrl,
      formatter
    } = metric

    const rest = {
      [El === Bar ? 'fill' : 'stroke']: syncedColors[key],
      [El === Area && gradientUrl && 'fill']: gradientUrl,
      [El === Area && gradientUrl && 'fillOpacity']: 1
    }

    if (!isMultiChartsActive && chartRef !== undefined && El === Bar) {
      rest.shape = <StackedLogic barsMap={barsMap} metric={metric.key} />
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
        activeDot={
          activeLineDataKey === dataKey ? <ActiveLine /> : showActiveDot
        }
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
    const margin = getBarMargin(halfDif)
    const halfWidth = halfDif - margin

    const bars = [...barsMap.values()]
    alignDayMetrics({ chartRef, bars, dayMetrics, margin })

    res.unshift(
      <g key='barMetrics'>
        {bars.map(({ metrics, index }) => {
          const coor = coordinates[index]
          if (!coor) return null

          let resX = coor.x - halfWidth
          let secondWidth = halfWidth

          if (resX < 40) {
            resX = 40
            secondWidth = 0
          } else if (resX + halfWidth * 2 > chartRef.offsetWidth) {
            secondWidth = 0
          }

          return [...metrics.values()]
            .sort(barMetricsSorter)
            .map(({ width, fill, height, y }) => (
              <rect
                key={fill + resX}
                opacity='1'
                fill={fill}
                width={width || halfWidth + secondWidth}
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
  const filtered = signals.filter(
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
    return null
  }

  const {
    payload: { datetime: dotPositionX }
  } = first

  const filtered = getSlugPriceSignals(signals, slug)

  let index = 0

  const res = filtered.reduce((acc, item) => {
    const { id, settings: { operation = {} } = {} } = item
    const priceAbove = operation.above
    const priceBelow = operation.below

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
  if (xToYCoordinates.length === 0) {
    return undefined
  }

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

export const isDayStartMetric = (
  data,
  dayMetric,
  dayStartMetrics,
  datetime
) => {
  const metricValue = data[dayMetric]
  if (metricValue !== undefined) {
    dayStartMetrics[dayMetric] = {
      datetime,
      value: metricValue
    }
    return true
  }
  return false
}

export const assignToPointDayStartValue = (
  data,
  dayMetric,
  dayStartMetrics,
  currentPointDatetime
) => {
  const dayStartMetric = dayStartMetrics[dayMetric]
  if (
    dayStartMetric &&
    currentPointDatetime - dayStartMetric.datetime < ONE_DAY_IN_MS
  ) {
    data[dayMetric] = dayStartMetric.value
  }
}
