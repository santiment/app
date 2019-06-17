import { DEV_ACTIVITY_QUERY } from './queries/dev_activity_query'
import { HISTORY_PRICE_QUERY } from './queries/history_price_query'
import { SOCIAL_VOLUME_QUERY } from './queries/social_volume_query'
import { DAILY_ACTIVE_ADDRESSES_QUERY } from './queries/daily_active_addresses_query'
import { EXCHANGE_FUNDS_FLOW_QUERY } from './queries/exchange_funds_flow_query'
import { TOKEN_AGE_CONSUMED_QUERY } from './queries/token_age_consumed_query'
import { MVRV_QUERY } from './queries/mvrv_query'
import { DAILY_ACTIVE_DEPOSITS_QUERY } from './queries/daily_active_deposits_query'
import { TOKEN_VELOCITY_QUERY } from './queries/token_velocity_query'
import { TRANSACTION_VOLUME_QUERY } from './queries/transaction_volume_query'
import { TOKEN_CIRCULATION_QUERY } from './queries/token_circulation_query'
import { NETWORK_GROWTH_QUERY } from './queries/network_growth_query'
import { SOCIAL_DOMINANCE_QUERY } from './queries/social_dominance_query'
import { PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES } from './queries/percent_of_token_supply_on_exchanges_query'
import { TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY } from './queries/top_holders_percent_of_total_supply'
import { mergeTimeseriesByKey } from './../../utils/utils'
import { formatNumber } from './../../utils/formatting'

const TIMESERIES = {
  historyPrice: {
    query: HISTORY_PRICE_QUERY
  },
  volume: {
    query: HISTORY_PRICE_QUERY
  },
  devActivity: {
    query: DEV_ACTIVITY_QUERY
  },
  // TODO: Fix working with this metric for visualization
  socialDominance: {
    query: SOCIAL_DOMINANCE_QUERY
  },
  percentOfTokenSupplyOnExchanges: {
    query: PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES
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
  dailyActiveAddresses: {
    query: DAILY_ACTIVE_ADDRESSES_QUERY
  },
  tokenCirculation: {
    query: TOKEN_CIRCULATION_QUERY
  },
  mvrvRatio: {
    query: MVRV_QUERY
  },
  dailyActiveDeposits: {
    query: DAILY_ACTIVE_DEPOSITS_QUERY
  },
  tokenVelocity: {
    query: TOKEN_VELOCITY_QUERY
  },
  transactionVolume: {
    query: TRANSACTION_VOLUME_QUERY
  },
  networkGrowth: {
    query: NETWORK_GROWTH_QUERY
  },
  socialVolume: {
    query: SOCIAL_VOLUME_QUERY,
    title: 'Social Volume',
    formatter: value => formatNumber(value),
    preTransform: {
      predicate: metric => metric === 'proffesionalSocialVolume',
      preTransform: data => {
        return {
          socialVolume: mergeTimeseriesByKey({
            key: 'datetime',
            timeseries: Object.values(data),
            mergeData: (longestTSData, timeserieData) => {
              return {
                socialVolume:
                  longestTSData.socialVolume + timeserieData.socialVolume,
                datetime: longestTSData.datetime
              }
            }
          })
        }
      }
    }
  }
}

export const hasMetric = metric => !!TIMESERIES[metric]
export const getMetricQUERY = metric => TIMESERIES[metric].query
export const getTransforms = metrics =>
  Object.keys(TIMESERIES)
    .filter(metric => {
      return metrics.includes(metric) && !!TIMESERIES[metric].preTransform
    })
    .map(metric => TIMESERIES[metric].preTransform) || []
export const getSettings = metrics =>
  Object.keys(TIMESERIES)
    .filter(metric => metrics.includes(metric))
    .reduce((acc, metric) => {
      const { title = metric, formatter = value => value } = TIMESERIES[metric]
      acc = {
        ...acc,
        [metric]: {
          title,
          formatter
        }
      }
      return acc
    }, {})
