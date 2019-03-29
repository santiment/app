import { getTimeRangeByDuration } from '../../utils/utils'

export const FETCH_GAINERS_LOSERS = '[gainersLosers] GAINERS_FETCH'
export const FETCH_GAINERS_LOSERS_SUCCESS =
  '[gainersLosers] GAINERS_FETCH_SUCCESS'
export const FETCH_GAINERS_LOSERS_FAILED =
  '[gainersLosers] GAINERS_FETCH_FAILED'
export const FETCH_GAINERS_LOSERS_CANCEL =
  '[gainersLosers] GAINERS_FETCH_CANCEL'
export const CLEAN_GAINERS_LOSERS = '[gainersLosers] GAINERS_CLEAN'

export const fetchGainersOrLosers = ({
  status = 'ALL',
  timeWindow = '15d',
  size = 10000
}) => ({
  type: FETCH_GAINERS_LOSERS,
  payload: {
    status,
    size,
    ...getTimeRangeByDuration(timeWindow)
  }
})
