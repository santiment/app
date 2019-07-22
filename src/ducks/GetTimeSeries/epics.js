import { Observable } from 'rxjs'
import * as actions from './actions'
import { handleErrorAndTriggerAction } from './../../epics/utils'
import { mergeTimeseriesByKey } from './../../utils/utils'
import { getIntervalByTimeRange } from '../../utils/dates'
import {
  hasMetric,
  getMetricQUERY,
  getTransforms,
  getSettings
} from './timeseries'

const initialMeta = {
  mergedByDatetime: false
}

const mapDataToTimeserie = ({ data, loading, error }, transforms) => {
  const dataAfterPreTransform =
    transforms && transforms.length > 0
      ? transforms.reduce((acc, val) => {
        const metric = Object.keys(data)[0]
        if (val.predicate(metric)) {
          return val.preTransform(data)
        }
        return data
      }, {})
      : data
  const metric = Object.keys(dataAfterPreTransform)[0]
  const items = !error ? dataAfterPreTransform[metric] : []
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

const mapDataToTimeseries = (data = [], transforms = []) => {
  return data.reduce((acc, val) => {
    return {
      ...acc,
      ...mapDataToTimeserie(val, transforms)
    }
  }, {})
}

const mapDataToMergedTimeserieByDatetime = (data = [], transforms = []) => {
  const timeseriesAsSingleObject = mapDataToTimeseries(data, transforms)
  const timeseries = Object.keys(timeseriesAsSingleObject).map(metric => {
    return timeseriesAsSingleObject[metric].items
  })
  return {
    timeseries: mergeTimeseriesByKey({
      timeseries,
      key: 'datetime'
    }),
    ...Object.keys(timeseriesAsSingleObject).reduce((acc, metric) => {
      acc[metric] = timeseriesAsSingleObject[metric]
      return acc
    }, {})
  }
}

const fetchTimeseriesEpic = (action$, store, { client }) =>
  action$.ofType(actions.TIMESERIES_FETCH).mergeMap(action => {
    const { meta = initialMeta } = action.payload
    const metrics = Object.keys(action.payload)
      .filter(metric => metric !== 'meta')
      .map(metric => {
        if (!hasMetric(metric)) {
          throw new Error(`
            Unsupported metric yet: "${metric}".
            Add a query for this metric and description.
          `)
        }
        return metric
      })

    const transforms = getTransforms(metrics)
    const errorMetrics = {}
    const queries = metrics.map(metric => {
      const { interval, from = null, to = null, ...rest } = action.payload[
        metric
      ]

      const timePeriod = {}
      if (!from || !to) {
        const { from: fromDate, to: toDate } = getIntervalByTimeRange(
          rest.timeRange
        )
        timePeriod.from = fromDate.toISOString()
        timePeriod.to = toDate.toISOString()
      }

      return Observable.fromPromise(
        client
          .query({
            query: getMetricQUERY(metric),
            variables: {
              interval: interval || '1d',
              to: to || timePeriod.to,
              from: from || timePeriod.from,
              ...rest
            }
          })
          .catch(({ message }) => {
            errorMetrics[metric] = message
          })
      )
    })

    return Observable.forkJoin(queries)
      .mergeMap(data => {
        const filteredData = data.filter(value => !!value)
        const result = meta.mergedByDatetime
          ? mapDataToMergedTimeserieByDatetime(filteredData, transforms)
          : mapDataToTimeseries(filteredData, transforms)
        const settings = getSettings(metrics)
        return Observable.of({
          type: actions.TIMESERIES_FETCH_SUCCESS,
          payload: {
            settings,
            errorMetrics,
            ...result
          }
        })
      })
      .catch(handleErrorAndTriggerAction(actions.TIMESERIES_FETCH_FAILED))
  })

export default fetchTimeseriesEpic
