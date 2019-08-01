// timeseries
export const TIMESERIES_FETCH = '[timeseries] FETCH'
export const TIMESERIES_DELETE = '[timeseries] DELETE'
export const TIMESERIES_FETCH_SUCCESS = '[timeseries] FETCH_SUCCESS'
export const TIMESERIES_FETCH_FAILED = '[timeseries] FETCH_FAILED'

export const deleteTimeseries = id => ({
  type: TIMESERIES_DELETE,
  payload: id
})

export const fetchTimeseries = settings => ({
  type: TIMESERIES_FETCH,
  payload: { ...settings }
})
