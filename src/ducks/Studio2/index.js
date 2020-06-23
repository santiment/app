import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Sidebar from '../Studio/Sidebar'
import { Metric } from '../dataHub/metrics'
import { newChartWidget } from './Widget/ChartWidget'
import { newHolderDistributionWidget } from './Widget/HolderDistributionWidget'
import SelectionOverview from './SelectionOverview'
import { generateUrlV2 } from './url'
import { WidgetMessageProvider } from './widgetMessageContext'
import Main from './Main'
import { updateHistory } from '../../utils/utils'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import styles from './index.module.scss'

import {
  DEFAULT_SETTINGS,
  DEFAULT_OPTIONS,
  DEFAULT_METRICS,
  DEFAULT_METRIC_SETTINGS_MAP,
} from '../Studio/defaults'

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

export const Studio = ({
  defaultWidgets,
  defaultSettings = DEFAULT_SETTINGS,
  defaultOptions,
  defaultMetrics,
  defaultEvents,
  defaultComparedMetrics,
  defaultComparables,
  defaultMetricSettingsMap,
  Extension,
  ...props
}) => {
  const [widgets, setWidgets] = useState(defaultWidgets)
  const [settings, setSettings] = useState(defaultSettings)
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [sidepanel, setSidepanel] = useState()

  useEffect(
    () => {
      const queryString = '?' + generateUrlV2({ settings, widgets, sidepanel })

      /* const { origin, pathname } = window.location */
      /* setShareLink(origin + pathname + queryString) */
      updateHistory(queryString)
    },
    [settings, widgets, sidepanel],
  )

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
          newHolderDistributionWidget({
            scrollIntoViewOnMount: true,
          }),
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
    setWidgets([...widgets, newChartWidget({ metrics: selectedMetrics })])
  }

  function onOverviewClose() {
    setSelectedMetrics([])
  }

  return (
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
  )
}
/*
 * export default ({
 *   settings,
 *   options,
 *   metrics,
 *   events,
 *   comparables,
 *   MetricSettingsMap,
 *   ...props
 * }) => (
 *   <Studio
 *     {...props}
 *     defaultSettings={{
 *       ...DEFAULT_SETTINGS,
 *       ...settings,
 *     }}
 *     defaultOptions={{ ...DEFAULT_OPTIONS, ...options }}
 *     defaultMetrics={metrics || DEFAULT_METRICS}
 *     defaultEvents={events}
 *     defaultComparables={comparables}
 *     defaultMetricSettingsMap={MetricSettingsMap || DEFAULT_METRIC_SETTINGS_MAP}
 *   />
 * )
 *
 *  */

export default (props) => (
  <WidgetMessageProvider>
    <Studio {...props} />
  </WidgetMessageProvider>
)
