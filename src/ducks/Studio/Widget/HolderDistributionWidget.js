import React, { useState } from 'react'
import cx from 'classnames'
import Widget from './Widget'
import ChartWidget, { Chart } from './ChartWidget'
import { usePhase, Phase } from '../phases'
import Sidepanel, { CloseButton } from '../Chart/Sidepanel'
import { TOP_HOLDERS_PANE } from '../Chart/Sidepanel/panes'
import { TOP_HOLDER_METRICS } from '../Chart/Sidepanel/HolderDistribution/metrics'
import { useChartColors } from '../../Chart/colors'
import { usePressedModifier } from '../../../hooks/keyboard'
import styles from './HolderDistributionWidget.module.scss'
import { fetch, MERGED_DIVIDER } from './test'
import { updateTooltipSetting } from '../../dataHub/tooltipSettings'

const DEFAULT_CHECKED_METRICS = new Set()

const Title = ({ settings }) => (
  <div className={styles.title}>{settings.ticker} Holder Distribution</div>
)

const HolderDistributionWidget = ({ widget, ...props }) => {
  const [isOpened, setIsOpened] = useState(true)
  const MetricColor = useChartColors(widget.metrics, widget.MetricColor)
  const PressedModifier = usePressedModifier()
  const { currentPhase, setPhase } = usePhase()
  const [checkedMetrics, setSelectedMetrics] = useState(DEFAULT_CHECKED_METRICS)
  const [mergedMetrics, setMergedMetrics] = useState([])

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
      const metric = {
        fetch,
        key: [...checkedMetrics]
          .map(({ key }) => key)
          .sort()
          .join(MERGED_DIVIDER),
        label:
          [...checkedMetrics]
            .map(({ label }) => label.replace(' coins', ''))
            .join(', ') + ' coins',
        mergedMetrics: [...checkedMetrics],
        node: 'line'
      }

      updateTooltipSetting(metric)
      widget.metrics = [...widget.metrics, metric]
      setMergedMetrics([...mergedMetrics, metric])
    }
    setPhase(Phase.IDLE)
    setSelectedMetrics(DEFAULT_CHECKED_METRICS)
  }

  return (
    <Widget className={cx(styles.holders, isOpened && styles.holders_opened)}>
      <Chart {...props} widget={widget} TopLeftComponent={Title} />
      {isOpened ? (
        <Sidepanel
          className={styles.sidepanel}
          contentClassName={styles.sidepanel__content}
          chartSidepane={TOP_HOLDERS_PANE}
          currentPhase={currentPhase}
          metrics={widget.metrics}
          mergedMetrics={mergedMetrics}
          checkedMetrics={checkedMetrics}
          MetricColor={MetricColor}
          toggleMetric={toggleWidgetMetric}
          toggleChartSidepane={toggleSidepane}
          onMergeClick={onMergeClick}
          onMergeConfirmClick={onMergeConfirmClick}
        />
      ) : (
        <CloseButton onClick={toggleSidepane} className={styles.toggle} />
      )}
    </Widget>
  )
}

const newHolderDistributionWidget = props =>
  ChartWidget.new(
    {
      metrics: TOP_HOLDER_METRICS,
      ...props
    },
    HolderDistributionWidget
  )

HolderDistributionWidget.new = newHolderDistributionWidget

export default HolderDistributionWidget
