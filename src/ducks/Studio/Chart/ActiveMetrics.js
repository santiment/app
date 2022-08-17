import React, { useMemo } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import MetricLock from './MetricLock'
import MetricFavorite from './MetricFavorite'
import MetricErrorExplanation from './MetricErrorExplanation/MetricErrorExplanation'
import MetricIcon from '../../SANCharts/MetricIcon'
import { getMetricLabel } from '../../dataHub/metrics/labels'
import { useFavoriteMetrics } from '../../../stores/user/metrics'
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip'
import { ApiErrorsProvider, useApiErrors } from './hooks/ApiErrorsContext'
import styles from './ActiveMetrics.module.scss'

const Actions = ({ children, childrenOffset, isActive }) => (
  <div
    className={cx(styles.settings, isActive && styles.settings_active)}
    style={{
      '--items': children.length - childrenOffset,
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

const LockInfo = ({ metric }) => (
  <ExplanationTooltip
    offsetY={6}
    align='start'
    text={`Metric is locked to ${metric.project.ticker}`}
  >
    <div className={styles.lock}>
      <svg width='8' height='8' xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3 3h2v-.5c0-.4-.12-.63-.23-.75-.09-.1-.3-.25-.77-.25-.48 0-.68.15-.77.25-.11.12-.23.35-.23.75V3zM1.5 3h-.13C.9 3 .5 3.33.5 3.73v3.54c0 .4.4.73.88.73h5.25c.48 0 .87-.33.87-.73V3.73c0-.4-.4-.73-.88-.73H6.5v-.5C6.5 1.12 5.67 0 4 0S1.5 1.12 1.5 2.5V3z'
        />
      </svg>
    </div>
  </ExplanationTooltip>
)

const MetricButton = ({
  className,
  metrics,
  metric,
  colors,
  error,
  metricSettings,
  favoriteMetricSet,
  isLoggedIn,
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
        className,
      )}
      aria-invalid={error}
    >
      {metric.project && <LockInfo metric={metric} />}

      {isWithIcon ? (
        isLoading ? (
          <div className={styles.loader} />
        ) : (
          <MetricIcon node={node} color={colors[dataKey]} className={styles.label} />
        )
      ) : null}
      {label}
      <MetricErrorExplanation
        errorsForMetrics={errorsForMetrics}
        metric={metric}
        settings={settings}
      />

      {isRemovable && (
        <Icon type='close-small' className={styles.icon} onClick={() => toggleMetric(metric)} />
      )}

      {isWithSettings && (
        <Actions isActive={metricSettings === metric} childrenOffset={1 - isLoggedIn}>
          <Customization metric={metric} onClick={onSettingsClick} />
          <MetricLock metrics={metrics} metric={metric} project={settings} onClick={onLockClick} />
          {isLoggedIn && <MetricFavorite metric={metric} favoriteMetricSet={favoriteMetricSet} />}
        </Actions>
      )}
    </Button>
  )
}

const ActiveMetrics = ({
  className,
  MetricColor,
  activeMetrics,
  metricSettings,
  loadings,
  toggleMetric,
  ErrorMsg = {},
  isLoggedIn,
  isSingleWidget,
  isWithIcon = true,
  isWithSettings = false,
  onLockClick,
  onMetricHover,
  onMetricHoverEnd,
  onSettingsClick,
  settings,
}) => {
  const isMoreThanOneMetric = activeMetrics.length > 1 || !isSingleWidget
  const { favoriteMetrics } = useFavoriteMetrics()
  const favoriteMetricSet = useMemo(() => new Set(favoriteMetrics), [favoriteMetrics])

  const errorsForMetrics = useApiErrors()

  const errors = settings && errorsForMetrics ? errorsForMetrics[settings.slug] : {}

  return activeMetrics.map((metric, i) => (
    <MetricButton
      key={metric.key}
      className={className}
      metrics={activeMetrics}
      metric={metric}
      colors={MetricColor}
      error={ErrorMsg[metric.key]}
      metricSettings={metricSettings}
      isWithIcon={isWithIcon}
      isLoggedIn={isLoggedIn}
      isLoading={loadings.includes(metric)}
      isRemovable={isMoreThanOneMetric && toggleMetric}
      isWithSettings={isWithSettings}
      toggleMetric={toggleMetric}
      onLockClick={onLockClick && (() => onLockClick(metric))}
      onMouseEnter={onMetricHover && ((e) => onMetricHover(metric, e))}
      onMouseLeave={onMetricHoverEnd && (() => onMetricHoverEnd(metric))}
      onSettingsClick={onSettingsClick}
      errorsForMetrics={errors}
      settings={settings}
      favoriteMetricSet={favoriteMetricSet}
    />
  ))
}

export default (props) => {
  return (
    <ApiErrorsProvider>
      <ActiveMetrics {...props} />
    </ApiErrorsProvider>
  )
}
