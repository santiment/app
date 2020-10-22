import React from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'
import { DEFAULT_INTERVAL_SELECTORS } from '../../../components/DashboardMetricChart/utils'

const SELECTOR = {
  slug: 'ethereum'
}

function makeMetric (key, label) {
  return {
    key,
    label
  }
}

const SUPPORTED_METRICS = [
  makeMetric('all_known_balance', 'All labeled addresses'),
  makeMetric('unlabeled_balance', 'All unlabeled addresses'),
  makeMetric('miners_balance', 'Miners'),
  makeMetric('genesis_balance', 'Genesis'),
  makeMetric('dex_trader_balance', 'DEX Traders'),
  makeMetric('defi_balance', 'DeFi'),
  makeMetric('dex_balance', 'DEXes'),
  makeMetric('cex_balance', 'CEXes'),
  makeMetric('withdrawal_balance', 'CEX Withdrawals'),
  makeMetric('deposit_balance', 'CEX Deposits'),
  makeMetric('proxy_balance', 'Proxies'),
  makeMetric('whale_balance', 'Whales'),
  makeMetric('makerdao_bite_keeper_balance', 'MakerDAO Bite Keepers'),
  makeMetric('makerdao_cdp_owner_balance', 'MakerDAO CDP Owners')
]

const METRICS = SUPPORTED_METRICS.map(m => ({
  ...m,
  node: 'area',
  reqMeta: {
    ...SELECTOR
  }
}))

const LabelBalances = () => {
  return (
    <DashboardMetricChart
      metrics={METRICS}
      intervals={DEFAULT_INTERVAL_SELECTORS}
    />
  )
}

export default LabelBalances
