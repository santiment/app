export const REQUIRED_MESSAGE = 'Required'
export const MUST_BE_MORE_ZERO_MESSAGE = 'Must be more 0'

export const ETH_WALLET = 'eth_wallet'
export const DAILY_ACTIVE_ADDRESSES = 'daily_active_addresses'
export const PRICE_PERCENT_CHANGE = 'price_percent_change'
export const PRICE_ABSOLUTE_CHANGE = 'price_absolute_change'
export const PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER =
  'price_absolute_change_single_border'
export const PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER =
  'price_absolute_change_double_border'
export const PRICE_VOLUME_DIFFERENCE = 'price_volume_difference'

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

export const PRICE_METRIC = { label: 'Price', value: 'price' }
export const DAILY_ACTIVE_ADRESSES_METRIC = {
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
  // { label: 'Trending Words', value: 'trendingWords' },
  { ...DAILY_ACTIVE_ADRESSES_METRIC },
  { ...PRICE_VOLUME_DIFFERENCE_METRIC }
]

export const PRICE_TYPES = {
  price: [
    {
      label: 'Price changing',
      options: [
        PRICE_ABS_CHANGE_ABOVE,
        PRICE_ABS_CHANGE_BELOW,
        PRICE_ABS_CHANGE_INSIDE,
        PRICE_ABS_CHANGE_OUTSIDE
      ]
    },
    {
      label: 'Percent change',
      options: [PRICE_PERCENT_CHANGE_UP_MODEL, PRICE_PERCENT_CHANGE_DOWN_MODEL]
    }
  ],
  daily_active_addresses: [DAILY_ACTIVE_ADRESSES_METRIC],
  price_volume_difference: [PRICE_VOLUME_DIFFERENCE_METRIC],
  eth_wallet: ETH_WALLETS_OPTIONS
}

export const METRIC_TYPES_DEPENDENCIES = {
  price_volume_difference: ['threshold'],
  daily_active_addresses: ['percentThreshold', 'timeWindow'],
  price_percent_change: ['percentThreshold', 'timeWindow'],
  price_absolute_change_single_border: ['absoluteThreshold'],
  price_absolute_change_double_border: [
    'absoluteBorderLeft',
    'absoluteBorderRight'
  ],
  eth_wallet: ['threshold', 'walletBalanceChangeType']
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
  label: 'Once Per',
  value: COOLDOWN_TYPES.oncePer
}

export const FREQUENCY_TYPE_HOUR_MODEL = {
  label: 'Hourly',
  value: COOLDOWN_TYPES.hourly,
  available: [FREQUENCY_VALUES_TYPES.hours]
}

export const DEFAULT_FREQUENCY_TIME_TYPE_MODEL = {
  label: 'Hours',
  value: FREQUENCY_VALUES_TYPES.hours
}

const ASSET_FILTER_TYPES = {
  asset: 'assets',
  assetGroup: 'assetGroup',
  watchlist: 'watchlist'
}

export const DEFAULT_ASSETS_FILTER_MODEL = {
  label: 'Assets',
  value: ASSET_FILTER_TYPES.asset
}

export const ASSETS_FILTERS = [
  DEFAULT_ASSETS_FILTER_MODEL,
  {
    label: 'Asset group',
    value: ASSET_FILTER_TYPES.assetGroup
  },
  {
    label: 'Watchlist',
    value: ASSET_FILTER_TYPES.watchlist
  }
]

export const BASE_THRESHOLD = 0.002
export const BASE_PERCENT_THRESHOLD = 5

export const METRIC_DEFAULT_VALUES = {
  price_absolute_change: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    absoluteThreshold: 5,
    absoluteBorderLeft: 50,
    absoluteBorderRight: 75,
    threshold: BASE_THRESHOLD,
    timeWindow: 24,
    timeWindowUnit: { label: 'Hours', value: 'h' },
    type: PRICE_PERCENT_CHANGE_UP_MODEL,
    isRepeating: true,
    channels: ['Telegram']
  },
  price_percent_change: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    percentThreshold: 5,
    threshold: BASE_THRESHOLD,
    timeWindow: 24,
    timeWindowUnit: { label: 'Hours', value: 'h' },
    type: PRICE_PERCENT_CHANGE_UP_MODEL,
    isRepeating: true,
    channels: ['Telegram'],
    absoluteThreshold: 5,
    absoluteBorderLeft: 50,
    absoluteBorderRight: 75
  },
  daily_active_addresses: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    percentThreshold: 200,
    threshold: BASE_THRESHOLD,
    timeWindow: 2,
    timeWindowUnit: { label: 'Days', value: 'd' },
    type: { ...DAILY_ACTIVE_ADRESSES_METRIC },
    isRepeating: true,
    channels: ['Telegram']
  },
  price_volume_difference: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    threshold: BASE_THRESHOLD,
    type: { ...PRICE_VOLUME_DIFFERENCE_METRIC },
    isRepeating: true,
    channels: ['Telegram']
  },
  eth_wallet: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    threshold: 100,
    type: { ...ETH_WALLET_AMOUNT_UP },
    isRepeating: true,
    channels: ['Telegram']
  }
}

export const DEFAULT_FORM_META_SETTINGS = {
  target: {
    isDisabled: false,
    value: {
      value: 'santiment',
      label: 'santiment'
    }
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
    isDisabled: true,
    value: { ...DEFAULT_ASSETS_FILTER_MODEL }
  }
}

export const FREQUENCY_TYPES_OPTIONS = [
  FREQUENCY_TYPE_ONCEPER_MODEL,
  {
    label: 'Minutly',
    value: COOLDOWN_TYPES.minutly,
    available: [FREQUENCY_VALUES_TYPES.minutes]
  },
  FREQUENCY_TYPE_HOUR_MODEL,
  {
    label: 'Daily',
    value: COOLDOWN_TYPES.daily,
    available: [FREQUENCY_VALUES_TYPES.days]
  },
  {
    label: 'Weekly',
    value: COOLDOWN_TYPES.weekly,
    available: [FREQUENCY_VALUES_TYPES.weeks]
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
  { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
  {
    label: 'Days',
    value: FREQUENCY_VALUES_TYPES.days
  },
  {
    label: 'Weeks',
    value: FREQUENCY_VALUES_TYPES.weeks
  }
]
