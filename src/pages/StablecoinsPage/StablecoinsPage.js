import React from 'react'
import cx from 'classnames'
import { MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import styles from './StablecoinsPage.module.scss'
import StablecoinsMarketCap from '../../ducks/Stablecoins/StablecoinsMarketCap/StablecoinsMarketCap'
import StablecoinHolderDistribution from '../../ducks/Stablecoins/HolderDistribution/StablecoinHolderDistribution'
import UpgradeBtn from '../../components/UpgradeBtn/UpgradeBtn'

const StablecoinsPage = ({ history }) => {
  return (
    <div className={cx('page', styles.container)}>
      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={styles}
        />
      </MobileOnly>

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
            <div className={styles.subTitle}>
              Stablecoin Holder Distribution
            </div>
            <UpgradeBtn
              className={styles.upgrade}
              iconClassName={styles.crown}
              variant='fill'
              children='Pro'
            />
          </div>
          <StablecoinHolderDistribution />
        </div>
      </div>

      <CommonFooter className={styles.footer} />
    </div>
  )
}

export default StablecoinsPage
