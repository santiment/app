import gql from 'graphql-tag'
import moment from 'moment'
import { Observable } from 'rxjs'
import * as actions from './actions'
import { handleErrorAndTriggerAction } from './../../epics/utils'
import {
  mergeTimeseriesByKey,
  getTimeFromFromString
} from './../../utils/utils'

const initialMeta = {
  mergedByDatetime: false
}

export const HISTORY_PRICE_QUERY = gql`
  query historyPrice(
    $slug: String
    $from: DateTime
    $to: DateTime
    $interval: String
  ) {
    price: historyPrice(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
    ) {
      priceBtc
      priceUsd
      volume
      datetime
      marketcap
    }
  }
`

export const DEV_ACTIVITY_QUERY = gql`
  query queryDevActivity(
    $slug: String
    $from: DateTime!
    $to: DateTime!
    $interval: String!
    $transform: String
    $movingAverageIntervalBase: Int
  ) {
    devActivity(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
      transform: $transform
      movingAverageIntervalBase: $movingAverageIntervalBase
    ) {
      datetime
      activity
    }
  }
`

const TIMESERIES_QUERIES = {
  price: HISTORY_PRICE_QUERY,
  devActivity: DEV_ACTIVITY_QUERY
}

const mapDataToTimeserie = ({ data, loading, error }) => {
  const metric = Object.keys(data)[0]
  const items = !data.error ? data[metric] : []
  const isEmpty = items && items.length === 0
  return {
    [metric]: {
      items,
      isError: error,
      isEmpty,
      isLoading: loading
    }
  }
}

const mapDataToTimeseries = (data = []) => {
  return data.reduce((acc, val) => {
    return {
      ...acc,
      ...mapDataToTimeserie(val)
    }
  }, {})
}

const mapDataToMergedTimeserieByDatetime = (data = []) => {
  const timeseriesAsSingleObject = mapDataToTimeseries(data)
  const timeseries = Object.keys(timeseriesAsSingleObject).map(metric => {
    return timeseriesAsSingleObject[metric].items
  })
  return {
    timeseries: mergeTimeseriesByKey({
      timeseries,
      key: 'datetime'
    }),
    ...Object.keys(timeseriesAsSingleObject).reduce((acc, metric) => {
      const { items, ...rest } = timeseriesAsSingleObject[metric]
      acc[metric] = {
        ...rest
      }
      return acc
    }, {})
  }
}

const fetchTimeseriesEpic = (action$, store, { client }) =>
  action$.ofType(actions.TIMESERIES_FETCH).mergeMap(action => {
    const { meta = initialMeta } = action.payload
    const queries = Object.keys(action.payload)
      .filter(metric => metric !== 'meta')
      .map(metric => {
        const settings = action.payload[metric]
        return client.query({
          query: TIMESERIES_QUERIES[metric],
          variables: {
            interval: settings.interval || '1d',
            to: settings.to || moment().toISOString(),
            from: settings.from || getTimeFromFromString(settings.timeRange),
            ...settings
          },
          context: { isRetriable: true }
        })
      })
    return Observable.forkJoin(queries)
      .mergeMap(data => {
        return Observable.of({
          type: actions.TIMESERIES_FETCH_SUCCESS,
          payload: meta.mergedByDatetime
            ? mapDataToMergedTimeserieByDatetime(data)
            : mapDataToTimeseries(data)
        })
      })
      .catch(handleErrorAndTriggerAction(actions.TIMESERIES_FETCH_FAILED))
  })

export default fetchTimeseriesEpic
