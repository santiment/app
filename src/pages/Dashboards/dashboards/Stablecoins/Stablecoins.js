import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import Section from '../shared/Section/Section'
import StablecoinsMarketCap from '../../../../ducks/Stablecoins/StablecoinsMarketCap/StablecoinsMarketCap'
import WhaleTrendsList from '../../../../ducks/Stablecoins/WhaleTrendsList/WhaleTrendsList'
import FlowToExchangesList from '../../../../ducks/Stablecoins/FlowToExchanges/FlowToExchangesList'
import TopExchangesTable from '../../../../components/Tables/TopExchanges'
import NetExchangeFlow from '../../../../ducks/Stablecoins/NetExchangeFlow/NetExchangeFlow'
import StablecoinsTransactions from '../../../../ducks/Stablecoins/StablecoinsTransactions/StablecoinsTransactions'
import StablecoinHolderDistribution from '../../../../ducks/Stablecoins/HolderDistribution/StablecoinHolderDistribution'
import TransactionsDominance from '../../../../ducks/Stablecoins/TransactionsDominance/TransactionsDominance'
import NetworkActivity from '../../../../ducks/Stablecoins/NetworkActivity/NetworkActivity'
import CurrentPageReport from '../../../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport'
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall'
import { BlockWithRanges } from '../../../StablecoinsPage/StablecoinsPageStructure'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import { getTimerangePeriod } from '../../../../utils/dates'
import { isStage } from '../../../../utils/utils'
import dashboardsStyles from '../dashboards.module.scss'

const Stablecoins = () => (
  <section className={cx(dashboardsStyles.wrapper, 'column')}>
    <Info
      title='Stablecoins'
      description='Real-time information on the biggest stablecoins’ market size, whale behavior, speculative demand and more.'
    />
    <main className={cx(dashboardsStyles.content, 'column')}>
      <CurrentPageReport />
      <Section id='stablecoins_overview' title='Stablecoins Overview'>
        <div>
          <StablecoinsMarketCap />
        </div>
      </Section>
      <Section
        id='stablecoins_whale_trends'
        title='Whale Trends'
        description='Recent activity of each stablecoins’ top 100 non-exchange addresses'
      >
        <div>
          <CheckProPaywall>
            <WhaleTrendsList />
          </CheckProPaywall>
        </div>
      </Section>
      <Section
        id='stablecoins_flow_exchanges'
        title='Flow to Exchanges'
        description='Estimated level of interest to swap stablecoins for more volatile cryptocurrencies'
      >
        <div>
          <CheckProPaywall>
            <FlowToExchangesList />
          </CheckProPaywall>
        </div>
      </Section>
      <Section id='stablecoins_top_exchanges'>
        <div>
          <TopExchangesTable isStablecoinPage selector={{ watchlistId: isStage ? 1115 : 3985 }} />
        </div>
      </Section>
      <Section id='stablecoins_net_exchange' title='Stablecoin Net Exchange Flow'>
        <div>
          <NetExchangeFlow />
        </div>
      </Section>
      <Section
        id='stablecoins_largest_transactions'
        title='Largest Transactions to Exchanges'
        description='Select an asset to view their largest transactions in the last 24 hours'
      >
        <div>
          <StablecoinsTransactions {...getTimerangePeriod('24h')} />
        </div>
      </Section>
      <Section
        id='stablecoins_holder_distribution'
        title='Holder Distribution'
        description='Number of addresses sorted by their stablecoin balance'
      >
        <div>
          <StablecoinHolderDistribution />
        </div>
      </Section>
      <BlockWithRanges
        className={dashboardsStyles.rangePadding}
        title='Transaction Activity'
        tag='stablecoins_transaction_activity'
        el={TransactionsDominance}
        description='Total amount of stablecoins moving between network addresses'
      />
      <BlockWithRanges
        className={dashboardsStyles.rangePadding}
        title='Network Activity'
        tag='stablecoins_network_activity'
        description='On-chain indicators of stablecoin utility and adoption'
        el={NetworkActivity}
      />
    </main>
  </section>
)

export default withRenderQueueProvider(Stablecoins)
