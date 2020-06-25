import React, { useState, useEffect } from 'react'
import Sidebar from '../Studio/Sidebar'
import { Metric } from '../dataHub/metrics'
import { newChartWidget } from './Widget/ChartWidget'
import { newHolderDistributionWidget } from './Widget/HolderDistributionWidget'
import SelectionOverview from './SelectionOverview'
import Main from './Main'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import styles from './index.module.scss'
import { DEFAULT_SETTINGS } from '../Studio/defaults'
import { saveToggle } from '../../utils/localStorage'
import { mergeMetricSettingMap } from './utils'

export const DEFAULT_WIDGETS = [newChartWidget()]

export const Studio = ({
  defaultWidgets,
  defaultSidepanel,
  defaultSettings = DEFAULT_SETTINGS,
  extensions,
}) => {
  const [widgets, setWidgets] = useState(defaultWidgets)
  const [settings, setSettings] = useState(defaultSettings)
  const [sidepanel, setSidepanel] = useState(defaultSidepanel)
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [selectedMetricSettingsMap, setSelectedMetricSettingsMap] = useState(
    new Map(),
  )
  const [isAnomalyActive, setIsAnomalyActive] = useState(false)
  const [isICOPriceDisabled, setIsICOPriceDisabled] = useState(true)
  const [isICOPriceActive, setIsICOPriceActive] = useState(true)

  useEffect(
    () => {
      const { slug } = defaultSettings
      if (slug && slug !== settings.slug) {
        setSettings({ ...settings, slug })
      }
    },
    [defaultSettings.slug],
  )

  function rerenderWidgets() {
    setWidgets(widgets.slice())
  }

  function toggleSidepanel(key) {
    setSidepanel(sidepanel === key ? undefined : key)
  }

  function deleteWidget(widget) {
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

  function toggleAnomaly() {
    setIsAnomalyActive(saveToggle('isAnomalyActive', !isAnomalyActive))
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
    } else if (type === 'ico_price') {
      setIsICOPriceActive(!isICOPriceActive)
    } else if (type === 'widget') {
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
    widget.MetricSettingMap = mergeMetricSettingMap(
      widget.MetricSettingMap,
      selectedMetricSettingsMap,
    )

    rerenderWidgets()
  }

  function onNewChartClick() {
    setWidgets([
      ...widgets,
      newChartWidget({
        metrics: selectedMetrics,
        MetricSettingMap: selectedMetricSettingsMap,
      }),
    ])
  }

  function onOverviewClose() {
    setSelectedMetrics([])
    setSelectedMetricSettingsMap(new Map())
  }

  return (
    <div className={styles.wrapper}>
      <Sidebar
        slug={settings.slug}
        activeMetrics={selectedMetrics}
        isAnomalyActive={isAnomalyActive}
        isICOPriceDisabled={isICOPriceDisabled}
        toggleMetric={onSidebarItemClick}
        toggleAnomaly={toggleAnomaly}
        setMetricSettingMap={setSelectedMetricSettingsMap}
      />
      <main className={styles.main}>
        <Main
          widgets={widgets}
          settings={settings}
          sidepanel={sidepanel}
          isICOPriceActive={isICOPriceActive}
          isAnomalyActive={isAnomalyActive}
          // fn
          setWidgets={setWidgets}
          setSettings={setSettings}
          setIsICOPriceDisabled={setIsICOPriceDisabled}
          changeTimePeriod={changeTimePeriod}
          toggleWidgetMetric={toggleWidgetMetric}
          toggleSidepanel={toggleSidepanel}
          deleteWidget={deleteWidget}
          rerenderWidgets={rerenderWidgets}
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
      {React.Children.map(extensions, (extension) =>
        React.cloneElement(extension, { widgets, settings, sidepanel }),
      )}
    </div>
  )
}

export default Studio
