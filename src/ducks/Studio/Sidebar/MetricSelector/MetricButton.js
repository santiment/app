import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Adjustments from './Adjustments'
import { Metric } from '../../../dataHub/metrics'
import MetricExplanation from '../../../SANCharts/MetricExplanation'
import styles from './MetricButton.module.scss'
import adjustmentsStyles from './Adjustments.module.scss'

const MetricAdjustments = Object.assign(Object.create(null), {
  [Metric.amount_in_top_holders.key]: [
    {
      key: 'holdersCount',
      label: 'Top Holders',
      defaultValue: 10,
    },
  ],
})

const MetricButton = ({
  className,
  metric,
  label,
  isActive,
  isError,
  isDisabled,
  onClick,
  setMetricSettingMap,
}) => {
  const adjustments = isActive && metric && MetricAdjustments[metric.key]

  return (
    <Button
      variant='ghost'
      className={cx(
        styles.btn,
        className,
        (isError || isDisabled) && styles.disabled,
        adjustments && adjustmentsStyles.adjustable,
      )}
      isActive={isActive}
      onClick={onClick}
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

        {metric && (
          <MetricExplanation metric={metric} position='right'>
            <Icon type='info-round' className={styles.info} />
          </MetricExplanation>
        )}
      </div>
      {adjustments && (
        <Adjustments
          metric={metric}
          adjustments={adjustments}
          setMetricSettingMap={setMetricSettingMap}
        />
      )}
    </Button>
  )
}

export default MetricButton
