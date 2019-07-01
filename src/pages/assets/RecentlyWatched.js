import React from 'react'
import ProjectIcon from '../../components/ProjectIcon'
import PercentChanges from './../../components/PercentChanges'
import styles from './RecentlyWatched.module.scss'
import { formatNumber } from '../../utils/formatting'

const RecentlyWatched = ({
  name = 'bitcoin',
  ticker = 'btc',
  price = 41382
}) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Recently watched assets</h2>
      <div className={styles.item}>
        <div className={styles.group}>
          <ProjectIcon size={20} name={name} ticker={ticker} />
          <h3 className={styles.name}>
            {name} <span className={styles.ticker}>{ticker}</span>
          </h3>
        </div>
        <div className={styles.group}>
          <h4 className={styles.price}>
            {price ? formatNumber(price, { currency: 'USD' }) : 'No data'}
          </h4>
          <PercentChanges changes={-25.21} className={styles.change} />
        </div>
      </div>
    </section>
  )
}

export default RecentlyWatched
