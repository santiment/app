import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import { UNISWAP_METRIC_BOUNDARIES_QUERY, useRestrictedInfo } from './hooks'
import ClaimersWidgets from '../../components/ClaimersWidgets'
import { ChartWidget } from '../../components/ClaimersWidgets'
import TopClaimersTable from '../../components/Tables/TopClaimers'
import TopExchangesTable from '../../components/Tables/TopExchanges'
import { DesktopOnly } from '../../components/Responsive'
import { Block } from '../StablecoinsPage/StablecoinsPageStructure'
import { Metric } from '../../ducks/dataHub/metrics'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import UniswapHistoricalBalance from '../../ducks/Studio/Tabs/UniswapHistoricalBalance/UniswapHistoricalBalance'
import UniswapTopTransactions from '../../ducks/UniswapProtocol/UniswapTopTransactions/UniswapTopTransactions'
import UniswapMetrics from '../../ducks/UniswapProtocol/UniswapMetrics/UniswapMetrics'
import UniswapWhoClaimed from '../../ducks/UniswapProtocol/UniswapPieChart/WhoClaimedPieChart'
import UniswapFlowBalances from '../../ducks/UniswapProtocol/UniswapFlowBalances'
import SharePage from '../../components/SharePage/SharePage'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import UniMetricsChart from '../../ducks/UniswapProtocol/UniMetricsChart/UniMetricsChart'
import externalStyles from './../StablecoinsPage/StablecoinsPage.module.scss'
import styles from './UniswapProtocolPage.module.scss'

const BALANCE_CHART_PADDING = {
  top: 16,
  right: 45,
  bottom: 18,
  left: 45
}

const BALANCE_CHART_TICKS = {
  xTicks: 6,
  yTicks: 6
}

const ANCHORS = {
  TopExchanges: {
    label: 'Top Exchanges',
    key: 'top-exchanges'
  },
  FlowBalances: {
    label: 'UNI Flow Balances',
    key: 'flow-balances'
  },
  TopTransactions: {
    label: 'Top Token Transactions',
    key: 'top-transactions'
  },
  MetricsChart: {
    label: 'UNI Price, Age Consumed, Active Addresses (24h)',
    key: 'metrics'
  },

  TopClaimers: {
    label: 'Top Claimers',
    key: 'top-claimers'
  },
  Claimers: {
    label: 'UNI Token Claims',
    key: 'claimers'
  },
  Overview: {
    label: 'Token Distributor',
    key: 'token-distributor'
  },
  ClaimersWidgets: {
    label: 'UNI Claims: Overview',
    key: 'claimers-widgets'
  },
  WhoClaimed: {
    label: 'Who claimed UNI?',
    key: 'who-claimed'
  }
}

const ANCHORS_TREE = [
  {
    title: 'General',
    list: [
      ANCHORS.TopExchanges,
      ANCHORS.FlowBalances,
      ANCHORS.TopTransactions,
      ANCHORS.MetricsChart
    ]
  },
  {
    title: 'Initial Distribution',
    list: [
      ANCHORS.Claimers,
      ANCHORS.Overview,
      ANCHORS.TopClaimers,
      ANCHORS.ClaimersWidgets,
      ANCHORS.WhoClaimed
    ]
  }
]

const UniswapProtocolPage = () => {
  const areClaimsRestricted = useRestrictedInfo(UNISWAP_METRIC_BOUNDARIES_QUERY)
  const { isPro } = useUserSubscriptionStatus()

  return (
    <DashboardLayout>
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

      <div className={externalStyles.header}>
        <div className={cx(externalStyles.inner, externalStyles.content)}>
          <div className={externalStyles.pageDescription}>
            <h3 className={externalStyles.title}>Uniswap Protocol Dashboard</h3>
            <div className={externalStyles.description}>
              Real-time data on UNI token distribution, total amount of UNI
              claimed, amount of UNI on centralized and decentralized exchange,
              top UNI transactions and more.
            </div>
            <SharePage />
          </div>
        </div>
      </div>

      <div className={externalStyles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS_TREE} />
        </DesktopOnly>

        <div className={externalStyles.inner}>
          <Block
            tag={ANCHORS.TopExchanges.key}
            className={cx(externalStyles.firstBlock, styles.firstBlock)}
          >
            <TopExchangesTable slug='uniswap' />
          </Block>
          <Block
            title='UNI Flow Balances'
            tag={ANCHORS.FlowBalances.key}
            isPaywalActive={!isPro}
          >
            <UniswapFlowBalances />
          </Block>
          <Block tag={ANCHORS.TopTransactions.key}>
            <UniswapTopTransactions />
          </Block>
          <Block
            title={ANCHORS.MetricsChart.label}
            tag={ANCHORS.MetricsChart.key}
            description='Daily active addresses signal the overall level of speculative (and utilitarian) interest in a digital asset. As a result, sustained price rallies tend to necessitate a strong uptick in active addresses. Spikes in Age Consumed point to a substantial amount of previously idle coins moving addresses, suggesting a shift in the behavior of long-term investors. These shifts are often strong indicators of upcoming price volatility in either direction.'
          >
            <UniMetricsChart />
          </Block>

          <Block
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
                className={styles.balance__chart}
                headerClassName={styles.balance__header}
                axesTicks={BALANCE_CHART_TICKS}
                padding={BALANCE_CHART_PADDING}
                height={448}
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
            isPaywalActive={areClaimsRestricted}
          >
            <TopClaimersTable />
          </Block>
          <Block
            tag={ANCHORS.ClaimersWidgets.key}
            title='UNI Claims: Overview'
            isPaywalActive={areClaimsRestricted}
          >
            <ClaimersWidgets />
          </Block>
          <Block title='Who claimed UNI?' tag={ANCHORS.WhoClaimed.key}>
            <UniswapWhoClaimed />
          </Block>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default UniswapProtocolPage
