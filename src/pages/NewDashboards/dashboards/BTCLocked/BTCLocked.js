import React from 'react'
import gql from 'graphql-tag'
import Header from '../Header/Header'
import { Block } from '../../../StablecoinsPage/StablecoinsPageStructure'
import BtcStatistics from '../../../../ducks/BtcDistribution/BtcStatistics/BtcStatistics'
import DistributionBtcOnEth from '../../../../ducks/BtcDistribution/DistributionBtcOnEth/DistributionBtcOnEth'
import TotalBtcOnEth from '../../../../ducks/BtcDistribution/TotalBtcOnEth/TotalBtcOnEth'
import { useRestrictedInfo } from '../../../UniswapProtocolPage/hooks'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import dashboardsStyles from '../dashboards.module.scss'

const METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "total_supply") {
      metadata {
        isRestricted
      }
    }
  }
`

const BtcLocked = ({ submenu, shareLinkText, description }) => {
  const isProChecking = useRestrictedInfo(METRIC_BOUNDARIES_QUERY)

  return (
    <div className='column fluid'>
      <Header shareLinkText={shareLinkText} description={description} />
      <div className={dashboardsStyles.content}>
        <Block
          className={dashboardsStyles.firstBlock}
          isPaywalActive={isProChecking}
          tag={submenu[0].key}
          title={submenu[0].title}
        >
          <BtcStatistics />
        </Block>

        <Block tag={submenu[1].key} title={submenu[1].title}>
          <DistributionBtcOnEth />
        </Block>

        <Block tag={submenu[2].key} title={submenu[2].title}>
          <TotalBtcOnEth />
        </Block>
      </div>
    </div>
  )
}

export default withRenderQueueProvider(BtcLocked)
