import React, { useMemo } from 'react'
import Setting from './Setting'
import { useDropdown } from './Dropdown'
import { Setting as Option } from '../../../SANCharts/ChartSettingsContextMenu'
import { updateTooltipSetting } from '../../../dataHub/tooltipSettings'

const RAW_INDICATORS = {
  MA: {
    type: 'moving_average',
    bases: [30, 50, 200]
  }
}

export const Indicator = Object.keys(RAW_INDICATORS).reduce((acc, key) => {
  const { type, bases } = RAW_INDICATORS[key]

  bases.forEach(base => {
    const indicatorKey = key + base
    acc[indicatorKey] = {
      base,
      type,
      key: indicatorKey,
      label: `${key}(${base})`
    }
  })

  return acc
}, {})

const INDICATORS = Object.values(Indicator)

const labelExtractor = ({ label }) => label

const IndicatorMetricCache = {}
function getMetricCache ({ key }) {
  let cache = IndicatorMetricCache[key]
  if (!cache) {
    cache = {}
    IndicatorMetricCache[key] = cache
  }
  return cache
}

export function cacheIndicator (metric, indicator) {
  const metricStore = getMetricCache(metric)
  const indicatorMetric = buildIndicatorMetric(metric, indicator)
  metricStore[indicator.key] = indicatorMetric
  return indicatorMetric
}

function removeCachedIndicator (metric, indicator) {
  const metricStore = getMetricCache(metric)
  const indicatorMetric = metricStore[indicator.key]

  delete metricStore[indicator.key]
  return indicatorMetric
}

function buildIndicatorMetric (metric, indicator) {
  const cached = getMetricCache(metric)[indicator.key]
  if (cached) return cached

  const { key, queryKey = key, label, reqMeta, domainGroup = key } = metric

  let indicatorLabel = indicator.label

  const indicatorMetric = {
    ...metric,
    queryKey,
    indicator,
    domainGroup,
    metricKey: key,
    key: `${indicator.key}_${key}`,
    label: `${label} ${indicatorLabel}`,
    reqMeta: {
      ...reqMeta,
      transform: {
        type: indicator.type,
        movingAverageBase: indicator.base
      }
    }
  }
  updateTooltipSetting(indicatorMetric)
  return indicatorMetric
}

const IndicatorsSetting = ({ metric, widget, toggleMetric }) => {
  const { MetricIndicators } = widget
  const { Dropdown } = useDropdown()
  const activeIndicators = useMemo(
    () => new Set(MetricIndicators[metric.key]),
    [metric, MetricIndicators]
  )
  const activeLabels = useMemo(
    () =>
      INDICATORS.filter(indicator => activeIndicators.has(indicator))
        .map(labelExtractor)
        .join(', '),
    [activeIndicators]
  )

  function onToggle (indicator) {
    const indicatorMetric = activeIndicators.has(indicator)
      ? removeCachedIndicator(metric, indicator)
      : cacheIndicator(metric, indicator)

    if (indicatorMetric) {
      toggleMetric(indicatorMetric)
    }
  }

  return (
    <Dropdown
      align='start'
      trigger={<Setting>Indicators: {activeLabels}</Setting>}
    >
      {INDICATORS.map(indicator => (
        <Option
          key={indicator.key}
          title={`Moving Average ${indicator.base}`}
          onClick={() => onToggle(indicator)}
          isActive={activeIndicators.has(indicator)}
        />
      ))}
    </Dropdown>
  )
}

export default IndicatorsSetting
