import React from 'react'

import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import { TOP_HOLDER_METRICS } from './metrics'
import MetricIcon from '../../../../SANCharts/MetricIcon'
import styles from './index.module.scss'

const TopHolders = ({ metrics, MetricColor, toggleMetric }) => {
  return TOP_HOLDER_METRICS.map(metric => {
    const { key, label } = metric
    return (
      <Button
        key={key}
        fluid
        className={cx(styles.btn, metrics.includes(metric) && styles.active)}
        onClick={() => toggleMetric(metric)}
      >
        <MetricIcon
          node='line'
          color={MetricColor[key]}
          className={styles.icon}
        />
        {label}
      </Button>
    )
  })
}

export default TopHolders
