import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import MetricExplanation from '../../SANCharts/MetricExplanation'
import MetricIcon from '../../SANCharts/MetricIcon'
import { Event } from '../../dataHub/events'
import styles from './ActiveMetrics.module.scss'

const { trendPositionHistory } = Event

const MetricButton = ({
  className,
  metric,
  colors,
  isLoading,
  isRemovable,
  toggleMetric,
  withDescription,
  ...rest
}) => {
  const { key, dataKey = key, node, label, comparedTicker } = metric

  const Wrapper = ({ children }) =>
    withDescription ? (
      <MetricExplanation
        metric={metric}
        withChildren
        closeTimeout={22}
        offsetX={8}
      >
        {children}
      </MetricExplanation>
    ) : (
      <>{children}</>
    )

  return (
    <Wrapper>
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
        {isRemovable && (
          <Icon
            type='close-small'
            className={styles.icon}
            onClick={() => toggleMetric(metric)}
          />
        )}
      </Button>
    </Wrapper>
  )
}

export default ({
  className,
  MetricColor,
  activeMetrics,
  activeEvents = [],
  loadings,
  toggleMetric,
  eventLoadings,
  isMultiChartsActive,
  onMetricHover,
  onMetricHoverEnd
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
          isRemovable={isMoreThanOneMetric && toggleMetric}
          toggleMetric={toggleMetric}
          onMouseEnter={onMetricHover && (() => onMetricHover(metric))}
          onMouseLeave={onMetricHoverEnd && (() => onMetricHoverEnd(metric))}
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
