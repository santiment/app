import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import MetricExplanation from '../../SANCharts/MetricExplanation'
import MetricIcon from '../../SANCharts/MetricIcon'
import { Events } from '../../SANCharts/data'
import { getSyncedColors } from '../../SANCharts/Chart/Synchronizer'
import styles from './ActiveMetrics.module.scss'

const { trendPositionHistory } = Events

const MetricButton = ({
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
      <Button border className={styles.btn}>
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
  activeMetrics,
  activeEvents,
  loadings,
  toggleMetric,
  eventLoadings,
  isMultiChartsActive
}) => {
  const actives = activeMetrics.concat(activeEvents)
  const colors = getSyncedColors(actives)
  const isMoreThanOneMetric = activeMetrics.length > 1 || isMultiChartsActive

  return (
    <>
      {activeMetrics.map((metric, i) => (
        <MetricButton
          key={metric.key}
          metric={metric}
          colors={colors}
          isLoading={loadings.includes(metric)}
          isRemovable={isMoreThanOneMetric}
          toggleMetric={toggleMetric}
        />
      ))}
      {activeEvents.includes(trendPositionHistory) && (
        <MetricButton
          isRemovable
          metric={trendPositionHistory}
          colors={colors}
          toggleMetric={toggleMetric}
          isLoading={eventLoadings.length}
        />
      )}
    </>
  )
}
