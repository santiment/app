import React from 'react'
import Header from '../Header/Header'
import { Block } from '../../../StablecoinsPage/StablecoinsPageStructure'
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

const Dex = ({ submenu, shareLinkText, description }) => (
  <div className='column fluid'>
    <Header shareLinkText={shareLinkText} description={description} />

    <div className={dashboardsStyles.content}>
      <CurrentPageReport searchPredicate={DEX_PREDICATE} />
      <Block className={dashboardsStyles.firstBlock} title={submenu[0].title} tag={submenu[0].key}>
        <DexTradesSegmentedByDEX />
      </Block>

      <Block title={submenu[1].title} tag={submenu[1].key}>
        <NumberOfTradesPerDex metrics={DEX_VOLUME_METRICS} />
      </Block>

      <Block title={submenu[2].title} tag={submenu[2].key}>
        <DexTradesTotalNumber measurement={DEX_BY_USD} />
      </Block>

      <Block title={submenu[3].title} tag={submenu[3].key}>
        <NumberOfTradesPerDex metrics={DEX_AMOUNT_METRICS} measurement={DEX_BY_USD} />
      </Block>
    </div>
  </div>
)

export default withRenderQueueProvider(Dex)
