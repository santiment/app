import { Filter } from './dataHub/types'
import { DEFAULT_TIMERANGES } from './dataHub/timeranges'

const DEFAULT_FILTER = Filter.above

export const DEFAULT_SETTINGS = {
  isActive: false,
  type: DEFAULT_FILTER.key,
  firstThreshold: '',
  secondThreshold: '',
  timeRange: DEFAULT_TIMERANGES[0].type
}
