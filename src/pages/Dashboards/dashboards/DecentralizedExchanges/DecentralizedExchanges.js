import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import CurrentPageReport from '../../../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport'
import DexTradesSegmentedByDEX, {
  DEX_VOLUME_METRICS,
} from '../../../../ducks/Dexs/DexTradesSegmentedByDEX/DexTradesSegmentedByDEX'
import NumberOfTradesPerDex from '../../../../ducks/Dexs/NumberOfTradesPerDex/NumberOfTradesPerDex'
import DexTradesTotalNumber, {
  DEX_AMOUNT_METRICS,
} from '../../../../ducks/Dexs/DexTradesTotalNumber/DexTradesTotalNumber'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import { DEX_BY_USD } from '../../../../ducks/Dexs/PriceMeasurement/DexPriceMeasurement'
import dashboardsStyles from '../dashboards.module.scss'

const DEX_PREDICATE = ({ name }) =>
  name.toLowerCase().indexOf('dex') >= 0 || name.toLowerCase().indexOf('decentralized') >= 0

const DecentralizedExchanges = () => (
  <section className={cx(dashboardsStyles.wrapper, 'column')}>
    <Info
      title='Decentralized Exchanges'
      description='Track the on-chain activity on 18 decentralized exchanges, their daily volumes, number of trades and the usage rate of individual DEXes over time. This data is from the main decentralized exchanges namely Balancer, Bancor, Curve, dYdX, Etherdelta, Gnosis, IDEX, Kyber, Oasis, 0x, Tokenstore, Uniswap, AirSwap, DEX.Top and DDEX.'
    />
    <main className={cx(dashboardsStyles.content, 'column')}>
      <CurrentPageReport searchPredicate={DEX_PREDICATE} />
      <div id='dex_volume_trades'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Volume of DEXs Trades</h4>
        <div>
          <DexTradesSegmentedByDEX />
        </div>
      </div>
      <div id='dex_volume_trades_by'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Volume of Trades by DEXs</h4>
        <div>
          <NumberOfTradesPerDex metrics={DEX_VOLUME_METRICS} />
        </div>
      </div>

      <div id='dex_total_trades'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Total Number of DEX Trades</h4>
        <div>
          <DexTradesTotalNumber measurement={DEX_BY_USD} />
        </div>
      </div>

      <div id='dex_segmented_trades'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Number of Trades Segmented by DEX</h4>
        <div>
          <NumberOfTradesPerDex metrics={DEX_AMOUNT_METRICS} measurement={DEX_BY_USD} />
        </div>
      </div>
    </main>
  </section>
)

export default withRenderQueueProvider(DecentralizedExchanges)
