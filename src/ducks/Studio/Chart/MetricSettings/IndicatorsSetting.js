import React, { useState, useMemo } from 'react'
import Setting from './Setting'
import { useDropdown } from './Dropdown'
import { Setting as Option } from '../../../SANCharts/ChartSettingsContextMenu'
import { updateTooltipSetting } from '../../../dataHub/tooltipSettings'

const OPTIONS = [30, 50, 200].map(base => ({
  base,
  key: `MA(${base})`
}))

const keyExtractor = ({ key }) => key

function buildIndicatorMetric (metric, indicator) {
  const { key, queryKey = key, label } = metric
  const indicatorMetric = {
    ...metric,
    queryKey,
    key: `ma${indicator.base}_${key}`,
    label: `${label} ${indicator.key}`,
    reqMeta: {
      transform: {
        type: 'moving_average',
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

const IndicatorsSetting = ({
  metric,
  widget,
  interval: chartInterval,
  // rerenderWidgets,
  toggleMetric
}) => {
  const { close, Dropdown } = useDropdown()
  const [activeIndicators, setActiveIndicators] = useState(new Set())

  function onToggle (indicator) {
    const newIndicators = new Set(activeIndicators)
    let indicatorMetric

    if (newIndicators.has(indicator)) {
      newIndicators.delete(indicator)
      indicatorMetric = removeCachedIndicator(metric, indicator)
    } else {
      newIndicators.add(indicator)
      indicatorMetric = cacheIndicator(metric, indicator)
    }
    console.log(indicatorMetric)

    if (indicatorMetric) {
      toggleMetric(indicatorMetric)
    }

    setActiveIndicators(newIndicators)
  }

  return (
    <Dropdown
      align='start'
      trigger={
        <Setting>
          Indicators:{' '}
          {OPTIONS.filter(option => activeIndicators.has(option))
            .map(keyExtractor)
            .join(', ')}
        </Setting>
      }
    >
      {OPTIONS.map(option => (
        <Option
          key={option.key}
          title={`Moving Average ${option.base}`}
          onClick={() => onToggle(option)}
          isActive={activeIndicators.has(option)}
        />
      ))}
    </Dropdown>
  )
}

export default IndicatorsSetting
