import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import { getTimerangePeriod } from '../../utils/dates'
import StablecoinsMarketCap from '../../ducks/Stablecoins/StablecoinsMarketCap/StablecoinsMarketCap'
import StablecoinHolderDistribution from '../../ducks/Stablecoins/HolderDistribution/StablecoinHolderDistribution'
import StablecoinsTransactions from '../../ducks/Stablecoins/StablecoinsTransactions/StablecoinsTransactions'
import TopExchangesTable from '../../components/Tables/TopExchanges'
import WhaleTrendsList from '../../ducks/Stablecoins/WhaleTrendsList/WhaleTrendsList'
import FlowToExchangesList from '../../ducks/Stablecoins/FlowToExchanges/FlowToExchangesList'
import TransactionsDominance from '../../ducks/Stablecoins/TransactionsDominance/TransactionsDominance'
import NetworkActivity from '../../ducks/Stablecoins/NetworkActivity/NetworkActivity'
import { DesktopOnly } from '../../components/Responsive'
import { Block, BlockWithRanges } from './StablecoinsPageStructure'
import CurrentPageReport from '../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import SharePage from '../../components/SharePage/SharePage'
import NetExchangeFlow from '../../ducks/Stablecoins/NetExchangeFlow/NetExchangeFlow'
import { isStage } from '../../utils/utils'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import { withRenderQueueProvider } from '../../ducks/renderQueue/viewport'
import styles from './StablecoinsPage.module.scss'

const ANCHORS = {
  Overview: {
    label: 'Stablecoins Overview',
    key: 'overview',
  },
  WhaleTrends: {
    label: 'Whale Trends',
    key: 'whale-trends',
  },
  FlowToExchanges: {
    label: 'Flow to Exchanges',
    key: 'flow-to-exchanges',
  },
  TopExchanges: {
    label: 'Top Exchanges',
    key: 'top-exchanges',
  },
  NetExchangeFlow: {
    label: 'Stablecoin Net Exchange Flow',
    key: 'net-exchange-flow',
  },
  LargestTransactions: {
    label: 'Largest Transactions to Exchanges',
    key: 'largest-transactions',
  },
  HolderDistribution: {
    label: 'Holder Distribution',
    key: 'holder-distribution',
  },
  TransactionDominance: {
    label: 'Transaction Activity',
    key: 'transaction-activity',
  },
  NetworkActivity: {
    label: 'Network Activity',
    key: 'network-activity',
  },
}

const StablecoinsPage = ({ isDesktop }) => {
  return (
    <DashboardLayout>
      <Helmet
        title={'Stablecoin Hub | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: 'Stablecoin Hub | Sanbase',
          },
          {
            property: 'og:description',
            content:
              'Real-time information on the biggest stablecoins’ market size, whale behavior, speculative demand and more.',
          },
        ]}
      />

      <div className={styles.header}>
        <div className={cx(styles.inner, styles.content)}>
          <div className={styles.pageDescription}>
            <h3 className={styles.title}>Stablecoin Financial</h3>
            <div className={styles.description}>
              Real-time information on the biggest stablecoins’ market size, whale behavior,
              speculative demand and more.
            </div>

            <SharePage />
          </div>

          <CurrentPageReport />
        </div>
      </div>

      <div className={styles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS} />
        </DesktopOnly>

        <div className={styles.inner}>
          <Block
            title='Stablecoins Market Cap'
            className={styles.firstBlock}
            tag={ANCHORS.Overview.key}
          >
            <StablecoinsMarketCap />
          </Block>

          <Block
            title='Stablecoin Whale Trends (last 30 days)'
            tag={ANCHORS.WhaleTrends.key}
            description='Recent activity of each stablecoins’ top 100 non-exchange addresses'
            isPaywalActive
          >
            <WhaleTrendsList />
          </Block>

          <Block
            tag={ANCHORS.FlowToExchanges.key}
            title='Stablecoins to Exchanges (last 24h)'
            description='Estimated level of interest to swap stablecoins for more volatile cryptocurrencies'
            isPaywalActive
          >
            <FlowToExchangesList />
          </Block>

          <Block tag={ANCHORS.TopExchanges.key}>
            <TopExchangesTable isStablecoinPage selector={{ watchlistId: isStage ? 1115 : 3985 }} />
          </Block>

          <Block tag={ANCHORS.NetExchangeFlow.key} title='Stablecoin Net Exchange Flow'>
            <NetExchangeFlow />
          </Block>

          <Block
            tag={ANCHORS.LargestTransactions.key}
            title='Largest Stablecoin Transactions (last 24h)'
            description='Select an asset to view their largest transactions in the last 24 hours'
          >
            <StablecoinsTransactions {...getTimerangePeriod('24h')} />
          </Block>

          <Block
            tag={ANCHORS.HolderDistribution.key}
            title={isDesktop ? 'Stablecoin Holder Distribution' : null}
            description='Number of addresses sorted by their stablecoin balance'
          >
            <StablecoinHolderDistribution />
          </Block>

          <BlockWithRanges
            tag={ANCHORS.TransactionDominance.key}
            title='Transaction Activity'
            el={TransactionsDominance}
            description='Total amount of stablecoins moving between network addresses'
          />

          <BlockWithRanges
            tag={ANCHORS.NetworkActivity.key}
            title='Stablecoin Network Activity'
            description='On-chain indicators of stablecoin utility and adoption'
            el={NetworkActivity}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withRenderQueueProvider(StablecoinsPage)
