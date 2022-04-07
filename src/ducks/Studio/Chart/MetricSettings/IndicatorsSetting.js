import React, { useMemo } from 'react'
import Setting from './Setting'
import { useDropdown } from './Dropdown'
import { getMetricSetting } from '../../utils'
import { deriveMetric } from '../../../dataHub/metrics'
import { updateTooltipSetting } from '../../../dataHub/tooltipSettings'
import { Node } from '../../../Chart/nodes'
import Option from '../../../../components/ToggleSetting'

const RAW_INDICATORS = {
  MA: {
    type: 'moving_average',
    bases: [7, 30, 50, 200],
  },
}

export const Indicator = Object.keys(RAW_INDICATORS).reduce((acc, key) => {
  const { type, bases } = RAW_INDICATORS[key]

  bases.forEach((base) => {
    const indicatorKey = key + base
    acc[indicatorKey] = {
      base,
      type,
      key: indicatorKey,
      label: `${key}(${base})`,
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

export function buildIndicatorMetric (metric, indicator) {
  const cached = getMetricCache(metric)[indicator.key]
  if (cached) return cached

  const { key, label } = metric
  const indicatorMetric = deriveMetric(metric, {
    indicator,
    base: metric,
    node: Node.LINE,
    key: `${indicator.key}_${key}`,
    label: `${label} ${indicator.label}`,
    reqMeta: {
      transform: {
        type: indicator.type,
        movingAverageBase: indicator.base,
      },
    },
  })

  updateTooltipSetting(indicatorMetric)
  return indicatorMetric
}

const IndicatorsSetting = ({ metric, widget, toggleMetric }) => {
  const { MetricIndicators } = widget
  const { Dropdown } = useDropdown()
  const activeIndicators = useMemo(() => new Set(MetricIndicators[metric.key]), [
    metric,
    MetricIndicators,
  ])
  const activeLabels = useMemo(
    () =>
      INDICATORS.filter((indicator) => activeIndicators.has(indicator))
        .map(labelExtractor)
        .join(', '),
    [activeIndicators],
  )

  function onToggle (indicator) {
    const indicatorMetric = activeIndicators.has(indicator)
      ? removeCachedIndicator(metric, indicator)
      : cacheIndicator(metric, indicator)

    if (indicatorMetric) {
      const { interval } = getMetricSetting(widget.MetricSettingMap, metric)

      if (interval) {
        widget.MetricSettingMap.set(indicatorMetric, { interval })
      }

      toggleMetric(indicatorMetric)
    }
  }

  return (
    <Dropdown align='start' trigger={<Setting>Indicators: {activeLabels}</Setting>}>
      {INDICATORS.map((indicator) => (
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
