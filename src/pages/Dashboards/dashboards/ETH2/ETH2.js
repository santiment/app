import React from 'react'
import Header from '../Header/Header'
import { Block } from '../../../StablecoinsPage/StablecoinsPageStructure'
import EthStakingRoi from '../../../../ducks/Eth2.0/EthStakingRoi/EthStakingRoi'
import EthTotalStaked from '../../../../ducks/Eth2.0/TotalStaked/EthTotalStaked'
import EthStakedAmountByLabel from '../../../../ducks/Eth2.0/EthStakedAmountByLabel/EthStakedAmountByLabel'
import EthStakedAddressesByLabel from '../../../../ducks/Eth2.0/EthStakedAddressesByLabel/EthStakedAddressesByLabel'
import EthUnlabeledStackerInflow from '../../../../ducks/Eth2.0/EthUnlabeledStackerInflow/EthUnlabeledStackerInflow'
import EthTopStakers from '../../../../ducks/Eth2.0/EthTopStakers/EthTopStakers'
import EthStakingPools from '../../../../ducks/Eth2.0/EthStakingPools/EthStakingPools'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import dashboardsStyles from '../dashboards.module.scss'

const Eth2 = ({ submenu, shareLinkText, description }) => (
  <div className='column fluid'>
    <Header shareLinkText={shareLinkText} description={description} />
    <div className={dashboardsStyles.content}>
      <Block className={dashboardsStyles.firstBlock} title={submenu[0].title} tag={submenu[0].key}>
        <EthStakingRoi />
      </Block>
      <Block title={submenu[1].title} tag={submenu[1].key}>
        <EthTotalStaked />
      </Block>
      <Block title={submenu[2].title} tag={submenu[2].key}>
        <EthStakedAmountByLabel />
      </Block>
      <Block title={submenu[3].title} tag={submenu[3].key}>
        <EthStakedAddressesByLabel />
      </Block>
      <Block title={submenu[4].title} tag={submenu[4].key}>
        <EthUnlabeledStackerInflow />
      </Block>
      <Block title={submenu[5].title} tag={submenu[5].key}>
        <EthTopStakers />
      </Block>
      <Block title={submenu[6].title} tag={submenu[6].key}>
        <EthStakingPools />
      </Block>
    </div>
  </div>
)

export default withRenderQueueProvider(Eth2)
