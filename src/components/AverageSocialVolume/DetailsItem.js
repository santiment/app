import React from 'react'
import cx from 'classnames'
import styles from './DetailsItem.module.scss'

const DetailsItem = ({
  title = 'Total',
  value,
  percent = 100,
  className,
  color = '#FFAD4D'
}) => (
  <div className={cx(styles.wrapper, className)}>
    <h3 className={styles.text}>
      <b className={styles.title}>{title}</b>
      {title === 'Total' && ' Social Volume'}
    </h3>
    <div className={styles.numbers}>
      <span className={styles.value} style={{ color: color }}>
        {value}
      </span>
      <span className={styles.percentage}>{percent}%</span>
    </div>
  </div>
)

export default DetailsItem
