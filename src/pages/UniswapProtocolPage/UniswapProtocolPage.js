import React, { useCallback, useState } from 'react'
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
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import UniswapHistoricalBalance from '../../ducks/Studio/Tabs/UniswapHistoricalBalance/UniswapHistoricalBalance'
import UniswapTopTransactions from '../../ducks/UniswapProtocol/UniswapTopTransactions/UniswapTopTransactions'
import UniswapMetrics from '../../ducks/UniswapProtocol/UniswapMetrics/UniswapMetrics'
import UniswapWhoClaimed from '../../ducks/UniswapProtocol/UniswapPieChart/WhoClaimedPieChart'
import UniswapFlowBalances from '../../ducks/UniswapProtocol/UniswapFlowBalances'
import SharePage from '../../components/SharePage/SharePage'
import FeesDistribution from '../../ducks/Studio/FeesDistribution/FeesDistribution'
import styles from './UniswapProtocolPage.module.scss'

const ANCHOR_NAMES = {
  FeesDistribution: 'FeesDistribution'
}

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
    label: 'Top Claimers',
    key: 'top-claimers'
  },
  ClaimersWidgets: {
    label: 'UNI Claims: Overview',
    key: 'claimers-widgets'
  },
  WhoClaimed: {
    label: 'Who claimed UNI?',
    key: 'who-claimed'
  },
  FlowBalances: {
    label: 'UNI Flow Balances',
    key: 'flow-balances'
  },
  TopTransactions: {
    label: 'Top Token Transactions',
    key: 'top-transactions'
  },
  [ANCHOR_NAMES.FeesDistribution]: {
    label: 'Fees Distribution',
    key: 'fees-distribution'
  }
}

const UniswapProtocolPage = ({ history, isDesktop }) => {
  const areClaimsRestricted = useRestrictedInfo()
  const { isPro } = useUserSubscriptionStatus()

  const [anchors, setAnchors] = useState(ANCHORS)

  const onDisableFeesDistribution = useCallback(
    () => {
      const newAnchors = { ...anchors }
      delete newAnchors[ANCHOR_NAMES.FeesDistribution]
      setAnchors(newAnchors)
    },
    [anchors, setAnchors]
  )

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
            <div className={styles.description}>
              Real-time data on UNI token distribution, total amount of UNI
              claimed, amount of UNI on centralized and decentralized exchange,
              top UNI transactions and more.
            </div>
            <SharePage />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={anchors} />
        </DesktopOnly>

        <div className={styles.inner}>
          <Block
            className={styles.firstBlock}
            tag={anchors.Claimers.key}
            title='UNI Token Claims'
            isPaywalActive={areClaimsRestricted}
          >
            <UniswapMetrics />
          </Block>

          <Block
            tag={anchors.Overview.key}
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
            tag={anchors.TopClaimers.key}
            isPaywalActive={areClaimsRestricted}
          >
            <TopClaimersTable />
          </Block>
          <Block
            tag={anchors.ClaimersWidgets.key}
            title='UNI Claims: Overview'
            isPaywalActive={areClaimsRestricted}
          >
            <ClaimersWidgets />
          </Block>

          <Block title='Who claimed UNI?' tag={anchors.WhoClaimed.key}>
            <UniswapWhoClaimed />
          </Block>

          <Block
            title='UNI Flow Balances'
            tag={anchors.FlowBalances.key}
            isPaywalActive={!isPro}
          >
            <UniswapFlowBalances />
          </Block>

          <Block tag={anchors.TopTransactions.key}>
            <UniswapTopTransactions />
          </Block>

          {anchors.FeesDistribution && (
            <Block tag={anchors.FeesDistribution.key}>
              <FeesDistribution onDisable={onDisableFeesDistribution} />
            </Block>
          )}
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default UniswapProtocolPage
