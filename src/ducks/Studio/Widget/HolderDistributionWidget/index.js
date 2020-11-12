import React, { useState } from 'react'
import cx from 'classnames'
import { checkIfWasNotMerged, buildMergedMetric } from './utils'
import Widget from '../Widget'
import ChartWidget, { Chart } from '../ChartWidget'
import { useWidgetProjectSettings } from '../utils'
import { usePhase, Phase } from '../../phases'
import Sidepanel, { CloseButton } from '../../Chart/Sidepanel'
import ChartActiveMetrics from '../../Chart/ActiveMetrics'
import { TOP_HOLDERS_PANE } from '../../Chart/Sidepanel/panes'
import {
  HolderDistributionMetric,
  HOLDER_DISTRIBUTION_ABSOLUTE_METRICS
} from '../../Chart/Sidepanel/HolderDistribution/metrics'
import { useChartColors } from '../../../Chart/colors'
import { usePressedModifier } from '../../../../hooks/keyboard'
import styles from './index.module.scss'

const DEFAULT_CHECKED_METRICS = new Set()

const Title = ({ activeMetrics, ...props }) => (
  <ChartActiveMetrics
    activeMetrics={activeMetrics.filter(
      ({ key, baseMetrics }) => !(HolderDistributionMetric[key] || baseMetrics)
    )}
    {...props}
  />
)

const HolderDistributionWidget = ({
  widget,
  settings,
  sidepanelHeader,
  TabMetrics,
  isWithTabs,
  ...props
}) => {
  /* const widgetSettings = useWidgetProjectSettings(widget, settings) */
  const [isOpened, setIsOpened] = useState(true)
  const MetricColor = useChartColors(widget.metrics, widget.MetricColor)
  const PressedModifier = usePressedModifier()
  const { currentPhase, setPhase } = usePhase()
  const [checkedMetrics, setSelectedMetrics] = useState(DEFAULT_CHECKED_METRICS)
  const [mergedMetrics, setMergedMetrics] = useState(widget.mergedMetrics)

  function toggleWidgetMetric (metric) {
    if (currentPhase !== Phase.IDLE) {
      return checkMetric(metric)
    }

    props.toggleWidgetMetric(widget, PressedModifier.cmdKey ? [metric] : metric)
  }

  function checkMetric (metric) {
    const newCheckedMetrics = new Set(checkedMetrics)

    if (checkedMetrics.has(metric)) {
      newCheckedMetrics.delete(metric)
    } else {
      newCheckedMetrics.add(metric)
    }

    setSelectedMetrics(newCheckedMetrics)
  }

  function toggleSidepane () {
    setIsOpened(!isOpened)
    setPhase(Phase.IDLE)
  }

  function onMergeClick () {
    setPhase(Phase.MAPVIEW)
  }

  function onMergeConfirmClick () {
    if (checkedMetrics.size > 1) {
      const metric = buildMergedMetric([...checkedMetrics])

      if (checkIfWasNotMerged(metric.key, mergedMetrics)) {
        widget.metrics = [...widget.metrics, metric]
        setMergedMetrics([...mergedMetrics, metric])
      }
    }
    setPhase(Phase.IDLE)
    setSelectedMetrics(DEFAULT_CHECKED_METRICS)
  }

  function onUnmergeClick (metric) {
    const metricFilter = m => m !== metric
    widget.metrics = widget.metrics.filter(metricFilter)
    setMergedMetrics(mergedMetrics.filter(metricFilter))
  }

  return (
    <Widget className={cx(styles.holders, isOpened && styles.holders_opened)}>
      <Chart
        {...props}
        widget={widget}
        settings={settings}
        TopLeftComponent={Title}
      />
      {isOpened ? (
        <Sidepanel
          className={styles.sidepanel}
          contentClassName={styles.sidepanel__content}
          header={sidepanelHeader || `${settings.ticker} Holders Distribution`}
          chartSidepane={TOP_HOLDERS_PANE}
          currentPhase={currentPhase}
          metrics={widget.metrics}
          mergedMetrics={mergedMetrics}
          checkedMetrics={checkedMetrics}
          MetricColor={MetricColor}
          TabMetrics={TabMetrics}
          isWithTabs={isWithTabs}
          toggleMetric={toggleWidgetMetric}
          toggleChartSidepane={toggleSidepane}
          onMergeClick={onMergeClick}
          onMergeConfirmClick={onMergeConfirmClick}
          onUnmergeClick={onUnmergeClick}
        />
      ) : (
        <CloseButton onClick={toggleSidepane} className={styles.toggle} />
      )}
    </Widget>
  )
}

export const holderDistributionBuilder = (widget, metrics) => props =>
  ChartWidget.new(
    {
      mergedMetrics: [],
      metrics,
      ...props
    },
    widget
  )

HolderDistributionWidget.new = holderDistributionBuilder(
  HolderDistributionWidget,
  HOLDER_DISTRIBUTION_ABSOLUTE_METRICS
)

export default HolderDistributionWidget
