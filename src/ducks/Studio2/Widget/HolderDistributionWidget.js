import React, { useState } from 'react'
import cx from 'classnames'
import Widget from './Widget'
import { newWidget } from './utils'
import { Chart } from './ChartWidget'
import { useChartColors } from '../../Chart/colors'
import Sidepane, { CloseButton } from '../../Studio/Chart/Sidepane'
import { TOP_HOLDERS_PANE } from '../../Studio/Chart/Sidepane/panes'
import { TOP_HOLDER_METRICS } from '../../Studio/Chart/Sidepane/HolderDistribution/metrics'
import styles from '../index.module.scss'

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
        <Sidepane
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

export const newHolderDistributionWidget = (props) =>
  newWidget(HolderDistributionWidget, {
    metrics: TOP_HOLDER_METRICS,
    comparables: [],
    MetricSettingMap: new Map(),
    ...props,
  })

export default HolderDistributionWidget
