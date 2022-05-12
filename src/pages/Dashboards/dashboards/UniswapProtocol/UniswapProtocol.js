import React from 'react'
import Header from '../Header/Header'
import { Block } from '../../../StablecoinsPage/StablecoinsPageStructure'
import TopExchangesTable from '../../../../components/Tables/TopExchanges'
import UniswapFlowBalances from '../../../../ducks/UniswapProtocol/UniswapFlowBalances'
import UniswapTopTransactions from '../../../../ducks/UniswapProtocol/UniswapTopTransactions/UniswapTopTransactions'
import UniMetricsChart from '../../../../ducks/UniswapProtocol/UniMetricsChart/UniMetricsChart'
import UniswapMetrics from '../../../../ducks/UniswapProtocol/UniswapMetrics/UniswapMetrics'
import UniswapHistoricalBalance from '../../../../ducks/Studio/Tabs/UniswapHistoricalBalance/UniswapHistoricalBalance'
import ClaimersWidgets, { ChartWidget } from '../../../../components/ClaimersWidgets'
import TopClaimersTable from '../../../../components/Tables/TopClaimers'
import UniswapWhoClaimed from '../../../../ducks/UniswapProtocol/UniswapPieChart/WhoClaimedPieChart'
import {
  UNISWAP_METRIC_BOUNDARIES_QUERY,
  useRestrictedInfo,
} from '../../../UniswapProtocolPage/hooks'
import { Metric } from '../../../../ducks/dataHub/metrics'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import dashboardsStyles from '../dashboards.module.scss'
import styles from '../../../UniswapProtocolPage/UniswapProtocolPage.module.scss'

const BALANCE_CHART_PADDING = {
  top: 16,
  right: 45,
  bottom: 18,
  left: 45,
}

const BALANCE_CHART_TICKS = {
  xTicks: 6,
  yTicks: 6,
}

const UniswapProtocol = ({ submenu, shareLinkText, description }) => {
  const areClaimsRestricted = useRestrictedInfo(UNISWAP_METRIC_BOUNDARIES_QUERY)
  const { isPro } = useUserSubscriptionStatus()

  return (
    <div className='column fluid'>
      <Header shareLinkText={shareLinkText} description={description} />
      <div className={dashboardsStyles.content}>
        <Block tag={submenu[1].key} className={dashboardsStyles.firstBlock}>
          <TopExchangesTable slug='uniswap' />
        </Block>
        <Block tag={submenu[2].key} title={submenu[2].title} isPaywalActive={!isPro}>
          <UniswapFlowBalances />
        </Block>
        <Block tag={submenu[3].key}>
          <UniswapTopTransactions />
        </Block>
        <Block
          tag={submenu[4].key}
          title={submenu[4].title}
          description='Daily active addresses signal the overall level of speculative (and utilitarian) interest in a digital asset. As a result, sustained price rallies tend to necessitate a strong uptick in active addresses. Spikes in Age Consumed point to a substantial amount of previously idle coins moving addresses, suggesting a shift in the behavior of long-term investors. These shifts are often strong indicators of upcoming price volatility in either direction.'
        >
          <UniMetricsChart />
        </Block>
        <Block tag={submenu[6].key} title={submenu[6].title} isPaywalActive={areClaimsRestricted}>
          <UniswapMetrics />
        </Block>
        <Block
          tag={submenu[7].key}
          title={submenu[7].title}
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
              metrics={[Metric.uniswap_total_claims_amount, Metric.uniswap_total_claims_percent]}
            />
          </div>
        </Block>
        <Block tag={submenu[8].key} isPaywalActive={areClaimsRestricted}>
          <TopClaimersTable />
        </Block>
        <Block tag={submenu[9].key} title={submenu[9].title} isPaywalActive={areClaimsRestricted}>
          <ClaimersWidgets />
        </Block>
        <Block tag={submenu[10].key} title={submenu[10].title}>
          <UniswapWhoClaimed />
        </Block>
      </div>
    </div>
  )
}

export default UniswapProtocol
