import {
  ETH_WALLETS_OPERATIONS,
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
  MUST_BE_MORE_ZERO_MESSAGE,
  PRICE_PERCENT_CHANGE_DOWN_MODEL,
  ETH_WALLET,
  DAILY_ACTIVE_ADDRESSES_METRIC,
  PRICE_VOLUME_DIFFERENCE_METRIC,
  PRICE_METRIC,
  PRICE_ABS_CHANGE_OUTSIDE,
  PRICE_ABS_CHANGE_INSIDE,
  PRICE_ABS_CHANGE_BELOW,
  PRICE_ABS_CHANGE_ABOVE,
  COOLDOWN_TYPES,
  COOLDOWN_REGEXP,
  FREQUENCY_MAPPINGS,
  FREQUENCY_VALUES,
  BASE_THRESHOLD,
  BASE_PERCENT_THRESHOLD,
  PREVIEWS_TIMERANGE_BY_TYPE,
  TIME_WINDOW_UNITS,
  getDefaultTimeRangeValue,
  TRENDING_WORDS_METRIC,
  TRENDING_WORDS_PROJECT_MENTIONED,
  TRENDING_WORDS,
  TRENDING_WORDS_WORD_MENTIONED,
  METRIC_TARGET_ASSETS,
  METRIC_TARGET_WATCHLIST,
  METRIC_TARGET_TEXT,
  TRENDING_WORDS_WATCHLIST_MENTIONED,
  PRICE,
  METRIC_DEFAULT_VALUES,
  NOT_VALID_HB_ADDRESS,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MAX_DESCR_LENGTH,
  PRICE_PERCENT_CHANGE_ONE_OF_MODEL,
  CHANNELS_MAP,
  POSSIBLE_METRICS_FOR_CHART,
  SIGNAL_METRIC_TYPES,
  METRIC_TYPES,
  AMOUNT_ABS_CHANGE_UP_MODEL,
  AMOUNT_ABS_CHANGE_DOWN_MODEL,
  PRICE_ABS_CHANGE_BELOW_OR_EQUAL,
  PRICE_ABS_CHANGE_ABOVE_OR_EQUAL
} from './constants'
import { capitalizeStr } from '../../../utils/utils'
import { formatNumber } from '../../../utils/formatting'
import { Metric } from '../../dataHub/metrics'
import { useWatchlist } from '../../Watchlists/gql/hooks'
import {
  isDailyMetric,
  SIGNAL_SUPPORTED_METRICS
} from '../signalFormManager/signalCrudForm/formParts/metricTypes/metrics'
import { findWebHook } from '../signalFormManager/signalCrudForm/formParts/channels/hooks'
import { SCREENER_DEFAULT_SIGNAL } from '../ScreenerSignal/utils'

export const mapToOptions = input => {
  if (!input) {
    return []
  }

  if (Array.isArray(input)) {
    return input.map(mapToOption)
  } else {
    return [mapToOption(input)]
  }
}

export const mapToOption = item => {
  if (typeof item === 'object') {
    const value = targetMapper(item)
    return {
      value,
      label: value
    }
  } else {
    return {
      value: item,
      label: item
    }
  }
}

export const targetMapper = ({
  value,
  slug,
  address,
  watchlist_id,
  currency
} = {}) => slug || value || currency || address || watchlist_id
export const targetMapperWithName = ({ value, slug, name } = {}) =>
  name || slug || value

export const targetMapperWithTicker = ({ value, slug, ticker } = {}) =>
  ticker || slug || value

const getTimeWindowUnit = timeWindow => {
  if (!timeWindow) return undefined

  const value = timeWindow.replace(/[0-9]/g, '')
  return TIME_WINDOW_UNITS.find(item => item.value === value)
}

const getFormTriggerTarget = settings => {
  const {
    target = {},
    target: { eth_address, address = eth_address, text } = {},
    selector,
    asset
  } = settings
  const { slug, watchlist_id } = target

  if (watchlist_id) {
    return {
      signalType: METRIC_TARGET_WATCHLIST,

      targetWatchlist: {
        value: watchlist_id
      }
    }
  }

  if (text) {
    return {
      signalType: METRIC_TARGET_TEXT,
      textSelector: mapToOption(text)
    }
  }

  if (selector || address) {
    const newEthAddress = address
      ? Array.isArray(address)
        ? mapToOptions(address)
        : mapToOptions([address])
      : undefined

    return {
      ethAddress: newEthAddress,
      target: selector
        ? {
            slug: selector.slug || selector.currency
          }
        : asset,
      signalType: METRIC_TARGET_ASSETS
    }
  }

  const newTarget = Array.isArray(slug) ? mapToOptions(slug) : mapToOption(slug)

  return {
    target: newTarget,
    signalType: METRIC_TARGET_ASSETS
  }
}

const getFormTriggerType = ({ target, type, operation }) => {
  if (!operation) {
    switch (type) {
      case DAILY_ACTIVE_ADDRESSES: {
        return DAILY_ACTIVE_ADDRESSES_METRIC
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
    case PRICE_PERCENT_CHANGE_UP_MODEL.value: {
      return PRICE_PERCENT_CHANGE_UP_MODEL
    }

    case PRICE_PERCENT_CHANGE_DOWN_MODEL.value: {
      return PRICE_PERCENT_CHANGE_DOWN_MODEL
    }

    case PRICE_PERCENT_CHANGE_ONE_OF_MODEL.value: {
      return PRICE_PERCENT_CHANGE_ONE_OF_MODEL
    }

    case PRICE_ABS_CHANGE_ABOVE.value: {
      return PRICE_ABS_CHANGE_ABOVE
    }
    case PRICE_ABS_CHANGE_ABOVE_OR_EQUAL.value: {
      return PRICE_ABS_CHANGE_ABOVE_OR_EQUAL
    }
    case PRICE_ABS_CHANGE_BELOW.value: {
      return PRICE_ABS_CHANGE_BELOW
    }
    case PRICE_ABS_CHANGE_BELOW_OR_EQUAL.value: {
      return PRICE_ABS_CHANGE_BELOW_OR_EQUAL
    }
    case PRICE_ABS_CHANGE_INSIDE.value: {
      return PRICE_ABS_CHANGE_INSIDE
    }
    case PRICE_ABS_CHANGE_OUTSIDE.value: {
      return PRICE_ABS_CHANGE_OUTSIDE
    }

    case ETH_WALLETS_OPERATIONS.AMOUNT_DOWN: {
      return AMOUNT_ABS_CHANGE_DOWN_MODEL
    }
    case ETH_WALLETS_OPERATIONS.AMOUNT_UP: {
      return AMOUNT_ABS_CHANGE_UP_MODEL
    }

    case TRENDING_WORDS_WORD_MENTIONED.value: {
      return TRENDING_WORDS_WORD_MENTIONED
    }
    case TRENDING_WORDS_PROJECT_MENTIONED.value: {
      const { watchlist_id } = target

      if (!watchlist_id) {
        return TRENDING_WORDS_PROJECT_MENTIONED
      } else {
        return TRENDING_WORDS_WATCHLIST_MENTIONED
      }
    }

    default: {
      return type
    }
  }
}

const getTriggerOperation = ({
  type,
  threshold,
  percentThreshold,
  absoluteThreshold,
  absoluteBorderRight,
  absoluteBorderLeft,
  percentThresholdLeft,
  percentThresholdRight
}) => {
  if (!type) {
    return undefined
  }

  const mapped = {}

  const { value } = type
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
    case PRICE_CHANGE_TYPES.ABOVE_OR_EQUAL:
    case PRICE_CHANGE_TYPES.BELOW_OR_EQUAL:
    case PRICE_CHANGE_TYPES.BELOW: {
      mapped[value] = absoluteThreshold
      break
    }
    case PRICE_CHANGE_TYPES.INSIDE_CHANNEL:
    case PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL: {
      mapped[value] = [absoluteBorderLeft, absoluteBorderRight]
      break
    }
    case PRICE_CHANGE_TYPES.PERCENT_SOME_OF: {
      mapped[value] = [
        { [PRICE_CHANGE_TYPES.MOVING_UP]: percentThresholdLeft },
        { [PRICE_CHANGE_TYPES.MOVING_DOWN]: percentThresholdRight }
      ]
      break
    }
    default: {
      return undefined
    }
  }

  return mapped
}

const makeSubmetric = metric => ({
  key: metric,
  label: capitalizeStr(metric.replace(/_/g, ' '))
})

const getFormMetric = ({ type, metric }) => {
  switch (type) {
    case METRIC_TYPES.DAILY_METRIC_SIGNAL:
    case METRIC_TYPES.METRIC_SIGNAL: {
      switch (metric) {
        case SIGNAL_METRIC_TYPES.active_addresses_24h:
        case SIGNAL_METRIC_TYPES.daily_active_addresses: {
          return DAILY_ACTIVE_ADDRESSES_METRIC
        }
        case SIGNAL_METRIC_TYPES.price_usd: {
          return PRICE_METRIC
        }
        default: {
          return (
            SIGNAL_SUPPORTED_METRICS.find(({ key }) => key === metric) ||
            makeSubmetric(metric)
          )
        }
      }
    }
    case METRIC_TYPES.WALLET_MOVEMENT: {
      return ETH_WALLET_METRIC
    }
    default: {
      break
    }
  }

  switch (type) {
    case ETH_WALLET: {
      return ETH_WALLET_METRIC
    }
    case PRICE_PERCENT_CHANGE:
    case PRICE_ABSOLUTE_CHANGE: {
      return PRICE_METRIC
    }
    case DAILY_ACTIVE_ADDRESSES: {
      return DAILY_ACTIVE_ADDRESSES_METRIC
    }
    case PRICE_VOLUME_DIFFERENCE: {
      return PRICE_VOLUME_DIFFERENCE_METRIC
    }
    case TRENDING_WORDS: {
      return TRENDING_WORDS_METRIC
    }
    default: {
      return metric
    }
  }
}

export const getOperationType = operation => {
  return Object.keys(operation)[0]
}

const getAbsolutePriceValues = ({ settings: { operation } }) => {
  if (operation) {
    const operationType = getOperationType(operation)

    switch (operationType) {
      case PRICE_CHANGE_TYPES.ABOVE:
      case PRICE_CHANGE_TYPES.BELOW: {
        return {
          absoluteThreshold: operation[operationType]
        }
      }
      case PRICE_CHANGE_TYPES.INSIDE_CHANNEL:
      case PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL: {
        const [left, right] = operation[operationType]
        return {
          absoluteBorderLeft: left,
          absoluteBorderRight: right
        }
      }
      default: {
        break
      }
    }
  }

  return {}
}

const mapTriggerToFormThreshold = ({ threshold, operation }) => {
  let newThreshold = threshold || undefined
  if (operation && !newThreshold) {
    const operationType = getOperationType(operation)

    if (Number.isFinite(operation[operationType])) {
      newThreshold = operation[operationType]
    }
  }

  return newThreshold
}

const getFormTrendingWords = ({ settings: { operation, target } }) => {
  if (!operation) {
    return undefined
  }

  const operationType = getOperationType(operation)

  switch (operationType) {
    case TRENDING_WORDS_WORD_MENTIONED.value: {
      return {
        trendingWordsWithWords: mapToOptions(target.word)
      }
    }
    default: {
      return undefined
    }
  }
}

export const mapFormPropsToScreenerTrigger = ({ formProps, signal }) => {
  const { description, title, isActive, cooldown } = formProps
  const trigger = {
    ...SCREENER_DEFAULT_SIGNAL,
    ...signal,
    description,
    title,
    isActive,
    cooldown
  }

  trigger.settings.channel = getChannels(formProps)

  return trigger
}

export const extractTimeWindowForm = time_window => {
  return {
    timeWindow: time_window ? +time_window.match(/\d+/)[0] : '24',
    timeWindowUnit: time_window
      ? getTimeWindowUnit(time_window)
      : TIME_WINDOW_UNITS[0]
  }
}

export const mapTriggerToFormProps = currentTrigger => {
  if (!currentTrigger || !currentTrigger.settings) {
    return {}
  }
  const {
    cooldown,
    isActive,
    isPublic,
    isRepeating,
    settings,
    title,
    description,
    settings: { time_window, channel }
  } = currentTrigger

  const frequencyModels = getFrequencyFromCooldown(currentTrigger)
  const absolutePriceValues = getAbsolutePriceValues(currentTrigger)

  const {
    target,
    signalType,
    ethAddress,
    targetWatchlist,
    textSelector
  } = getFormTriggerTarget(settings)
  const newType = getFormTriggerType(settings)

  const trendingWordsParams = getFormTrendingWords(currentTrigger)

  return {
    targetWatchlist,
    textSelector,
    ethAddress,
    cooldown,
    isRepeating: isRepeating,
    isActive,
    isPublic,
    metric: getFormMetric(settings),
    type: newType,
    ...extractTimeWindowForm(time_window),
    target,
    signalType: signalType,

    ...getPercentTreshold(settings, newType),

    threshold: mapTriggerToFormThreshold(settings) || BASE_THRESHOLD,
    channels: Array.isArray(channel)
      ? channel.map(mapToFormChannel)
      : [mapToFormChannel(channel)],
    ...frequencyModels,
    ...absolutePriceValues,
    ...trendingWordsParams,
    title: clipText(
      Array.isArray(title) ? title.join(' ') : title,
      MAX_TITLE_LENGTH
    ),
    description: clipText(description || '', MAX_DESCR_LENGTH)
  }
}

const getPercentTreshold = (
  { type, operation, percent_threshold: percentThreshold },
  newType
) => {
  const parsedThreshold = operation
    ? operation[Object.keys(operation)[0]]
    : BASE_PERCENT_THRESHOLD

  if (newType && newType.value === PRICE_CHANGE_TYPES.PERCENT_SOME_OF) {
    return {
      percentThresholdLeft:
        operation[PRICE_CHANGE_TYPES.PERCENT_SOME_OF][0][
          PRICE_CHANGE_TYPES.MOVING_UP
        ] || BASE_PERCENT_THRESHOLD,
      percentThresholdRight:
        operation[PRICE_CHANGE_TYPES.PERCENT_SOME_OF][1][
          PRICE_CHANGE_TYPES.MOVING_DOWN
        ] || BASE_PERCENT_THRESHOLD
    }
  } else {
    return {
      percentThreshold:
        parsedThreshold || percentThreshold || BASE_PERCENT_THRESHOLD
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
  const frequencyTimeValue = mapToOption(value)

  return {
    frequencyType: frequencyType,
    frequencyTimeType: frequencyTimeType,
    frequencyTimeValue: frequencyTimeValue,
    cooldown: original
  }
}

export const getTargetFromArray = (target, mapper = targetMapper) =>
  target.length === 1 ? mapper(target[0]) : target.map(mapper)

export const mapFormTargetToTriggerTarget = (
  target,
  targetWatchlist,
  textSelector,
  signalType = {},
  address
) => {
  const { value } = signalType

  switch (value) {
    case METRIC_TARGET_WATCHLIST.value: {
      return {
        target: {
          watchlist_id: targetWatchlist ? +targetWatchlist.id : undefined
        }
      }
    }
    case METRIC_TARGET_TEXT.value: {
      return {
        target: { text: textSelector ? mapTargetObject(textSelector) : '' }
      }
    }
    default: {
      if (address) {
        return {
          target: { address: mapTargetObject(address) }
        }
      } else {
        return {
          target: { slug: mapTargetObject(target) }
        }
      }
    }
  }
}

export const mapTargetObject = (target, mapper = targetMapper) => {
  return Array.isArray(target)
    ? getTargetFromArray(target, mapper)
    : mapper(target)
}

const getSelectorPartByInfrastructure = (infrastructure, target) => {
  switch (infrastructure) {
    case 'own':
    case 'Own': {
      return {
        infrastructure: target.ticker || 'ETH',
        slug: mapTargetObject(target)
      }
    }
    case 'BTC':
    case 'BCH':
    case 'LTC': {
      return {
        slug: mapTargetObject(target)
      }
    }

    case 'ETH':
    case 'EOS':
    case 'BNB': {
      return {
        slug: mapTargetObject(target)
      }
    }
    case 'XRP': {
      return {
        currency: mapTargetObject(target)
      }
    }
    default: {
      return {}
    }
  }
}

export const mapHBAssetTarget = ({ target }) => {
  const infrastructure = mapTargetInfrastructure(target)

  const additional = getSelectorPartByInfrastructure(infrastructure, target)

  return {
    selector: {
      infrastructure,
      ...additional
    }
  }
}

const ETH_INFRASTRUCTURE = 'ETH'

const mapTargetInfrastructure = target => {
  if (Array.isArray(target) && target[0] && target[0].infrastructure) {
    return target[0].infrastructure
  }

  return target.infrastructure || ETH_INFRASTRUCTURE
}

const mapToTriggerChannel = formItem => {
  if (typeof formItem === 'object') {
    return formItem
  }

  return CHANNELS_MAP.find(({ label }) => label === formItem).value
}
const mapToFormChannel = channelValue => {
  if (typeof channelValue === 'object') {
    return channelValue
  }

  return CHANNELS_MAP.find(({ value }) => value === channelValue.toLowerCase())
    .label
}

export const getChannels = ({ channels }) => {
  if (!Array.isArray(channels)) {
    return mapToTriggerChannel[channels]
  } else {
    if (channels.length === 1) {
      if (!findWebHook(channels)) {
        return mapToTriggerChannel(channels[0])
      }
    }
  }

  return channels.map(mapToTriggerChannel)
}

export const isTrendingWordsByProjects = type =>
  type.value === TRENDING_WORDS_PROJECT_MENTIONED.value

export const isTrendingWordsByWords = type =>
  type.value === TRENDING_WORDS_WORD_MENTIONED.value

export const isTrendingWordsByWatchlist = type =>
  type.value === TRENDING_WORDS_WATCHLIST_MENTIONED.value

export const getTrendingWordsTriggerOperation = ({ type: { value }, type }) => {
  if (isTrendingWordsByWatchlist(type)) {
    return {
      [TRENDING_WORDS_PROJECT_MENTIONED.value]: true
    }
  }

  return {
    [value]: true
  }
}

export const mapTrendingWordsTargets = items => {
  if (Array.isArray(items)) {
    if (items.length === 1) {
      return targetMapper(items[0])
    } else {
      return items.map(targetMapper)
    }
  } else {
    return targetMapper(items)
  }
}

export const getTrendingWordsTarget = ({
  type,
  target,
  targetWatchlist,
  trendingWordsWithWords
}) => {
  switch (type.value) {
    case TRENDING_WORDS_WORD_MENTIONED.value: {
      return {
        word: mapTrendingWordsTargets(trendingWordsWithWords)
      }
    }
    case TRENDING_WORDS_PROJECT_MENTIONED.value: {
      return {
        slug: mapTrendingWordsTargets(target)
      }
    }
    case TRENDING_WORDS_WATCHLIST_MENTIONED.value: {
      return {
        watchlist_id: targetWatchlist
          ? +(targetWatchlist.id || targetWatchlist.value)
          : undefined
      }
    }
    default: {
      return undefined
    }
  }
}

export const mapFormToTWTriggerSettings = formProps => {
  return {
    type: TRENDING_WORDS,
    channel: getChannels(formProps),
    target: getTrendingWordsTarget(formProps),
    operation: getTrendingWordsTriggerOperation(formProps)
  }
}

const getTimeWindow = ({ timeWindow, timeWindowUnit, metric }) => {
  const { key } = metric

  if (isDailyMetric(key)) {
    return '1d'
  }

  return timeWindow && timeWindowUnit
    ? timeWindow + '' + timeWindowUnit.value
    : undefined
}

function getAlertType (key, type) {
  if (isDailyMetric(key)) {
    return METRIC_TYPES.DAILY_METRIC_SIGNAL
  }

  return key ? METRIC_TYPES.METRIC_SIGNAL : type
}

export const mapFormToPPCTriggerSettings = formProps => {
  const {
    target,
    targetWatchlist,
    signalType,
    textSelector,
    metric: { type, metric, key }
  } = formProps
  const newTarget = mapFormTargetToTriggerTarget(
    target,
    targetWatchlist,
    textSelector,
    signalType
  )

  return {
    type: getAlertType(key, type),
    metric: key || metric,
    ...newTarget,
    channel: getChannels(formProps),
    time_window: getTimeWindow(formProps),
    operation: getTriggerOperation(formProps)
  }
}

export const mapFormToPACTriggerSettings = formProps => {
  const {
    target,
    targetWatchlist,
    signalType,
    textSelector,
    metric: { key, type, metric }
  } = formProps
  const newTarget = mapFormTargetToTriggerTarget(
    target,
    targetWatchlist,
    textSelector,
    signalType
  )
  return {
    type: getAlertType(key, type),
    metric: key || metric,
    ...newTarget,
    channel: getChannels(formProps),
    operation: getTriggerOperation(formProps),
    time_window: getTimeWindow(formProps)
  }
}

export const mapFormToDAATriggerSettings = formProps => {
  const {
    target,
    signalType,
    targetWatchlist,
    textSelector,
    metric: { type, metric }
  } = formProps
  const newTarget = mapFormTargetToTriggerTarget(
    target,
    targetWatchlist,
    textSelector,
    signalType
  )

  if (type.metric === PRICE_ABSOLUTE_CHANGE) {
    return {
      type,
      metric,
      ...newTarget,
      channel: getChannels(formProps),
      time_window: getTimeWindow(formProps),
      operation: getTriggerOperation(formProps)
    }
  } else {
    return {
      type,
      metric,
      ...newTarget,
      channel: getChannels(formProps),
      time_window: getTimeWindow(formProps),
      operation: getTriggerOperation(formProps)
    }
  }
}

export const mapFormToPVDTriggerSettings = formProps => {
  const {
    target,
    targetWatchlist,
    signalType,
    textSelector,
    metric: { type, metric }
  } = formProps
  const newTarget = mapFormTargetToTriggerTarget(
    target,
    targetWatchlist,
    textSelector,
    signalType
  )
  return {
    type: type || metric,
    metric,
    ...newTarget,
    channel: getChannels(formProps),
    threshold: BASE_THRESHOLD
  }
}

export const mapFormToHBTriggerSettings = formProps => {
  const {
    target,
    targetWatchlist,
    textSelector,
    ethAddress,
    signalType,
    metric: { type, metric }
  } = formProps

  const newTarget = mapFormTargetToTriggerTarget(
    target,
    targetWatchlist,
    textSelector,
    signalType,
    ethAddress
  )

  const newAsset = mapHBAssetTarget({ target })

  return {
    type,
    metric,
    ...newTarget,
    ...newAsset,
    channel: getChannels(formProps),
    operation: getTriggerOperation(formProps)
  }
}

const mapDefaultMetricProps = ({ type, formProps }) => {
  switch (type.metric) {
    case PRICE_PERCENT_CHANGE: {
      return mapFormToPPCTriggerSettings(formProps)
    }
    case PRICE_ABSOLUTE_CHANGE: {
      return mapFormToPACTriggerSettings(formProps)
    }
    default: {
    }
  }
}

export const mapFormPropsToTrigger = (formProps, prevTrigger) => {
  const { type, metric, isRepeating, isPublic, title, description } = formProps
  let settings = {}

  if (metric) {
    switch (metric.value) {
      case DAILY_ACTIVE_ADDRESSES: {
        settings = mapFormToDAATriggerSettings(formProps)
        break
      }
      case TRENDING_WORDS: {
        settings = mapFormToTWTriggerSettings(formProps)
        break
      }
      case PRICE_VOLUME_DIFFERENCE: {
        settings = mapFormToPVDTriggerSettings(formProps)
        break
      }
      case ETH_WALLET: {
        settings = mapFormToHBTriggerSettings(formProps)
        break
      }
      default: {
        settings = mapDefaultMetricProps({ type, formProps })
      }
    }
  }

  const cooldownParams = getCooldownParams(formProps)

  return {
    ...prevTrigger,
    settings,
    isRepeating: !!isRepeating,
    ...cooldownParams,
    isPublic: !!isPublic,
    title,
    description
  }
}

export const isNewTypeSignal = ({ settings: { type } }) => {
  for (let key in METRIC_TYPES) {
    if (type === METRIC_TYPES[key]) {
      return true
    }
  }

  return false
}

const HistoricalBalanceMetrics = {
  ...Metric.balance,
  key: 'historicalBalance',
  queryKey: 'historicalBalance'
}

export const getNewMetricsByType = ({ settings: { type, metric } }) => {
  const defaultValue = {
    metrics: [Metric.price_usd],
    triggersBy: Metric.price_usd,
    historicalTriggersDataKey: 'current'
  }

  switch (type) {
    case METRIC_TYPES.WALLET_MOVEMENT: {
      return {
        metrics: [HistoricalBalanceMetrics, Metric.price_usd],
        triggersBy: HistoricalBalanceMetrics,
        historicalTriggersDataKey: 'current'
      }
    }
    case METRIC_TYPES.DAILY_METRIC_SIGNAL:
    case METRIC_TYPES.METRIC_SIGNAL: {
      switch (metric) {
        case SIGNAL_METRIC_TYPES.daily_active_addresses:
        case SIGNAL_METRIC_TYPES.active_addresses_24h: {
          return {
            metrics: [Metric.daily_active_addresses, Metric.price_usd],
            triggersBy: Metric.daily_active_addresses,
            historicalTriggersDataKey: 'current'
          }
        }
        default: {
          const checkingMetric = SIGNAL_SUPPORTED_METRICS.find(
            ({ key }) => key === metric
          )

          if (checkingMetric) {
            return {
              metrics: [Metric.price_usd, checkingMetric],
              triggersBy: checkingMetric,
              historicalTriggersDataKey: 'current'
            }
          }

          return defaultValue
        }
      }
    }
    default:
      return defaultValue
  }
}

export const getOldMetricsByType = type => {
  switch (type) {
    case DAILY_ACTIVE_ADDRESSES:
      return {
        metrics: [Metric.daily_active_addresses, Metric.price_usd],
        triggersBy: Metric.daily_active_addresses
      }
    case TRENDING_WORDS:
      return {
        metrics: [Metric.price_usd, Metric.social_volume_total],
        triggersBy: Metric.price_usd
      }
    case PRICE_VOLUME_DIFFERENCE:
      return {
        metrics: [Metric.price_usd, Metric.volume_usd],
        triggersBy: Metric.price_usd
      }
    case ETH_WALLET:
      return {
        metrics: [HistoricalBalanceMetrics, Metric.price_usd],
        triggersBy: HistoricalBalanceMetrics
      }
    default:
      return {
        metrics: [Metric.price_usd],
        triggersBy: Metric.price_usd
      }
  }
}

export const getTimeRangeForChart = type => {
  return PREVIEWS_TIMERANGE_BY_TYPE[type] || getDefaultTimeRangeValue(90)
}

export const getNearestTypeByMetric = metric => {
  if (metric.key) {
    return PRICE_PERCENT_CHANGE_DOWN_MODEL
  }

  switch (metric.value) {
    case ETH_WALLET_METRIC.value: {
      return PRICE_PERCENT_CHANGE_DOWN_MODEL
    }
    case PRICE_METRIC.value: {
      return PRICE_PERCENT_CHANGE_DOWN_MODEL
    }
    case DAILY_ACTIVE_ADDRESSES_METRIC.value: {
      return PRICE_PERCENT_CHANGE_UP_MODEL
    }
    case PRICE_VOLUME_DIFFERENCE_METRIC.value: {
      return PRICE_VOLUME_DIFFERENCE_METRIC
    }
    case TRENDING_WORDS_METRIC.value: {
      return TRENDING_WORDS_WORD_MENTIONED
    }
    default: {
      return undefined
    }
  }
}

export function getFrequencyTimeType (frequencyType) {
  if (frequencyType && frequencyType.availableTypes) {
    return FREQUENCY_VALUES.filter(item => {
      return frequencyType.availableTypes.indexOf(item.value) !== -1
    })
  } else {
    return FREQUENCY_VALUES
  }
}

export function getFrequencyTimeValues (frequencyTimeType) {
  return frequencyTimeType
    ? FREQUENCY_MAPPINGS[frequencyTimeType.value]
    : undefined
}

export function getNearestFrequencyTimeValue (frequencyTimeType) {
  const timeValues = getFrequencyTimeValues(frequencyTimeType)
  return timeValues[0]
}

export function getNearestFrequencyTypeValue (frequencyType) {
  return getFrequencyTimeType(frequencyType)[0]
}

export const isAsset = signalType =>
  signalType.value === METRIC_TARGET_ASSETS.value
export const isWatchlist = signalType =>
  signalType.value === METRIC_TARGET_WATCHLIST.value
export const isText = signalType =>
  signalType.value === METRIC_TARGET_TEXT.value

export const validateTriggerForm = values => {
  const errors = {
    ...metricTypesBlockErrors(values),
    ...metricValuesBlockErrors(values),
    ...descriptionBlockErrors(values),
    ...validateChannels(values)
  }

  return errors
}

export const metricTypesBlockErrors = values => {
  const {
    type,
    ethAddress,
    isHbAddressError,
    metric,
    target,
    targetWatchlist,
    textSelector,
    trendingWordsWithWords,
    signalType,
    isLoading
  } = values

  let errors = {}

  if (isLoading) {
    errors.loading = isLoading
  }

  if (metric && metric.value === ETH_WALLET) {
    if (hasHBAddresses(ethAddress)) {
      if (Array.isArray(ethAddress)) {
        ethAddress.forEach(({ value }) => {
          if (!isValidHBAddress(value)) {
            errors.ethAddress = NOT_VALID_HB_ADDRESS
          }
        })
      } else {
        if (!isValidHBAddress(ethAddress)) {
          errors.ethAddress = NOT_VALID_HB_ADDRESS
        }
      }
    } else {
      if (
        isHbAddressError &&
        (Array.isArray(target) ? target.length === 1 : !!target)
      ) {
        errors.ethAddress = NOT_VALID_HB_ADDRESS
      }
    }
  } else if (metric && metric.value === TRENDING_WORDS) {
    if (isTrendingWordsByProjects(type) && (!target || target.length === 0)) {
      errors.target = REQUIRED_MESSAGE
    }

    if (
      isTrendingWordsByWords(type) &&
      (!trendingWordsWithWords || trendingWordsWithWords.length === 0)
    ) {
      errors.trendingWordsWithWords = REQUIRED_MESSAGE
    }
  } else {
    if (isWatchlist(signalType)) {
      if (!targetWatchlist) {
        errors.targetWatchlist = REQUIRED_MESSAGE
      }
    } else if (isText(signalType)) {
      if (!textSelector) {
        errors.textSelector = REQUIRED_MESSAGE
      }
    } else {
      if (
        !target ||
        (Array.isArray(target) ? target.length === 0 : !target.value)
      ) {
        errors.target = REQUIRED_MESSAGE
      }
    }
  }

  return errors
}

const checkByKey = (errors, key, source, dependencies, allowZero = false) => {
  const val = source[key]
  if (dependencies && dependencies.indexOf(key) !== -1) {
    if (isNil(val) || val === 0) {
      if (allowZero && val === 0) {
        // pass
      } else {
        errors[key] = REQUIRED_MESSAGE
      }
    } else if (val <= 0) {
      errors[key] = MUST_BE_MORE_ZERO_MESSAGE
    }
  }

  return errors
}

const isNil = value => value === null || value === undefined
export const isPriceMetric = ({ value }) => value === PRICE

export const metricValuesBlockErrors = values => {
  let errors = {}

  const {
    type,
    absoluteThreshold,
    absoluteBorderLeft,
    absoluteBorderRight,
    metric
  } = values

  if (!type) {
    return errors
  }

  const isPrice = isPriceMetric(metric)

  if (type.metric === PRICE_PERCENT_CHANGE) {
    if (type.dependencies) {
      errors = checkByKey(errors, 'percentThreshold', values, type.dependencies)
      errors = checkByKey(
        errors,
        'percentThresholdLeft',
        values,
        type.dependencies
      )
      errors = checkByKey(
        errors,
        'percentThresholdRight',
        values,
        type.dependencies
      )
    }
  }

  if (type.subMetric === PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER) {
    if (isNil(absoluteThreshold)) {
      errors.absoluteThreshold = REQUIRED_MESSAGE
    } else if (isPrice && absoluteThreshold <= 0) {
      errors.absoluteThreshold = MUST_BE_MORE_ZERO_MESSAGE
    }
  }

  if (type.subMetric === PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER) {
    if (isNil(absoluteBorderLeft)) {
      errors.absoluteBorderLeft = REQUIRED_MESSAGE
    } else if (isPrice && absoluteBorderLeft <= 0) {
      errors.absoluteBorderLeft = MUST_BE_MORE_ZERO_MESSAGE
    }

    if (isNil(absoluteBorderRight)) {
      errors.absoluteBorderRight = REQUIRED_MESSAGE
    }
  }

  if (type.metric === PRICE_VOLUME_DIFFERENCE) {
    errors = checkByKey(errors, 'threshold', values, type.dependencies, true)
  }

  if (!isDailyMetric(metric.key)) {
    errors = checkByKey(errors, 'timeWindow', values, type.dependencies)
  }

  return errors
}

export const validateChannels = values => {
  let errors = {}
  const { channels } = values

  if (channels && channels.length === 0) {
    errors.channels = 'You must setup notification channel'
  } else {
    const webhookChannel = findWebHook(channels)

    if (webhookChannel && !webhookChannel.webhook) {
      errors.channels = 'Need to enter a valid webhook URL'
    }
  }

  return errors
}

export const descriptionBlockErrors = values => {
  let errors = {}
  const {
    frequencyType,
    frequencyTimeValue,
    frequencyTimeType,
    title,
    description
  } = values

  if (!frequencyType || !frequencyType.value) {
    errors.frequencyType = REQUIRED_MESSAGE
  }

  if (!frequencyTimeValue || !frequencyTimeValue.value) {
    errors.frequencyTimeValue = REQUIRED_MESSAGE
  }

  if (!frequencyTimeType || !frequencyTimeType.value) {
    errors.frequencyTimeType = REQUIRED_MESSAGE
  }

  if (!title) {
    errors.title = REQUIRED_MESSAGE
  } else if (title.length <= MIN_TITLE_LENGTH) {
    errors.title = `Title has to be longer than ${MIN_TITLE_LENGTH} characters`
  } else if (title.length > MAX_TITLE_LENGTH) {
    errors.title = `Title has to be less than ${MAX_TITLE_LENGTH} characters`
  }
  if (!description || description.length > MAX_DESCR_LENGTH) {
    errors.description = `Description has to be less than ${MAX_DESCR_LENGTH} characters`
  }

  return errors
}

export const getCheckingMetric = settings => {
  const { metric, type } = settings

  if (typeof type === 'string') {
    return type
  }

  return metric ? metric.value : type
}

export const getPreviewTarget = settings => {
  const { selector, asset, target, targetWatchlist } = settings

  const item = mapTargetObject(selector || target || asset || targetWatchlist)

  if (Array.isArray(item)) {
    return item.length === 1 ? item[0] : false
  }

  return item
}

export const couldShowChart = (
  settings,
  types = POSSIBLE_METRICS_FOR_CHART
) => {
  const {
    target = {},
    ethAddress = target.address || target.eth_address,
    selector
  } = settings

  if (target && target.watchlist_id) {
    return false
  }

  const checking = getCheckingMetric(settings)

  if (!getPreviewTarget(settings)) {
    return false
  }

  switch (checking) {
    case METRIC_TYPES.WALLET_MOVEMENT:
    case ETH_WALLET: {
      const checkedSelector = selector
        ? (selector.currency || selector.slug) && selector.infrastructure
        : true
      return checkedSelector && Array.isArray(ethAddress)
        ? ethAddress.length === 1
        : !!ethAddress
    }
    case TRENDING_WORDS: {
      return true
    }
    default: {
      if (!Array.isArray(target) && !targetMapper(target)) {
        return false
      }

      return checking ? types.indexOf(checking) >= 0 : false
    }
  }
}

export const mapToAssets = (data, withFilter = true) => {
  if (!data) {
    return undefined
  }

  return data
    .filter(asset => !withFilter || !!asset.mainContractAddress)
    .map((asset, index) => {
      return mapToOption(asset.slug)
    })
}

export const mapErc20AssetsToProps = ({
  allErc20Projects: { allErc20Projects = [], isLoading }
}) => {
  return {
    assets: [{ slug: 'ethereum', label: 'ethereum' }, ...allErc20Projects],
    isLoading: isLoading
  }
}

export const mapAssetsHeldByAddressToProps = ({
  assetsByWallet: { assetsHeldByAddress = [], loading }
}) => {
  return {
    heldAssets: assetsHeldByAddress,
    isLoading: loading
  }
}

export const isValidHBAddress = address => {
  return address === undefined || !!address
}

export const getDefaultFormValues = (newValues, { value: oldMetric }) => {
  const { metric, type } = newValues

  const isDAA = metric.value === DAILY_ACTIVE_ADDRESSES
  if (isDAA && oldMetric !== metric.value) {
    newValues.type = PRICE_ABS_CHANGE_ABOVE
  }

  const metricValue = isDAA ? metric.value : type.metric
  const defaultValues = METRIC_DEFAULT_VALUES[metricValue] || {}

  return {
    ...defaultValues,
    ...newValues
  }
}

const buildFormBlock = (title, description = '') => ({
  titleLabel: title,
  titleDescription: description
})

const NOTIFY_ME_WHEN = 'Notify me when'

const targetsJoin = targets =>
  Array.isArray(targets) ? targets.join(', ') : targets

export const hasHBAddresses = ethAddress =>
  Array.isArray(ethAddress) ? ethAddress.length > 0 : !!ethAddress

export const getTargetsHeader = values => {
  const {
    target,
    targetWatchlist,
    signalType,
    type,
    metric,
    trendingWordsWithWords,
    textSelector,
    ethAddress = ''
  } = values

  if (metric) {
    if (metric.value === TRENDING_WORDS) {
      switch (type.value) {
        case TRENDING_WORDS_PROJECT_MENTIONED.value: {
          const targets = mapTargetObject(target, targetMapperWithName)

          return buildFormBlock(NOTIFY_ME_WHEN, targetsJoin(targets))
        }
        case TRENDING_WORDS_WORD_MENTIONED.value: {
          const targets = mapTargetObject(
            trendingWordsWithWords,
            targetMapperWithName
          )
          return buildFormBlock(NOTIFY_ME_WHEN, targetsJoin(targets))
        }
        case TRENDING_WORDS_WATCHLIST_MENTIONED.value: {
          return buildFormBlock(
            NOTIFY_ME_WHEN,
            targetMapperWithName(targetWatchlist)
          )
        }
        default: {
        }
      }
    } else if (metric.value === ETH_WALLET) {
      const targets = mapTargetObject(target, targetMapperWithTicker)
      const addresses = mapTargetObject(ethAddress) || ''

      if (Array.isArray(ethAddress) && ethAddress.length > 1) {
        return buildFormBlock(
          NOTIFY_ME_WHEN,
          `${targetsJoin(targets)} wallets [${addresses.join(', ')}]`
        )
      } else {
        const walletDescription = addresses ? 'wallet ' + addresses : ''
        return buildFormBlock(
          NOTIFY_ME_WHEN,
          `${targetsJoin(targets)} ${walletDescription}`
        )
      }
    }
  }

  if (signalType) {
    switch (signalType.value) {
      case METRIC_TARGET_WATCHLIST.value: {
        return buildFormBlock(
          NOTIFY_ME_WHEN,
          targetMapperWithName(targetWatchlist)
        )
      }
      case METRIC_TARGET_TEXT.value: {
        const targets = mapTargetObject(textSelector || {})
        return buildFormBlock(NOTIFY_ME_WHEN, targetsJoin(targets))
      }
      default: {
        const targets = mapTargetObject(target, targetMapperWithName)
        return buildFormBlock(NOTIFY_ME_WHEN, targetsJoin(targets))
      }
    }
  }
}

const getUsd = (value = 0, isPriceMetric) =>
  isPriceMetric ? formatNumber(value || 0, { currency: 'USD' }) : value

const getMetricTargetTitle = metric => {
  if (metric.key) {
    return metric.label
  }

  if (metric.value === PRICE) {
    return 'Price'
  }

  if (metric.value === DAILY_ACTIVE_ADDRESSES) {
    return 'Addresses count'
  }

  if (metric.value === ETH_WALLET) {
    return 'Balance'
  }

  return 'Amount'
}

export const titleMetricValuesHeader = (
  hasMetricValues,
  {
    type,
    threshold,
    percentThreshold,
    percentThresholdLeft,
    percentThresholdRight,
    absoluteThreshold,
    absoluteBorderRight,
    absoluteBorderLeft,
    timeWindowUnit: { label: timeWindowUnitLabel = '' } = {},
    timeWindow,
    metric
  },
  ofTarget = ' '
) => {
  if (hasMetricValues && type) {
    const { value } = type
    const isPriceMetric = metric.value === PRICE

    const titleTarget = getMetricTargetTitle(metric)

    const addressesTitle = `${titleTarget} ${ofTarget}`
    const priceGoesTitle = `${titleTarget} ${ofTarget} goes`
    const priceMovingTitle = `${titleTarget} ${ofTarget} moving`

    const priceCommonTitle =
      isPriceMetric || metric.key ? priceMovingTitle : addressesTitle

    switch (value) {
      case ETH_WALLETS_OPERATIONS.AMOUNT_DOWN: {
        return buildFormBlock(
          `Balance ${ofTarget}`,
          'decreases by ' + threshold
        )
      }
      case ETH_WALLETS_OPERATIONS.AMOUNT_UP: {
        return buildFormBlock(
          `Balance ${ofTarget}`,
          'increases by ' + threshold
        )
      }
      case PRICE_CHANGE_TYPES.MOVING_DOWN: {
        return buildFormBlock(
          priceCommonTitle,
          `down ${percentThreshold ||
            0}% compared to ${timeWindow} ${timeWindowUnitLabel.toLowerCase()} earlier`
        )
      }
      case PRICE_CHANGE_TYPES.MOVING_UP: {
        return buildFormBlock(
          priceCommonTitle,
          `up ${percentThreshold ||
            0}% compared to ${timeWindow} ${timeWindowUnitLabel.toLowerCase()} earlier`
        )
      }
      case PRICE_CHANGE_TYPES.PERCENT_SOME_OF: {
        return buildFormBlock(
          isPriceMetric ? `${titleTarget} ${ofTarget}` : addressesTitle,
          `moving up ${percentThresholdLeft ||
            0}% or moving down ${percentThresholdRight ||
            0}% compared to ${timeWindow} ${timeWindowUnitLabel.toLowerCase()} earlier`
        )
      }
      case PRICE_CHANGE_TYPES.ABOVE_OR_EQUAL: {
        return buildFormBlock(
          priceGoesTitle,
          'above or equal ' + getUsd(absoluteThreshold, isPriceMetric)
        )
      }
      case PRICE_CHANGE_TYPES.BELOW_OR_EQUAL: {
        return buildFormBlock(
          priceGoesTitle,
          'below or equal ' + getUsd(absoluteThreshold, isPriceMetric)
        )
      }
      case PRICE_CHANGE_TYPES.ABOVE: {
        return buildFormBlock(
          priceGoesTitle,
          'above ' + getUsd(absoluteThreshold, isPriceMetric)
        )
      }
      case PRICE_CHANGE_TYPES.BELOW: {
        return buildFormBlock(
          priceGoesTitle,
          'below ' + getUsd(absoluteThreshold, isPriceMetric)
        )
      }
      case PRICE_CHANGE_TYPES.INSIDE_CHANNEL: {
        return buildFormBlock(
          priceGoesTitle,
          'between ' +
            getUsd(absoluteBorderRight, isPriceMetric) +
            ' and ' +
            getUsd(absoluteBorderLeft, isPriceMetric)
        )
      }
      case PRICE_CHANGE_TYPES.OUTSIDE_CHANNEL: {
        return buildFormBlock(
          priceGoesTitle,
          'outside ' +
            getUsd(absoluteBorderRight, isPriceMetric) +
            ' and ' +
            getUsd(absoluteBorderLeft, isPriceMetric)
        )
      }
      default: {
      }
    }
    return {}
  }
}

export const getNewTitle = newValues => {
  const { metric, type } = newValues
  const { titleDescription: target } = getTargetsHeader(newValues)

  if (!target) {
    return ''
  }

  const { titleLabel, titleDescription = '' } = titleMetricValuesHeader(
    true,
    newValues,
    ''
  )

  let title = ''
  switch (metric.value) {
    case PRICE: {
      title = `${target} price goes ${titleDescription}`
      break
    }
    case PRICE_VOLUME_DIFFERENCE: {
      title = `Price/volume difference between an ${target} price and trading volume`
      break
    }
    case DAILY_ACTIVE_ADDRESSES: {
      title = `${target} daily active addresses ${titleDescription}`
      break
    }
    case ETH_WALLET: {
      title = `${target} historical balance ${titleDescription}`
      break
    }
    case TRENDING_WORDS: {
      switch (type.value) {
        case TRENDING_WORDS_PROJECT_MENTIONED.value: {
          title = `${target} in trending assets/projects`
          break
        }
        case TRENDING_WORDS_WATCHLIST_MENTIONED.value: {
          title = `Watchlist '${target}' in social trends`
          break
        }
        case TRENDING_WORDS_WORD_MENTIONED.value: {
          title = `${target} in trending words`
          break
        }
        default: {
          title = `${target} in social trends`
          break
        }
      }
      break
    }
    default: {
      title = `${titleLabel} ${titleDescription}`
    }
  }

  return clipText(capitalizeStr(title.trim()), MAX_TITLE_LENGTH)
}

const clipText = (text, maxLength) => {
  if (text && maxLength) {
    const lengthBorder = maxLength - 3
    if (text.length > lengthBorder) {
      return text.slice(0, lengthBorder) + '...'
    }
  }

  return text
}

export const getNewDescription = newValues => {
  const targetsHeader = getTargetsHeader(newValues).titleDescription

  if (
    !targetsHeader ||
    (Array.isArray(targetsHeader) && targetsHeader.length === 0)
  ) {
    return ''
  }

  let metricsHeaderStr = Object.values(
    titleMetricValuesHeader(true, newValues, `of ${targetsHeader}`)
  )
    .join(' ')
    .toLowerCase()

  if (!metricsHeaderStr) {
    const {
      metric: { value } = {},
      type: { value: typeValue }
    } = newValues
    switch (value) {
      case PRICE_VOLUME_DIFFERENCE: {
        metricsHeaderStr = `price/volume major divergences between an ${targetsHeader} price and trading volume`
        break
      }
      case TRENDING_WORDS: {
        switch (typeValue) {
          case TRENDING_WORDS_WATCHLIST_MENTIONED.value: {
            metricsHeaderStr = `watchlist '${targetsHeader}' appears in social trends`
            break
          }
          default: {
            metricsHeaderStr = `${targetsHeader} appears in social trends`
            break
          }
        }
        break
      }
      default: {
        break
      }
    }
  }

  const {
    channels,
    isRepeating,
    frequencyTimeValue,
    frequencyTimeType
  } = newValues

  const repeatingBlock = isRepeating
    ? `every ${frequencyTimeValue.label} ${frequencyTimeType.label}`
    : 'only once'

  const channelsReadable = channels.reduce((acc, ch) => {
    return typeof ch === 'object'
      ? acc.concat(Object.keys(ch))
      : acc.concat(ch.toLowerCase())
  }, [])

  const channelsBlock =
    channelsReadable && channelsReadable.length
      ? `via ${channelsReadable.join(', ')}`
      : ''

  return clipText(
    `Notify me when the ${metricsHeaderStr}. Send me notifications ${repeatingBlock.toLowerCase()} ${channelsBlock}.`,
    MAX_DESCR_LENGTH
  )
}

export const buildSignal = (metric, type, slug, Values, selector = 'slug') => {
  const formProps = { ...METRIC_DEFAULT_VALUES[metric], ...Values }
  formProps.isPublic = true
  formProps.target = mapToOption(slug)
  formProps.type = type

  if (selector === 'text') {
    formProps.signalType = METRIC_TARGET_TEXT
    formProps.textSelector = mapToOption(slug)
  }

  formProps.title = getNewTitle(formProps)
  formProps.description = getNewDescription(formProps)

  return mapFormPropsToTrigger(formProps)
}

export const buildValueChangeSignal = (slug, value, type, metric, selector) => {
  const resultType =
    type === PRICE_CHANGE_TYPES.ABOVE
      ? { ...PRICE_ABS_CHANGE_ABOVE }
      : { ...PRICE_ABS_CHANGE_BELOW }

  return buildSignal(
    PRICE_ABSOLUTE_CHANGE,
    resultType,
    slug,
    {
      absoluteThreshold: value,
      metric
    },
    metric.key === 'price_usd' ? 'slug' : selector
  )
}

export const buildPercentUpDownSignal = (
  slug,
  metric = PRICE_METRIC,
  selector
) => {
  return buildSignal(
    PRICE_PERCENT_CHANGE,
    PRICE_PERCENT_CHANGE_ONE_OF_MODEL,
    slug,
    {
      metric,
      signalType: { label: 'Assets', value: 'assets' },
      percentThresholdLeft: 10,
      percentThresholdRight: 10
    },
    selector
  )
}

export const buildDAASignal = (slug, value, type) => {
  const resultType =
    type === PRICE_CHANGE_TYPES.ABOVE
      ? { ...PRICE_ABS_CHANGE_ABOVE }
      : { ...PRICE_ABS_CHANGE_BELOW }

  return buildSignal(PRICE_ABSOLUTE_CHANGE, resultType, slug, {
    metric: DAILY_ACTIVE_ADDRESSES_METRIC,
    signalType: { label: 'Assets', value: 'assets' },
    absoluteThreshold: value
  })
}

export const buildDAAPercentUpDownSignal = slug => {
  return buildSignal(
    PRICE_PERCENT_CHANGE,
    PRICE_PERCENT_CHANGE_UP_MODEL,
    slug,
    {
      metric: DAILY_ACTIVE_ADDRESSES_METRIC,
      signalType: { label: 'Assets', value: 'assets' },
      percentThreshold: 10
    }
  )
}

export const buildInTrendingWordsSignal = topic => {
  return buildSignal(TRENDING_WORDS, TRENDING_WORDS_WORD_MENTIONED, topic, {
    metric: TRENDING_WORDS_METRIC,
    signalType: { label: 'Trending words', value: 'trending_word' },
    trendingWordsWithWords: [{ value: topic, label: topic }]
  })
}

export const skipHistoricalPreview = ({ settings }) => {
  const { target, time_window } = settings

  return (
    getCheckingMetric(settings) === TRENDING_WORDS ||
    target.watchlist_id ||
    typeof target.slug !== 'string' ||
    !time_window
  )
}

export const getSlugFromSignalTarget = ({ settings }) => {
  const { target: { watchlist_id } = {} } = settings

  const [watchlist] = useWatchlist({ id: watchlist_id })

  if (watchlist_id) {
    if (watchlist) {
      const { listItems } = watchlist

      if (listItems.length > 0) {
        return listItems[0].project.slug
      }
    }

    return null
  }

  return getPreviewTarget(settings)
}
