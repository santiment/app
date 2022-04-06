import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import { newProjectMetric } from './metrics'
import { deduceItems, mergeMetricSettingMap, checkIsMetricWidget } from './utils'
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
import { loadIsSidebarLocked } from './Sidebar/utils'
import HolderDistributionCombinedBalanceWidget from './Widget/HolderDistributionWidget/CombinedBalance'
import * as Type from './Sidebar/Button/types'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import { Metric } from '../dataHub/metrics'
import { NEW_METRIC_KEY_SET, seeMetric } from '../dataHub/metrics/news'
import { usePressedModifier } from '../../hooks/keyboard'
import {
  HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE,
  HOLDER_DISTRIBUTION_NODE,
  HOLDER_LABELED_DISTRIBUTION_NODE,
} from './Sidebar/nodes'
import {
  HolderDistributionCombinedBalanceAbsoluteMetric,
  HolderDistributionMetric,
  HoldersLabeledDistributionMetric,
} from './Chart/Sidepanel/HolderDistribution/metrics'
import { FeesDistributionMetric, TopHoldersTableMetric } from '../dataHub/submetrics'
import FeesDistribution from './FeesDistribution/FeesDistribution'
import HoldersDistributionTable from './Widget/HoldersDistributionTable/HoldersDistributionTable'
import HolderDistributionLabeledWidget from './Widget/HolderDistributionWidget/HoldersDistributionLabeled'
import styles from './index.module.scss'

export const Studio = ({
  defaultWidgets,
  defaultSidepanel,
  defaultSettings = DEFAULT_SETTINGS,
  Extensions,
  ...props
}) => {
  const [widgets, setWidgets] = useState(defaultWidgets)
  const [settings, setSettings] = useState(defaultSettings)
  const [sidepanel, setSidepanel] = useState(defaultSidepanel)
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [selectedWidgets, setSelectedWidgets] = useState([])
  const [selectedMetricSettingsMap, setSelectedMetricSettingsMap] = useState(new Map())
  const [isICOPriceDisabled, setIsICOPriceDisabled] = useState(true)
  const [isICOPriceActive, setIsICOPriceActive] = useState(false)
  const [isSidebarPeeked, setIsSidebarPeeked] = useState(false)
  const [isSidebarLocked, setIsSidebarLocked] = useState(loadIsSidebarLocked)

  const { currentPhase, previousPhase, setPhase } = usePhase(Phase.IDLE)
  const PressedModifier = usePressedModifier()
  const isOverviewOpened = currentPhase.startsWith(Phase.MAPVIEW)

  useKeyboardCmdShortcut('m', toggleOverview)
  useKeyboardCmdShortcut('\\', () => setIsSidebarLocked(!isSidebarLocked))

  useEffect(() => {
    if (selectedMetrics.length) {
      setPhase(Phase.MAPVIEW_SELECTION)
    } else if (previousPhase === Phase.MAPVIEW_SELECTION) {
      setPhase(Phase.MAPVIEW)
    }
  }, [selectedMetrics.length])

  function toggleOverview() {
    if (isOverviewOpened) {
      onOverviewClose()
    } else {
      setPhase(Phase.MAPVIEW)
    }
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

  function deleteConnectedWidget(connectedWidget, parentWidget) {
    parentWidget.connectedWidgets = parentWidget.connectedWidgets.filter(
      (w) => w !== connectedWidget,
    )
    rerenderWidgets()
  }

  function toggleWidgetMetric(widget, metric) {
    const isArray = Array.isArray(metric)
    const metrics = isArray ? metric : deduceItems(widget.metrics, metric)
    const { axesMetricSet, disabledAxesMetricSet, MetricSettingMap } = widget

    if (isArray) {
      axesMetricSet.clear()
      widget.axesMetricSet = new Set(metric)
      disabledAxesMetricSet.clear()
    }

    if (metrics.length < widget.metrics.length) {
      MetricSettingMap.delete(metric) // TODO: delete color [@vanguard | Nov  3, 2020]
      axesMetricSet.delete(metric)
      disabledAxesMetricSet.delete(metric)
    }

    if (
      widget.Widget !== HolderDistributionWidget &&
      widget.Widget !== HolderDistributionCombinedBalanceWidget &&
      widget.Widget !== HolderDistributionLabeledWidget &&
      metrics.length === 0
    ) {
      deleteWidget(widget)
    } else {
      widget.metrics = metrics
      rerenderWidgets()
    }
  }

  function toggleSelectionMetric(metric, project) {
    const deducedMetric = deduceItems(
      selectedMetrics,
      !project || metric.base
        ? metric
        : project.slug === settings.slug
        ? metric
        : newProjectMetric(project, metric),
    )
    setSelectedMetrics(deducedMetric)
    return deducedMetric
  }

  function toggleSelectionWidget(selectedWidget) {
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

  function onSidebarItemClick(item, project) {
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
        scrollIntoViewOnMount: true,
      }
      if (
        key === HOLDER_DISTRIBUTION_NODE.key ||
        key === HolderDistributionMetric.holders_distribution_1_to_10.key
      ) {
        setWidgets([...widgets, HolderDistributionWidget.new(scrollIntoView)])
      } else if (
        key === HOLDER_LABELED_DISTRIBUTION_NODE.key ||
        key === HoldersLabeledDistributionMetric.holders_labeled_distribution_1_to_10.key
      ) {
        setWidgets([...widgets, HolderDistributionLabeledWidget.new(scrollIntoView)])
      } else if (
        key === HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE.key ||
        key ===
          HolderDistributionCombinedBalanceAbsoluteMetric
            .holders_distribution_combined_balance_1_to_10.key
      ) {
        setWidgets([...widgets, HolderDistributionCombinedBalanceWidget.new(scrollIntoView)])
      } else if (item === Metric.price_daa_divergence) {
        setWidgets([...widgets, PriceDAADivergenceWidget.new(scrollIntoView)])
      } else if (item === Metric.adjusted_price_daa_divergence) {
        setWidgets([...widgets, AdjustedPriceDAADivergenceWidget.new(scrollIntoView)])
      } else if (item === FeesDistributionMetric) {
        setWidgets([...widgets, FeesDistribution.new(scrollIntoView)])
      } else if (item === TopHoldersTableMetric) {
        setWidgets([...widgets, HoldersDistributionTable.new(scrollIntoView)])
      }
    } else {
      appliedMetrics = toggleSelectionMetric(item, project)
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

  function onWidgetClick(
    widget,
    appliedMetrics = selectedMetrics,
    appliedWidgets = selectedWidgets,
  ) {
    if (currentPhase === Phase.MAPVIEW) {
      if (widget.chartRef) {
        widget.chartRef.current.canvas.scrollIntoView({ block: 'center' })
        onOverviewClose()
      }
      return
    }

    const newMetrics = new Set([...widget.metrics, ...appliedMetrics])

    if (newMetrics.has(Metric.price_usd)) {
      newMetrics.delete(Metric.price_usd)
      widget.metrics = [Metric.price_usd, ...newMetrics]
    } else {
      widget.metrics = [...newMetrics]
    }

    widget.connectedWidgets = mergeConnectedWidgetsWithSelected(
      widget.connectedWidgets,
      appliedWidgets,
    )
    widget.MetricSettingMap = mergeMetricSettingMap(
      widget.MetricSettingMap,
      selectedMetricSettingsMap,
    )

    rerenderWidgets()
    resetSelecion()
  }

  function onNewChartClick(appliedMetrics = selectedMetrics, scrollIntoViewOnMount) {
    const metricSet = new Set(appliedMetrics)
    let metrics = appliedMetrics

    if (metricSet.has(Metric.price_usd)) {
      metricSet.delete(Metric.price_usd)
      metrics = [Metric.price_usd, ...metricSet]
    }

    setWidgets([
      ...widgets,
      ChartWidget.new({
        scrollIntoViewOnMount,
        metrics,
        MetricSettingMap: selectedMetricSettingsMap,
        connectedWidgets: mergeConnectedWidgetsWithSelected([], selectedWidgets),
      }),
    ])
    resetSelecion()
  }

  function onOverviewClose() {
    setPhase(Phase.IDLE)
    resetSelecion()
  }

  function resetSelecion() {
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
        isOverviewOpened={isOverviewOpened}
        isPeeked={isSidebarPeeked}
        isLocked={isSidebarLocked}
        isICOPriceDisabled={isICOPriceDisabled}
        isICOPriceActive={isICOPriceActive}
        toggleMetric={onSidebarItemClick}
        metricSettingsMap={selectedMetricSettingsMap}
        setMetricSettingMap={setSelectedMetricSettingsMap}
        setIsPeeked={setIsSidebarPeeked}
        setIsLocked={setIsSidebarLocked}
      />
      <main className={styles.main}>
        <Main
          widgets={widgets}
          settings={settings}
          sidepanel={sidepanel}
          shortUrlHashState={props.shortUrlHashState}
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
            setWidgets={setWidgets}
          />
        )}
      </main>
      <Extensions
        {...props}
        widgets={widgets}
        settings={settings}
        sidepanel={sidepanel}
        setSettings={setSettings}
        setWidgets={setWidgets}
      />
    </div>
  )
}

export default withInsightsProvider(Studio)
