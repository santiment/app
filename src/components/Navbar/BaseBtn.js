import React from 'react'
import cx from 'classnames'
import styles from './BaseBtn.module.scss'

const BaseBtn = ({
  as: Button = 'button',
  className = '',
  children,
  fluid,
  ...props
}) => {
  return (
    <Button
      className={cx({
        [`${styles.button} ${className}`]: true,
        [styles.fluid]: fluid
      })}
      {...props}
    >
      {children}
    </Button>
  )
}

export default BaseBtn
