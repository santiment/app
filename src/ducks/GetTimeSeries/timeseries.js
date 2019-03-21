import { DEV_ACTIVITY_QUERY } from './queries/dev_activity_query'
import { HISTORY_PRICE_QUERY } from './queries/history_price_query'
import { SOCIAL_VOLUME_QUERY } from './queries/social_volume_query'
import { DAILY_ACTIVE_ADDRESSES_QUERY } from './queries/daily_active_addresses_query'
import { EXCHANGE_FUNDS_FLOW_QUERY } from './queries/exchange_funds_flow_query'
import { TOKEN_AGE_CONSUMED_QUERY } from './queries/token_age_consumed_query'
import { MVRV_QUERY } from './queries/mvrv_query'
import { TRANSACTION_VOLUME_QUERY } from './queries/transaction_volume_query'
import { TOKEN_CIRCULATION_QUERY } from './queries/token_circulation_query'
import { mergeTimeseriesByKey } from './../../utils/utils'
import { formatNumber } from './../../utils/formatting'

const TIMESERIES = {
  price: {
    query: HISTORY_PRICE_QUERY
  },
  devActivity: {
    query: DEV_ACTIVITY_QUERY
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
  mvrv: {
    query: MVRV_QUERY
  },
  transactionVolume: {
    query: TRANSACTION_VOLUME_QUERY
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
