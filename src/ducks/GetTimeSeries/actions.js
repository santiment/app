// timeseries
export const TIMESERIES_FETCH = '[timeseries] FETCH'
export const TIMESERIES_FETCH_SUCCESS = '[timeseries] FETCH_SUCCESS'
export const TIMESERIES_FETCH_FAILED = '[timeseries] FETCH_FAILED'

export const fetchTimeseries = settings => ({
  type: TIMESERIES_FETCH,
  payload: { ...settings }
})
