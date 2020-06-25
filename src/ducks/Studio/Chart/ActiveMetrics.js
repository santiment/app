import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import MetricExplanation from '../../SANCharts/MetricExplanation'
import MetricIcon from '../../SANCharts/MetricIcon'
import styles from './ActiveMetrics.module.scss'

const MetricButton = ({
  className,
  metric,
  colors,
  error,
  isLoading,
  isRemovable,
  toggleMetric,
  withDescription,
  errorsForMetrics,
  project,
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

const API_TEST_URL =
  'https://api-tests-json.s3.eu-central-1.amazonaws.com/latest_report.json'

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
  onMetricHoverEnd,
  project
}) => {
  const isMoreThanOneMetric = activeMetrics.length > 1 || !isSingleWidget
  const [errorsForMetrics, setErrorsForMetrics] = useState()

  useEffect(() => {
    fetch(API_TEST_URL)
      .then(response => {
        if (!response.ok) {
          return {}
        }
        return response.json()
      })
      .then(data => {
        setErrorsForMetrics(data)
      })
  }, [])

  const errors =
    project && errorsForMetrics ? errorsForMetrics[project.slug] : {}

  return activeMetrics.map((metric, i) => (
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
      errorsForMetrics={errors}
      project={project}
    />
  ))
}
