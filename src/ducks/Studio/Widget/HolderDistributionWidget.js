import React, { useState } from 'react'
import cx from 'classnames'
import Widget from './Widget'
import { Chart } from './ChartWidget'
import { newWidget } from './utils'
import Sidepanel, { CloseButton } from '../Chart/Sidepanel'
import { TOP_HOLDERS_PANE } from '../Chart/Sidepanel/panes'
import { TOP_HOLDER_METRICS } from '../Chart/Sidepanel/HolderDistribution/metrics'
import { useChartColors } from '../../Chart/colors'
import styles from './HolderDistributionWidget.module.scss'

const Title = ({ settings }) => (
  <div className={styles.title}>{settings.ticker} Holder Distribution</div>
)

const HolderDistributionWidget = ({ widget, ...props }) => {
  const [isOpened, setIsOpened] = useState(true)
  const MetricColor = useChartColors(widget.metrics)

  function toggleWidgetMetric(metric) {
    props.toggleWidgetMetric(widget, metric)
  }

  function toggleSidepane() {
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

const newHolderDistributionWidget = (props) =>
  newWidget(HolderDistributionWidget, {
    metrics: TOP_HOLDER_METRICS,
    comparables: [],
    MetricSettingMap: new Map(),
    ...props,
  })

HolderDistributionWidget.new = newHolderDistributionWidget

export default HolderDistributionWidget
