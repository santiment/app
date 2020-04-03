import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import MetricIcon from '../../../../SANCharts/MetricIcon'
import { TopHolderMetrics } from './metrics'
import styles from './index.module.scss'

const topHolderMetrics = Object.values(TopHolderMetrics)

const TopHolders = ({ metrics: activeMetrics, MetricColor, toggleMetric }) => {
  return topHolderMetrics.map(metric => {
    const { key, label } = metric
    return (
      <Button
        key={key}
        fluid
        className={cx(
          styles.btn,
          activeMetrics.includes(metric) && styles.active
        )}
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

TopHolders.Title = ({ ticker }) => `Top ${ticker} Holders`

export default TopHolders
