import {
  ETH_WALLETS_OPERATIONS,
  ETH_WALLET_AMOUNT_UP,
  ETH_WALLET_METRIC,
  REQUIRED_MESSAGE,
  PRICE_PERCENT_CHANGE_UP_MODEL,
  PRICE_PERCENT_CHANGE,
  PRICE_VOLUME_DIFFERENCE,
  PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER,
  PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER,
  PRICE_ABSOLUTE_CHANGE,
  DAILY_ACTIVE_ADDRESSES,
  PRICE_CHANGE_TYPES,
  FREQUENCY_TYPE_ONCEPER_MODEL,
  FREQUENCY_TYPES_OPTIONS,
  ETH_WALLET_AMOUNT_DOWN,
  MUST_BE_MORE_ZERO_MESSAGE,
  PRICE_PERCENT_CHANGE_DOWN_MODEL,
  ETH_WALLET,
  DAILY_ACTIVE_ADRESSES_METRIC,
  PRICE_VOLUME_DIFFERENCE_METRIC,
  PRICE_METRIC,
  PRICE_ABS_CHANGE_OUTSIDE,
  PRICE_ABS_CHANGE_INSIDE,
  PRICE_ABS_CHANGE_BELOW,
  PRICE_ABS_CHANGE_ABOVE,
  COOLDOWN_TYPES,
  COOLDOWN_REGEXP,
  FREQUENCY_MAPPINGS,
  FREQUENCY_VALUES
} from './constants'

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

const getFormTriggerType = (type, operation) => {
  if (!operation) {
    switch (type) {
      case DAILY_ACTIVE_ADDRESSES: {
        return DAILY_ACTIVE_ADRESSES_METRIC
      }
      case PRICE_VOLUME_DIFFERENCE: {
        return PRICE_VOLUME_DIFFERENCE_METRIC
      }
      default: {
        return {
          value: type
        }
      }
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

  const value = type.value
  switch (value) {
    case ETH_WALLETS_OPERATIONS.AMOUNT_DOWN:
    case ETH_WALLETS_OPERATIONS.AMOUNT_UP: {
      mapped[value] = threshold
      break
    }
    case PRICE_CHANGE_TYPES.MOVING_DOWN:
    case PRICE_CHANGE_TYPES.MOVING_UP: {
      mapped[value] = percentThreshold
      break
    }
    case PRICE_CHANGE_TYPES.ABOVE:
    case PRICE_CHANGE_TYPES.BELOW: {
      mapped[value] = absoluteThreshold
      break
    }
    case PRICE_CHANGE_TYPES.INSIDE_CHANNEL:
    case PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL: {
      mapped[value] = [absoluteBorderLeft, absoluteBorderRight]
      break
    }
    default: {
      break
    }
  }

  return mapped
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

const getTriggerToFormThreshold = ({ threshold, operation }) => {
  let newThreshold = threshold || undefined

  if (operation && !newThreshold) {
    const operationType = getOperationType(operation)
    newThreshold = operation[operationType]
  }

  return newThreshold
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
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
    settings: { type, operation, time_window, target, asset, channel }
  } = currentTrigger

  const frequencyModels = getFrequencyFromCooldown(currentTrigger)
  const absolutePriceValues = getAbsolutePriceValues(currentTrigger)

  const address = target.eth_address

  const targetForParser = address ? asset : target

  const newTarget = getFormTriggerTarget(targetForParser)
  const newType = getFormTriggerType(type, operation)

  return {
    ethAddress: address,
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
    threshold: getTriggerToFormThreshold(settings),
    channels: [capitalizeFirstLetter(channel)],
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

const getFrequencyFromCooldown = ({ cooldown }) => {
  const [original, value, type] = COOLDOWN_REGEXP.exec(cooldown)

  let frequencyType

  switch (type) {
    case COOLDOWN_TYPES.minutly:
    case COOLDOWN_TYPES.hourly:
    case COOLDOWN_TYPES.daily:
    case COOLDOWN_TYPES.weekly: {
      frequencyType = FREQUENCY_TYPES_OPTIONS.find(item => item.value === type)
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
    ethAddress,
    timeWindow,
    timeWindowUnit,
    isRepeating,
    type
  } = formProps

  const newAsset = mapAssetTarget(target, ethAddress)
  const newTarget = mapTriggerTarget(target, ethAddress)

  const cooldownParams = getCooldownParams(formProps)

  const channel = channels.length ? channels[0].toLowerCase() : undefined

  return {
    ...prevTrigger,
    settings: {
      channel: channel,
      percent_threshold: percentThreshold || undefined,
      threshold: threshold || undefined,

      ...newTarget,
      ...newAsset,

      time_window: timeWindow
        ? timeWindow + '' + timeWindowUnit.value
        : undefined,
      type: type ? type.metric : undefined,
      operation: getTriggerOperation(formProps)
    },
    isRepeating: !!isRepeating,
    ...cooldownParams
    // isPublic: !!formProps.isPublic,
    // isActive: !!formProps.isActive
  }
}

export const getMetricsByType = type => {
  switch (type) {
    case 'daily_active_addresses':
      return ['active_addresses', 'historyPrice']
    case 'price_volume_difference':
      return ['historyPrice', 'volume']
    default:
      return ['historyPrice']
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
    const metricType = type ? type.metric : undefined
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

  let triggerAsset = {}

  if (checkingTrigger && checkingTrigger.settings) {
    const { target, asset } = checkingTrigger.settings
    triggerAsset = asset || target
  }

  if (!loading && !triggerAsset.hasOwnProperty('slug')) {
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

export const validateTriggerForm = values => {
  let errors = {}

  if (values.type.metric === ETH_WALLET && !values.ethAddress) {
    errors.ethAddress = REQUIRED_MESSAGE
  }

  if (
    values.type.metric === DAILY_ACTIVE_ADDRESSES ||
    values.type.metric === PRICE_PERCENT_CHANGE
  ) {
    if (!values.percentThreshold) {
      errors.percentThreshold = REQUIRED_MESSAGE
    } else if (values.percentThreshold <= 0) {
      errors.percentThreshold = MUST_BE_MORE_ZERO_MESSAGE
    }
    if (!values.timeWindow) {
      errors.timeWindow = REQUIRED_MESSAGE
    } else if (values.timeWindow <= 0) {
      errors.timeWindow = MUST_BE_MORE_ZERO_MESSAGE
    }
  }

  if (values.type.metric === PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER) {
    if (!values.absoluteThreshold) {
      errors.absoluteThreshold = REQUIRED_MESSAGE
    }
  }

  if (values.type.metric === PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER) {
    if (!values.absoluteBorderLeft) {
      errors.absoluteBorderLeft = REQUIRED_MESSAGE
    }
    if (!values.absoluteBorderRight) {
      errors.absoluteBorderRight = REQUIRED_MESSAGE
    }
  }

  if (values.type.metric === PRICE_VOLUME_DIFFERENCE) {
    if (!values.threshold) {
      errors.threshold = REQUIRED_MESSAGE
    } else if (values.threshold < 0) {
      errors.threshold = MUST_BE_MORE_ZERO_MESSAGE
    }
  }
  if (values.channels && values.channels.length === 0) {
    errors.channels = 'You must setup notification channel'
  }

  if (!values.frequencyType || !values.frequencyType.value) {
    errors.frequencyType = REQUIRED_MESSAGE
  }

  if (!values.frequencyTimeValue || !values.frequencyTimeValue.value) {
    errors.frequencyTimeValue = REQUIRED_MESSAGE
  }

  if (!values.frequencyTimeType || !values.frequencyTimeType.value) {
    errors.frequencyTimeType = REQUIRED_MESSAGE
  }

  return errors
}

export const couldShowChart = metric => {
  const possibleForChart = [
    PRICE_METRIC.value,
    DAILY_ACTIVE_ADRESSES_METRIC.value,
    PRICE_VOLUME_DIFFERENCE_METRIC.value
  ]
  return metric ? possibleForChart.indexOf(metric.value) >= 0 : false
}
