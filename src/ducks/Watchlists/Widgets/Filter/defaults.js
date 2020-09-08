import { Filter } from './dataHub/types'

const DEFAULT_FILTER = Filter.above

export const DEFAULT_TIMERANGES = [
  {
    type: '1d',
    label: 'Last day'
  },
  {
    type: '7d',
    label: 'Last week'
  },
  {
    type: '30d',
    label: 'Last month'
  },
  {
    type: '90d',
    label: 'Last 3 months'
  },
  {
    type: '180d',
    label: 'Last 6 months'
  },
  {
    type: '365d',
    label: 'Last year'
  }
]

export const DEFAULT_SETTINGS = {
  isActive: false,
  type: DEFAULT_FILTER.key,
  firstThreshold: '',
  secondThreshold: '',
  timeRange: DEFAULT_TIMERANGES[0].type
}
