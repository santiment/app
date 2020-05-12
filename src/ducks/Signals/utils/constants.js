export const CHANNEL_NAMES = {
  Telegram: 'Telegram',
  Email: 'Email',
  Browser: 'Push'
}

export const CHANNEL_TYPES = {
  Telegram: 'telegram',
  Email: 'email',
  Browser: 'web_push'
}

export const CHANNELS_MAP = [
  {
    value: CHANNEL_TYPES.Email,
    label: CHANNEL_NAMES.Email
  },
  {
    value: CHANNEL_TYPES.Telegram,
    label: CHANNEL_NAMES.Telegram
  },
  {
    value: CHANNEL_TYPES.Browser,
    label: CHANNEL_NAMES.Browser
  }
]

export const MAX_DESCR_LENGTH = 200
export const MAX_TITLE_LENGTH = 120
export const MIN_TITLE_LENGTH = 2

export const REQUIRED_MESSAGE = 'Required'
export const MUST_BE_MORE_ZERO_MESSAGE = 'Must be more 0'
export const NOT_VALID_ETH_ADDRESS = 'Not valid ETH address'

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

export const METRIC_TYPES = {
  WALLET_MOVEMENT: 'wallet_movement',
  METRIC_SIGNAL: 'metric_signal'
}

export const SIGNAL_METRIC_TYPES = {
  active_addresses_24h: 'active_addresses_24h',
  price_usd: 'price_usd',
  volume_usd: 'volume_usd'
}

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
  value: ETH_WALLETS_OPERATIONS.AMOUNT_UP,
  dependencies: ['threshold', 'walletBalanceChangeType']
}
export const ETH_WALLET_AMOUNT_DOWN = {
  label: 'Amount down',
  metric: ETH_WALLET,
  value: ETH_WALLETS_OPERATIONS.AMOUNT_DOWN,
  dependencies: ['threshold', 'walletBalanceChangeType']
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
  BELOW: 'below',
  PERCENT_SOME_OF: 'some_of'
}

export const PRICE_PERCENT_CHANGE_UP_MODEL = {
  metric: PRICE_PERCENT_CHANGE,
  label: 'Moving up %',
  value: PRICE_CHANGE_TYPES.MOVING_UP,
  filledField: true,
  dependencies: ['percentThreshold', 'timeWindow']
}

export const PRICE_PERCENT_CHANGE_DOWN_MODEL = {
  metric: PRICE_PERCENT_CHANGE,
  label: 'Moving down %',
  value: PRICE_CHANGE_TYPES.MOVING_DOWN,
  filledField: true,
  dependencies: ['percentThreshold', 'timeWindow']
}

export const PRICE_PERCENT_CHANGE_ONE_OF_MODEL = {
  metric: PRICE_PERCENT_CHANGE,
  label: 'Moving up or down %',
  value: PRICE_CHANGE_TYPES.PERCENT_SOME_OF,
  filledField: true,
  dependencies: ['percentThresholdLeft', 'percentThresholdRight', 'timeWindow']
}

export const PRICE_ABS_CHANGE_ABOVE = {
  metric: PRICE_ABSOLUTE_CHANGE,
  subMetric: PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER,
  label: 'More than',
  value: PRICE_CHANGE_TYPES.ABOVE,
  dependencies: ['absoluteThreshold']
}

export const PRICE_ABS_CHANGE_BELOW = {
  metric: PRICE_ABSOLUTE_CHANGE,
  subMetric: PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER,
  label: 'Less than',
  value: PRICE_CHANGE_TYPES.BELOW,
  dependencies: ['absoluteThreshold']
}

export const PRICE_ABS_CHANGE_INSIDE = {
  metric: PRICE_ABSOLUTE_CHANGE,
  subMetric: PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER,
  label: 'Entering channel',
  value: PRICE_CHANGE_TYPES.INSIDE_CHANNEL,
  filledField: true,
  dependencies: ['absoluteBorderLeft', 'absoluteBorderRight']
}

export const PRICE_ABS_CHANGE_OUTSIDE = {
  metric: PRICE_ABSOLUTE_CHANGE,
  subMetric: PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER,
  label: 'Outside channel',
  value: PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL,
  filledField: true,
  dependencies: ['absoluteBorderLeft', 'absoluteBorderRight']
}

export const TRENDING_WORDS_METRIC = {
  label: 'Emerging social trends',
  value: TRENDING_WORDS,
  metric: TRENDING_WORDS,
  description: 'Notify me when an asset starts trending on crypto social media'
}

export const PRICE_METRIC = {
  label: 'Price',
  value: PRICE,
  description: 'Notify me when an asset’s price moves a certain way',
  type: METRIC_TYPES.METRIC_SIGNAL,
  metric: SIGNAL_METRIC_TYPES.price_usd
}

export const DAILY_ACTIVE_ADDRESSES_METRIC = {
  label: 'Daily Active Addresses',
  value: DAILY_ACTIVE_ADDRESSES,
  type: METRIC_TYPES.METRIC_SIGNAL,
  metric: SIGNAL_METRIC_TYPES.active_addresses_24h,
  description:
    'Notify me of changes in the # of addresses transacting an asset on-chain'
}
export const PRICE_VOLUME_DIFFERENCE_METRIC = {
  label: 'Price/volume difference',
  value: PRICE_VOLUME_DIFFERENCE,
  metric: PRICE_VOLUME_DIFFERENCE,
  description:
    'Notify me of major divergences between an asset’s price and trading volume'
}

export const ETH_WALLET_METRIC = {
  label: 'Historical balance',
  value: ETH_WALLET,
  hidden: true,
  type: METRIC_TYPES.WALLET_MOVEMENT,
  description: 'Notify me when a wallet’s balance changes a certain way'
}

export const COOLDOWN_REGEXP = /([0-9]+)*([smhdw])/i

export const METRICS_OPTIONS = [
  { ...PRICE_METRIC },
  { ...TRENDING_WORDS_METRIC },
  { ...DAILY_ACTIVE_ADDRESSES_METRIC },
  { ...ETH_WALLET_METRIC }
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
    label: 'Percentage change',
    type: 'header',
    divider: true
  },
  PRICE_PERCENT_CHANGE_UP_MODEL,
  PRICE_PERCENT_CHANGE_DOWN_MODEL
]

export const COMMON_PROPS_FOR_METRIC = [
  ...PRICE_OPTIONS,
  PRICE_PERCENT_CHANGE_ONE_OF_MODEL
]

export const METRIC_TO_TYPES = {
  [PRICE]: COMMON_PROPS_FOR_METRIC,
  [DAILY_ACTIVE_ADDRESSES]: PRICE_OPTIONS,
  [PRICE_VOLUME_DIFFERENCE]: [PRICE_VOLUME_DIFFERENCE_METRIC],
  [ETH_WALLET]: ETH_WALLETS_OPTIONS
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
  label: 'Hour(s)',
  value: FREQUENCY_VALUES_TYPES.hours
}
export const FREQUENCY_TIME_TYPE_DAILY_MODEL = {
  label: 'Day(s)',
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

export const METRIC_TARGET_TEXT = {
  label: 'Text',
  value: 'text'
}

export const METRIC_TARGET_OPTIONS = [
  METRIC_TARGET_ASSETS,
  METRIC_TARGET_WATCHLIST,
  METRIC_TARGET_TEXT
]

export const BASE_THRESHOLD = 0.002 // # DEFAULT FOR PV-signals. Do't change!
export const BASE_PERCENT_THRESHOLD = 5

const DEFAULT_TARGET = {
  value: 'santiment',
  label: 'santiment'
}

export const METRIC_DEFAULT_VALUES = {
  [PRICE_ABSOLUTE_CHANGE]: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    absoluteThreshold: 25,
    threshold: BASE_THRESHOLD,
    timeWindow: 1,
    timeWindowUnit: { label: 'Day(s)', value: 'd' },
    type: PRICE_PERCENT_CHANGE_UP_MODEL,
    isRepeating: true,
    channels: ['Telegram'],
    target: DEFAULT_TARGET,
    metric: { ...PRICE_METRIC },
    signalType: { ...METRIC_TARGET_ASSETS }
  },
  [PRICE_PERCENT_CHANGE]: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    percentThreshold: 10,
    threshold: BASE_THRESHOLD,
    timeWindow: 1,
    timeWindowUnit: { label: 'Day(s)', value: 'd' },
    type: PRICE_PERCENT_CHANGE_DOWN_MODEL,
    isRepeating: true,
    channels: ['Telegram'],
    absoluteThreshold: 25,
    target: DEFAULT_TARGET
  },
  [DAILY_ACTIVE_ADDRESSES]: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    percentThreshold: 25,
    threshold: BASE_THRESHOLD,
    timeWindow: 1,
    timeWindowUnit: { label: 'Day(s)', value: 'd' },
    type: PRICE_ABS_CHANGE_ABOVE,
    isRepeating: true,
    channels: ['Telegram'],
    absoluteThreshold: 25,
    target: []
  },
  [PRICE_VOLUME_DIFFERENCE]: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    threshold: BASE_THRESHOLD,
    type: { ...PRICE_VOLUME_DIFFERENCE_METRIC },
    isRepeating: true,
    channels: ['Telegram'],
    target: DEFAULT_TARGET
  },
  [ETH_WALLET]: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    type: { ...ETH_WALLET_AMOUNT_UP },
    threshold: '',
    isRepeating: true,
    channels: ['Telegram'],
    percentThreshold: 200,
    timeWindow: 24,
    target: DEFAULT_TARGET
  },
  [TRENDING_WORDS]: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...FREQUENCY_TIME_TYPE_DAILY_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    type: { ...TRENDING_WORDS_WORD_MENTIONED },
    threshold: '',
    isRepeating: true,
    channels: ['Telegram'],
    target: DEFAULT_TARGET,
    timeWindow: 1,
    timeWindowUnit: { label: 'Day(s)', value: 'd' }
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
    value: { ...PRICE_PERCENT_CHANGE_DOWN_MODEL }
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
    label: 'Minute(s)',
    value: FREQUENCY_VALUES_TYPES.minutes
  },
  { ...FREQUENCY_TIME_TYPE_HOURS_MODEL },
  {
    ...FREQUENCY_TIME_TYPE_DAILY_MODEL
  },
  {
    label: 'Week(s)',
    value: FREQUENCY_VALUES_TYPES.weeks
  }
]

export const getDefaultTimeRangeValue = days => {
  return {
    value: days + 'd',
    label: Math.round(days / 30) + ' months'
  }
}

export const PREVIEWS_TIMERANGE_BY_TYPE = {
  [DAILY_ACTIVE_ADDRESSES]: getDefaultTimeRangeValue(90),
  [PRICE_ABSOLUTE_CHANGE]: getDefaultTimeRangeValue(90),
  [PRICE_PERCENT_CHANGE]: getDefaultTimeRangeValue(90),
  [PRICE_VOLUME_DIFFERENCE]: getDefaultTimeRangeValue(180),
  [ETH_WALLET]: getDefaultTimeRangeValue(90)
}

export const TIME_WINDOW_UNITS = [
  { value: 'd', label: 'Day(s)' },
  { value: 'h', label: 'Hour(s)' },
  { value: 'm', label: 'Minute(s)' }
]

export const TRIGGER_FORM_STEPS = {
  METRICS: 0,
  TYPES: 1,
  VALUES: 2,
  DESCRIPTION: 3
}

export const POSSIBLE_METRICS_ACTIVITIES = [
  PRICE_PERCENT_CHANGE,
  PRICE_ABSOLUTE_CHANGE,
  DAILY_ACTIVE_ADDRESSES,
  PRICE_VOLUME_DIFFERENCE,
  ETH_WALLET,

  METRIC_TYPES.METRIC_SIGNAL,
  METRIC_TYPES.WALLET_MOVEMENT
]

export const POSSIBLE_METRICS_FOR_CHART = [
  PRICE_METRIC.value,
  DAILY_ACTIVE_ADDRESSES_METRIC.value,
  PRICE_VOLUME_DIFFERENCE_METRIC.value,
  ETH_WALLET_METRIC.value,

  METRIC_TYPES.METRIC_SIGNAL,
  METRIC_TYPES.WALLET_MOVEMENT
]

export const METRIC_KEYS_WITH_TEXT_SELECTOR = [
  'social_volume_total',
  'social_volume_telegram',
  'social_volume_reddit',
  'social_volume_discord',
  'social_volume_professional_traders_chat',
  'social_dominance_total',
  'social_dominance_telegram',
  'social_dominance_reddit',
  'social_dominance_discord',
  'social_dominance_professional_traders_chat'
]
