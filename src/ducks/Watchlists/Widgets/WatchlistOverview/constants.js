export const RANGES = [
  { value: '24h', interval: '1h', from: 'utc_now-1d' },
  { value: '7d', interval: '6h', from: 'utc_now-7d' },
  { value: '1m', interval: '1d', from: 'utc_now-30d' },
  { value: '3m', interval: '3d', from: 'utc_now-90d' },
  { value: '6m', interval: '3d', from: 'utc_now-180d' }
]

export const filteringTypes = {
  TRENDS: 'trending assets',
  SOCIAL: 'social',
  DEVACT: 'dev. activity'
}
