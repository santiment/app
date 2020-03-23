import gql from 'graphql-tag'

export const GET_METRIC = ({ key, queryKey = key, reqMeta = {} }) => {
  const { text } = reqMeta

  return text
    ? gql`
  query getMetric(
    $text: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval
    $transform: TimeseriesMetricTransformInputObject
  ) {
    getMetric(metric: "${queryKey}") {
      timeseriesData(selector: { text: $text}, from: $from, to: $to, interval: $interval, transform: $transform) {
        datetime
        ${key}: value
      }
    }
  }
`
    : gql`
  query getMetric(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval
    $transform: TimeseriesMetricTransformInputObject
  ) {
    getMetric(metric: "${queryKey}") {
      timeseriesData(slug: $slug, from: $from, to: $to, interval: $interval, transform: $transform) {
        datetime
        ${key}: value
      }
    }
  }
`
}

// Available metrics could be fetched via "getAvailableMetrics" query
export const METRICS = [
  'age_distribution',
  'price_histogram',
  'price_usd',
  'price_btc',
  'volume_usd',
  'marketcap_usd',
  'social_dominance_telegram',
  'social_dominance_discord',
  'social_dominance_reddit',
  'social_dominance_professional_traders_chat',
  'social_dominance_total',
  'social_volume_telegram',
  'social_volume_discord',
  'social_volume_reddit',
  'social_volume_professional_traders_chat',
  'social_volume_total',
  'community_messages_count_telegram',
  'community_messages_count_discord',
  'community_messages_count_total',
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
  'price_usd_change_7d',
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
  'volume_usd_change_7d',
  'circulation_180d',
  'mean_realized_price_usd_5y',
  'active_deposits',
  'volume_usd_change_30d',
  'mvrv_usd_10y',
  'daily_high_price_usd',
  'exchange_outflow',
  'volume_usd_change_1d',
  'realized_value_usd_3y',
  'realized_value_usd_60d',
  'circulation_30d',
  'realized_value_usd_10y',
  'realized_value_usd_7d',
  'mvrv_usd_180d',
  'nvt',
  'daily_trading_volume_usd',
  'mean_realized_price_usd_10y',
  'active_addresses_24h_change_7d',
  'active_addresses_24h_change_1d',
  'age_destroyed',
  'circulation_2y',
  'realized_value_usd_5y',
  'price_usd_change_1d',
  'mean_realized_price_usd_90d',
  'circulation_365d',
  'mean_realized_price_usd_2y',
  'exchange_token_supply',
  'mean_age',
  'active_addresses_24h_change_30d',
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
  'price_usd_change_30d',
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
  'github_activity_contributors_count',
  'twitter_followers'
]
