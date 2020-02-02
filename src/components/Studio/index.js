import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import StudioSidebar from './Sidebar'
import StudioChart from './Chart'
import StudioHeader from '../../ducks/SANCharts/Header'
import ChartSettings from './Settings'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import { Events } from '../../ducks/SANCharts/data'
import styles from './index.module.scss'

function buildAnomalies (metrics) {
  return metrics
    .filter(({ anomalyKey }) => anomalyKey)
    .map(({ key, anomalyKey }) => ({
      key: anomalyKey,
      queryKey: 'anomalies',
      anomalyMetricKey: key
    }))
}

const Studio = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [activeMetrics, setActiveMetrics] = useState(DEFAULT_METRICS)
  const [activeEvents, setActiveEvents] = useState([])
  const chartRef = useRef(null)

  console.log({ activeMetrics, activeEvents })

  useEffect(
    () => {
      /* console.log(settings) */
    },
    [settings]
  )

  useEffect(
    () => {
      /* console.log(options) */
    },
    [options]
  )

  useEffect(
    () => {
      setActiveEvents(
        options.isAnomalyActive ? buildAnomalies(activeMetrics) : []
      )
    },
    [activeMetrics, options.isAnomalyActive]
  )

  function toggleTrend (trend) {
    setActiveEvents(activeEvents.includes(trend) ? [] : [trend])
    setOptions(state => ({ ...state, isAnomalyActive: false }))
  }

  function toggleMetric (metric) {
    if (metric === Events.trendPositionHistory) {
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

  function onProjectSelect ({ slug, name, ticker, id: projectId }) {
    const title = `${name} (${ticker})`
    setSettings(state => ({ ...state, slug, title, projectId }))
  }

  return (
    <div className={styles.wrapper}>
      <StudioSidebar
        slug={settings.slug}
        options={options}
        setOptions={setOptions}
        toggleMetric={toggleMetric}
        activeMetrics={activeMetrics}
        activeEvents={activeEvents}
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
        <ChartSettings
          chartRef={chartRef}
          settings={settings}
          options={options}
          setOptions={setOptions}
          setSettings={setSettings}
        />
        <div className={styles.canvas}>
          <StudioChart
            chartRef={chartRef}
            settings={settings}
            options={options}
            activeMetrics={activeMetrics}
            activeEvents={activeEvents}
            toggleMetric={toggleMetric}
          />
        </div>
      </div>
    </div>
  )
}

export default Studio
