import React from 'react'
import DetailsItem from './DetailsItem'
import Column from './Column'
import PaywallBanner from './PaywallBanner'
import styles from './index.module.scss'

const array = [100, 22, 35, 0.2]

const AverageSocialVolume = ({ text, hasPremium }) => (
  <div>
    <div className={styles.header}>
      <h3 className={styles.title}>Average</h3>
    </div>
    {hasPremium ? (
      <div className={styles.content}>
        <div className={styles.chart}>
          {array.map((percent, idx) => (
            <Column key={idx} percent={percent} />
          ))}
        </div>
        <div className={styles.details}>
          <DetailsItem value='85 547' className={styles.item} />
          <DetailsItem
            value='810'
            percentage='0.95'
            title='corona OR coronavirus OR covid-19'
            className={styles.item}
          />
          <DetailsItem
            value='810'
            percentage='0.95'
            title='blockchain'
            className={styles.item}
          />
          <DetailsItem
            value='810'
            percentage='0.95'
            title='blockchain'
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
