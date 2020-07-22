import { Filter } from './types'

const DEFAULT_FILTER = Filter.above

export const DEFAULT_TIMERANGES = ['1d', '7d', '30d']

export const DEFAULT_SETTINGS = {
  isActive: false,
  type: DEFAULT_FILTER.key,
  firstThreshold: '',
  timeRange: DEFAULT_TIMERANGES[0]
}
