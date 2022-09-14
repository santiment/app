import React from 'react'
import Header from '../Header/Header'
import { Block, BlockWithRanges } from '../../../StablecoinsPage/StablecoinsPageStructure'
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
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import { getTimerangePeriod } from '../../../../utils/dates'
import { isStage } from '../../../../utils/utils'
import dashboardsStyles from '../dashboards.module.scss'

const Stablecoin = ({ submenu, shareLinkText, description }) => (
  <div className='column fluid'>
    <Header shareLinkText={shareLinkText} description={description} />
    <div className={dashboardsStyles.content}>
      <CurrentPageReport />
      <Block title={submenu[0].title} tag={submenu[0].key} className={dashboardsStyles.firstBlock}>
        <StablecoinsMarketCap />
      </Block>
      <Block
        title={submenu[1].title}
        tag={submenu[1].key}
        description='Recent activity of each stablecoins’ top 100 non-exchange addresses'
        isPaywalActive
      >
        <WhaleTrendsList />
      </Block>
      <Block
        title={submenu[2].title}
        tag={submenu[2].key}
        description='Estimated level of interest to swap stablecoins for more volatile cryptocurrencies'
        isPaywalActive
      >
        <FlowToExchangesList />
      </Block>
      <Block tag={submenu[3].key}>
        <TopExchangesTable isStablecoinPage selector={{ watchlistId: isStage ? 1115 : 3985 }} />
      </Block>
      <Block title={submenu[4].title} tag={submenu[4].key}>
        <NetExchangeFlow />
      </Block>
      <Block
        title={submenu[5].title}
        tag={submenu[5].key}
        description='Select an asset to view their largest transactions in the last 24 hours'
      >
        <StablecoinsTransactions {...getTimerangePeriod('24h')} />
      </Block>
      <Block
        title={submenu[6].title}
        tag={submenu[6].key}
        description='Number of addresses sorted by their stablecoin balance'
      >
        <StablecoinHolderDistribution />
      </Block>
      <BlockWithRanges
        title={submenu[7].title}
        tag={submenu[7].key}
        el={TransactionsDominance}
        description='Total amount of stablecoins moving between network addresses'
      />
      <BlockWithRanges
        title={submenu[8].title}
        tag={submenu[8].key}
        description='On-chain indicators of stablecoin utility and adoption'
        el={NetworkActivity}
      />
    </div>
  </div>
)

export default withRenderQueueProvider(Stablecoin)
