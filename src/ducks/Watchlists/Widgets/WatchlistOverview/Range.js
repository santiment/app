import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import styles from './Range.module.scss'

const Range = ({
  label,
  range,
  changeRange,
  children,
  className,
  btnClassName,
  ...rest
}) => (
  <div className={cx(styles.wrapper, className)}>
    {label ? <h3 className={styles.label}>{label}</h3> : children}
    <Button
      fluid
      variant='flat'
      isActive
      className={cx(styles.button, btnClassName)}
      onClick={changeRange}
      {...rest}
    >
      {range}
    </Button>
  </div>
)

export default Range
