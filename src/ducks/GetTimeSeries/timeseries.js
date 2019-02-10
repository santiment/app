import { DEV_ACTIVITY_QUERY } from './queries/dev_activity_query'
import { HISTORY_PRICE_QUERY } from './queries/history_price_query'
import { SOCIAL_VOLUME_QUERY } from './queries/social_volume_query'
import { mergeTimeseriesByKey } from './../../utils/utils'
import { formatNumber } from './../../utils/formatting'

const TIMESERIES_QUERIES = {
  price: {
    query: HISTORY_PRICE_QUERY
  },
  devActivity: {
    query: DEV_ACTIVITY_QUERY
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

export const hasMetric = metric => !!TIMESERIES_QUERIES[metric]
export const getMetricQUERY = metric => TIMESERIES_QUERIES[metric].query
export const getTransforms = metrics =>
  Object.keys(TIMESERIES_QUERIES)
    .filter(metric => {
      return (
        metrics.includes(metric) && !!TIMESERIES_QUERIES[metric].preTransform
      )
    })
    .map(metric => TIMESERIES_QUERIES[metric].preTransform) || []
export const getSettings = metrics =>
  Object.keys(TIMESERIES_QUERIES)
    .filter(metric => metrics.includes(metric))
    .reduce((acc, metric) => {
      const { title = metric, formatter = value => value } = TIMESERIES_QUERIES[
        metric
      ]
      acc = {
        ...acc,
        [metric]: {
          title,
          formatter
        }
      }
      return acc
    }, {})
