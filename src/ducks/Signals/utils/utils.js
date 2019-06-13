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

const getTarget = target => {
  // TODO: only for one asset as target
  const { slug } = target
  return { value: slug, label: slug }
}

export const DAILY_ACTIVE_ADDRESSES = 'daily_active_addresses'
export const PRICE_PERCENT_CHANGE = 'price_percent_change'
export const PRICE_VOLUME_DIFFERENCE = 'price_volume_difference'

export const PRICE_CHANGE_TYPES = {
  MOVING_UP: 'percent_up',
  MOVING_DOWN: 'percent_down'
}
export const PRICE_PERCENT_CHANGE_UP_MODEL = {
  value: PRICE_PERCENT_CHANGE,
  label: 'Moving up %',
  type: PRICE_CHANGE_TYPES.MOVING_UP
}

const METRIC_TYPES_DESCRIPTION = {
  price_percent_change: {
    ...PRICE_PERCENT_CHANGE_UP_MODEL
  },
  daily_active_addresses: {
    label: 'Daily Active Addresses'
  },
  price_volume_difference: {
    label: 'Price/volume difference'
  }
}

const getType = type => {
  return { value: type, ...METRIC_TYPES_DESCRIPTION[type] }
}

const getTriggerOperation = (model, percentThreshold) => {
  const mapped = {}
  mapped[model.type] = percentThreshold
  return mapped
}

const getMetric = type => {
  if (type === 'price_percent_change') {
    // TODO: add absolute price changing
    return { label: 'Price', value: 'price' }
  }
  return getType(type)
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
    settings: { type, time_window, target, threshold, channel }
  } = currentTrigger

  const frequencyModels = getFrequencyFromCooldown(currentTrigger)

  return {
    cooldown: cooldown,
    isRepeating: isRepeating,
    isActive: isActive,
    isPublic: isPublic,
    metric: getMetric(type),
    timeWindow: time_window ? +time_window.match(/\d+/)[0] : undefined,
    timeWindowUnit: time_window ? getTimeWindowUnit(time_window) : undefined,
    target: getTarget(target),
    type: getType(type),
    percentThreshold: getPercentTreshold(settings),
    threshold: threshold || undefined,
    channels: [channel],
    ...frequencyModels
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

export const mapFormPropsToTrigger = (formProps, prevTrigger) => {
  const {
    channels,
    percentThreshold,
    threshold,
    target,
    timeWindow,
    timeWindowUnit,
    isRepeating,
    type
  } = formProps

  const cooldownParams = getCooldownParams(formProps)

  return {
    ...prevTrigger,
    settings: {
      channel: channels[0],
      percent_threshold: percentThreshold || undefined,
      threshold: threshold || undefined,
      target: { slug: target.value },
      time_window: timeWindow
        ? timeWindow + '' + timeWindowUnit.value
        : undefined,
      type: getType(type.value).value,
      operation: getTriggerOperation(type, percentThreshold)
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
  { label: 'Price', value: 'price' },
  // { label: 'Trending Words', value: 'trendingWords' },
  { label: 'Daily Active Addresses', value: DAILY_ACTIVE_ADDRESSES },
  { label: 'Price/volume difference', value: PRICE_VOLUME_DIFFERENCE }
]

export const PRICE_TYPES = {
  price: [
    {
      label: 'Price changing',
      options: [
        {
          value: '',
          label: 'More than'
        },
        {
          value: '',
          label: 'Less than'
        },
        {
          value: '',
          label: 'Entering channel'
        },
        {
          value: '',
          label: 'Outside channel'
        }
      ]
    },
    {
      label: 'Percent change',
      options: [
        PRICE_PERCENT_CHANGE_UP_MODEL,
        {
          value: PRICE_PERCENT_CHANGE,
          label: 'Moving down %',
          type: PRICE_CHANGE_TYPES.MOVING_DOWN
        }
      ]
    }
  ],
  daily_active_addresses: [
    { label: 'Daily Active Addresses', value: DAILY_ACTIVE_ADDRESSES }
  ],
  price_volume_difference: [
    { label: 'Price/volume difference', value: PRICE_VOLUME_DIFFERENCE }
  ],
  price_percent_change: [
    { label: 'Price percentage change', value: PRICE_PERCENT_CHANGE }
  ]
}

export const METRICS_DEPENDENCIES = {
  price_volume_difference: ['threshold'],
  daily_active_addresses: ['percentThreshold', 'timeWindow'],
  price_percent_change: ['percentThreshold', 'timeWindow']
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

export const METRIC_DEFAULT_VALUES = {
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
    type: {
      label: 'Price/volume difference',
      value: PRICE_VOLUME_DIFFERENCE
    },
    isRepeating: true,
    channels: ['telegram']
  }
}

export const getTypeByMetric = metric => {
  if (metric.value === 'price') {
    return PRICE_PERCENT_CHANGE_UP_MODEL
  } else {
    return PRICE_TYPES[metric.value][0]
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
    value: {
      value: 'price',
      label: 'Price'
    }
  },
  type: {
    isDisabled: false,
    value: { ...PRICE_PERCENT_CHANGE_UP_MODEL }
  },
  frequencyType: {
    isDisabled: false,
    value: { ...FREQUENCY_TYPE_ONCEPER_MODEL }
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

const FREQUENCY_MAPPINGS = () => {
  const maps = {}
  maps[FREQUENCY_VALUES_TYPES.minutes] = MINUTES
  maps[FREQUENCY_VALUES_TYPES.hours] = HOURS
  maps[FREQUENCY_VALUES_TYPES.weeks] = WEEKS
  maps[FREQUENCY_VALUES_TYPES.days] = DAYS
  return maps
}

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
  return getFrequencyTimeValues(frequencyTimeType)[0]
}

export function getNearestFrequencyTypeValue (frequencyType) {
  return getFrequencyTimeType(frequencyType)[0]
}

const ASSET_FILTER_TYPES = {
  asset: 'assets',
  assetGroup: 'assetGroup',
  watchlist: 'watchlist'
}

export const ASSETS_FILTERS = [
  {
    label: 'Assets',
    value: ASSET_FILTER_TYPES.asset
  },
  {
    label: 'Asset group',
    value: ASSET_FILTER_TYPES.assetGroup,
    isDisabled: true
  },
  {
    label: 'Watchlist',
    value: ASSET_FILTER_TYPES.watchlist,
    isDisabled: true
  }
]
