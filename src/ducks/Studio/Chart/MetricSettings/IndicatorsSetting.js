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

const Indicator = Object.keys(RAW_INDICATORS).reduce((acc, key) => {
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

export function buildIndicatorMetric (metric, indicator) {
  const { key, queryKey = key, label } = metric
  const indicatorMetric = {
    ...metric,
    queryKey,
    indicator,
    metricKey: key,
    key: `${indicator.key}_${key}`,
    label: `${label} ${indicator.label}`,
    reqMeta: {
      transform: {
        type: indicator.type,
        movingAverageBase: indicator.base
      }
    }
  }
  updateTooltipSetting(indicatorMetric)
  return indicatorMetric
}

const IndicatorMetricCache = new Map()
function cacheIndicator (metric, indicator) {
  let metricStore = IndicatorMetricCache.get(metric)
  if (!metricStore) {
    metricStore = {}
    IndicatorMetricCache.set(metric, metricStore)
  }
  const indicatorMetric = buildIndicatorMetric(metric, indicator)
  metricStore[indicator.key] = indicatorMetric
  return indicatorMetric
}

function removeCachedIndicator (metric, indicator) {
  const metricStore = IndicatorMetricCache.get(metric)
  if (metricStore) {
    const indicatorMetric = metricStore[indicator.key]
    delete metricStore[indicator.key]
    return indicatorMetric
  }
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
