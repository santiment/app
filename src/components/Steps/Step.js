import * as React from 'react'
import cx from 'classnames'

import checkmark from './../../assets/checkmark.svg'

import styles from './styles.module.scss'

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
  ...restProps
}) => {
  const handleClick = (...args) => {
    if (onClick) {
      onClick(...args)
    }

    onStepClick(stepIndex)
  }

  const renderIconNode = () => {
    if (status === 'finish') {
      return <img src={checkmark} alt='Check' />
    }
    return <span className={styles.stepsIcon}>{stepNumber}</span>
  }

  const classString = cx(
    styles.stepsItem,
    {
      [styles.stepsItemWait]: status === 'wait',
      [styles.stepsItemProcess]: status === 'process',
      [styles.stepsItemFinish]: status === 'finish',
      [styles.stepsItemDisabled]: disabled
    },
    className
  )

  const accessibilityProps = {}
  if (onStepClick && !disabled) {
    accessibilityProps.role = 'button'
    accessibilityProps.tabIndex = 0
    accessibilityProps.onClick = handleClick
  } else if (onClick && !disabled) {
    accessibilityProps.role = 'button'
    accessibilityProps.tabIndex = 0
    accessibilityProps.onClick = onClick
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
