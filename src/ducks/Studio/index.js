import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import { mergeMetricSettingMap } from './utils'
import { DEFAULT_SETTINGS } from './defaults'
import { usePhase } from './hooks'
import { newChartWidget } from './Widget/ChartWidget'
import { newHolderDistributionWidget } from './Widget/HolderDistributionWidget'
import SelectionOverview from './Overview/SelectionOverview'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import { saveToggle } from '../../utils/localStorage'
import styles from './index.module.scss'

const Phase = {
  IDLE: 'idle',
  OVERVIEW: 'overview',
  OVERVIEW_SELECTION: 'overview_selection',
}

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
  const [isICOPriceDisabled, setIsICOPriceDisabled] = useState(true)
  const [isICOPriceActive, setIsICOPriceActive] = useState(true)
  const [isAnomalyActive, setIsAnomalyActive] = useState()
  const [isSidebarClosed, setIsSidebarClosed] = useState()
  const { currentPhase, previousPhase, setPhase } = usePhase(Phase.IDLE)
  const isOverviewOpened = currentPhase.startsWith(Phase.OVERVIEW)

  useEffect(
    () => {
      const { slug } = defaultSettings
      if (slug && slug !== settings.slug) {
        setSettings({ ...settings, slug })
      }
    },
    [defaultSettings.slug],
  )

  useEffect(
    () => {
      if (selectedMetrics.length) {
        setPhase(Phase.OVERVIEW_SELECTION)
      } else if (previousPhase === Phase.OVERVIEW_SELECTION) {
        setPhase(Phase.OVERVIEW)
      }
    },
    [selectedMetrics.length],
  )

  function toggleOverview() {
    setPhase(isOverviewOpened ? Phase.IDLE : Phase.OVERVIEW)
  }

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
    resetSelecion()
  }

  function onNewChartClick() {
    setWidgets([
      ...widgets,
      newChartWidget({
        metrics: selectedMetrics,
        MetricSettingMap: selectedMetricSettingsMap,
      }),
    ])
    resetSelecion()
  }

  function onOverviewClose() {
    setPhase(Phase.IDLE)
    resetSelecion()
  }

  function resetSelecion() {
    setSelectedMetrics([])
    setSelectedMetricSettingsMap(new Map())
  }

  return (
    <div className={styles.wrapper}>
      <Sidebar
        slug={settings.slug}
        project={settings}
        activeMetrics={selectedMetrics}
        isSidebarClosed={isSidebarClosed}
        isAnomalyActive={isAnomalyActive}
        isICOPriceDisabled={isICOPriceDisabled}
        toggleMetric={onSidebarItemClick}
        toggleAnomaly={toggleAnomaly}
        setMetricSettingMap={setSelectedMetricSettingsMap}
        setIsSidebarClosed={setIsSidebarClosed}
      />
      <main className={styles.main}>
        <Main
          widgets={widgets}
          settings={settings}
          sidepanel={sidepanel}
          isICOPriceActive={isICOPriceActive}
          isAnomalyActive={isAnomalyActive}
          isOverviewOpened={isOverviewOpened}
          // fn
          setWidgets={setWidgets}
          setSettings={setSettings}
          setIsICOPriceDisabled={setIsICOPriceDisabled}
          changeTimePeriod={changeTimePeriod}
          toggleWidgetMetric={toggleWidgetMetric}
          toggleSidepanel={toggleSidepanel}
          deleteWidget={deleteWidget}
          rerenderWidgets={rerenderWidgets}
          toggleOverview={toggleOverview}
        />

        {/* {selectedMetrics.length ? ( */}
        {isOverviewOpened && (
          <SelectionOverview
            widgets={widgets}
            selectedMetrics={selectedMetrics}
            currentPhase={currentPhase}
            toggleMetric={toggleSelectionMetric}
            resetSelecion={resetSelecion}
            onClose={onOverviewClose}
            onWidgetClick={onWidgetClick}
            onNewChartClick={onNewChartClick}
          />
        )}
      </main>
      {React.Children.map(extensions, (extension) =>
        React.cloneElement(extension, { widgets, settings, sidepanel }),
      )}
    </div>
  )
}

export default Studio
