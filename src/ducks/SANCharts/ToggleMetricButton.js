import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ExplanationTooltip from '../../components/ExplanationTooltip/ExplanationTooltip'
import MetricExplanation from './MetricExplanation'
import styles from './ChartMetricSelector.module.scss'

const ToggleMetricButton = ({
  metric,
  children,
  isActive,
  isMobile,
  error = '',
  label,
  ...props
}) => {
  const isComplexityError =
    error.includes('complexity') || error.includes('outside')
  const noData = error && !isComplexityError

  return isMobile ? (
    <Button className={styles.mobileButton} {...props}>
      <span
        className={cx(
          styles.mobileButton__text,
          isActive && styles.mobileButton__text_active
        )}
      >
        {label}
      </span>
      <Icon type={isActive ? 'remove' : 'plus-round'} />
    </Button>
  ) : (
    <Button
      variant='ghost'
      fluid
      className={styles.btn}
      classes={styles}
      isActive={isActive}
      disabled={error}
      {...props}
    >
      <div className={styles.btn__left}>
        {noData ? (
          <span className={styles.btn_disabled}>no data</span>
        ) : (
          <ExplanationTooltip
            className={styles.btn__expl}
            text={isActive ? 'Remove metric' : 'Add metric'}
            offsetY={8}
          >
            <div
              className={cx(
                styles.btn__action,
                isActive ? styles.btn__action_remove : styles.btn__action_add
              )}
            >
              <Icon type={isActive ? 'close-small' : 'plus-small'} />
            </div>
          </ExplanationTooltip>
        )}{' '}
        {label}
      </div>
      <MetricExplanation metric={metric} isComplexityError={isComplexityError}>
        <Icon type='info-round' className={styles.info} />
      </MetricExplanation>
    </Button>
  )
}
export default ToggleMetricButton
