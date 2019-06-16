const getTimeWindowUnit = timeWindow => {
  if (!timeWindow) return undefined
  const value = timeWindow.replace(/[0-9]/g, '')
  return {
    value,
    label: (() => {
      switch (value) {
        case 'd':
          return 'days'
        case 'm':
          return 'minutes'
        default:
          return 'hours'
      }
    })()
  }
}

const getFormTriggerTarget = target => {
  // TODO: only for one asset as target
  const { slug } = target
  return { value: slug, label: slug }
}

export const ETH_WALLETS_OPERATIONS = {
  AMOUNT_DOWN: 'amount_down',
  AMOUNT_UP: 'amount_up'
}

const ETH_WALLET = 'eth_wallet'

export const ETH_WALLET_AMOUNT_UP = {
  label: 'Amount up',
  value: ETH_WALLET,
  type: ETH_WALLETS_OPERATIONS.AMOUNT_UP
}
export const ETH_WALLET_AMOUNT_DOWN = {
  label: 'Amount down',
  value: ETH_WALLET,
  type: ETH_WALLETS_OPERATIONS.AMOUNT_DOWN
}

export const ETH_WALLETS_OPTIONS = [
  { ...ETH_WALLET_AMOUNT_UP },
  { ...ETH_WALLET_AMOUNT_DOWN }
]

export const DAILY_ACTIVE_ADDRESSES = 'daily_active_addresses'
export const PRICE_PERCENT_CHANGE = 'price_percent_change'
export const PRICE_ABSOLUTE_CHANGE = 'price_absolute_change'
export const PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER =
  'price_absolute_change_single_border'
export const PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER =
  'price_absolute_change_double_border'
export const PRICE_VOLUME_DIFFERENCE = 'price_volume_difference'

export const PRICE_CHANGE_TYPES = {
  MOVING_UP: 'percent_up',
  MOVING_DOWN: 'percent_down',
  INSIDE_CHANNEL: 'inside_channel',
  OUTSIDE_CHANNEL: 'outside_channel',
  ABOVE: 'above',
  BELOW: 'below'
}
export const PRICE_PERCENT_CHANGE_UP_MODEL = {
  value: PRICE_PERCENT_CHANGE,
  label: 'Moving up %',
  type: PRICE_CHANGE_TYPES.MOVING_UP
}

export const PRICE_PERCENT_CHANGE_DOWN_MODEL = {
  value: PRICE_PERCENT_CHANGE,
  label: 'Moving down %',
  type: PRICE_CHANGE_TYPES.MOVING_DOWN
}

const PRICE_ABS_CHANGE_ABOVE = {
  value: PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER,
  mainValue: PRICE_ABSOLUTE_CHANGE,
  label: 'More than',
  type: PRICE_CHANGE_TYPES.ABOVE
}

const PRICE_ABS_CHANGE_BELOW = {
  value: PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER,
  mainValue: PRICE_ABSOLUTE_CHANGE,
  label: 'Less than',
  type: PRICE_CHANGE_TYPES.BELOW
}

const PRICE_ABS_CHANGE_INSIDE = {
  value: PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER,
  mainValue: PRICE_ABSOLUTE_CHANGE,
  label: 'Entering channel',
  type: PRICE_CHANGE_TYPES.INSIDE_CHANNEL
}

const PRICE_ABS_CHANGE_OUTSIDE = {
  value: PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER,
  mainValue: PRICE_ABSOLUTE_CHANGE,
  label: 'Outside channel',
  type: PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL
}

const getFormTriggerType = (type, operation) => {
  if (!operation) {
    return {
      value: type
    }
  }

  const operationType = getOperationType(operation)

  switch (operationType) {
    case ETH_WALLETS_OPERATIONS.AMOUNT_UP: {
      return ETH_WALLET_AMOUNT_UP
    }

    case ETH_WALLETS_OPERATIONS.AMOUNT_DOWN: {
      return ETH_WALLET_AMOUNT_DOWN
    }

    case PRICE_CHANGE_TYPES.MOVING_UP: {
      return PRICE_PERCENT_CHANGE_UP_MODEL
    }

    case PRICE_CHANGE_TYPES.MOVING_DOWN: {
      return PRICE_PERCENT_CHANGE_DOWN_MODEL
    }

    case PRICE_CHANGE_TYPES.ABOVE: {
      return PRICE_ABS_CHANGE_ABOVE
    }
    case PRICE_CHANGE_TYPES.BELOW: {
      return PRICE_ABS_CHANGE_BELOW
    }
    case PRICE_CHANGE_TYPES.INSIDE_CHANNEL: {
      return PRICE_ABS_CHANGE_INSIDE
    }
    case PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL: {
      return PRICE_ABS_CHANGE_OUTSIDE
    }

    default: {
      console.log("Can't map type and operation to form structure")
      return undefined
    }
  }
}

const getTriggerOperation = ({
  type,
  threshold,
  percentThreshold,
  absoluteThreshold,
  absoluteBorderRight,
  absoluteBorderLeft
}) => {
  if (!type) {
    return undefined
  }

  const mapped = {}

  switch (type.type) {
    case ETH_WALLETS_OPERATIONS.AMOUNT_DOWN:
    case ETH_WALLETS_OPERATIONS.AMOUNT_UP: {
      mapped[type.type] = threshold
      break
    }
    case PRICE_CHANGE_TYPES.MOVING_DOWN:
    case PRICE_CHANGE_TYPES.MOVING_UP: {
      mapped[type.type] = percentThreshold
      break
    }
    case PRICE_CHANGE_TYPES.ABOVE:
    case PRICE_CHANGE_TYPES.BELOW: {
      mapped[type.type] = absoluteThreshold
      break
    }
    case PRICE_CHANGE_TYPES.INSIDE_CHANNEL:
    case PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL: {
      mapped[type.type] = [absoluteBorderLeft, absoluteBorderRight]
      break
    }
    default: {
      break
    }
  }

  return mapped
}

export const ETH_WALLET_METRIC = {
  label: 'Historical balance',
  value: ETH_WALLET,
  hidden: true
}

const PRICE_METRIC = { label: 'Price', value: 'price' }
const DAILY_ACTIVE_ADRESSES_METRIC = {
  label: 'Daily Active Addresses',
  value: DAILY_ACTIVE_ADDRESSES
}
const PRICE_VOLUME_DIFFERENCE_METRIC = {
  label: 'Price/volume difference',
  value: PRICE_VOLUME_DIFFERENCE
}

const getMetric = type => {
  switch (type) {
    case ETH_WALLET: {
      return ETH_WALLET_METRIC
    }
    case PRICE_PERCENT_CHANGE:
    case PRICE_ABSOLUTE_CHANGE: {
      return PRICE_METRIC
    }
    case DAILY_ACTIVE_ADDRESSES: {
      return DAILY_ACTIVE_ADRESSES_METRIC
    }
    case PRICE_VOLUME_DIFFERENCE: {
      return PRICE_VOLUME_DIFFERENCE_METRIC
    }
    default: {
      console.log("Can't find possible metric")
      return undefined
    }
  }
}

const getOperationType = operation => {
  return Object.keys(operation)[0]
}

const getAbsolutePriceValues = ({ settings: { operation, type } }) => {
  const values = {}

  if (operation) {
    if (type === PRICE_ABSOLUTE_CHANGE) {
      const operationType = getOperationType(operation)

      switch (operationType) {
        case PRICE_CHANGE_TYPES.ABOVE:
        case PRICE_CHANGE_TYPES.BELOW: {
          values['absoluteThreshold'] = operation[operationType]
          break
        }
        case PRICE_CHANGE_TYPES.INSIDE_CHANNEL:
        case PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL: {
          const [left, right] = operation[operationType]

          values['absoluteBorderLeft'] = left
          values['absoluteBorderRight'] = right

          break
        }
        default: {
          break
        }
      }
    }
  }

  return values
}

export const mapTriggerToFormProps = currentTrigger => {
  if (!currentTrigger || !currentTrigger.settings) {
    return undefined
  }
  const {
    cooldown,
    isActive,
    isPublic,
    isRepeating,
    settings,
    settings: {
      type,
      operation,
      time_window,
      target,
      asset,
      threshold,
      channel
    }
  } = currentTrigger

  const frequencyModels = getFrequencyFromCooldown(currentTrigger)
  const absolutePriceValues = getAbsolutePriceValues(currentTrigger)

  debugger

  const address = target.eth_address

  const targetForParser = address ? asset : target

  const newTarget = getFormTriggerTarget(targetForParser)
  const newType = getFormTriggerType(type, operation)

  return {
    address: address,
    cooldown: cooldown,
    isRepeating: isRepeating,
    isActive: isActive,
    isPublic: isPublic,
    metric: getMetric(type, operation),
    type: newType,
    timeWindow: time_window ? +time_window.match(/\d+/)[0] : undefined,
    timeWindowUnit: time_window ? getTimeWindowUnit(time_window) : undefined,
    target: newTarget,
    percentThreshold: getPercentTreshold(settings),
    threshold: threshold || undefined,
    channels: [channel],
    ...frequencyModels,
    ...absolutePriceValues
  }
}

const getPercentTreshold = ({ type, operation, percent_threshold }) => {
  switch (type) {
    case PRICE_PERCENT_CHANGE: {
      return operation ? operation[Object.keys(operation)[0]] : undefined
    }
    case DAILY_ACTIVE_ADDRESSES: {
      return percent_threshold
    }
    default: {
      return percent_threshold
    }
  }
}

const getCooldownParams = ({ frequencyTimeType, frequencyTimeValue }) => {
  const cooldown = frequencyTimeValue.value + frequencyTimeType.value
  return {
    cooldown: cooldown
  }
}

const COOLDOWN_REGEXP = /([0-9]+)*([smhdw])/i

const getFrequencyFromCooldown = ({ cooldown }) => {
  const [original, value, type] = COOLDOWN_REGEXP.exec(cooldown)

  let frequencyType

  switch (type) {
    case COOLDOWN_TYPES.minutly:
    case COOLDOWN_TYPES.hourly:
    case COOLDOWN_TYPES.daily:
    case COOLDOWN_TYPES.weekly: {
      frequencyType = FREQUENCY_TYPES.find(item => item.value === type)
      break
    }
    default: {
      frequencyType = FREQUENCY_TYPE_ONCEPER_MODEL
      break
    }
  }

  const frequencyTimeType = FREQUENCY_VALUES.find(item => item.value === type)
  const frequencyTimeValue = {
    value: value,
    label: value
  }

  return {
    frequencyType: frequencyType,
    frequencyTimeType: frequencyTimeType,
    frequencyTimeValue: frequencyTimeValue,
    cooldown: original
  }
}

export const mapTriggerTarget = (target, address) => {
  let newTarget = { slug: target.value }

  if (address) {
    newTarget = { eth_address: address }
  }

  return {
    target: newTarget
  }
}
export const mapAssetTarget = target => {
  return {
    asset: { slug: target.value }
  }
}

export const mapFormPropsToTrigger = (formProps, prevTrigger) => {
  const {
    channels,
    percentThreshold,
    threshold,
    target,
    address,
    timeWindow,
    timeWindowUnit,
    isRepeating,
    type
  } = formProps

  const newAsset = mapAssetTarget(target, address)
  const newTarget = mapTriggerTarget(target, address)

  const cooldownParams = getCooldownParams(formProps)

  return {
    ...prevTrigger,
    settings: {
      channel: channels[0],
      percent_threshold: percentThreshold || undefined,
      threshold: threshold || undefined,

      ...newTarget,
      ...newAsset,

      time_window: timeWindow
        ? timeWindow + '' + timeWindowUnit.value
        : undefined,
      type: type ? type.mainValue || type.value : undefined,
      operation: getTriggerOperation(formProps)
    },
    isRepeating: !!isRepeating,
    ...cooldownParams
    // isPublic: !!formProps.isPublic,
    // isActive: !!formProps.isActive
  }
}
export const mapValuesToTriggerProps = ({
  type,
  timeWindowUnit,
  timeWindow,
  percentThreshold,
  target,
  metric,
  threshold,
  cooldown
}) => ({
  cooldown,
  settings: (() => {
    const metricType = type ? type.value : undefined
    const time = timeWindowUnit ? timeWindow + timeWindowUnit.value : undefined

    const slug = { slug: target.value }

    const defaultValue = {
      target: slug,
      type: metricType,
      percent_threshold: percentThreshold,
      time_window: time
    }

    if (!metric) {
      return defaultValue
    }

    switch (metric.value) {
      case DAILY_ACTIVE_ADDRESSES:
        return {
          target: slug,
          type: metricType,
          time_window: time,
          percent_threshold: percentThreshold
        }
      case PRICE_VOLUME_DIFFERENCE:
        return {
          target: slug,
          type: metricType,
          threshold: threshold
        }
      default:
        return defaultValue
    }
  })()
})

export const METRICS = [
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

export const METRICS_DEPENDENCIES = {
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

const COOLDOWN_TYPES = {
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

const DEFAULT_ASSETS_FILTER_MODEL = {
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

export const METRIC_DEFAULT_VALUES = {
  price_absolute_change: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    absoluteThreshold: 5,
    absoluteBorderLeft: 50,
    absoluteBorderRight: 75,
    timeWindow: 24,
    timeWindowUnit: { label: 'hours', value: 'h' },
    type: PRICE_PERCENT_CHANGE_UP_MODEL,
    isRepeating: true,
    channels: ['telegram']
  },
  price_percent_change: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    percentThreshold: 5,
    timeWindow: 24,
    timeWindowUnit: { label: 'hours', value: 'h' },
    type: PRICE_PERCENT_CHANGE_UP_MODEL,
    isRepeating: true,
    channels: ['telegram']
  },
  daily_active_addresses: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    percentThreshold: 200,
    timeWindow: 2,
    timeWindowUnit: { label: 'days', value: 'd' },
    type: {
      label: 'Daily Active Addresses',
      value: DAILY_ACTIVE_ADDRESSES
    },
    isRepeating: true,
    channels: ['telegram']
  },
  price_volume_difference: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    threshold: 0.002,
    type: { ...PRICE_VOLUME_DIFFERENCE_METRIC },
    isRepeating: true,
    channels: ['telegram']
  },
  eth_wallet: {
    frequencyType: { ...FREQUENCY_TYPE_ONCEPER_MODEL },
    frequencyTimeType: { ...DEFAULT_FREQUENCY_TIME_TYPE_MODEL },
    frequencyTimeValue: { ...frequencyTymeValueBuilder(1) },
    threshold: 100,
    type: { ...ETH_WALLET_AMOUNT_UP },
    isRepeating: true,
    channels: ['telegram']
  }
}

export const getNearestTypeByMetric = metric => {
  switch (metric.value) {
    case ETH_WALLET_METRIC.value: {
      return ETH_WALLET_AMOUNT_UP
    }
    case PRICE_METRIC.value: {
      return PRICE_PERCENT_CHANGE_UP_MODEL
    }
    case DAILY_ACTIVE_ADRESSES_METRIC.value: {
      return DAILY_ACTIVE_ADRESSES_METRIC
    }
    case PRICE_VOLUME_DIFFERENCE_METRIC.value: {
      return PRICE_VOLUME_DIFFERENCE_METRIC
    }
    default: {
      return undefined
    }
  }
}

export const mapGQLTriggerToProps = ({ data: { trigger, loading, error } }) => {
  if (!loading && !trigger) {
    return {
      trigger: {
        isError: false,
        isEmpty: true,
        trigger: null,
        isLoading: false
      }
    }
  }

  const checkingTrigger = trigger ? trigger.trigger : undefined

  if (
    !loading &&
    !(
      checkingTrigger &&
      checkingTrigger.settings &&
      checkingTrigger.settings.target &&
      checkingTrigger.settings.target.hasOwnProperty('slug')
    )
  ) {
    return {
      trigger: {
        isError: true,
        isLoading: false,
        trigger: null,
        errorMessage: 'This is the unsupported signal format'
      }
    }
  }
  return {
    trigger: {
      trigger: checkingTrigger,
      isLoading: loading,
      isError: !!error
    }
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

export const FREQUENCY_TYPES = [
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

const FREQUENCY_MAPPINGS = (() => {
  const maps = {}
  maps[FREQUENCY_VALUES_TYPES.minutes] = MINUTES
  maps[FREQUENCY_VALUES_TYPES.hours] = HOURS
  maps[FREQUENCY_VALUES_TYPES.weeks] = WEEKS
  maps[FREQUENCY_VALUES_TYPES.days] = DAYS
  return maps
})()

const FREQUENCY_VALUES = [
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

export function getFrequencyTimeType (frequencyType) {
  if (frequencyType && frequencyType.available) {
    return FREQUENCY_VALUES.filter(item => {
      return frequencyType.available.indexOf(item.value) !== -1
    })
  } else {
    return FREQUENCY_VALUES
  }
}

export function getFrequencyTimeValues (frequencyTimeType) {
  let selectedValues
  if (frequencyTimeType) {
    selectedValues = FREQUENCY_VALUES.find(
      item => item.value === frequencyTimeType.value
    )
  }
  return selectedValues ? FREQUENCY_MAPPINGS[selectedValues.value] : []
}

export function getNearestFrequencyTimeValue (frequencyTimeType) {
  const timeValues = getFrequencyTimeValues(frequencyTimeType)
  return timeValues[0]
}

export function getNearestFrequencyTypeValue (frequencyType) {
  return getFrequencyTimeType(frequencyType)[0]
}
