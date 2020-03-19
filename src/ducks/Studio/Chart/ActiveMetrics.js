import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import MetricExplanation from '../../SANCharts/MetricExplanation'
import MetricIcon from '../../SANCharts/MetricIcon'
import { Events } from '../../SANCharts/metrics/data'
import styles from './ActiveMetrics.module.scss'

const { trendPositionHistory } = Events

const MetricButton = ({
  className,
  metric,
  colors,
  isLoading,
  isRemovable,
  toggleMetric
}) => {
  const {
    key,
    dataKey = key,
    node,
    label,
    description,
    comparedTicker
  } = metric

  return (
    <MetricExplanation
      label={label}
      description={description}
      withChildren
      closeTimeout={22}
      offsetX={8}
    >
      <Button border className={cx(styles.btn, className)}>
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
        {isRemovable && (
          <Icon
            type='close-small'
            className={styles.icon}
            onClick={() => toggleMetric(metric)}
          />
        )}
      </Button>
    </MetricExplanation>
  )
}

export default ({
  MetricColor,
  activeMetrics,
  activeEvents,
  loadings,
  toggleMetric,
  eventLoadings,
  isMultiChartsActive,
  className
}) => {
  const isMoreThanOneMetric = activeMetrics.length > 1 || isMultiChartsActive

  return (
    <>
      {activeMetrics.map((metric, i) => (
        <MetricButton
          key={metric.key}
          className={className}
          metric={metric}
          colors={MetricColor}
          isLoading={loadings.includes(metric)}
          isRemovable={isMoreThanOneMetric}
          toggleMetric={toggleMetric}
        />
      ))}
      {activeEvents.includes(trendPositionHistory) && (
        <MetricButton
          isRemovable
          className={className}
          metric={trendPositionHistory}
          colors={MetricColor}
          toggleMetric={toggleMetric}
          isLoading={eventLoadings.length}
        />
      )}
    </>
  )
}
