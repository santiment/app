import gql from 'graphql-tag'

export const GET_METRIC = ({ key, queryKey = key }) => gql`
  query getMetric(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval
  ) {
    getMetric(metric: "${queryKey}") {
      timeseriesData(slug: $slug, from: $from, to: $to, interval: $interval) {
        datetime
        ${key}: value
      }
    }
  }
`

// Available metrics could be fetched via "getAvailableMetrics" query
export const METRICS = [
  'age_distribution',
  'price_usd',
  'price_btc',
  'volume_usd',
  'marketcap_usd',
  'telegram_social_dominance',
  'reddit_social_dominance',
  'discord_social_dominance',
  'telegram_social_volume',
  'discord_social_volume',
  'realized_value_usd_180d',
  'mvrv_usd_2y',
  'circulation_90d',
  'transaction_volume',
  'mvrv_usd_7d',
  'daily_opening_price_usd',
  'mvrv_usd_5y',
  'circulation_60d',
  'realized_value_usd_1d',
  'circulation_3y',
  'daily_closing_marketcap_usd',
  'mean_realized_price_usd_1d',
  'mvrv_usd_365d',
  'mvrv_long_short_diff_usd',
  'network_growth',
  'mean_realized_price_usd_7d',
  'mean_realized_price_usd_365d',
  'daily_closing_price_usd',
  'realized_value_usd_90d',
  'mvrv_usd_90d',
  'active_addresses_24h',
  'realized_value_usd_30d',
  'exchange_balance',
  'mvrv_usd_3y',
  'circulation',
  'circulation_10y',
  'mvrv_usd',
  'mean_dollar_invested_age',
  'mean_realized_price_usd_60d',
  'nvt_transaction_volume',
  'exchange_inflow',
  'circulation_180d',
  'mean_realized_price_usd_5y',
  'active_deposits',
  'mvrv_usd_10y',
  'daily_high_price_usd',
  'exchange_outflow',
  'realized_value_usd_3y',
  'realized_value_usd_60d',
  'circulation_30d',
  'realized_value_usd_10y',
  'realized_value_usd_7d',
  'mvrv_usd_180d',
  'nvt',
  'daily_trading_volume_usd',
  'mean_realized_price_usd_10y',
  'age_destroyed',
  'circulation_2y',
  'realized_value_usd_5y',
  'mean_realized_price_usd_90d',
  'circulation_365d',
  'mean_realized_price_usd_2y',
  'mean_age',
  'daily_avg_price_usd',
  'daily_avg_marketcap_usd',
  'mvrv_usd_1d',
  'realized_value_usd_2y',
  'withdrawal_transactions',
  'mvrv_usd_30d',
  'realized_value_usd',
  'mean_realized_price_usd',
  'daily_low_price_usd',
  'mean_realized_price_usd_3y',
  'mvrv_usd_60d',
  'mean_realized_price_usd_180d',
  'daily_active_addresses',
  'active_withdrawals',
  'velocity',
  'circulation_1d',
  'realized_value_usd_365d',
  'circulation_7d',
  'circulation_5y',
  'mean_realized_price_usd_30d',
  'dev_activity',
  'dev_activity_contributors_count',
  'github_activity',
  'github_activity_contributors_count'
]
