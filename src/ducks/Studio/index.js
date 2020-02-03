import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import StudioSidebar from './Sidebar'
import StudioChart from './Chart'
import StudioSettings from './Settings'
import StudioAdvancedView from './AdvancedView'
import StudioHeader from '../SANCharts/Header'
import { Events } from '../SANCharts/data'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import { generateShareLink, updateHistory } from './url'
import styles from './index.module.scss'

const { trendPositionHistory } = Events

function buildAnomalies (metrics) {
  return metrics
    .filter(({ anomalyKey }) => anomalyKey)
    .map(({ key, anomalyKey }) => ({
      key: anomalyKey,
      queryKey: 'anomalies',
      anomalyMetricKey: key
    }))
}

const Studio = ({
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  defaultEvents,
  ...props
}) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [activeMetrics, setActiveMetrics] = useState(defaultMetrics)
  const [activeEvents, setActiveEvents] = useState(defaultEvents)
  const [advancedView, setAdvancedView] = useState()
  const [hoveredDate, setHoveredDate] = useState()
  const [shareLink, setShareLink] = useState()
  const chartRef = useRef(null)

  useEffect(
    () => {
      const queryString =
        '?' + generateShareLink(settings, options, activeMetrics, activeEvents)
      console.log(queryString)

      const { origin, pathname } = window.location
      setShareLink(origin + pathname + queryString)
      updateHistory(queryString)
    },
    [settings, options, activeMetrics, activeEvents]
  )

  useEffect(
    () => {
      if (options.isAnomalyActive) {
        setActiveEvents(buildAnomalies(activeMetrics))
      } else if (!activeEvents.includes(trendPositionHistory)) {
        setActiveEvents([])
      }
    },
    [activeMetrics, options.isAnomalyActive]
  )

  function toggleTrend (trend) {
    setActiveEvents(activeEvents.includes(trend) ? [] : [trend])
    setOptions(state => ({ ...state, isAnomalyActive: false }))
  }

  function toggleMetric (metric) {
    if (metric === trendPositionHistory) {
      return toggleTrend(metric)
    }

    const metricSet = new Set(activeMetrics)
    if (metricSet.has(metric)) {
      if (activeMetrics.length === 1) return
      metricSet.delete(metric)
    } else {
      if (activeMetrics.length === 5) return
      metricSet.add(metric)
    }
    setActiveMetrics([...metricSet])
  }

  function toggleAdvancedView (mode) {
    setAdvancedView(advancedView === mode ? undefined : mode)
  }

  function onProjectSelect ({ slug, name, ticker, id: projectId }) {
    const title = `${name} (${ticker})`
    setSettings(state => ({ ...state, slug, title, projectId }))
  }

  function changeHoveredDate ({ value }) {
    setHoveredDate(new Date(value))
  }

  return (
    <div className={styles.wrapper}>
      <StudioSidebar
        slug={settings.slug}
        options={options}
        activeMetrics={activeMetrics}
        activeEvents={activeEvents}
        advancedView={advancedView}
        setOptions={setOptions}
        toggleMetric={toggleMetric}
        toggleAdvancedView={toggleAdvancedView}
      />
      <div className={styles.container}>
        <StudioHeader
          slug={settings.slug}
          isLoading={false}
          isLoggedIn={false}
          onSlugSelect={onProjectSelect}
        />
      </div>
      <div className={cx(styles.container, styles.chart)}>
        <StudioSettings
          chartRef={chartRef}
          settings={settings}
          options={options}
          shareLink={shareLink}
          setOptions={setOptions}
          setSettings={setSettings}
        />
        <div className={styles.data}>
          <div className={styles.canvas}>
            <StudioChart
              chartRef={chartRef}
              settings={settings}
              options={options}
              activeMetrics={activeMetrics}
              activeEvents={activeEvents}
              advancedView={advancedView}
              toggleMetric={toggleMetric}
              changeHoveredDate={changeHoveredDate}
              {...props}
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
    </div>
  )
}

export default ({ settings, options, metrics, events, ...props }) => (
  <Studio
    {...props}
    defaultSettings={{
      ...DEFAULT_SETTINGS,
      ...settings
    }}
    defaultOptions={{ ...DEFAULT_OPTIONS, ...options }}
    defaultMetrics={metrics || DEFAULT_METRICS}
    defaultEvents={events || []}
  />
)
