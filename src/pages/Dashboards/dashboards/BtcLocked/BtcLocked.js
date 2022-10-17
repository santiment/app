import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import BtcStatistics from '../../../../ducks/BtcDistribution/BtcStatistics/BtcStatistics'
import DistributionBtcOnEth from '../../../../ducks/BtcDistribution/DistributionBtcOnEth/DistributionBtcOnEth'
import TotalBtcOnEth from '../../../../ducks/BtcDistribution/TotalBtcOnEth/TotalBtcOnEth'
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall'
import { useRestrictedInfo } from '../../../UniswapProtocolPage/hooks'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import { METRIC_BOUNDARIES_QUERY } from './queries'
import dashboardsStyles from '../dashboards.module.scss'

const BtcLocked = () => {
  const isProChecking = useRestrictedInfo(METRIC_BOUNDARIES_QUERY)

  return (
    <section className={cx(dashboardsStyles.wrapper, 'column')}>
      <Info title='Bitcoin Locked on Ethereum' description='' />
      <main className={cx(dashboardsStyles.content, 'column')}>
        <div id='btc_total_supply'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Total Supply</h4>
          <div>
            {isProChecking ? (
              <CheckProPaywall>
                <BtcStatistics />
              </CheckProPaywall>
            ) : (
              <BtcStatistics />
            )}
          </div>
        </div>
        <div id='btc_distribution'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Distribution of Bitcoin on Ethereum</h4>
          <div>
            <DistributionBtcOnEth />
          </div>
        </div>
        <div id='btc_total_eth'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Total BTC on Ethereum</h4>
          <div>
            <TotalBtcOnEth />
          </div>
        </div>
      </main>
    </section>
  )
}

export default withRenderQueueProvider(BtcLocked)
