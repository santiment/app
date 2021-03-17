import React, { useEffect, useState } from 'react'
import Widget from './Widget'
import ColorProvider from './ChartWidgetColorProvider'
import {
  newWidget,
  useMetricNodeOverwrite,
  useMirroredTransformer,
  useWidgetMetricLabeling
} from './utils'
import StudioChart from '../Chart'
import { dispatchWidgetMessage } from '../widgetMessage'
import { DEFAULT_OPTIONS } from '../defaults'
import { getMetricSetting, calculateMovingAverageFromInterval } from '../utils'
import { convertBaseProjectMetric } from '../metrics'
import { useTimeseries } from '../timeseries/hooks'
import { useMetricSettingsAdjuster } from '../timeseries/candles'
import { useEdgeGaps, useClosestValueData } from '../../Chart/hooks'
import { useSyncDateEffect } from '../../Chart/sync'
import { Metric } from '../../dataHub/metrics'

const EMPTY_ARRAY = []

export const Chart = ({
  settings,
  widget,
  isSingleWidget,
  toggleWidgetMetric,
  deleteWidget,
  rerenderWidgets,
  observeSyncDate,
  ...props
}) => {
  const { metrics, chartRef } = widget
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const MetricSettingMap = useMetricSettingsAdjuster(widget.MetricSettingMap)
  const MetricTransformer = useMirroredTransformer(metrics)
  const MetricNode = useMetricNodeOverwrite(MetricSettingMap)
  const [rawData, loadings, ErrorMsg] = useTimeseries(
    metrics,
    settings,
    MetricSettingMap,
    MetricTransformer
  )
  const data = useEdgeGaps(
    useClosestValueData(rawData, metrics, options.isClosestDataActive)
  )

  // TODO: Solve the webpack circular dependency issue to share singular chart [@vanguard | Jul 1, 2020]
  // const shareLink = useMemo(
  // () => buildChartShareLink({ settings, widgets: [widget] }),
  // [settings, metrics, comparables],
  // )

  useSyncDateEffect(chartRef, observeSyncDate)

  useEffect(
    () => {
      const phase = loadings.length ? 'loading' : 'loaded'
      dispatchWidgetMessage(widget, phase)
    },
    [loadings]
  )

  useEffect(
    () => {
      if (!chartRef.current) return

      if (widget.scrollIntoViewOnMount) {
        chartRef.current.canvas.scrollIntoView()
        widget.scrollIntoViewOnMount = false
      }
    },
    [chartRef.current]
  )

  useWidgetMetricLabeling(chartRef, metrics, settings)

  useEffect(
    () => {
      let modified = false
      metrics.forEach(metric => {
        if ((metric.base || metric) !== Metric.dev_activity) return

        const newMap = new Map(widget.MetricSettingMap)
        const metricSetting = getMetricSetting(newMap, metric)

        metricSetting.transform = {
          type: 'moving_average',
          movingAverageBase: calculateMovingAverageFromInterval(
            settings.interval
          )
        }

        widget.MetricSettingMap = newMap
        modified = true
      })

      if (modified) rerenderWidgets()
    },
    [metrics, settings.interval]
  )

  function toggleIndicatorMetric ({ indicator, base }) {
    const { MetricIndicators } = widget
    let indicatorsSet = MetricIndicators[base.key]

    if (!indicatorsSet) {
      indicatorsSet = new Set()
      MetricIndicators[base.key] = indicatorsSet
    }

    if (indicatorsSet.has(indicator)) {
      indicatorsSet.delete(indicator)
    } else {
      indicatorsSet.add(indicator)
    }
    widget.MetricIndicators = Object.assign({}, MetricIndicators)
  }

  function toggleMetric (metric) {
    if (metric.indicator) {
      toggleIndicatorMetric(metric)
    }

    toggleWidgetMetric(widget, metric)
  }

  function toggleMetricLock (metric) {
    const newMetric = convertBaseProjectMetric(metric, settings)

    if (metrics.includes(newMetric)) return

    if (metric.indicator) {
      toggleIndicatorMetric(metric)
    }
    if (newMetric.indicator) {
      toggleIndicatorMetric(newMetric)
    }

    if (widget.axesMetricSet.has(metric)) {
      widget.axesMetricSet.delete(metric)
      widget.axesMetricSet.add(newMetric)
    } else {
      widget.disabledAxesMetricSet.delete(metric)
      widget.disabledAxesMetricSet.add(newMetric)
    }

    const newMap = new Map(widget.MetricSettingMap)
    newMap.set(newMetric, getMetricSetting(newMap, metric))
    newMap.delete(metric)
    widget.MetricSettingMap = newMap

    for (let i = 0; i < metrics.length; i++) {
      if (metrics[i] !== metric) continue

      metrics[i] = newMetric
      widget.metrics = metrics.slice()

      return rerenderWidgets()
    }
  }

  return (
    <ColorProvider widget={widget} rerenderWidgets={rerenderWidgets}>
      <StudioChart
        {...props}
        data={data}
        widget={widget}
        chartRef={chartRef}
        metrics={metrics}
        eventsData={EMPTY_ARRAY}
        activeEvents={EMPTY_ARRAY}
        ErrorMsg={ErrorMsg}
        MetricNode={MetricNode}
        settings={settings}
        loadings={loadings}
        options={options}
        isSingleWidget={isSingleWidget}
        setOptions={setOptions}
        toggleMetric={toggleMetric}
        toggleMetricLock={toggleMetricLock}
        rerenderWidgets={rerenderWidgets}
        onDeleteChartClick={() => deleteWidget(widget)}
      />
    </ColorProvider>
  )
}

const ChartWidget = props => (
  <Widget>
    <Chart {...props} />
  </Widget>
)

const newChartWidget = (props, widget = ChartWidget) =>
  newWidget(widget, {
    metrics: [Metric.price_usd],
    comparedMetrics: [],
    axesMetricSet: new Set(),
    disabledAxesMetricSet: new Set(),
    MetricSettingMap: new Map(),
    MetricIndicators: {},
    MetricColor: {},
    connectedWidgets: [],
    drawings: [],
    ...props
  })

ChartWidget.new = newChartWidget

export default ChartWidget
