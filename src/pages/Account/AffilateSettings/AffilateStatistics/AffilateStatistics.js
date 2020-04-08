import React from 'react'
import cx from 'classnames'
import styles from './AffilateStatistics.module.scss'

const AffilateStatistics = () => {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.label}>Clicks</div>
        <div className={styles.value}>455</div>
      </div>

      <div className={styles.block}>
        <div className={styles.label}>Sign ups</div>
        <div className={cx(styles.value, styles.highline)}>4</div>
      </div>

      <div className={styles.block}>
        <div className={styles.label}>Earned</div>
        <div className={cx(styles.value, styles.highline)}>
          455 <span className={styles.san}>san</span>
        </div>
      </div>
    </div>
  )
}

export default AffilateStatistics
