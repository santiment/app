import React from 'react'
import { YAxis, Bar, Line, Area } from 'recharts'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import { formatNumber, millify } from './../../utils/formatting'
import ActiveLine from './tooltip/ActiveLine'
import { Metric } from '../dataHub/metrics'
import { Event } from '../dataHub/events'
import { TooltipSetting } from '../dataHub/tooltipSettings'

const RechartComponent = {
  line: Line,
  area: Area,
  bar: Bar,
  daybar: Bar
}

export const mapDatetimeToNumber = timeseries =>
  timeseries.map(({ datetime, ...rest }) => ({
    ...rest,
    datetime: +new Date(datetime)
  }))

export const usdFormatter = val =>
  val || val === 0 ? formatNumber(val, { currency: 'USD' }) : 'No data'

export const btcFormatter = val =>
  val || val === 0 ? formatNumber(val, { currency: 'BTC' }) : 'No data'

export const percentageFormatter = val =>
  val || val === 0 ? `${val}%` : 'No data'

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
    const { label, isAnomaly, ...rest } = Event[event]
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

  const label = `Dev. Activity (${key})`
  TooltipSetting[key] = {
    label,
    formatter: Metric.dev_activity.formatter
  }

  const newSegment = {
    key,
    label,
    transformKey: 'marketSegment',
    type: 'marketSegments',
    category: 'Development',
    Component: Line,
    node: 'line',
    yAxisId: 'axis-activity',
    reqMeta: {
      transform: 'movingAverage',
      movingAverageIntervalBase: 7,
      selector: { market_segments: [key] }
    }
  }
  MarketSegments.set(key, newSegment)
  return newSegment
}

export const getMetricCssVarColor = metric => `var(--${Metric[metric].color})`

export const METRIC_COLORS = [
  'dodger-blue',
  'lima',
  'heliotrope',
  'waterloo',
  'sheets-hover',
  'texas-rose'
]

export const findYAxisMetric = metrics =>
  (metrics.includes(Metric.price_usd) && Metric.price_usd) ||
  metrics.find(
    ({ key, Component }) => key !== 'mvrvRatio' && Component !== Bar
  ) ||
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
    ref = {},
    isMultiChartsActive,
    chartRef: { current: chartRef } = {},
    coordinates,
    scale,
    dayMetrics,
    syncedColors,
    activeLineDataKey,
    useShortName,
    hideYAxis,
    activeDotEl: ActiveEl = ActiveLine
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

  let activeDataKey = activeLineDataKey

  const res = metrics.reduce((acc, metric) => {
    const {
      key,
      node,
      label,
      shortLabel,
      orientation = 'left',
      dataKey = key,
      hideYAxis: metricHideYAxis,
      gradientUrl,
      opacity = 1,
      formatter,
      strokeWidth = 1.5
    } = metric

    const El = RechartComponent[node]

    if (!activeDataKey && (El === Line || El === Area)) {
      activeDataKey = dataKey
    }

    const rest = {
      [El === Bar ? 'fill' : 'stroke']: syncedColors[dataKey],
      [El === Area && gradientUrl && 'fill']: gradientUrl,
      [El === Area && gradientUrl && 'fillOpacity']: 1
    }

    if (!isMultiChartsActive && chartRef !== undefined && El === Bar) {
      rest.shape = <StackedLogic barsMap={barsMap} metric={metric.key} />
    }

    const currentYAxisId = getMetricYAxisId(metric)
    const isHidden = metric !== metricWithYAxis || hideYAxis || metricHideYAxis

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
        name={(useShortName && shortLabel) || label}
        strokeWidth={strokeWidth}
        ref={ref[key]}
        dataKey={dataKey}
        dot={false}
        opacity={opacity}
        activeDot={activeDataKey === dataKey && <ActiveEl />}
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

const MIN_TICK_MILLIFY_VALUE = 1000000

export const yAxisTickFormatter = value =>
  value > MIN_TICK_MILLIFY_VALUE
    ? millify(value)
    : formatNumber(value, {
      minimumFractionDigits: 0
    })

export const tooltipValueFormatter = ({
  value,
  formatter,
  threshold = 1000
}) => {
  try {
    if (formatter) {
      return formatter(value)
    }

    const numValue = +value
    // NOTE(vanguard): Some values may not be present in a hovered data point, i.e. value === undefined/null;
    if (!Number.isFinite(numValue)) throw new Error()

    if (numValue > threshold) {
      return millify(numValue, 2)
    }

    return numValue.toFixed(2)
  } catch (e) {
    return 'No data'
  }
}

export const tooltipLabelFormatter = value => {
  const date = new Date(value)
  const { MMMM, DD, YYYY } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)

  return `${HH}:${mm}, ${MMMM} ${DD}, ${YYYY}`
}
