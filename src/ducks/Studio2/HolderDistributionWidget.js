import React, { useState } from 'react'
import cx from 'classnames'
import { Widget, Chart } from './ChartWidget'
import Sidepane from '../Studio/Chart/Sidepane'
import styles from './index.module.scss'

const HolderDistributionWidget = ({ widget, ...props }) => {
  const [isOpened, setIsOpened] = useState(true)

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
          MetricColor={{}}
          setMetrics={() => {}}
          toggleChartSidepane={closeSidepane}
        />
      )}
    </Widget>
  )
}

export default HolderDistributionWidget
