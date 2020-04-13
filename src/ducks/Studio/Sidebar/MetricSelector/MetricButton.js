import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import MetricExplanation from '../../../SANCharts/MetricExplanation'
import styles from './index.module.scss'

const MetricButton = ({
  className,
  metric,
  label,
  isActive,
  isError,
  isDisabled,
  onClick
}) => (
  <Button
    variant='ghost'
    className={cx(
      styles.btn,
      className,
      (isError || isDisabled) && styles.btn_disabled
    )}
    isActive={isActive}
    onClick={onClick}
  >
    <div className={styles.btn__left}>
      {isError ? (
        <div className={styles.btn__error}>no data</div>
      ) : (
        <Icon
          type='plus'
          className={cx(styles.plus, isActive && styles.active)}
        />
      )}
      {label}
    </div>

    {metric && (
      <MetricExplanation metric={metric} position='right'>
        <Icon type='info-round' className={styles.info} />
      </MetricExplanation>
    )}
  </Button>
)

export default MetricButton
