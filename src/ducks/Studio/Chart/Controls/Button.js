import React from 'react'
import cx from 'classnames'
import UIButton from '@santiment-network/ui/Button'
import styles from './index.module.scss'

const Button = ({ className, stroke, isActive, ...props }) => (
  <UIButton
    {...props}
    variant='ghost'
    className={cx(
      styles.btn,
      stroke && styles.stroke,
      className,
      isActive && styles.btn_active
    )}
  />
)

export default Button
