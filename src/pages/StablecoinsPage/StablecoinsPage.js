import React from 'react'
import cx from 'classnames'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import StablecoinsMarketCap, {
  getIntervalDates
} from '../../ducks/Stablecoins/StablecoinsMarketCap/StablecoinsMarketCap'
import StablecoinHolderDistribution from '../../ducks/Stablecoins/HolderDistribution/StablecoinHolderDistribution'
import UpgradeBtn from '../../components/UpgradeBtn/UpgradeBtn'
import StablecoinsTransactions from '../../ducks/Stablecoins/StablecoinsTransactions/StablecoinsTransactions'
import WhaleTrendsList from '../../ducks/Stablecoins/WhaleTrendsList/WhaleTrendsList'
import FlowToExchangesList from '../../ducks/Stablecoins/FlowToExchanges/FlowToExchangesList'
import styles from './StablecoinsPage.module.scss'

const StablecoinsPage = () => {
  return (
    <div className={cx('page', styles.container)}>
      <div className={styles.header}>
        <div className={styles.inner}>
          <h3 className={styles.title}>Stablecoins</h3>
          <div className={styles.description}>
            Cryptocurrencies designed to minimize the volatility of the price of
            the stablecoin, relative to some "stable" asset or basket of assets.
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <StablecoinsMarketCap className={styles.block} />

        <div className={styles.block}>
          <div className={styles.subHeader}>
            <div className={styles.subTitle}>Whale Trends (last 30 days)</div>
            <div className={styles.subDescr}>Top 100 non-exchange holders</div>
          </div>

          <WhaleTrendsList />
        </div>

        <div className={styles.block}>
          <div className={styles.subHeader}>
            <div className={styles.subTitle}>Flow to Exchanges (last 24h)</div>
            <div className={styles.subDescr}>
              May indicate level of interest to exchange stablecoins for other
              cryptocurrencies
            </div>
          </div>

          <FlowToExchangesList />
        </div>

        <div className={styles.block}>
          <div className={styles.subHeader}>
            <div className={styles.subTitle}>
              Largest Transfers to Exchanges (last 24h)
            </div>
          </div>

          <StablecoinsTransactions {...getIntervalDates({ value: '24h' })} />
        </div>

        <div className={styles.block}>
          <div className={styles.subHeader}>
            <div className={styles.subTitle}>
              Stablecoin Holder Distribution
              <UpgradeBtn
                className={styles.upgrade}
                iconClassName={styles.crown}
                variant='fill'
                children='Pro'
              />
            </div>
          </div>

          <StablecoinHolderDistribution />
        </div>
      </div>

      <CommonFooter className={styles.footer} />
    </div>
  )
}

export default StablecoinsPage
