import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import MetricIcon from '../../SANCharts/MetricIcon'
import styles from './ActiveMetrics.module.scss'

const MetricButton = ({
  className,
  metric,
  colors,
  isLoading,
  isRemovable,
  ...rest
}) => {
  const { key, dataKey = key, node, label, comparedTicker } = metric

  return (
    <Button {...rest} border className={cx(styles.btn, className)}>
      {isLoading ? (
        <div className={styles.loader} />
      ) : (
        <MetricIcon
          node={node}
          color={colors[dataKey]}
          className={styles.label}
        />
      )}
      {label}
      {comparedTicker && ` (${comparedTicker})`}
    </Button>
  )
}

export default ({
  className,
  MetricColor,
  activeMetrics,
  loadings,
  onMetricHover,
  onMetricHoverEnd
}) => (
  <>
    {activeMetrics.map((metric, i) => (
      <MetricButton
        key={metric.key}
        className={className}
        metric={metric}
        colors={MetricColor}
        isLoading={loadings.includes(metric)}
        onMouseEnter={onMetricHover && (() => onMetricHover(metric))}
        onMouseLeave={onMetricHoverEnd && (() => onMetricHoverEnd(metric))}
      />
    ))}
  </>
)
