import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import {
  mergeMetricSettingMap,
  mergeConnectedWidgetsWithSelected
} from './utils'
import { DEFAULT_SETTINGS } from './defaults'
import { Phase, usePhase } from './phases'
import { useKeyboardShortcut } from './hooks'
import ChartWidget from './Widget/ChartWidget'
import HolderDistributionWidget from './Widget/HolderDistributionWidget'
import SelectionOverview from './Overview/SelectionOverview'
import * as Type from './Sidebar/MetricSelector/types'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import styles from './index.module.scss'

export const Studio = ({
  defaultWidgets,
  defaultSidepanel,
  defaultSettings = DEFAULT_SETTINGS,
  extensions
}) => {
  const [widgets, setWidgets] = useState(defaultWidgets)
  const [settings, setSettings] = useState(defaultSettings)
  const [sidepanel, setSidepanel] = useState(defaultSidepanel)
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [selectedWidgets, setSelectedWidgets] = useState([])
  const [selectedMetricSettingsMap, setSelectedMetricSettingsMap] = useState(
    new Map()
  )
  const [isICOPriceDisabled, setIsICOPriceDisabled] = useState(true)
  const [isICOPriceActive, setIsICOPriceActive] = useState(false)
  const [isSidebarClosed, setIsSidebarClosed] = useState()
  const { currentPhase, previousPhase, setPhase } = usePhase(Phase.IDLE)
  const isOverviewOpened = currentPhase.startsWith(Phase.MAPVIEW)

  useKeyboardShortcut('m', toggleOverview)

  useEffect(
    () => {
      const { slug } = defaultSettings
      if (slug && slug !== settings.slug) {
        setSettings({ ...settings, slug })
      }
    },
    [defaultSettings.slug]
  )

  useEffect(
    () => {
      if (selectedMetrics.length) {
        setPhase(Phase.MAPVIEW_SELECTION)
      } else if (previousPhase === Phase.MAPVIEW_SELECTION) {
        setPhase(Phase.MAPVIEW)
      }
    },
    [selectedMetrics.length]
  )

  function toggleOverview () {
    if (isOverviewOpened) {
      onOverviewClose()
    } else {
      setPhase(Phase.MAPVIEW)
    }
  }

  function rerenderWidgets () {
    setWidgets(widgets.slice())
  }

  function toggleSidepanel (key) {
    setSidepanel(sidepanel === key ? undefined : key)
  }

  function deleteWidget (widget) {
    setWidgets(widgets.filter(w => w !== widget))
  }

  function deleteConnectedWidget (connectedWidget, parentWidget) {
    parentWidget.connectedWidgets = parentWidget.connectedWidgets.filter(
      w => w !== connectedWidget
    )
    rerenderWidgets()
  }

  function toggleWidgetMetric (widget, metric) {
    const metrics = deduceItems(widget.metrics, metric)

    if (metrics.length === 0 && widget.comparables.length === 0) {
      deleteWidget(widget)
    } else {
      widget.metrics = metrics
      rerenderWidgets()
    }
  }

  function toggleSelectionMetric (metric) {
    setSelectedMetrics(deduceItems(selectedMetrics, metric))
  }

  function toggleSelectionWidget (selectedWidget) {
    const newSelectedWidgets = deduceItems(selectedWidgets, selectedWidget)
    const { requiredMetric } = selectedWidget

    if (requiredMetric && selectedWidgets.length < newSelectedWidgets.length) {
      const newMetrics = new Set(selectedMetrics)

      if (!newMetrics.has(requiredMetric)) {
        setSelectedMetrics([...newMetrics, requiredMetric])
      }
    }

    setSelectedWidgets(newSelectedWidgets)
  }

  function deduceItems (items, item) {
    const newItems = new Set(items)

    if (newItems.has(item)) {
      newItems.delete(item)
    } else {
      newItems.add(item)
    }

    return [...newItems]
  }

  function changeTimePeriod (from, to, timeRange) {
    const interval = getNewInterval(from, to)

    setSettings(state => ({
      ...state,
      timeRange,
      interval: INTERVAL_ALIAS[interval] || interval,
      from: from.toISOString(),
      to: to.toISOString()
    }))
  }

  function onSidebarItemClick (item) {
    const { type, key } = item

    if (type === Type.SIDEPANEL) {
      toggleSidepanel(key)
    } else if (type === Type.ICO_PRICE) {
      setIsICOPriceActive(!isICOPriceActive)
    } else if (type === Type.CONNECTED_WIDGET) {
      toggleSelectionWidget(item)
    } else if (type === Type.WIDGET) {
      if (key === 'holder_distribution') {
        setWidgets([
          ...widgets,
          HolderDistributionWidget.new({
            scrollIntoViewOnMount: true
          })
        ])
      }
    } else {
      toggleSelectionMetric(item)
    }
  }

  function onWidgetClick (widget) {
    if (currentPhase === Phase.MAPVIEW) {
      widget.chartRef.current.canvas.scrollIntoView({ block: 'center' })
      onOverviewClose()
      return
    }

    const newMetrics = new Set([...widget.metrics, ...selectedMetrics])

    widget.metrics = [...newMetrics]
    widget.connectedWidgets = mergeConnectedWidgetsWithSelected(
      widget.connectedWidgets,
      selectedWidgets
    )
    widget.MetricSettingMap = mergeMetricSettingMap(
      widget.MetricSettingMap,
      selectedMetricSettingsMap
    )

    rerenderWidgets()
    resetSelecion()
  }

  function onNewChartClick () {
    setWidgets([
      ...widgets,
      ChartWidget.new({
        metrics: selectedMetrics,
        MetricSettingMap: selectedMetricSettingsMap,
        connectedWidgets: mergeConnectedWidgetsWithSelected([], selectedWidgets)
      })
    ])
    resetSelecion()
  }

  function onOverviewClose () {
    setPhase(Phase.IDLE)
    resetSelecion()
  }

  function resetSelecion () {
    setSelectedWidgets([])
    setSelectedMetrics([])
    setSelectedMetricSettingsMap(new Map())
  }

  return (
    <div className={styles.wrapper}>
      <Sidebar
        slug={settings.slug}
        project={settings}
        activeMetrics={selectedMetrics}
        sidepanel={sidepanel}
        isSidebarClosed={isSidebarClosed}
        isICOPriceDisabled={isICOPriceDisabled}
        isICOPriceActive={isICOPriceActive}
        toggleMetric={onSidebarItemClick}
        setMetricSettingMap={setSelectedMetricSettingsMap}
        setIsSidebarClosed={setIsSidebarClosed}
      />
      <main className={styles.main}>
        <Main
          widgets={widgets}
          settings={settings}
          sidepanel={sidepanel}
          isICOPriceActive={isICOPriceActive}
          isOverviewOpened={isOverviewOpened}
          // fn
          setWidgets={setWidgets}
          setSettings={setSettings}
          setIsICOPriceDisabled={setIsICOPriceDisabled}
          changeTimePeriod={changeTimePeriod}
          toggleWidgetMetric={toggleWidgetMetric}
          toggleSidepanel={toggleSidepanel}
          deleteWidget={deleteWidget}
          deleteConnectedWidget={deleteConnectedWidget}
          rerenderWidgets={rerenderWidgets}
          toggleOverview={toggleOverview}
        />

        {isOverviewOpened && (
          <SelectionOverview
            widgets={widgets}
            selectedMetrics={selectedMetrics}
            selectedWidgets={selectedWidgets}
            currentPhase={currentPhase}
            toggleMetric={toggleSelectionMetric}
            toggleWidget={toggleSelectionWidget}
            resetSelecion={resetSelecion}
            onClose={onOverviewClose}
            onWidgetClick={onWidgetClick}
            onNewChartClick={onNewChartClick}
          />
        )}
      </main>
      {React.Children.map(extensions, extension =>
        React.cloneElement(extension, { widgets, settings, sidepanel })
      )}
    </div>
  )
}

export default Studio
