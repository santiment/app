import React from 'react'
import cx from 'classnames'
import styles from './Column.module.scss'

const Column = ({ className, percent }) => (
  <div
    className={cx(styles.wrapper, className)}
    style={{ '--percent': `${percent}%` }}
  />
)

export default Column
