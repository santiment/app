import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import { mergeMetricSettingMap, checkIsMetricWidget } from './utils'
import { DEFAULT_SETTINGS } from './defaults'
import { Phase, usePhase } from './phases'
import { useKeyboardCmdShortcut } from './hooks'
import { withInsightsProvider } from './insights/context'
import ChartWidget from './Widget/ChartWidget'
import HolderDistributionWidget from './Widget/HolderDistributionWidget'
import PriceDAADivergenceWidget from './Widget/PriceDAADivergenceWidget'
import AdjustedPriceDAADivergenceWidget from './Widget/PriceDAADivergenceWidget/Adjusted'
import { mergeConnectedWidgetsWithSelected } from './Widget/helpers'
import SelectionOverview from './Overview/SelectionOverview'
import HolderDistributionCombinedBalanceWidget from './Widget/HolderDistributionWidget/CombinedBalance'
import * as Type from './Sidebar/Button/types'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import { Metric } from '../dataHub/metrics'
import { NEW_METRIC_KEY_SET, seeMetric } from '../dataHub/metrics/news'
import { usePressedModifier } from '../../hooks/keyboard'
import styles from './index.module.scss'

export const Studio = ({
  defaultWidgets,
  defaultSidepanel,
  defaultSettings = DEFAULT_SETTINGS,
  Extensions
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
  const PressedModifier = usePressedModifier()
  const isOverviewOpened = currentPhase.startsWith(Phase.MAPVIEW)

  useKeyboardCmdShortcut('m', toggleOverview)
  useKeyboardCmdShortcut('\\', toggleSidebar)

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

  function toggleSidebar () {
    setIsSidebarClosed(!isSidebarClosed)
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
    const metrics = Array.isArray(metric)
      ? metric
      : deduceItems(widget.metrics, metric)

    if (
      widget.Widget !== HolderDistributionWidget &&
      widget.Widget !== HolderDistributionCombinedBalanceWidget &&
      metrics.length === 0 &&
      widget.comparables.length === 0
    ) {
      deleteWidget(widget)
    } else {
      widget.metrics = metrics
      rerenderWidgets()
    }
  }

  function toggleSelectionMetric (metric) {
    const deducedMetric = deduceItems(selectedMetrics, metric)
    setSelectedMetrics(deducedMetric)
    return deducedMetric
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
    return newSelectedWidgets
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
    let appliedMetrics
    let appliedWidgets

    const isWidget = checkIsMetricWidget(item)

    if (NEW_METRIC_KEY_SET.has(key)) {
      seeMetric(item)
    }

    if (type === Type.SIDEPANEL) {
      toggleSidepanel(key)
    } else if (type === Type.ICO_PRICE) {
      setIsICOPriceActive(!isICOPriceActive)
    } else if (type === Type.CONNECTED_WIDGET) {
      appliedWidgets = toggleSelectionWidget(item)
    } else if (isWidget || type === Type.WIDGET) {
      const scrollIntoView = {
        scrollIntoViewOnMount: true
      }
      if (key === 'holder_distribution') {
        setWidgets([...widgets, HolderDistributionWidget.new(scrollIntoView)])
      } else if (key === 'holder_distribution_combined_balance') {
        setWidgets([
          ...widgets,
          HolderDistributionCombinedBalanceWidget.new(scrollIntoView)
        ])
      } else if (item === Metric.price_daa_divergence) {
        setWidgets([...widgets, PriceDAADivergenceWidget.new(scrollIntoView)])
      } else if (item === Metric.adjusted_price_daa_divergence) {
        setWidgets([
          ...widgets,
          AdjustedPriceDAADivergenceWidget.new(scrollIntoView)
        ])
      }
    } else {
      appliedMetrics = toggleSelectionMetric(item)
    }

    if (currentPhase === Phase.IDLE && PressedModifier.cmdKey) {
      if (PressedModifier.shiftKey) {
        if (appliedMetrics) {
          onNewChartClick(appliedMetrics, true)
        }
      } else {
        onWidgetClick(widgets[0], appliedMetrics, appliedWidgets)
      }
    }
  }

  function onWidgetClick (
    widget,
    appliedMetrics = selectedMetrics,
    appliedWidgets = selectedWidgets
  ) {
    if (currentPhase === Phase.MAPVIEW) {
      if (widget.chartRef) {
        widget.chartRef.current.canvas.scrollIntoView({ block: 'center' })
        onOverviewClose()
      }
      return
    }

    const newMetrics = new Set([...widget.metrics, ...appliedMetrics])

    widget.metrics = [...newMetrics]
    widget.connectedWidgets = mergeConnectedWidgetsWithSelected(
      widget.connectedWidgets,
      appliedWidgets
    )
    widget.MetricSettingMap = mergeMetricSettingMap(
      widget.MetricSettingMap,
      selectedMetricSettingsMap
    )

    rerenderWidgets()
    resetSelecion()
  }

  function onNewChartClick (
    appliedMetrics = selectedMetrics,
    scrollIntoViewOnMount
  ) {
    setWidgets([
      ...widgets,
      ChartWidget.new({
        scrollIntoViewOnMount,
        metrics: appliedMetrics,
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
        settings={settings}
        activeMetrics={selectedMetrics}
        sidepanel={sidepanel}
        widgets={widgets}
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
      <Extensions
        widgets={widgets}
        settings={settings}
        sidepanel={sidepanel}
        setSettings={setSettings}
      />
    </div>
  )
}

export default withInsightsProvider(Studio)
