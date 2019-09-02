import React from 'react'
import {
  findYAxisMetric,
  Metrics,
  setupColorGenerator
} from '../../SANCharts/utils'
import { Area, Bar, YAxis } from 'recharts'

export const generateMetricsMarkup = (
  metrics,
  { ref = {}, data = {} } = {},
  customParams = {}
) => {
  const flatMetrics = metrics.map(m => (typeof m === 'object' ? m.type : m))
  const metricWithYAxis = findYAxisMetric(flatMetrics)
  const generateColor = setupColorGenerator()

  return metrics.reduce((acc, metric) => {
    const resolvedMetric = typeof metric === 'object' ? metric : Metrics[metric]
    const metricType = metric

    const {
      node: El,
      label,
      color,
      orientation = 'left',
      dataKey = metricType,
      hideYAxis,
      gradientUrl,
      opacity = 1,
      formatter
    } = resolvedMetric

    const rest = {
      [El === Bar ? 'fill' : 'stroke']: `var(--${generateColor(color)})`,
      [El === Area && gradientUrl && 'fill']: gradientUrl,
      [El === Area && gradientUrl && 'fillOpacity']: opacity
    }

    acc.push(
      <YAxis
        key={`axis-${dataKey}`}
        yAxisId={`axis-${dataKey}`}
        type='number'
        orientation={orientation}
        domain={['auto', 'dataMax']}
        hide={
          metricType !== metricWithYAxis || hideYAxis || customParams.hideYAxis
        }
      />,
      <El
        key={`line-${dataKey}`}
        type='linear'
        yAxisId={`axis-${dataKey}`}
        name={label}
        strokeWidth={1.5}
        ref={ref[metricType]}
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
}
