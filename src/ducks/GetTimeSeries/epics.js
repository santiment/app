import { Observable } from 'rxjs'
import * as actions from './actions'
import { MARKET_SEGMENT_QUERY } from './queries/market_segment_query'
import { handleErrorAndTriggerAction } from './../../epics/utils'
import { mergeTimeseriesByKey } from './../../utils/utils'
import { getIntervalByTimeRange } from '../../utils/dates'
import { hasMetric, getMetricQUERY, getPreTransform } from './timeseries'

const mapDataToMergedTimeserieByDatetime = (
  items = [],
  errors,
  key = 'timeseries'
) => {
  const metricsInfo = {}
  const timeseries = mergeTimeseriesByKey({
    timeseries: items.reduce((acc, { data, __metric, loading }) => {
      metricsInfo[__metric] = {
        isLoading: loading,
        isEmpty: data.length === 0,
        isError: !!errors[__metric]
      }
      acc.push(data[__metric])
      return acc
    }, [])
  })

  return Object.assign(metricsInfo, { [key]: timeseries })
}

const getFlattenEvents = (events = []) => {
  const res = []
  events.map(({ data, __metric }) => res.push(...data[__metric]))
  return res
}

const fetchTimeseriesEpic = (action$, store, { client }) =>
  action$.ofType(actions.TIMESERIES_FETCH).mergeMap(action => {
    const { id, metrics, events = [], marketSegments = [] } = action.payload

    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    ) {
      metrics.forEach(({ name }) => {
        if (hasMetric(name)) return

        throw new Error(`
            Unsupported metric yet: "${name}".
            Add a query for this metric and description.
          `)
      })
    }

    const errorMetrics = {}

    const queries = Observable.from(
      metrics.map(metric => {
        const { name, interval, from, to, timeRange, slug, ...rest } = metric
        let specialName

        if (slug === 'ethereum' && name === 'ethSpentOverTime') {
          specialName = 'EthSpentOverTimeByAllProjects'
        }

        const timePeriod = {}
        if (!from || !to) {
          const { from: fromDate, to: toDate } = getIntervalByTimeRange(
            timeRange,
            { isUTC: true }
          )

          timePeriod.from = fromDate.toISOString()
          timePeriod.to = toDate.toISOString()
        }

        return client
          .query({
            query: getMetricQUERY(specialName || name),
            variables: {
              metric: specialName || name,
              interval: interval || '1d',
              to: to || timePeriod.to,
              from: from || timePeriod.from,
              slug,
              ...rest
            }
          })
          .then(getPreTransform(specialName || name))
          .catch(({ message }) => {
            errorMetrics[specialName || name] = message
          })
      })
    )

    const eventQueries = Observable.from(
      events.map(({ name, metricKey, ...variables }) =>
        client
          .query({
            query: getMetricQUERY(name),
            variables
          })
          .then(getPreTransform(name, metricKey))
          .catch(({ message }) => {
            errorMetrics[name] = message
          })
      )
    )

    const marketSegmentsQueries = Observable.from(
      marketSegments.map(({ name, slug, ...variables }) =>
        client
          .query({
            query: MARKET_SEGMENT_QUERY(name),
            variables: {
              ...variables,
              selector: { market_segments: [name] }
            }
          })
          .then(getPreTransform('marketSegment', undefined, name))
          .catch(({ message }) => {
            errorMetrics[name] = message
          })
      )
    )

    return Observable.forkJoin(
      queries.concatAll().toArray(),
      eventQueries.concatAll().toArray(),
      marketSegmentsQueries.concatAll().toArray()
    )
      .mergeMap(([metricsRes, eventsRes, marketSegmentsRes]) => {
        const metricsResult = mapDataToMergedTimeserieByDatetime(
          metricsRes.concat(marketSegmentsRes).filter(Boolean),
          errorMetrics
        )
        const eventsResult = mapDataToMergedTimeserieByDatetime(
          eventsRes.filter(Boolean),
          errorMetrics,
          'eventsData'
        )

        const flattenEvents = getFlattenEvents(eventsRes)

        return Observable.of({
          type: actions.TIMESERIES_FETCH_SUCCESS,
          payload: {
            [id]: {
              isLoading: false,
              errorMetrics,
              ...metricsResult,
              ...eventsResult,
              eventsData: flattenEvents
            }
          }
        })
      })
      .catch(handleErrorAndTriggerAction(actions.TIMESERIES_FETCH_FAILED))
  })

export default fetchTimeseriesEpic
