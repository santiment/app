import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const BannerYoutube = ({
  className,
  status = 'LIVE NOW',
  title = 'Bullish divergences? Analizing BTC and ETH’s on-chain data',
  link = ''
}) => (
  <section className={cx(styles.wrapper, className)}>
    <div className={styles.info}>
      <h4 className={styles.status}>{status}</h4>
      <p className={styles.name}>{title}</p>
    </div>
    <div className={styles.video} />
  </section>
)

export default BannerYoutube
