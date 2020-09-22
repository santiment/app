import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import { useRestrictedInfo } from './hooks'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import ClaimersWidgets from '../../components/ClaimersWidgets'
import { ChartWidget } from '../../components/ClaimersWidgets'
import TopClaimersTable from '../../components/ClaimersWidgets/TopClaimers/TopClaimersTable'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import { Block, BlockHeader } from '../StablecoinsPage/StablecoinsPageStructure'
import ResearchesBlock from '../../components/ResearchesBlock'
import { Metric } from '../../ducks/dataHub/metrics'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import UniswapHistoricalBalance from '../../ducks/Studio/Tabs/UniswapHistoricalBalance/UniswapHistoricalBalance'
import UniswapTopTransactions from '../../ducks/UniswapProtocol/UniswapTopTransactions/UniswapTopTransactions'
import UniswapMetrics from '../../ducks/UniswapProtocol/UniswapMetrics/UniswapMetrics'
import UniswapPieChart from '../../ducks/UniswapProtocol/UniswapPieChart/UniswapPieChart'
import UniswapWhoClaimed from '../../ducks/UniswapProtocol/UniswapPieChart/WhoClaimedPieChart'
import SharePage from '../../components/SharePage/SharePage'
import FeesDistribution from '../../ducks/Studio/FeesDistribution/FeesDistribution'
import styles from './UniswapProtocolPage.module.scss'

const ANCHORS = {
  Claimers: {
    label: 'UNI Token Claims',
    key: 'claimers'
  },
  Overview: {
    label: 'Uniswap Protocol',
    key: 'overview'
  },
  TopClaimers: {
    label: 'Top Claimers 24h',
    key: 'top-claimers'
  },
  ClaimersWidgets: {
    label: 'UNI Token Claims Widgets',
    key: 'claimers-widgets'
  },
  Exchanges: {
    label: 'Post claim activity of UNI tokens',
    key: 'how-much-on-exchanges'
  },
  WhoClaimed: {
    label: 'Who claimed UNI?',
    key: 'who-claimed'
  },
  TopTransactions: {
    label: 'Top Token Transactions',
    key: 'top-transactions'
  },
  FeesDistribution: {
    label: 'Fees Distribution',
    key: 'fees-distribution'
  }
}

const UniswapProtocolPage = ({ history, isDesktop }) => {
  const areClaimsRestricted = useRestrictedInfo()

  return (
    <div className={cx('page', styles.container)}>
      <Helmet
        title={'Uniswap (UNI) Token Dashboard | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: 'Uniswap (UNI) Token Dashboard | Sanbase'
          },
          {
            property: 'og:description',
            content:
              'Real-time data on Uniswap (UNI) token distribution, amount claimed, post-claim activity, top UNI transactions and more.'
          }
        ]}
      />

      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={styles}
        />
      </MobileOnly>

      <div className={styles.header}>
        <div className={cx(styles.inner, styles.content)}>
          <div className={styles.pageDescription}>
            <h3 className={styles.title}>Uniswap Protocol Dashboard</h3>

            <SharePage />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS} />
        </DesktopOnly>

        <div className={styles.inner}>
          <Block
            className={styles.firstBlock}
            tag={ANCHORS.Claimers.key}
            title='UNI Token Claims'
            isPaywalActive={areClaimsRestricted}
          >
            <UniswapMetrics />
          </Block>

          <Block
            tag={ANCHORS.Overview.key}
            title={'Uniswap: Token Distributor'}
            description='0x090d4613473dee047c3f2706764f49e0821d256e'
          >
            <div className={styles.overviewWrapper}>
              <UniswapHistoricalBalance
                classes={{
                  chart: styles.balanceChart,
                  balanceChartHeader: styles.balanceChartHeader
                }}
                title={<BlockHeader className={styles.balanceTitle} />}
                settings={{
                  showAlertBtn: true
                }}
              />
              <ChartWidget
                height={448}
                metrics={[
                  Metric.uniswap_total_claims_amount,
                  Metric.uniswap_total_claims_percent
                ]}
              />
            </div>
          </Block>

          <Block
            tag={ANCHORS.TopClaimers.key}
            title='Top Claimers, 24h'
            isPaywalActive={areClaimsRestricted}
          >
            <TopClaimersTable />
          </Block>
          <Block
            tag={ANCHORS.ClaimersWidgets.key}
            title='UNI Token Claims Widgets'
            isPaywalActive={areClaimsRestricted}
          >
            <ClaimersWidgets />
          </Block>
          <Block
            title='Post-claim activity of UNI tokens'
            description='From addresses that claimed UNI token'
            tag={ANCHORS.Exchanges.key}
          >
            <UniswapPieChart />
          </Block>

          <Block title='Who claimed UNI?' tag={ANCHORS.WhoClaimed.key}>
            <UniswapWhoClaimed />
          </Block>

          <Block
            title='Top Token Transactions, 30d'
            tag={ANCHORS.TopTransactions.key}
          >
            <UniswapTopTransactions />
          </Block>
          <Block tag={ANCHORS.FeesDistribution.key}>
            <FeesDistribution />
          </Block>
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default UniswapProtocolPage
