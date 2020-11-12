import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import MetricLock from './MetircLock'
import MetricErrorExplanation from './MetricErrorExplanation/MetricErrorExplanation'
import MetricIcon from '../../SANCharts/MetricIcon'
import { getMetricLabel } from '../../dataHub/metrics/labels'
import { isStage } from '../../../utils/utils'
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip'
import styles from './ActiveMetrics.module.scss'

const API_TEST_URL = isStage
  ? 'https://apitestsweb-stage.santiment.net/gql_test_suite/latest.json'
  : 'https://apitestsweb-production.santiment.net/gql_test_suite/latest.json'

const Actions = ({ children, isActive }) => (
  <div
    className={cx(styles.settings, isActive && styles.settings_active)}
    style={{
      '--items': children.length
    }}
  >
    <div className={styles.settings__visible}>{children}</div>
  </div>
)

const Customization = ({ metric, onClick }) => (
  <ExplanationTooltip text='Metric settings'>
    <div className={styles.settings__btn} onClick={() => onClick(metric)}>
      <Icon type='settings' />
    </div>
  </ExplanationTooltip>
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
  settings,
  onSettingsClick,
  onLockClick,
  ...rest
}) => {
  const { key, dataKey = key, node } = metric
  const label = getMetricLabel(metric, settings)

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
      <MetricErrorExplanation
        errorsForMetrics={errorsForMetrics}
        metric={metric}
        settings={settings}
      />

      {isRemovable && (
        <Icon
          type='close-small'
          className={styles.icon}
          onClick={() => toggleMetric(metric)}
        />
      )}

      {isWithSettings && (
        <Actions isActive={metricSettings === metric}>
          <Customization metric={metric} onClick={onSettingsClick} />
          <MetricLock metric={metric} onClick={onLockClick} />
        </Actions>
      )}
    </Button>
  )
}

export default ({
  className,
  MetricColor,
  activeMetrics,
  metricSettings,
  loadings,
  toggleMetric,
  ErrorMsg = {},
  isSingleWidget,
  isWithIcon = true,
  isWithSettings = false,
  onLockClick,
  onMetricHover,
  onMetricHoverEnd,
  onSettingsClick,
  settings
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
    settings && errorsForMetrics ? errorsForMetrics[settings.slug] : {}

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
      onLockClick={onLockClick && (() => onLockClick(metric))}
      onMouseEnter={onMetricHover && (e => onMetricHover(metric, e))}
      onMouseLeave={onMetricHoverEnd && (() => onMetricHoverEnd(metric))}
      onSettingsClick={onSettingsClick}
      errorsForMetrics={errors}
      settings={settings}
    />
  ))
}
