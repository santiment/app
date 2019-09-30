import { DEV_ACTIVITY_QUERY } from './queries/dev_activity_query'
import { MARKET_SEGMENT_QUERY } from './queries/market_segment_query'
import { HISTORY_PRICE_QUERY } from './queries/history_price_query'
import { ETH_SPENT_OVER_TIME_QUERY } from './queries/eth_spent_over_time_query'
import { ETH_SPENT_OVER_TIME_BY_ALL_PROJECTS_QUERY } from './queries/eth_spent_over_time_by_all_projects_query'
import { BURN_RATE_QUERY } from './queries/burn_rate_query'
import { NVT_RATIO_QUERY } from './queries/nvt_ratio_query'
import { HISTORY_TWITTER_DATA_QUERY } from './queries/history_twitter_data_query'
import { SOCIAL_VOLUME_QUERY } from './queries/social_volume_query'
import { EXCHANGE_FUNDS_FLOW_QUERY } from './queries/exchange_funds_flow_query'
import { TOKEN_AGE_CONSUMED_QUERY } from './queries/token_age_consumed_query'
import { DAILY_ACTIVE_DEPOSITS_QUERY } from './queries/daily_active_deposits_query'
import { NETWORK_GROWTH_QUERY } from './queries/network_growth_query'
import { SOCIAL_DOMINANCE_QUERY } from './queries/social_dominance_query'
import { PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES } from './queries/percent_of_token_supply_on_exchanges_query'
import { TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY } from './queries/top_holders_percent_of_total_supply'
import { GAS_USED_QUERY } from './queries/gas_used'
import { PROJECT_TREND_HISTORY_QUERY } from './queries/project_trend_history_query'
import { METRIC_ANOMALIE_QUERY } from './queries/metric_anomaly_query'
import { GET_METRIC } from './queries/get_metric'
import { mergeTimeseriesByKey } from './../../utils/utils'

const getMetricPreTransform = ({ getMetric: { timeseriesData } }) =>
  timeseriesData

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
  nvtRatioCirculation: {
    query: NVT_RATIO_QUERY,
    preTransform: ({ nvtRatio }) => nvtRatio
  },
  nvtRatioTxVolume: {
    query: NVT_RATIO_QUERY,
    preTransform: ({ nvtRatio }) => nvtRatio
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
  historyPrice: {
    query: HISTORY_PRICE_QUERY
  },
  volume: {
    query: HISTORY_PRICE_QUERY,
    preTransform: ({ historyPrice }) => historyPrice
  },
  devActivity: {
    query: DEV_ACTIVITY_QUERY
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
  tokenAgeConsumed: {
    query: TOKEN_AGE_CONSUMED_QUERY
  },
  exchangeFundsFlow: {
    query: EXCHANGE_FUNDS_FLOW_QUERY
  },
  daily_active_addresses: {
    query: GET_METRIC('daily_active_addresses'),
    preTransform: getMetricPreTransform
  },
  circulation_1d: {
    query: GET_METRIC('circulation_1d'),
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
  networkGrowth: {
    query: NETWORK_GROWTH_QUERY
  },
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
  }
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
