import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
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
  const handleClick = (...args) => {
    if (onClick) {
      onClick(...args)
    }

    onStepClick(stepIndex)
  }

  const renderIconNode = () => {
    if (icons && icons.process && status === 'process') {
      return icons.process
    }
    if (status === 'finish' && !disabled) {
      return <Icon type='checkmark' />
    }
    return <span className={styles.stepsIcon}>{stepNumber}</span>
  }

  const getClassString = () => {
    if (disabled) {
      return styles.stepsItemDisabled
    }
    if (status === 'wait' && !disabled) {
      return styles.stepsItemWait
    }
    if (status === 'process') {
      return styles.stepsItemProcess
    }
    if (status === 'finish' && !disabled) {
      return styles.stepsItemFinish
    }
  }

  const classString = cx(
    styles.stepsItem,
    getClassString(),
    size === 'small' && styles.stepsSmall,
    className
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
    <div {...restProps} className={classString}>
      <div {...accessibilityProps} className={styles.stepsItemContainer}>
        <div className={styles.stepsItemTail} />
        <div className={styles.stepsItemContentContainer}>
          <div className={styles.stepsItemIcon}>{renderIconNode()}</div>
          <div className={styles.stepsItemContent}>
            <div className={styles.stepsItemTitle}>{title}</div>
            {description && (
              <div className={styles.stepsItemDescription}>{description}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step
