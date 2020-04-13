import React from 'react'
import cx from 'classnames'
import styles from './AffiliateStatistics.module.scss'

const AffiliateStatistics = ({ promotions }) => {
  const leadsCount = promotions.reduce((acc, item) => {
    return acc + +item.leadsCount
  }, 0)

  const visitorsCount = promotions.reduce((acc, item) => {
    return acc + +item.visitorsCount
  }, 0)

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.label}>Clicks</div>
        <div className={styles.value}>{visitorsCount}</div>
      </div>

      <div className={styles.block}>
        <div className={styles.label}>Sign ups</div>
        <div className={cx(styles.value, styles.highline)}>{leadsCount}</div>
      </div>
    </div>
  )
}

export default AffiliateStatistics
