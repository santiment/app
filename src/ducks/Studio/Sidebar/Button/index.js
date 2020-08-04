import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Settings from '../MetricSelector/Settings'
import { MetricSettings } from '../../../dataHub/metrics/settings'
import MetricExplanation from '../../../SANCharts/MetricExplanation'
import styles from './index.module.scss'
import settingsStyles from '../MetricSelector/Settings.module.scss'

const MetricButton = ({
  className,
  metric,
  label,
  isActive,
  isError,
  isDisabled,
  isNew,
  onClick,
  setMetricSettingMap,
  project,
  showBetaLabel = true
}) => {
  const settings = isActive && metric && MetricSettings[metric.key]

  return (
    <Button
      variant='ghost'
      className={cx(
        styles.btn,
        className,
        (isError || isDisabled) && styles.disabled,
        settings && settingsStyles.adjustable
      )}
      isActive={isActive}
      onClick={onClick}
    >
      <div className={styles.top}>
        {isError ? (
          <div className={styles.error}>no data</div>
        ) : (
          <Icon
            type='plus-small'
            className={cx(styles.plus, isActive && styles.active)}
          />
        )}
        {label}

        {metric && isNew && <div className={styles.new}>NEW</div>}

        {metric && metric.isBeta && showBetaLabel && (
          <div className={styles.beta}>BETA</div>
        )}

        {metric && (
          <MetricExplanation metric={metric} project={project} position='right'>
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
