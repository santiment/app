import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import StudioSidebar from './Sidebar'
import StudioChart from './Chart'
import StudioSettings from './Settings'
import StudioAdvancedView from './AdvancedView'
import StudioHeader from '../SANCharts/Header'
import { Events } from '../SANCharts/data'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import { parseUrl, generateShareLink, updateHistory } from './url'
import styles from './index.module.scss'

const { trendPositionHistory } = Events

const sharedState = parseUrl()

const sharedSettings = { ...DEFAULT_SETTINGS, ...sharedState.settings }
const sharedOptions = { ...DEFAULT_OPTIONS, ...sharedState.options }
const sharedMetrics = sharedState.metrics || DEFAULT_METRICS
const sharedEvents = sharedState.events || []

console.log({
  sharedSettings,
  sharedOptions,
  sharedMetrics,
  sharedEvents
})

function buildAnomalies (metrics) {
  return metrics
    .filter(({ anomalyKey }) => anomalyKey)
    .map(({ key, anomalyKey }) => ({
      key: anomalyKey,
      queryKey: 'anomalies',
      anomalyMetricKey: key
    }))
}

const Studio = props => {
  const [settings, setSettings] = useState(sharedSettings)
  const [options, setOptions] = useState(sharedOptions)
  const [activeMetrics, setActiveMetrics] = useState(sharedMetrics)
  const [activeEvents, setActiveEvents] = useState(sharedEvents)
  const [advancedView, setAdvancedView] = useState()
  const [hoveredDate, setHoveredDate] = useState()
  const chartRef = useRef(null)

  useEffect(
    () => {
      const shareLink = generateShareLink(
        settings,
        options,
        activeMetrics,
        activeEvents
      )
      console.log(shareLink)
      updateHistory('?' + shareLink)
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

export default Studio
