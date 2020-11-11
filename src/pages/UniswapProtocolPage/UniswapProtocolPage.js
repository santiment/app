import React, { useCallback, useState } from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import { UNISWAP_METRIC_BOUNDARIES_QUERY, useRestrictedInfo } from './hooks'
import ClaimersWidgets from '../../components/ClaimersWidgets'
import { ChartWidget } from '../../components/ClaimersWidgets'
import TopClaimersTable from '../../components/ClaimersWidgets/TopClaimers/TopClaimersTable'
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
import FeesDistribution from '../../ducks/Studio/FeesDistribution/FeesDistribution'
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
  TopExchanges: {
    label: 'Top Exchanges',
    key: 'top-exchanges'
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
  },
  MetricsChart: {
    label: 'UNI Price, Age Consumed, Active Addresses (24h)',
    key: 'metrics'
  }
}

const UniswapProtocolPage = ({ history }) => {
  const areClaimsRestricted = useRestrictedInfo(UNISWAP_METRIC_BOUNDARIES_QUERY)
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
          <LeftPageNavigation anchors={anchors} />
        </DesktopOnly>

        <div className={externalStyles.inner}>
          <Block
            className={cx(externalStyles.firstBlock, styles.firstBlock)}
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

          <Block tag={anchors.TopExchanges.key}>
            <TopExchangesTable slug='uniswap' />
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

          <Block
            title={ANCHORS.MetricsChart.label}
            tag={ANCHORS.MetricsChart.key}
          >
            <UniMetricsChart />
          </Block>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default UniswapProtocolPage
