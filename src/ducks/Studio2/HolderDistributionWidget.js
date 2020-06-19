import React, { useState } from 'react'
import cx from 'classnames'
import { Widget, Chart } from './ChartWidget'
import Sidepane from '../Studio/Chart/Sidepane'
import { useChartColors } from '../Chart/colors'
import styles from './index.module.scss'

const HolderDistributionWidget = ({ widget, ...props }) => {
  const [isOpened, setIsOpened] = useState(true)
  const MetricColor = useChartColors(widget.metrics)

  function toggleWidgetMetric(metric) {
    props.toggleWidgetMetric(widget, metric)
  }

  function closeSidepane() {
    setIsOpened(false)
  }

  return (
    <Widget className={cx(isOpened && styles.holders)}>
      <Chart {...props} widget={widget} />
      {isOpened && (
        <Sidepane
          chartSidepane='TOP_HOLDERS_PANE'
          metrics={widget.metrics}
          MetricColor={MetricColor}
          setMetrics={() => {}}
          toggleMetric={toggleWidgetMetric}
          toggleChartSidepane={closeSidepane}
        />
      )}
    </Widget>
  )
}

export default HolderDistributionWidget
