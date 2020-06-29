import { DAY, getTimeIntervalFromToday } from '../../utils/dates'

const { from, to } = getTimeIntervalFromToday(-1, DAY, { isUTC: true })
const interval = '1d'

export const DEFAULT_SETTINGS = {
  from,
  to,
  interval
}
