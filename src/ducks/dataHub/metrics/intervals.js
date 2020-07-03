import { Metric } from './index'
import memoize from 'lodash.memoize'
import {
  ONE_DAY_IN_MS,
  ONE_HOUR_IN_MS,
  ONE_MINUTE_IN_MS,
  ONE_SECOND_IN_MS,
  ONE_WEEK_IN_MS
} from '../../../utils/dates'

export const convertToSeconds = memoize(timebound => {
  if (!timebound) {
    return 0
  }

  const amount = timebound.slice(0, timebound.length - 1)
  const format = timebound[timebound.length - 1]

  let msValue = 0

  switch (format) {
    case 's': {
      msValue = ONE_SECOND_IN_MS
      break
    }
    case 'm': {
      msValue = ONE_MINUTE_IN_MS
      break
    }
    case 'h': {
      msValue = ONE_HOUR_IN_MS
      break
    }
    case 'd': {
      msValue = ONE_DAY_IN_MS
      break
    }
    case 'w': {
      msValue = ONE_WEEK_IN_MS
      break
    }
    default: {
      return msValue
    }
  }

  return amount * msValue
})

const Intervals = {
  [Metric.bitmex_perpetual_funding_rate.key]: {
    minInterval: '8h'
  }
}

export const getAvailableInterval = ({ key }, suggestedInterval) => {
  const suggestedMs = convertToSeconds(suggestedInterval)
  const availableInterval = Intervals[key]
  if (availableInterval) {
    const availableMsInterval = convertToSeconds(availableInterval.minInterval)

    if (availableMsInterval && availableMsInterval <= suggestedMs) {
      return suggestedInterval
    } else {
      return availableInterval.minInterval
    }
  }

  return suggestedInterval
}

export default Intervals
