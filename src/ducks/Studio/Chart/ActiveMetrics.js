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
  error,
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
      <Button
        {...rest}
        border
        className={cx(styles.btn, error && styles.btn_error, className)}
        aria-invalid={error}
      >
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
  ErrorMsg = {},
  isSingleWidget,
  onMetricHover,
  onMetricHoverEnd
}) => {
  const isMoreThanOneMetric = activeMetrics.length > 1 || !isSingleWidget

  return (
    <>
      {activeMetrics.map((metric, i) => (
        <MetricButton
          key={metric.key}
          className={className}
          metric={metric}
          colors={MetricColor}
          error={ErrorMsg[metric.key]}
          isLoading={loadings.includes(metric)}
          isRemovable={isMoreThanOneMetric && toggleMetric}
          toggleMetric={toggleMetric}
          onMouseEnter={onMetricHover && (e => onMetricHover(metric, e))}
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
