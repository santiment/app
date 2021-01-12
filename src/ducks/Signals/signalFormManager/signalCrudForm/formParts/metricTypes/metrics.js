import { Metric } from '../../../../../dataHub/metrics'

const makeSignalMetric = (key, label, category, node = 'line', group) => {
  return {
    key,
    label,
    category,
    node,
    group
  }
}

export const SIGNAL_SUPPORTED_METRICS = [
  Metric.social_volume_total,
  makeSignalMetric(
    'social_volume_discord',
    'Social volume (discord)',
    'Social'
  ),
  makeSignalMetric(
    'social_volume_professional_traders_chat',
    'Social volume (pro traders chat)',
    'Social'
  ),
  makeSignalMetric('social_volume_reddit', 'Social volume (reddit)', 'Social'),
  makeSignalMetric(
    'social_volume_telegram',
    'Social volume (telegram)',
    'Social'
  ),
  makeSignalMetric(
    'social_volume_twitter',
    'Social volume (twitter)',
    'Social'
  ),

  Metric.volume_usd,
  Metric.age_consumed,
  Metric.exchange_balance,
  makeSignalMetric('price_btc', 'Price BTC', 'Financial'),
  Metric.marketcap_usd,

  makeSignalMetric(
    'community_messages_count_total',
    'Community messages count(total)',
    'Social'
  ),
  makeSignalMetric(
    'community_messages_count_telegram',
    'Community messages count(telegram)',
    'Social'
  ),
  // makeSignalMetric('community_messages_count_discord', 'Community messages count(discord)', 'Social'),

  makeSignalMetric(
    'social_dominance_total',
    'Social dominance (total)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_discord',
    'Social dominance (discord)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_professional_traders_chat',
    'Social dominance (pro traders chat)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_reddit',
    'Social dominance (reddit)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_telegram',
    'Social dominance (telegram)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_twitter',
    'Social dominance (twitter)',
    'Social'
  ),

  Metric.transaction_volume,
  makeSignalMetric(
    'exchange_inflow',
    'Exchange Inflow',
    'On-chain',
    'bar',
    'Exchanges'
  ),
  makeSignalMetric(
    'exchange_outflow',
    'Exchange Outflow',
    'On-chain',
    'bar',
    'Exchanges'
  ),
  Metric.dev_activity,
  makeSignalMetric('github_activity', 'Github Activity', 'Development'),
  makeSignalMetric(
    'mvrv_usd_intraday',
    'MVRV intraday',
    'On-chain',
    'line',
    'Network Value'
  ),
  makeSignalMetric(
    'mvrv_usd_intraday_30d',
    'MVRV intraday (30d)',
    'On-chain',
    'line',
    'Network Value'
  ),
  makeSignalMetric(
    'mvrv_usd_intraday_60d',
    'MVRV intraday (60d)',
    'On-chain',
    'line',
    'Network Value'
  ),
  makeSignalMetric(
    'mvrv_usd_intraday_90d',
    'MVRV intraday (90d)',
    'On-chain',
    'line',
    'Network Value'
  ),
  makeSignalMetric(
    'mvrv_usd_intraday_180d',
    'MVRV intraday (180d)',
    'On-chain',
    'line',
    'Network Value'
  ),
  makeSignalMetric(
    'mvrv_usd_intraday_365d',
    'MVRV intraday (365d)',
    'On-chain',
    'line',
    'Network Value'
  ),
  Metric.network_profit_loss,
  makeSignalMetric(
    'active_deposits_5m',
    'Daily Active Deposits (5m)',
    'On-chain',
    'bar',
    'Exchanges'
  ),
  makeSignalMetric(
    'deposit_transactions_5m',
    'Deposit Transactions (5m)',
    'On-chain',
    'line',
    'Exchanges'
  )
]
