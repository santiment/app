import React from 'react'
import cx from 'classnames'
import { MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import styles from './StablecoinsPage.module.scss'
import StablecoinsMarketCap from '../../ducks/Stablecoins/StablecoinsMarketCap/StablecoinsMarketCap'

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

      <div className={cx(styles.inner, styles.block)}>
        <StablecoinsMarketCap />
      </div>

      <CommonFooter className={styles.footer} />
    </div>
  )
}

export default StablecoinsPage
