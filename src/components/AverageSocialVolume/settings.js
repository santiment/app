import { getIntervalByTimeRange } from '../../utils/dates'

const TIME_RANGE = '1m'
const { from: FROM, to: TO } = getIntervalByTimeRange(TIME_RANGE)

export const SETTINGS = {
  interval: '1d',
  from: FROM.toISOString(),
  to: TO.toISOString()
}
