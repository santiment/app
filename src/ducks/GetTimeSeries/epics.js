import { Observable } from 'rxjs'
import * as actions from './actions'
import { handleErrorAndTriggerAction } from './../../epics/utils'
import { mergeTimeseriesByKey } from './../../utils/utils'
import { getIntervalByTimeRange } from '../../utils/dates'
import { hasMetric, getMetricQUERY, getPreTransform } from './timeseries'

const mapDataToMergedTimeserieByDatetime = (items = []) => {
  const metricsInfo = {}
  const timeseries = mergeTimeseriesByKey({
    timeseries: items.reduce((acc, { data, __metric, ...rest }) => {
      metricsInfo[__metric] = rest
      acc.push(data[__metric])
      return acc
    }, [])
  })

  return Object.assign(metricsInfo, { timeseries })
}

const fetchTimeseriesEpic = (action$, store, { client }) =>
  action$.ofType(actions.TIMESERIES_FETCH).mergeMap(action => {
    console.time('Request initialization')
    const { id, metrics } = action.payload

    if (process.env.NODE_ENV === 'development') {
      metrics.forEach(({ name }) => {
        if (hasMetric(name)) return

        throw new Error(`
            Unsupported metric yet: "${name}".
            Add a query for this metric and description.
          `)
      })
    }

    const errorMetrics = {}

    const queries = metrics.map(metric => {
      const { name, interval, from, to, timeRange, ...rest } = metric

      const timePeriod = {}
      if (!from || !to) {
        const { from: fromDate, to: toDate } = getIntervalByTimeRange(timeRange)
        timePeriod.from = fromDate.toISOString()
        timePeriod.to = toDate.toISOString()
      }

      return Observable.fromPromise(
        client
          .query({
            query: getMetricQUERY(name),
            variables: {
              metric: name,
              interval: interval || '1d',
              to: to || timePeriod.to,
              from: from || timePeriod.from,
              ...rest
            }
          })
          .then(getPreTransform(name))
          .catch(({ message }) => {
            errorMetrics[name] = message
          })
      )
    })

    console.timeEnd('Request initialization')
    return Observable.forkJoin(queries)
      .mergeMap(res => {
        console.time('Forming response')
        const result = mapDataToMergedTimeserieByDatetime(res)
        console.timeEnd('Forming response')
        return Observable.of({
          type: actions.TIMESERIES_FETCH_SUCCESS,
          payload: {
            [id]: {
              errorMetrics,
              ...result
            }
          }
        })
      })
      .catch(handleErrorAndTriggerAction(actions.TIMESERIES_FETCH_FAILED))
  })

export default fetchTimeseriesEpic
