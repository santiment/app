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
export const pricePercentChangeUp = {
  value: PRICE_PERCENT_CHANGE,
  label: 'Moving up %',
  type: PRICE_CHANGE_TYPES.MOVING_UP
}

const getType = type => {
  const ALL_TYPES = {
    price_percent_change: { ...pricePercentChangeUp },
    daily_active_addresses: {
      label: 'Daily Active Addresses'
    },
    price_volume_difference: {
      label: 'Price/volume difference'
    }
  }
  return { value: type, ...ALL_TYPES[type] }
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
  if (!currentTrigger) {
    return undefined
  }
  const settings = currentTrigger.settings

  return {
    cooldown: currentTrigger.cooldown,
    isRepeating: currentTrigger.isRepeating,
    isActive: currentTrigger.isActive,
    isPublic: currentTrigger.isPublic,
    metric: getMetric(settings.type),
    timeWindow: settings.time_window
      ? +settings.time_window.match(/\d+/)[0]
      : undefined,
    timeWindowUnit: settings.time_window
      ? getTimeWindowUnit(settings.time_window)
      : undefined,
    target: getTarget(settings.target),
    type: getType(settings.type),
    percentThreshold: settings.percent_threshold
      ? settings.percent_threshold
      : undefined,
    threshold: settings.threshold ? settings.threshold : undefined,
    channels: [settings.channel]
  }
}

export const mapFormPropsToTrigger = (formProps, prevTrigger) => {
  return {
    ...prevTrigger,
    settings: {
      channel: formProps.channels[0],
      percent_threshold: formProps.percentThreshold
        ? formProps.percentThreshold
        : undefined,
      threshold: formProps.threshold ? formProps.threshold : undefined,
      target: { slug: formProps.target.value },
      time_window: formProps.timeWindow
        ? formProps.timeWindow + '' + formProps.timeWindowUnit.value
        : undefined,
      type: getType(formProps.type.value).value,
      operation: getTriggerOperation(formProps.type, formProps.percentThreshold)
    },
    isPublic: !!formProps.isPublic,
    isRepeating: !!formProps.isRepeating,
    cooldown: formProps.cooldown ? formProps.cooldown : undefined,
    isActive: !!formProps.isActive
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
        pricePercentChangeUp,
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

export const ARGS = {
  price_volume_difference: ['threshold'],
  daily_active_addresses: ['percentThreshold', 'timeWindow'],
  price_percent_change: ['percentThreshold', 'timeWindow']
}

export const METRIC_DEFAULT_VALUES = {
  price_percent_change: {
    cooldown: '24h',
    percentThreshold: 5,
    timeWindow: 24,
    timeWindowUnit: { label: 'hours', value: 'h' },
    type: pricePercentChangeUp,
    isRepeating: true,
    channels: ['telegram']
  },
  daily_active_addresses: {
    cooldown: '24h',
    percentThreshold: 200,
    timeWindow: 2,
    timeWindowUnit: { label: 'days', value: 'd' },
    type: { label: 'Daily Active Addresses', value: DAILY_ACTIVE_ADDRESSES },
    isRepeating: true,
    channels: ['telegram']
  },
  price_volume_difference: {
    cooldown: '24h',
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
    return pricePercentChangeUp
  } else {
    return PRICE_TYPES[metric.value][0]
  }
}

export const mapTriggerToProps = ({ data: { trigger, loading, error } }) => {
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
  if (
    !loading &&
    !(trigger || {}).trigger.settings.target.hasOwnProperty('slug')
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
      trigger: (trigger || {}).trigger,
      isLoading: loading,
      isError: !!error
    }
  }
}
