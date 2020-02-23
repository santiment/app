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
import { useTimeseries } from './timeseries/hooks'
import { buildAnomalies } from './timeseries/anomalies'
import { trackMetricState } from './analytics'
import styles from './index.module.scss'

const { trendPositionHistory } = Events

const Studio = ({
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  defaultEvents,
  topSlot,
  bottomSlot,
  onSlugChange,
  classes,
  ...props
}) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [activeMetrics, setActiveMetrics] = useState(defaultMetrics)
  const [activeEvents, setActiveEvents] = useState(defaultEvents)
  const [advancedView, setAdvancedView] = useState()
  const [hoveredDate, setHoveredDate] = useState()
  const [shareLink, setShareLink] = useState()
  const [data, loadings] = useTimeseries(activeMetrics, settings)
  const [events, eventLoadings] = useTimeseries(activeEvents, settings)
  const chartRef = useRef(null)

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
        '?' + generateShareLink(settings, options, activeMetrics, activeEvents)

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
      trackMetricState(metric, false)
    } else {
      if (activeMetrics.length === 5) return
      metricSet.add(metric)
      trackMetricState(metric, true)
    }
    setActiveMetrics([...metricSet])
  }

  function toggleAdvancedView (mode) {
    setAdvancedView(advancedView === mode ? undefined : mode)
  }

  function onProjectSelect (project) {
    if (!project) return

    const { slug, name, ticker, id: projectId } = project
    const title = `${name} (${ticker})`
    setSettings(state => ({ ...state, slug, title, projectId, ticker }))
    onSlugChange(slug)
  }

  function changeHoveredDate ({ value }) {
    setHoveredDate(new Date(value))
  }

  return (
    <div className={cx(styles.wrapper, classes.wrapper)}>
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
      <div className={styles.header}>
        {topSlot}
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
          activeMetrics={activeMetrics}
          activeEvents={activeEvents}
          data={data}
          events={events}
          shareLink={shareLink}
          setOptions={setOptions}
          setSettings={setSettings}
        />
        <div className={styles.data}>
          <div className={styles.canvas}>
            <StudioChart
              {...props}
              chartRef={chartRef}
              settings={settings}
              options={options}
              activeMetrics={activeMetrics}
              activeEvents={activeEvents}
              advancedView={advancedView}
              toggleMetric={toggleMetric}
              changeHoveredDate={changeHoveredDate}
              data={data}
              events={events}
              loadings={loadings}
              eventLoadings={eventLoadings}
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
  onSlugChange: () => {},
  classes: {}
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
