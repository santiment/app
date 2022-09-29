import React from 'react'
import Header from '../Header/Header'
import { Block } from '../../../StablecoinsPage/StablecoinsPageStructure'
import EthStakingPools from '../../../../ducks/Eth2.0/EthStakingPools/EthStakingPools'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import dashboardsStyles from '../dashboards.module.scss'

const EthStakingPoolsPage = ({ submenu, shareLinkText, description }) => (
  <div className='column fluid'>
    <Header shareLinkText={shareLinkText} description={description} />
    <div className={dashboardsStyles.content}>
      <Block className={dashboardsStyles.firstBlock} title={submenu[0].title} tag={submenu[0].key}>
        <EthStakingPools />
      </Block>
      <Block title={submenu[1].title} tag={submenu[1].key}>
        <EthStakingPools metric='eth2_staking_pools_usd' />
      </Block>
    </div>
  </div>
)

export default withRenderQueueProvider(EthStakingPoolsPage)
