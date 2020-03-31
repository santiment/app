import React from 'react'
import cx from 'classnames'
import styles from './Column.module.scss'

const Column = ({ className, percent }) => (
  <div
    className={styles.wrapper}
    style={{ '--percent': `${percent}%` }}
    data-percent={percent + '%'}
  />
)

export default Column
