import React, { useEffect, useState } from 'react'
import Widget from './Widget'
import ColorProvider from './ChartWidgetColorProvider'
import { newWidget, useMetricNodeOverwrite } from './utils'
import StudioChart from '../Chart'
import { dispatchWidgetMessage } from '../widgetMessage'
import { DEFAULT_OPTIONS } from '../defaults'
import {
  calculateMovingAverageFromInterval,
  mergeMetricSettingMap
} from '../utils'
import { useTimeseries } from '../timeseries/hooks'
import { buildComparedMetric } from '../Compare/utils'
import { useEdgeGaps, useClosestValueData } from '../../Chart/hooks'
import { useSyncDateEffect } from '../../Chart/sync'
import { Metric } from '../../dataHub/metrics'
import { MirroredMetric } from '../../dataHub/metrics/mirrored'

const activeEvents = []

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
  const [comparables, setComparables] = useState(widget.comparables)
  const [activeMetrics, setActiveMetrics] = useState(metrics)
  const [MetricTransformer, setMetricTransformer] = useState({})
  const [rawData, loadings, ErrorMsg] = useTimeseries(
    activeMetrics,
    settings,
    MetricSettingMap,
    MetricTransformer
  )
  const [eventsData] = useTimeseries(activeEvents, settings)
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
      const comparedMetrics = comparables.map(buildComparedMetric)
      widget.comparables = comparables
      widget.comparedMetrics = comparedMetrics
      setActiveMetrics(metrics.concat(comparedMetrics))
      rerenderWidgets()
    },
    [metrics, comparables]
  )

  useEffect(
    () => {
      const metricTransformer = Object.assign({}, MetricTransformer)

      metrics.forEach(metric => {
        const mirrorOf = MirroredMetric[metric.key]
        if (mirrorOf) {
          const { key, preTransformer } = metric

          if (metrics.includes(mirrorOf)) {
            metricTransformer[key] = preTransformer
          } else {
            metricTransformer[key] = undefined
          }
        }
      })

      setMetricTransformer(metricTransformer)
    },
    [metrics]
  )

  useEffect(
    () => {
      const metricsSet = new Set(metrics)

      const metric = Metric.dev_activity
      if (metricsSet.has(metric)) {
        const newMap = new Map()
        newMap.set(metric, {
          transform: {
            type: 'moving_average',
            movingAverageBase: calculateMovingAverageFromInterval(
              settings.interval
            )
          }
        })

        widget.MetricSettingMap = mergeMetricSettingMap(
          MetricSettingMap,
          newMap
        )

        rerenderWidgets()
      }
    },
    [metrics, settings.interval]
  )

  function removeComparedMetric ({ key }) {
    setComparables(comparables.filter(comp => comp.key !== key))
  }

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

    if (metric.comparedTicker) {
      return removeComparedMetric(metric)
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
        metrics={activeMetrics}
        eventsData={eventsData}
        activeEvents={activeEvents}
        ErrorMsg={ErrorMsg}
        MetricNode={MetricNode}
        settings={settings}
        loadings={loadings}
        options={options}
        comparables={comparables}
        isSingleWidget={isSingleWidget}
        setOptions={setOptions}
        setComparables={setComparables}
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
    metrics: [Metric.price_usd],
    comparables: [],
    comparedMetrics: [],
    MetricSettingMap: new Map(),
    MetricIndicators: {},
    MetricColor: {},
    connectedWidgets: [],
    ...props
  })

ChartWidget.new = newChartWidget

export default ChartWidget
