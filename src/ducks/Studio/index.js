import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import StudioSidebar from './Sidebar'
import StudioChart from './Chart'
import StudioHeader from './Header'
import StudioAdvancedView from './AdvancedView'
import StudioInfo from '../SANCharts/Header'
import { Event } from '../dataHub/events'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import { buildComparedMetric } from './Compare/utils'
import { useTimeseries } from './timeseries/hooks'
import { buildAnomalies } from './timeseries/anomalies'
import { MAX_METRICS_AMOUNT } from './constraints'
import { generateShareLink, updateHistory } from './url'
import { trackMetricState } from './analytics'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import styles from './index.module.scss'

const { trendPositionHistory } = Event

const Studio = ({
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  defaultEvents,
  defaultComparedMetrics,
  defaultComparables,
  topSlot,
  bottomSlot,
  onSlugChange,
  classes,
  ...props
}) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [comparables, setComparables] = useState(defaultComparables)
  const [comparedMetrics, setComparedMetrics] = useState(defaultComparedMetrics)
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [activeMetrics, setActiveMetrics] = useState(defaultMetrics)
  const [activeEvents, setActiveEvents] = useState(defaultEvents)
  const [advancedView, setAdvancedView] = useState()
  const [hoveredDate, setHoveredDate] = useState()
  const [shareLink, setShareLink] = useState()
  const [isICOPriceDisabled, setIsICOPriceDisabled] = useState()
  const [data, loadings] = useTimeseries(activeMetrics, settings)
  const [eventsData, eventLoadings] = useTimeseries(activeEvents, settings)
  const [isSidebarClosed, setIsSidebarClosed] = useState()
  const chartRef = useRef(null)

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
      } else if (!activeEvents.includes(trendPositionHistory)) {
        setActiveEvents([])
      }
    },
    [metrics, options.isAnomalyActive]
  )

  function toggleTrend (trend) {
    setActiveEvents(activeEvents.includes(trend) ? [] : [trend])
    setOptions(state => ({ ...state, isAnomalyActive: false }))
  }

  function toggleMetric (metric) {
    if (metric === trendPositionHistory) {
      return toggleTrend(metric)
    } else if (metric.comparedTicker) {
      return removeComparedMetric(metric)
    }

    const metricSet = new Set(metrics)
    if (metricSet.has(metric)) {
      if (activeMetrics.length === 1) return
      metricSet.delete(metric)
      trackMetricState(metric, false)
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

  function toggleAdvancedView (mode) {
    setAdvancedView(advancedView === mode ? undefined : mode)
  }

  function onProjectSelect (project) {
    if (!project) return

    const { slug, name, ticker, id: projectId } = project
    const title = `${name} (${ticker})`
    setSettings(state => ({ ...state, slug, title, projectId, ticker }))
    setIsICOPriceDisabled(false)
    onSlugChange(slug)
  }

  function changeHoveredDate ({ value }) {
    setHoveredDate(new Date(value))
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
      <CtaJoinPopup />
      <StudioSidebar
        slug={settings.slug}
        options={options}
        activeMetrics={activeMetrics}
        activeEvents={activeEvents}
        advancedView={advancedView}
        setOptions={setOptions}
        toggleMetric={toggleMetric}
        toggleAdvancedView={toggleAdvancedView}
        isICOPriceDisabled={isICOPriceDisabled}
        isSidebarClosed={isSidebarClosed}
        setIsSidebarClosed={setIsSidebarClosed}
      />
      <div className={styles.header}>
        {topSlot}
        <StudioInfo
          slug={settings.slug}
          isLoading={false}
          isLoggedIn={false}
          onSlugSelect={onProjectSelect}
        />
      </div>
      <div className={cx(styles.container, styles.content)}>
        <StudioHeader
          chartRef={chartRef}
          settings={settings}
          options={options}
          activeMetrics={activeMetrics}
          activeEvents={activeEvents}
          data={data}
          events={eventsData}
          comparables={comparables}
          shareLink={shareLink}
          setOptions={setOptions}
          setSettings={setSettings}
          setComparables={setComparables}
        />
        <div className={styles.data}>
          <div className={styles.chart}>
            <StudioChart
              {...props}
              className={styles.canvas}
              chartRef={chartRef}
              settings={settings}
              options={options}
              activeMetrics={activeMetrics}
              activeEvents={activeEvents}
              advancedView={advancedView}
              toggleMetric={toggleMetric}
              data={data}
              events={eventsData}
              loadings={loadings}
              eventLoadings={eventLoadings}
              isSidebarClosed={isSidebarClosed}
              changeHoveredDate={changeHoveredDate}
              setIsICOPriceDisabled={setIsICOPriceDisabled}
            />
          </div>
          {advancedView && (
            <div className={cx(styles.canvas, styles.advanced)}>
              <StudioAdvancedView
                advancedView={advancedView}
                toggleAdvancedView={toggleAdvancedView}
                date={hoveredDate}
                {...settings}
              />
            </div>
          )}
        </div>
      </div>
      {bottomSlot}
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
  />
)
