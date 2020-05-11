import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import StudioSidebar from './Sidebar'
import StudioMain from './Main'
import {
  DEFAULT_SETTINGS,
  DEFAULT_OPTIONS,
  DEFAULT_METRICS,
  DEFAULT_METRIC_SETTINGS_MAP
} from './defaults'
import { MAX_METRICS_AMOUNT } from './constraints'
import { generateShareLink } from './url'
import { trackMetricState } from './analytics'
import { useTimeseries } from './timeseries/hooks'
import { buildAnomalies } from './timeseries/anomalies'
import { buildComparedMetric } from './Compare/utils'
import { TOP_HOLDERS_PANE } from './Chart/Sidepane/panes'
import { updateHistory } from '../../utils/utils'
import { useClosestValueData } from '../Chart/hooks'
import { getPreparedMetricSettings } from './timeseries/utils'
import styles from './index.module.scss'

const Studio = ({
  classes,
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  defaultEvents,
  defaultComparedMetrics,
  defaultComparables,
  defaultMetricSettingsMap,
  topSlot,
  bottomSlot,
  ...props
}) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [comparables, setComparables] = useState(defaultComparables)
  const [comparedMetrics, setComparedMetrics] = useState(defaultComparedMetrics)
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [activeMetrics, setActiveMetrics] = useState(defaultMetrics)
  const [activeEvents, setActiveEvents] = useState(defaultEvents)
  const [MetricSettingMap, setMetricSettingMap] = useState(
    defaultMetricSettingsMap
  )
  const [chartSidepane, setChartSidepane] = useState()
  const [advancedView, setAdvancedView] = useState()
  const [shareLink, setShareLink] = useState()
  const [isICOPriceDisabled, setIsICOPriceDisabled] = useState(true)

  const [rawData, loadings, ErrorMsg] = useTimeseries(
    activeMetrics,
    settings,
    MetricSettingMap
  )

  const [isSidebarClosed, setIsSidebarClosed] = useState()

  const [eventsData, eventLoadings] = useTimeseries(activeEvents, settings)
  const data = useClosestValueData(
    rawData,
    activeMetrics,
    options.isClosestDataActive
  )

  useEffect(
    () => {
      setMetricSettingMap(
        getPreparedMetricSettings(activeMetrics, MetricSettingMap)
      )
    },
    [activeMetrics]
  )

  useEffect(
    () => {
      setComparedMetrics(comparables.map(buildComparedMetric))
    },
    [comparables]
  )

  useEffect(
    () => {
      setActiveMetrics(metrics.concat(comparedMetrics))
    },
    [metrics, comparedMetrics]
  )

  useEffect(
    () => {
      setMetrics(metrics.filter(({ key }) => !ErrorMsg[key]))
    },
    [ErrorMsg]
  )

  useEffect(
    () => {
      const activeLength = activeMetrics.length
      if (!options.isMultiChartsActive && activeLength > MAX_METRICS_AMOUNT) {
        const diff = activeLength - MAX_METRICS_AMOUNT

        if (diff >= comparables.length) {
          setComparables([])
        } else {
          setComparables(comparables.slice(0, -diff))
        }

        if (metrics.length >= MAX_METRICS_AMOUNT) {
          setMetrics(metrics.slice(0, MAX_METRICS_AMOUNT))
        }
      }
    },
    [options.isMultiChartsActive]
  )

  useEffect(
    () => {
      const { slug } = defaultSettings
      if (slug && slug !== settings.slug) {
        setSettings(state => ({ ...state, slug }))
      }
    },
    [defaultSettings.slug]
  )

  useEffect(
    () => {
      const queryString =
        '?' +
        generateShareLink(settings, options, metrics, activeEvents, comparables)

      const { origin, pathname } = window.location
      setShareLink(origin + pathname + queryString)
      updateHistory(queryString)
    },
    [settings, options, metrics, activeEvents, comparables]
  )

  useEffect(
    () => {
      if (options.isAnomalyActive) {
        setActiveEvents(buildAnomalies(metrics))
      } else {
        setActiveEvents([])
      }
    },
    [metrics, options.isAnomalyActive]
  )

  useEffect(
    () => {
      if (chartSidepane === TOP_HOLDERS_PANE && options.isMultiChartsActive) {
        setChartSidepane()
      }
    },
    [chartSidepane, settings.slug, options.isMultiChartsActive]
  )

  function toggleMetric (metric) {
    if (metric.comparedTicker) {
      return removeComparedMetric(metric)
    }

    const metricSet = new Set(metrics)
    if (metricSet.has(metric)) {
      if (activeMetrics.length === 1) return
      metricSet.delete(metric)
    } else {
      if (
        !options.isMultiChartsActive &&
        activeMetrics.length === MAX_METRICS_AMOUNT
      ) {
        return
      }

      metricSet.add(metric)
      trackMetricState(metric, true)
    }
    setMetrics([...metricSet])
  }

  function toggleChartSidepane (sidepane) {
    setChartSidepane(chartSidepane === sidepane ? undefined : sidepane)
  }

  function toggleAdvancedView (mode) {
    setAdvancedView(advancedView === mode ? undefined : mode)
  }

  function removeComparedMetric ({ key }) {
    setComparables(comparables.filter(comp => comp.key !== key))
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        classes.wrapper,
        isSidebarClosed && styles.wrapper_wide
      )}
    >
      <StudioSidebar
        slug={settings.slug}
        options={options}
        activeMetrics={activeMetrics}
        activeEvents={activeEvents}
        advancedView={advancedView}
        chartSidepane={chartSidepane}
        ErrorMsg={ErrorMsg}
        setOptions={setOptions}
        toggleMetric={toggleMetric}
        toggleAdvancedView={toggleAdvancedView}
        toggleChartSidepane={toggleChartSidepane}
        setIsSidebarClosed={setIsSidebarClosed}
        setMetricSettingMap={setMetricSettingMap}
        isICOPriceDisabled={isICOPriceDisabled}
        isSidebarClosed={isSidebarClosed}
      />
      <StudioMain
        {...props}
        topSlot={topSlot}
        bottomSlot={bottomSlot}
        options={options}
        settings={settings}
        activeMetrics={activeMetrics}
        activeEvents={activeEvents}
        metrics={metrics}
        comparables={comparables}
        data={data}
        eventsData={eventsData}
        loadings={loadings}
        eventLoadings={eventLoadings}
        advancedView={advancedView}
        chartSidepane={chartSidepane}
        shareLink={shareLink}
        // bools
        isSidebarClosed={isSidebarClosed}
        // state setters
        setMetrics={setMetrics}
        setSettings={setSettings}
        setOptions={setOptions}
        setComparables={setComparables}
        setIsICOPriceDisabled={setIsICOPriceDisabled}
        // fn
        toggleMetric={toggleMetric}
        toggleAdvancedView={toggleAdvancedView}
        toggleChartSidepane={toggleChartSidepane}
      />
    </div>
  )
}

Studio.defaultProps = {
  defaultComparedMetrics: [],
  defaultEvents: [],
  defaultComparables: [],
  onSlugChange: () => {},
  classes: {}
}

export default ({
  settings,
  options,
  metrics,
  events,
  comparables,
  MetricSettingsMap,
  ...props
}) => (
  <Studio
    {...props}
    defaultSettings={{
      ...DEFAULT_SETTINGS,
      ...settings
    }}
    defaultOptions={{ ...DEFAULT_OPTIONS, ...options }}
    defaultMetrics={metrics || DEFAULT_METRICS}
    defaultEvents={events}
    defaultComparables={comparables}
    defaultMetricSettingsMap={MetricSettingsMap || DEFAULT_METRIC_SETTINGS_MAP}
  />
)
