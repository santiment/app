import React from 'react'
import cx from 'classnames'
import styles from './Widget.module.scss'

const Widget = ({ className, children }) => (
  <div className={cx(styles.widget, className)}>{children}</div>
)

export default Widget
