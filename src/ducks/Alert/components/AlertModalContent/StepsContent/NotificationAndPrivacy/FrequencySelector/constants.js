export const DAILY_ACTIVE_ADDRESSES = 'daily_active_addresses'

const AVAILABLE_TYPES = {
  MINUTE: {
    label: 'Minute(s)',
    value: 'm',
    counts: {
      min: 1,
      max: 59
    }
  },
  HOUR: {
    label: 'Hour(s)',
    value: 'h',
    counts: {
      min: 1,
      max: 23
    }
  },
  DAY: {
    label: 'Day(s)',
    value: 'd',
    counts: {
      min: 1,
      max: 7
    }
  },
  WEEK: {
    label: 'Week(s)',
    value: 'w',
    counts: {
      min: 1,
      max: 56
    }
  }
}

const FREQUENCY_TYPES = {
  ONCE_PER: {
    label: 'No more than once per',
    value: 'once_per'
  },
  MINUTELY: {
    label: 'Minutely',
    value: 'm'
  },
  HOURLY: {
    label: 'Hourly',
    value: 'h'
  },
  DAILY: {
    label: 'Daily',
    value: 'd'
  },
  WEEKLY: {
    label: 'Weekly',
    value: 'w'
  }
}

export const FREQUENCY_MAP = new Map([
  [
    FREQUENCY_TYPES.ONCE_PER,
    [
      AVAILABLE_TYPES.MINUTE,
      AVAILABLE_TYPES.HOUR,
      AVAILABLE_TYPES.DAY,
      AVAILABLE_TYPES.WEEK
    ]
  ],
  [FREQUENCY_TYPES.MINUTELY, [AVAILABLE_TYPES.MINUTE]],
  [FREQUENCY_TYPES.HOURLY, [AVAILABLE_TYPES.HOUR]],
  [FREQUENCY_TYPES.DAILY, [AVAILABLE_TYPES.DAY]],
  [FREQUENCY_TYPES.WEEKLY, [AVAILABLE_TYPES.WEEK]]
])

export const AVAILABLE_FREQUENCIES_FOR_METRICS = new Map([
  [DAILY_ACTIVE_ADDRESSES, [FREQUENCY_TYPES.DAILY, FREQUENCY_TYPES.WEEKLY]]
])
