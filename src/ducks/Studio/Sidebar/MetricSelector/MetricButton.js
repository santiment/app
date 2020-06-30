import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Settings from './Settings'
import { MetricSettings } from '../../../dataHub/metrics/settings'
import MetricExplanation from '../../../SANCharts/MetricExplanation'
import styles from './MetricButton.module.scss'
import settingsStyles from './Settings.module.scss'
import { Metric } from '../../../dataHub/metrics'

const UNSELECTABLE_METRICS = [Metric.dormant_circulation.key]

const MetricButton = ({
  className,
  metric,
  label,
  isActive,
  isError,
  isDisabled,
  onClick,
  setMetricSettingMap,
  project,
  showBetaLabel = true,
  showTooltip = false
}) => {
  const settings = isActive && metric && MetricSettings[metric.key]

  const unselectable = UNSELECTABLE_METRICS.includes(metric.key)

  return (
    <Button
      variant='ghost'
      className={cx(
        styles.btn,
        className,
        (isError || isDisabled) && styles.disabled,
        unselectable && styles.unselectable,
        settings && settingsStyles.adjustable
      )}
      isActive={isActive}
      onClick={unselectable ? null : onClick}
    >
      <div className={styles.top}>
        {isError ? (
          <div className={styles.error}>no data</div>
        ) : (
          <Icon
            type='plus'
            className={cx(styles.plus, isActive && styles.active)}
          />
        )}
        {label}

        {metric && metric.isBeta && showBetaLabel && (
          <div className={styles.beta}>BETA</div>
        )}

        {metric && (
          <MetricExplanation
            metric={metric}
            project={project}
            position='right'
            withChildren={showTooltip}
          >
            <Icon type='info-round' className={styles.info} />
          </MetricExplanation>
        )}
      </div>
      {settings && (
        <Settings
          metric={metric}
          settings={settings}
          setMetricSettingMap={setMetricSettingMap}
        />
      )}
    </Button>
  )
}

export default MetricButton
