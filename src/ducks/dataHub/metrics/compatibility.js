import { Metric } from './index'

export const CompatibleMetric = {
  // old              : new
  dailyActiveDeposits: Metric.active_deposits,
  percentOfTokenSupplyOnExchanges: Metric.percent_of_total_supply_on_exchanges,
  historyTwitterData: Metric.twitter_followers,
  socialDominance: Metric.social_dominance_total,
  socialVolume: Metric.social_volume_total,
  devActivity: Metric.dev_activity,
  historyPrice: Metric.price_usd,
  volume: Metric.volume_usd,
  marketcap: Metric.marketcap_usd,
  dailyActiveAddresses: Metric.daily_active_addresses,
  tokenCirculation: Metric.circulation,
  mvrvRatio: Metric.mvrv_usd,
  transactionVolume: Metric.transaction_volume,
  tokenVelocity: Metric.velocity,
  realizedValue: Metric.realized_value_usd,
  networkGrowth: Metric.network_growth,
  nvtRatioCirculation: Metric.nvt,
  nvtRatioTxVolume: Metric.nvt_transaction_volume,
  tokenAgeConsumed: Metric.age_destroyed,
  exchangeFundsFlow: Metric.exchange_balance
}
