import React from 'react'
import cx from 'classnames'
import styles from './DetailsItem.module.scss'

const DetailsItem = ({
  title = 'Total',
  value,
  percentage = 100,
  className
}) => (
  <div className={cx(styles.wrapper, className)}>
    <h3 className={styles.text}>
      <b className={styles.title}>{title}</b>
      {title === 'Total' && ' Social Volume'}
    </h3>
    <div className={styles.numbers}>
      <span className={styles.value}>{value}</span>
      <span className={styles.percentage}>{percentage}%</span>
    </div>
  </div>
)

export default DetailsItem
