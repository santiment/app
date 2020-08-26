import React from 'react'
import cx from 'classnames'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import StablecoinsMarketCap from '../../ducks/Stablecoins/StablecoinsMarketCap/StablecoinsMarketCap'
import StablecoinHolderDistribution from '../../ducks/Stablecoins/HolderDistribution/StablecoinHolderDistribution'
import StablecoinsTransactions from '../../ducks/Stablecoins/StablecoinsTransactions/StablecoinsTransactions'
import WhaleTrendsList from '../../ducks/Stablecoins/WhaleTrendsList/WhaleTrendsList'
import FlowToExchangesList from '../../ducks/Stablecoins/FlowToExchanges/FlowToExchangesList'
import TransactionsDominance from '../../ducks/Stablecoins/TransactionsDominance/TransactionsDominance'
import NetworkActivity from '../../ducks/Stablecoins/NetworkActivity/NetworkActivity'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { MobileOnly } from '../../components/Responsive'
import { getIntervalDates } from '../../ducks/Stablecoins/StablecoinsMarketCap/utils'
import { Block, BlockWithRanges } from './StablecoinsPageStructure'
import styles from './StablecoinsPage.module.scss'

const StablecoinsPage = ({ history, isDesktop }) => {
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

        <Block title='Largest Transactions (last 24h)'>
          <StablecoinsTransactions {...getIntervalDates('24h')} />
        </Block>

        <Block
          title={isDesktop ? 'Stablecoin Holder Distribution' : null}
          showPro
        >
          <StablecoinHolderDistribution />
        </Block>

        <BlockWithRanges
          title='Transaction Dominance'
          el={TransactionsDominance}
        />

        <BlockWithRanges
          title='Network Activity'
          showPro
          el={NetworkActivity}
        />
      </div>

      <CommonFooter className={styles.footer} />
    </div>
  )
}

export default StablecoinsPage
