import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const Value = ({ className, ...rest }) => (
  <span className={cx(styles.value, className)} {...rest} />
)

export default Value
