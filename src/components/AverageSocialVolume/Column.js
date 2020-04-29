import React from 'react'
import cx from 'classnames'
import styles from './Column.module.scss'

const Column = ({ className, percent, color = '#FFAD4D' }) => (
  <div
    className={cx(styles.wrapper, className)}
    style={{ '--percent': `${percent}%`, '--color': color }}
  />
)

export default Column
