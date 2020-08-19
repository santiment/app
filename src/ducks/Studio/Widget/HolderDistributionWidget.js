import React, { useState } from 'react'
import cx from 'classnames'
import Widget from './Widget'
import ChartWidget, { Chart } from './ChartWidget'
import Sidepanel, { CloseButton } from '../Chart/Sidepanel'
import { TOP_HOLDERS_PANE } from '../Chart/Sidepanel/panes'
import { TOP_HOLDER_METRICS } from '../Chart/Sidepanel/HolderDistribution/metrics'
import { useChartColors } from '../../Chart/colors'
import { usePressedModifier } from '../../../hooks/keyboard'
import styles from './HolderDistributionWidget.module.scss'

const Title = ({ settings }) => (
  <div className={styles.title}>{settings.ticker} Holder Distribution</div>
)

const HolderDistributionWidget = ({ widget, ...props }) => {
  const [isOpened, setIsOpened] = useState(true)
  const MetricColor = useChartColors(widget.metrics, widget.MetricColor)
  const PressedModifier = usePressedModifier()

  function toggleWidgetMetric (metric) {
    props.toggleWidgetMetric(widget, PressedModifier.cmdKey ? [metric] : metric)
  }

  function toggleSidepane () {
    setIsOpened(!isOpened)
  }

  return (
    <Widget className={cx(styles.holders, isOpened && styles.holders_opened)}>
      <Chart {...props} widget={widget} TopLeftComponent={Title} />
      {isOpened ? (
        <Sidepanel
          chartSidepane={TOP_HOLDERS_PANE}
          metrics={widget.metrics}
          MetricColor={MetricColor}
          toggleMetric={toggleWidgetMetric}
          toggleChartSidepane={toggleSidepane}
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
