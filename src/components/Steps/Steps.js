import React, { cloneElement } from 'react'
import cx from 'classnames'

import Step from './Step'

import styles from './Steps.module.scss'

const Steps = ({
  className,
  children,
  size,
  current,
  initial,
  icons,
  onChange,
  ...restProps
}) => {
  const onStepClick = next => {
    if (onChange && current !== next) {
      onChange(next)
    }
  }

  return (
    <div
      className={cx(styles.steps, className, {
        [styles.stepsSmall]: size
      })}
      {...restProps}
    >
      {React.Children.map(children, (child, index) => {
        const stepNumber = initial + index
        const childProps = {
          stepNumber: `${stepNumber + 1}`,
          stepIndex: stepNumber,
          key: stepNumber,
          icons,
          onStepClick: onChange && onStepClick,
          ...child.props
        }

        if (!child.props.status) {
          if (stepNumber === current) {
            childProps.status = 'process'
          } else if (stepNumber < current) {
            childProps.status = 'finish'
          } else {
            childProps.status = 'wait'
          }
        }
        childProps.active = stepNumber === current

        return cloneElement(child, childProps)
      })}
    </div>
  )
}

Steps.Step = Step

Steps.defaultProps = {
  initial: 0,
  current: 0,
  size: ''
}

export default Steps
