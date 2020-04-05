import React from 'react'
import DetailsItem from './DetailsItem'
import Column from './Column'
import PaywallBanner from './PaywallBanner'
import styles from './index.module.scss'

const AverageSocialVolume = ({ text, hasPremium, detectedAsset }) => (
  <div>
    <div className={styles.header}>
      <h3 className={styles.title}>Average</h3>
    </div>
    {hasPremium ? (
      <div className={styles.content}>
        <div className={styles.chart}>
          <Column percent={100} className={styles.column} />
          <Column percent={0.2} className={styles.column} />
        </div>
        <div className={styles.details}>
          <DetailsItem value='85 547' className={styles.item} />
          <DetailsItem
            value='810'
            percentage='0.95'
            title={text}
            className={styles.item}
          />
        </div>
      </div>
    ) : (
      <PaywallBanner />
    )}
  </div>
)

export default AverageSocialVolume
