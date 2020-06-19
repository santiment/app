import React, { useState } from 'react'
import cx from 'classnames'
import Sidebar from '../Studio/Sidebar'
import { Metric } from '../dataHub/metrics'
import ChartWidget from './ChartWidget'
import SelectionOverview from './SelectionOverview'
import Manager from './Manager'
import Main from './Main'
import { TOP_HOLDER_METRICS } from '../Studio/Chart/Sidepane/TopHolders/metrics'
import HolderDistributionWidget from './HolderDistributionWidget'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import styles from './index.module.scss'

import {
  DEFAULT_SETTINGS,
  DEFAULT_OPTIONS,
  DEFAULT_METRICS,
  DEFAULT_METRIC_SETTINGS_MAP,
} from '../Studio/defaults'

let id = -1

/*
const defaultSettings = {
  from: '2019-12-13T21:00:00.000Z',
  interval: '4h',
  projectId: '101605',
  slug: 'santiment',
  ticker: 'SAN',
  timeRange: '6m',
  title: 'Santiment (SAN)',
  to: '2020-06-14T20:59:59.999Z',
}
*/

const Studio = ({
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  defaultEvents,
  defaultComparedMetrics,
  defaultComparables,
  defaultMetricSettingsMap,
  ...props
}) => {
  const [widgets, setWidgets] = useState([
    {
      id: ++id,
      type: 'CHART',
      Widget: ChartWidget,
      metrics: [Metric.price_usd],
      chartRef: { current: null },
    },
  ])
  const [settings, setSettings] = useState(defaultSettings)
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [sidepanel, setSidepanel] = useState()

  function toggleSidepanel(key) {
    setSidepanel(sidepanel === key ? undefined : key)
  }

  function deleteWidget(widget) {
    console.log(widget)
    setWidgets(widgets.filter((w) => w !== widget))
  }

  function toggleWidgetMetric(widget, metric) {
    const metrics = deduceMetrics(widget.metrics, metric)

    if (metrics.length === 0) {
      deleteWidget(widget)
    } else {
      widget.metrics = metrics
      setWidgets([...widgets])
    }
  }

  function toggleSelectionMetric(metric) {
    setSelectedMetrics(deduceMetrics(selectedMetrics, metric))
  }

  function deduceMetrics(metrics, metric) {
    const newMetrics = new Set(metrics)

    if (newMetrics.has(metric)) {
      newMetrics.delete(metric)
    } else {
      newMetrics.add(metric)
    }

    return [...newMetrics]
  }

  function changeTimePeriod(from, to, timeRange) {
    const interval = getNewInterval(from, to)

    setSettings((state) => ({
      ...state,
      timeRange,
      interval: INTERVAL_ALIAS[interval] || interval,
      from: from.toISOString(),
      to: to.toISOString(),
    }))
  }

  function onSidebarItemClick(item) {
    const { type, key } = item

    if (type === 'sidepanel') {
      toggleSidepanel(key)
    } else if (type === 'widget') {
      console.log('this is widget')

      if (key === 'holder_distribution') {
        setWidgets([
          ...widgets,
          {
            id: ++id,
            type: 'CHART',
            Widget: HolderDistributionWidget,
            metrics: TOP_HOLDER_METRICS,
            chartRef: { current: null },
            scrollIntoViewOnMount: true,
          },
        ])
      }
    } else {
      toggleSelectionMetric(item)
    }
  }

  function onWidgetClick(widget) {
    const newMetrics = new Set([...widget.metrics, ...selectedMetrics])

    widget.metrics = [...newMetrics]

    setWidgets([...widgets])
  }

  function onNewChartClick() {
    setWidgets([
      ...widgets,
      {
        id: Date.now(),
        type: 'CHART',
        Widget: ChartWidget,
        metrics: [...selectedMetrics],
        chartRef: { current: null },
      },
    ])
  }

  function onOverviewClose() {
    setSelectedMetrics([])
  }

  return (
    <Manager>
      <div className={styles.wrapper}>
        <Sidebar
          slug='bitcoin'
          options={{}}
          activeMetrics={selectedMetrics}
          toggleMetric={onSidebarItemClick}
        />
        <main className={styles.main}>
          <Main
            {...props}
            widgets={widgets}
            settings={settings}
            options={{}}
            sidepanel={sidepanel}
            // fn
            setSettings={setSettings}
            changeTimePeriod={changeTimePeriod}
            toggleWidgetMetric={toggleWidgetMetric}
            toggleSidepanel={toggleSidepanel}
            deleteWidget={deleteWidget}
          />

          {selectedMetrics.length ? (
            <SelectionOverview
              widgets={widgets}
              selectedMetrics={selectedMetrics}
              toggleMetric={toggleSelectionMetric}
              onClose={onOverviewClose}
              onWidgetClick={onWidgetClick}
              onNewChartClick={onNewChartClick}
            />
          ) : null}
        </main>
      </div>
    </Manager>
  )
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
      ...settings,
    }}
    defaultOptions={{ ...DEFAULT_OPTIONS, ...options }}
    defaultMetrics={metrics || DEFAULT_METRICS}
    defaultEvents={events}
    defaultComparables={comparables}
    defaultMetricSettingsMap={MetricSettingsMap || DEFAULT_METRIC_SETTINGS_MAP}
  />
)
