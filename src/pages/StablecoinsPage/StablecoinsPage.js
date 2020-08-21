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
import TransactionsDominance from '../../ducks/Stablecoins/TransactionsDominance/TransactionsDominance'
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

        <Block
          title='Whale Trends (last 30 days)'
          description='Top 100 non-exchange holders'
        >
          <WhaleTrendsList />
        </Block>

        <Block
          title='Flow to Exchanges (last 24h)'
          description='May indicate level of interest to exchange stablecoins for other cryptocurrencies'
        >
          <FlowToExchangesList />
        </Block>

        <Block title='Largest Transfers to Exchanges (last 24h)'>
          <StablecoinsTransactions {...getIntervalDates({ value: '24h' })} />
        </Block>

        <Block title='Stablecoin Holder Distribution' showPro>
          <StablecoinHolderDistribution />
        </Block>

        <Block title='Transaction Dominance (last 24h)'>
          <TransactionsDominance title='Transaction Dominance (last 24h)' />
        </Block>
      </div>

      <CommonFooter className={styles.footer} />
    </div>
  )
}

const Block = ({ title, description, showPro, children }) => {
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

      {children}
    </div>
  )
}

export default StablecoinsPage
