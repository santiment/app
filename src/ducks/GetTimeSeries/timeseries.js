import { DEV_ACTIVITY_QUERY } from './queries/dev_activity_query'
import { MARKET_SEGMENT_QUERY } from './queries/market_segment_query'
import { ETH_SPENT_OVER_TIME_QUERY } from './queries/eth_spent_over_time_query'
import { ETH_SPENT_OVER_TIME_BY_ALL_PROJECTS_QUERY } from './queries/eth_spent_over_time_by_all_projects_query'
import { BURN_RATE_QUERY } from './queries/burn_rate_query'
import { HISTORY_TWITTER_DATA_QUERY } from './queries/history_twitter_data_query'
import { SOCIAL_VOLUME_QUERY } from './queries/social_volume_query'
import { DAILY_ACTIVE_DEPOSITS_QUERY } from './queries/daily_active_deposits_query'
import { SOCIAL_DOMINANCE_QUERY } from './queries/social_dominance_query'
import { PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES } from './queries/percent_of_token_supply_on_exchanges_query'
import { TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY } from './queries/top_holders_percent_of_total_supply'
import { GAS_USED_QUERY } from './queries/gas_used'
import { PROJECT_TREND_HISTORY_QUERY } from './queries/project_trend_history_query'
import { METRIC_ANOMALIE_QUERY } from './queries/metric_anomaly_query'
import { GET_METRIC } from './queries/get_metric'
import { mergeTimeseriesByKey } from './../../utils/utils'
import { HISTORICAL_BALANCE_QUERY } from '../HistoricalBalance/common/queries'

const getMetricPreTransform = ({ getMetric: { timeseriesData } }) =>
  timeseriesData

const queryBuild = (type, preTransform = getMetricPreTransform) => {
  return {
    query: GET_METRIC(type),
    preTransform
  }
}
/*
   getMetric API available metrics could be seen by querying data with "getAvailableMetrics"
*/
const TIMESERIES = {
  ethSpentOverTime: {
    query: ETH_SPENT_OVER_TIME_QUERY,
    preTransform: ({ ethSpentOverTime: { ethSpentOverTime } }) =>
      ethSpentOverTime
  },
  EthSpentOverTimeByAllProjects: {
    query: ETH_SPENT_OVER_TIME_BY_ALL_PROJECTS_QUERY,
    preTransform: ({ ethSpentOverTimeByAllProjects: ethSpentOverTime }) =>
      ethSpentOverTime
  },
  nvt: {
    query: GET_METRIC('nvt'),
    preTransform: getMetricPreTransform
  },
  nvt_transaction_volume: {
    query: GET_METRIC('nvt_transaction_volume'),
    preTransform: getMetricPreTransform
  },
  burnRate: {
    query: BURN_RATE_QUERY
  },
  realized_value_usd: {
    query: GET_METRIC('realized_value_usd'),
    preTransform: getMetricPreTransform
  },
  historyTwitterData: {
    query: HISTORY_TWITTER_DATA_QUERY
  },
  historicalBalance: {
    query: HISTORICAL_BALANCE_QUERY
  },
  price_usd: {
    query: GET_METRIC('price_usd'),
    preTransform: getMetricPreTransform
  },
  volume_usd: {
    query: GET_METRIC('volume_usd'),
    preTransform: getMetricPreTransform
  },
  marketcap_usd: {
    query: GET_METRIC('marketcap_usd'),
    preTransform: getMetricPreTransform
  },
  devActivity: {
    query: DEV_ACTIVITY_QUERY
  },
  dev_activity: {
    query: GET_METRIC('dev_activity'),
    preTransform: getMetricPreTransform
  },
  socialDominance: {
    query: SOCIAL_DOMINANCE_QUERY
  },
  percentOfTokenSupplyOnExchanges: {
    query: PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES,
    preTransform: ({ percentOnExchanges }) => percentOnExchanges
  },
  topHoldersPercentOfTotalSupply: {
    query: TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY
  },
  age_destroyed: {
    query: GET_METRIC('age_destroyed'),
    preTransform: getMetricPreTransform
  },
  exchange_balance: {
    query: GET_METRIC('exchange_balance'),
    preTransform: getMetricPreTransform
  },
  daily_active_addresses: {
    query: GET_METRIC('daily_active_addresses'),
    preTransform: getMetricPreTransform
  },
  circulation: {
    query: GET_METRIC('circulation'),
    preTransform: getMetricPreTransform
  },
  dormant_circulation: {
    query: GET_METRIC('dormant_circulation'),
    preTransform: getMetricPreTransform
  },
  mvrv_usd: {
    query: GET_METRIC('mvrv_usd'),
    preTransform: getMetricPreTransform
  },
  dailyActiveDeposits: {
    query: DAILY_ACTIVE_DEPOSITS_QUERY
  },
  velocity: {
    query: GET_METRIC('velocity'),
    preTransform: getMetricPreTransform
  },
  transaction_volume: {
    query: GET_METRIC('transaction_volume'),
    preTransform: getMetricPreTransform
  },
  network_growth: {
    query: GET_METRIC('network_growth'),
    preTransform: getMetricPreTransform
  },
  social_volume_total: queryBuild('social_volume_total'),
  gasUsed: {
    query: GAS_USED_QUERY
  },
  socialVolume: {
    query: SOCIAL_VOLUME_QUERY,
    title: 'Social Volume',
    preTransform: data =>
      mergeTimeseriesByKey({
        key: 'datetime',
        timeseries: Object.values(data),
        mergeData: (longestTSData, timeserieData) => ({
          socialVolume: longestTSData.socialVolume + timeserieData.socialVolume,
          datetime: longestTSData.datetime
        })
      })
  },
  trendPositionHistory: {
    query: PROJECT_TREND_HISTORY_QUERY,
    preTransform: ({ getProjectTrendingHistory: data }) =>
      data.filter(({ position }) => position)
  },
  anomalies: {
    query: METRIC_ANOMALIE_QUERY,
    preTransform: ({ metricAnomaly: anomalies = [] }, metricAnomalyKey) => {
      return anomalies.map(anomaly => ({ ...anomaly, metricAnomalyKey })) || []
    }
  },
  marketSegment: {
    query: MARKET_SEGMENT_QUERY,
    preTransform: ({ devActivity }) => devActivity
  },
  mean_dollar_invested_age: {
    query: GET_METRIC('mean_dollar_invested_age'),
    preTransform: getMetricPreTransform
  },
  price_btc: queryBuild('price_btc'),
  price_eth: queryBuild('price_eth'),
  exchange_inflow: queryBuild('exchange_inflow'),
  exchange_outflow: queryBuild('exchange_outflow'),
  github_activity: queryBuild('github_activity'),
  community_messages_count_discord: queryBuild(
    'community_messages_count_discord'
  ),
  community_messages_count_telegram: queryBuild(
    'community_messages_count_telegram'
  ),
  community_messages_count_total: queryBuild('community_messages_count_total'),
  social_dominance_discord: queryBuild('social_dominance_discord'),
  social_dominance_professional_traders_chat: queryBuild(
    'social_dominance_professional_traders_chat'
  ),
  social_dominance_reddit: queryBuild('social_dominance_reddit'),
  social_dominance_total: queryBuild('social_dominance_total'),
  social_dominance_telegram: queryBuild('social_dominance_telegram'),
  social_volume_professional_traders_chat: queryBuild(
    'social_volume_professional_traders_chat'
  ),
  social_volume_reddit: queryBuild('social_volume_reddit'),
  social_volume_discord: queryBuild('social_volume_discord'),
  social_volume_telegram: queryBuild('social_volume_telegram'),
  social_volume_twitter: queryBuild('social_volume_twitter'),
  mean_age: queryBuild('mean_age'),

  mvrv_usd_intraday: queryBuild('mvrv_usd_intraday'),
  stock_to_flow: queryBuild('stock_to_flow')
}

export const hasMetric = metric => !!TIMESERIES[metric]
export const getMetricQUERY = metric => TIMESERIES[metric].query
export const getPreTransform = (name, metricAnomalyKey, alias = name) => {
  const transform = TIMESERIES[name].preTransform

  return ({ data, ...rest }) => ({
    ...rest,
    data: transform ? { [alias]: transform(data, metricAnomalyKey) } : data,
    __metric: alias
  })
}
