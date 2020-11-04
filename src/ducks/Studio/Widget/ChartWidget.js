import React, { useEffect, useState } from 'react'
import Widget from './Widget'
import ColorProvider from './ChartWidgetColorProvider'
import {
  newWidget,
  useMetricNodeOverwrite,
  useMirroredTransformer
} from './utils'
import StudioChart from '../Chart'
import { dispatchWidgetMessage } from '../widgetMessage'
import { DEFAULT_OPTIONS } from '../defaults'
import { newProjectMetric } from '../metrics'
import { getMetricSetting, calculateMovingAverageFromInterval } from '../utils'
import { useTimeseries } from '../timeseries/hooks'
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
  const { metrics, chartRef, MetricSettingMap } = widget
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const MetricTransformer = useMirroredTransformer(metrics)
  const [rawData, loadings, ErrorMsg] = useTimeseries(
    metrics,
    settings,
    MetricSettingMap,
    MetricTransformer
  )
  const MetricNode = useMetricNodeOverwrite(MetricSettingMap)
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

  useEffect(
    () => {
      let modified = false
      metrics.forEach(metric => {
        if (metric.base !== Metric.dev_activity) return

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

  function toggleIndicatorMetric ({ indicator, metricKey }) {
    const { MetricIndicators } = widget
    let indicatorsSet = MetricIndicators[metricKey]

    if (!indicatorsSet) {
      indicatorsSet = new Set()
      MetricIndicators[metricKey] = indicatorsSet
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
    metrics: [
      newProjectMetric({ slug: 'bitcoin', ticker: 'BTC' }, Metric.price_usd)
    ],
    comparedMetrics: [],
    MetricSettingMap: new Map(),
    MetricIndicators: {},
    MetricColor: {},
    connectedWidgets: [],
    ...props
  })

ChartWidget.new = newChartWidget

export default ChartWidget
