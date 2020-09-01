import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import MetricErrorExplanation from './MetricErrorExplanation/MetricErrorExplanation'
import MetricIcon from '../../SANCharts/MetricIcon'
import { getMetricLabel } from '../../dataHub/metrics/labels'
import styles from './ActiveMetrics.module.scss'

const API_TEST_URL =
  'https://api-tests-json.s3.eu-central-1.amazonaws.com/latest_report_stable.json'

const Customization = ({ metric, isActive, onClick }) => (
  <div className={cx(styles.settings, isActive && styles.settings_active)}>
    <div className={styles.settings__visible}>
      <div className={styles.settings__btn} onClick={() => onClick(metric)}>
        <Icon type='settings' />
      </div>
    </div>
  </div>
)

const MetricButton = ({
  className,
  metric,
  colors,
  error,
  metricSettings,
  isWithIcon,
  isLoading,
  isRemovable,
  isWithSettings,
  toggleMetric,
  errorsForMetrics,
  project,
  onSettingsClick,
  ...rest
}) => {
  const { key, dataKey = key, node, comparedTicker } = metric
  const label = getMetricLabel(metric)

  return (
    <Button
      {...rest}
      border
      className={cx(
        styles.btn,
        error && styles.btn_error,
        isWithSettings && styles.btn_settings,
        className
      )}
      aria-invalid={error}
    >
      {isWithIcon ? (
        isLoading ? (
          <div className={styles.loader} />
        ) : (
          <MetricIcon
            node={node}
            color={colors[dataKey]}
            className={styles.label}
          />
        )
      ) : null}
      {label}
      {comparedTicker && ` (${comparedTicker})`}
      <MetricErrorExplanation
        errorsForMetrics={errorsForMetrics}
        metric={metric}
        project={project}
      />

      {isRemovable && (
        <Icon
          type='close-small'
          className={styles.icon}
          onClick={() => toggleMetric(metric)}
        />
      )}

      {isWithSettings && (
        <Customization
          metric={metric}
          onClick={onSettingsClick}
          isActive={metricSettings === metric}
        />
      )}
    </Button>
  )
}

export default ({
  className,
  MetricColor,
  activeMetrics,
  activeEvents = [],
  metricSettings,
  loadings,
  toggleMetric,
  eventLoadings,
  ErrorMsg = {},
  isSingleWidget,
  isWithIcon = true,
  isWithSettings = false,
  onMetricHover,
  onMetricHoverEnd,
  onSettingsClick,
  project
}) => {
  const isMoreThanOneMetric = activeMetrics.length > 1 || !isSingleWidget
  const [errorsForMetrics, setErrorsForMetrics] = useState()

  useEffect(() => {
    let mounted = true

    fetch(API_TEST_URL)
      .then(response => {
        if (!response.ok) {
          return {}
        }
        return response.json()
      })
      .then(data => mounted && setErrorsForMetrics(data))

    return () => {
      mounted = false
    }
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
      metricSettings={metricSettings}
      isWithIcon={isWithIcon}
      isLoading={loadings.includes(metric)}
      isRemovable={isMoreThanOneMetric && toggleMetric}
      isWithSettings={isWithSettings}
      toggleMetric={toggleMetric}
      onMouseEnter={onMetricHover && (e => onMetricHover(metric, e))}
      onMouseLeave={onMetricHoverEnd && (() => onMetricHoverEnd(metric))}
      onSettingsClick={onSettingsClick}
      errorsForMetrics={errors}
      project={project}
    />
  ))
}
