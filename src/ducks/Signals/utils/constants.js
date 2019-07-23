export const REQUIRED_MESSAGE = 'Required'
export const MUST_BE_MORE_ZERO_MESSAGE = 'Must be more 0'

export const PRICE = 'price'
export const ETH_WALLET = 'eth_wallet'
export const DAILY_ACTIVE_ADDRESSES = 'daily_active_addresses'
export const PRICE_PERCENT_CHANGE = 'price_percent_change'
export const PRICE_ABSOLUTE_CHANGE = 'price_absolute_change'
export const TRENDING_WORDS = 'trending_words'
export const PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER =
  'price_absolute_change_single_border'
export const PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER =
  'price_absolute_change_double_border'
export const PRICE_VOLUME_DIFFERENCE = 'price_volume_difference'

export const TRENDING_WORDS_PROJECT_MENTIONED = {
  label: 'Trending assets',
  value: 'trending_project',
  metric: 'trending_words'
}

export const TRENDING_WORDS_WORD_MENTIONED = {
  label: 'Trending words',
  value: 'trending_word',
  metric: 'trending_words'
}

export const TRENDING_WORDS_WATCHLIST_MENTIONED = {
  label: 'Watchlist',
  value: 'trending_watchlist',
  metric: 'trending_words'
}

export const TRENDING_WORDS_TYPE_OPTIONS = [
  TRENDING_WORDS_PROJECT_MENTIONED,
  TRENDING_WORDS_WORD_MENTIONED,
  TRENDING_WORDS_WATCHLIST_MENTIONED
]

export const ETH_WALLETS_OPERATIONS = {
  AMOUNT_DOWN: 'amount_down',
  AMOUNT_UP: 'amount_up'
}

export const ETH_WALLET_AMOUNT_UP = {
  label: 'Amount up',
  metric: ETH_WALLET,
  value: ETH_WALLETS_OPERATIONS.AMOUNT_UP
}
export const ETH_WALLET_AMOUNT_DOWN = {
  label: 'Amount down',
  metric: ETH_WALLET,
  value: ETH_WALLETS_OPERATIONS.AMOUNT_DOWN
}

export const ETH_WALLETS_OPTIONS = [
  { ...ETH_WALLET_AMOUNT_UP },
  { ...ETH_WALLET_AMOUNT_DOWN }
]

export const PRICE_CHANGE_TYPES = {
  MOVING_UP: 'percent_up',
  MOVING_DOWN: 'percent_down',
  INSIDE_CHANNEL: 'inside_channel',
  OUTSIDE_CHANNEL: 'outside_channel',
  ABOVE: 'above',
  BELOW: 'below'
}

export const PRICE_PERCENT_CHANGE_UP_MODEL = {
  metric: PRICE_PERCENT_CHANGE,
  label: 'Moving up %',
  value: PRICE_CHANGE_TYPES.MOVING_UP
}

export const PRICE_PERCENT_CHANGE_DOWN_MODEL = {
  metric: PRICE_PERCENT_CHANGE,
  label: 'Moving down %',
  value: PRICE_CHANGE_TYPES.MOVING_DOWN
}

export const PRICE_ABS_CHANGE_ABOVE = {
  metric: PRICE_ABSOLUTE_CHANGE,
  subMetric: PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER,
  label: 'More than',
  value: PRICE_CHANGE_TYPES.ABOVE
}

export const PRICE_ABS_CHANGE_BELOW = {
  metric: PRICE_ABSOLUTE_CHANGE,
  subMetric: PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER,
  label: 'Less than',
  value: PRICE_CHANGE_TYPES.BELOW
}

export const PRICE_ABS_CHANGE_INSIDE = {
  metric: PRICE_ABSOLUTE_CHANGE,
  subMetric: PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER,
  label: 'Entering channel',
  value: PRICE_CHANGE_TYPES.INSIDE_CHANNEL
}

export const PRICE_ABS_CHANGE_OUTSIDE = {
  metric: PRICE_ABSOLUTE_CHANGE,
  subMetric: PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER,
  label: 'Outside channel',
  value: PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL
}

export const ETH_WALLET_METRIC = {
  label: 'Historical balance',
  value: ETH_WALLET,
  hidden: true
}

export const TRENDING_WORDS_METRIC = {
  label: 'Emerging social trends',
  value: TRENDING_WORDS,
  metric: TRENDING_WORDS
}

export const PRICE_METRIC = {
  label: 'Price',
  value: PRICE
}
export const DAILY_ACTIVE_ADDRESSES_METRIC = {
  label: 'Daily Active Addresses',
  value: DAILY_ACTIVE_ADDRESSES,
  metric: DAILY_ACTIVE_ADDRESSES
}
export const PRICE_VOLUME_DIFFERENCE_METRIC = {
  label: 'Price/volume difference',
  value: PRICE_VOLUME_DIFFERENCE,
  metric: PRICE_VOLUME_DIFFERENCE
}

export const COOLDOWN_REGEXP = /([0-9]+)*([smhdw])/i

export const METRICS_OPTIONS = [
  { ...PRICE_METRIC },
  { ...ETH_WALLET_METRIC },
  { ...TRENDING_WORDS_METRIC },
  { ...DAILY_ACTIVE_ADDRESSES_METRIC },
  { ...PRICE_VOLUME_DIFFERENCE_METRIC }
]

const PRICE_OPTIONS = [
  {
    label: 'Price changing',
    type: 'header'
  },
  PRICE_ABS_CHANGE_ABOVE,
  PRICE_ABS_CHANGE_BELOW,
  PRICE_ABS_CHANGE_INSIDE,
  PRICE_ABS_CHANGE_OUTSIDE,
  {
    label: 'Percent change',
    type: 'header'
  },
  PRICE_PERCENT_CHANGE_UP_MODEL,
  PRICE_PERCENT_CHANGE_DOWN_MODEL
]

export const METRIC_TO_TYPES = {
  [PRICE]: PRICE_OPTIONS,
  [DAILY_ACTIVE_ADDRESSES]: PRICE_OPTIONS,
  [PRICE_VOLUME_DIFFERENCE]: [PRICE_VOLUME_DIFFERENCE_METRIC],
  [ETH_WALLET]: ETH_WALLETS_OPTIONS
}

export const METRIC_TYPES_DEPENDENCIES = {
  [PRICE_VOLUME_DIFFERENCE]: ['threshold'],
  [DAILY_ACTIVE_ADDRESSES]: ['percentThreshold', 'timeWindow'],
  [PRICE_PERCENT_CHANGE]: ['percentThreshold', 'timeWindow'],
  [PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER]: ['absoluteThreshold'],
  [PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER]: [
    'absoluteBorderLeft',
    'absoluteBorderRight'
  ],
  [ETH_WALLET]: ['threshold', 'walletBalanceChangeType'],
  [TRENDING_WORDS]: []
}

export const frequencyTymeValueBuilder = value => {
  return {
    value: value,
    label: value
  }
}

const createLabelValueArray = (from, to) => {
  const array = []
  for (let i = from; i <= to; i++) {
    array.push(frequencyTymeValueBuilder(i))
  }
  return array
}

export const WEEKS = createLabelValueArray(1, 56)
export const DAYS = createLabelValueArray(1, 7)
export const HOURS = createLabelValueArray(1, 23)
export const MINUTES = createLabelValueArray(1, 59)

export const FREQUENCY_VALUES_TYPES = {
  minutes: 'm',
  hours: 'h',
  days: 'd',
  weeks: 'w'
}

export const COOLDOWN_TYPES = {
  oncePer: 'onceper',
  minutly: 'm',
  hourly: 'h',
  daily: 'd',
  weekly: 'w'
}

export const FREQUENCY_TYPE_ONCEPER_MODEL = {
  label: 'No more than once per',
  value: COOLDOWN_TYPES.oncePer,
  disabledMetrics: [DAILY_ACTIVE_ADDRESSES]
}

export const FREQUENCY_TYPE_HOUR_MODEL = {
  label: 'Hourly',
  value: COOLDOWN_TYPES.hourly,
  availableTypes: [FREQUENCY_VALUES_TYPES.hours],
  disabledMetrics: [DAILY_ACTIVE_ADDRESSES]
}

export const FREQUENCY_TYPE_DAILY_MODEL = {
  label: 'Daily',
  value: COOLDOWN_TYPES.daily,
  availableTypes: [FREQUENCY_VALUES_TYPES.days]
}

export const FREQUENCY_TIME_TYPE_HOURS_MODEL = {
  label: 'Hours',
  value: FREQUENCY_VALUES_TYPES.hours
}
export const FREQUENCY_TIME_TYPE_DAILY_MODEL = {
  label: 'Days',
  value: FREQUENCY_VALUES_TYPES.days
}

export const METRIC_TARGET_ASSETS = {
  label: 'Assets',
  value: 'assets'
}
export const METRIC_TARGET_WATCHLIST = {
  label: 'Watchlist',
  value: 'watchlist'
}

export const METRIC_TARGET_OPTIONS = [
  METRIC_TARGET_ASSETS,
  METRIC_TARGET_WATCHLIST
]

export const BASE_THRESHOLD = 0.002
export const BASE_PERCENT_THRESHOLD = 5

const DEFAULT_TARGET = {
  value: 'santiment',
  label: 'santiment'
}

export const METRIC_DEFAULT_VALUES = {
  price_absolute_change: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    absoluteThreshold: 25,
    threshold: BASE_THRESHOLD,
    timeWindow: 1,
    timeWindowUnit: { label: 'Days', value: 'd' },
    type: PRICE_PERCENT_CHANGE_UP_MODEL,
    isRepeating: true,
    channels: ['Telegram'],
    target: DEFAULT_TARGET
  },
  price_percent_change: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    percentThreshold: 25,
    threshold: BASE_THRESHOLD,
    timeWindow: 1,
    timeWindowUnit: { label: 'Days', value: 'd' },
    type: PRICE_PERCENT_CHANGE_UP_MODEL,
    isRepeating: true,
    channels: ['Telegram'],
    absoluteThreshold: 25,
    target: DEFAULT_TARGET
  },
  daily_active_addresses: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    percentThreshold: 25,
    threshold: BASE_THRESHOLD,
    timeWindow: 1,
    timeWindowUnit: { label: 'Days', value: 'd' },
    type: PRICE_PERCENT_CHANGE_UP_MODEL,
    isRepeating: true,
    channels: ['Telegram'],
    absoluteThreshold: 25,
    target: DEFAULT_TARGET
  },
  price_volume_difference: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    threshold: BASE_THRESHOLD,
    type: { ...PRICE_VOLUME_DIFFERENCE_METRIC },
    isRepeating: true,
    channels: ['Telegram'],
    target: DEFAULT_TARGET
  },
  eth_wallet: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    threshold: 100,
    type: { ...ETH_WALLET_AMOUNT_UP },
    isRepeating: true,
    channels: ['Telegram'],
    percentThreshold: 200,
    timeWindow: 24,
    target: DEFAULT_TARGET
  },
  trending_words: {
    type: { ...TRENDING_WORDS_WORD_MENTIONED },
    channels: ['Telegram'],
    target: DEFAULT_TARGET
  }
}

export const DEFAULT_FORM_META_SETTINGS = {
  target: {
    isDisabled: false,
    value: DEFAULT_TARGET
  },
  metric: {
    isDisabled: false,
    value: { ...PRICE_METRIC }
  },
  type: {
    isDisabled: false,
    value: { ...PRICE_PERCENT_CHANGE_UP_MODEL }
  },
  frequencyType: {
    isDisabled: false,
    value: { ...FREQUENCY_TYPE_ONCEPER_MODEL }
  },
  signalType: {
    isDisabled: false,
    value: { ...METRIC_TARGET_ASSETS }
  }
}

export const FREQUENCY_TYPES_OPTIONS = [
  FREQUENCY_TYPE_ONCEPER_MODEL,
  {
    label: 'Minutly',
    value: COOLDOWN_TYPES.minutly,
    availableTypes: [FREQUENCY_VALUES_TYPES.minutes],
    disabledMetrics: [DAILY_ACTIVE_ADDRESSES]
  },
  FREQUENCY_TYPE_HOUR_MODEL,
  FREQUENCY_TYPE_DAILY_MODEL,
  {
    label: 'Weekly',
    value: COOLDOWN_TYPES.weekly,
    availableTypes: [FREQUENCY_VALUES_TYPES.weeks]
  }
]

export const FREQUENCY_MAPPINGS = (() => {
  const maps = {}
  maps[FREQUENCY_VALUES_TYPES.minutes] = MINUTES
  maps[FREQUENCY_VALUES_TYPES.hours] = HOURS
  maps[FREQUENCY_VALUES_TYPES.weeks] = WEEKS
  maps[FREQUENCY_VALUES_TYPES.days] = DAYS
  return maps
})()

export const FREQUENCY_VALUES = [
  {
    label: 'Minutes',
    value: FREQUENCY_VALUES_TYPES.minutes
  },
  { ...FREQUENCY_TIME_TYPE_HOURS_MODEL },
  {
    ...FREQUENCY_TIME_TYPE_DAILY_MODEL
  },
  {
    label: 'Weeks',
    value: FREQUENCY_VALUES_TYPES.weeks
  }
]

export const getDefaultTimeRangeValue = days => {
  return {
    value: days + 'd',
    label: days / 30 + ' months'
  }
}

export const PREVIEWS_TIMERANGE_BY_TYPE = {
  [DAILY_ACTIVE_ADDRESSES]: getDefaultTimeRangeValue(90),
  [PRICE_ABSOLUTE_CHANGE]: getDefaultTimeRangeValue(90),
  [PRICE_PERCENT_CHANGE]: getDefaultTimeRangeValue(90),
  [PRICE_VOLUME_DIFFERENCE]: getDefaultTimeRangeValue(180)
}

export const TIME_WINDOW_UNITS = [
  { value: 'd', label: 'Days' },
  { value: 'h', label: 'Hours' },
  { value: 'm', label: 'Minutes' }
]
