import React from 'react'
import cx from 'classnames'
import StepIcon from '../StepIcon/StepIcon'
import { getClassString } from '../utils'
import styles from './Step.module.scss'

const Step = ({
  className,
  active,
  status = 'wait',
  stepNumber,
  disabled,
  description,
  title,
  icons,
  stepIndex,
  onStepClick,
  onClick,
  size,
  ...restProps
}) => {
  function handleClick (...args) {
    if (onClick) {
      onClick(...args)
    }

    onStepClick(stepIndex)
  }

  const classString = cx(
    getClassString(styles, disabled, status),
    size === 'small' && styles.small
  )

  const accessibilityProps = {
    role: 'button',
    tabIndex: 0
  }
  if (!disabled) {
    if (onStepClick) {
      accessibilityProps.onClick = handleClick
    } else if (onClick) {
      accessibilityProps.onClick = onClick
    }
  }

  return (
    <div {...restProps} className={cx(styles.wrapper, classString, className)}>
      <div {...accessibilityProps} className={styles.container}>
        <div className={styles.tail} />
        <div className={styles.contentWrapper}>
          <StepIcon
            disabled={disabled}
            stepNumber={stepNumber}
            icons={icons}
            status={status}
            size={size}
          />
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            {description && (
              <div className={styles.description}>{description}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step
