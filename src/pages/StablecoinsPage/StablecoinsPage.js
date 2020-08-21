import React, { Fragment, useMemo } from 'react'
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
import TransactionsDominance from '../../ducks/Stablecoins/TransactionsDominance/TransactionsDominance'
import CheckProPaywall from '../../ducks/Stablecoins/CheckProPaywall'
import styles from './StablecoinsPage.module.scss'
import NetworkActivity from '../../ducks/Stablecoins/NetworkActivity/NetworkActivity'

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

        <Block
          title='Whale Trends (last 30 days)'
          description='Top 100 non-exchange holders'
          isPaywalActive
        >
          <WhaleTrendsList />
        </Block>

        <Block
          title='Flow to Exchanges (last 24h)'
          description='May indicate level of interest to exchange stablecoins for other cryptocurrencies'
          isPaywalActive
        >
          <FlowToExchangesList />
        </Block>

        <Block title='Largest Transfers to Exchanges (last 24h)'>
          <StablecoinsTransactions {...getIntervalDates({ value: '24h' })} />
        </Block>

        <Block title='Stablecoin Holder Distribution' showPro>
          <StablecoinHolderDistribution />
        </Block>

        <Block title='Transaction Dominance (last 24h)' isPaywalActive>
          <TransactionsDominance />
        </Block>

        <Block title='Network Activity' showPro>
          <NetworkActivity />
        </Block>
      </div>

      <CommonFooter className={styles.footer} />
    </div>
  )
}

const Block = ({
  title,
  description,
  showPro,
  children,
  isPaywalActive = false
}) => {
  const El = useMemo(
    () => {
      return isPaywalActive ? CheckProPaywall : Fragment
    },
    [isPaywalActive]
  )

  return (
    <div className={styles.block}>
      <div className={styles.subHeader}>
        <div className={styles.subTitle}>
          {title}
          {showPro && (
            <UpgradeBtn
              className={styles.upgrade}
              iconClassName={styles.crown}
              variant='fill'
              children='Pro'
            />
          )}
        </div>
        {description && <div className={styles.subDescr}>{description}</div>}
      </div>

      <El>{children}</El>
    </div>
  )
}

export default StablecoinsPage
