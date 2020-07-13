import { DAY, getTimeIntervalFromToday, MONTH } from '../../../../utils/dates'

const RANGES_METHOD = new Map()
  .set('24h', getTimeIntervalFromToday(-1, DAY))
  .set('7d', getTimeIntervalFromToday(-7, DAY))
  .set('1m', getTimeIntervalFromToday(-1, MONTH))
  .set('3m', getTimeIntervalFromToday(-3, MONTH))
  .set('6m', getTimeIntervalFromToday(-6, MONTH))

export const RANGES = [
  { value: '24h', interval: '1h', method: RANGES_METHOD.get('24h') },
  { value: '7d', interval: '6h', method: RANGES_METHOD.get('7d') },
  { value: '1m', interval: '1d', method: RANGES_METHOD.get('1m') },
  { value: '3m', interval: '3d', method: RANGES_METHOD.get('3m') },
  { value: '6m', interval: '3d', method: RANGES_METHOD.get('6m') }
]

export const filteringTypes = {
  TRENDS: 'trending assets',
  SOCIAL: 'social',
  DEVACT: 'dev. activity'
}
