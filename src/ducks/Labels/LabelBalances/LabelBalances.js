import React from 'react'
import DashboardProjectChart from '../../../components/DashboardMetricChart/DashboardProjectChart/DashboardProjectChart'

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

const metricsBuilder = ({ slug }) => {
  return SUPPORTED_METRICS.map(item => {
    return {
      ...item,
      node: 'area',
      reqMeta: {
        slug
      }
    }
  })
}

const LabelBalances = () => (
  <DashboardProjectChart metricsBuilder={metricsBuilder} />
)

export default LabelBalances
