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
  TRENDING_WORDS_WATCHLIST_MENTIONED
} from './constants'
import { capitalizeStr, isEthStrictAddress } from '../../../utils/utils'

const getTimeWindowUnit = timeWindow => {
  if (!timeWindow) return undefined

  const value = timeWindow.replace(/[0-9]/g, '')
  return TIME_WINDOW_UNITS.find(item => item.value === value)
}

const getFormTriggerTarget = ({ target, target: { eth_address }, asset }) => {
  const parsingTarget = eth_address ? asset : target
  const { slug, watchlist_id } = parsingTarget

  if (watchlist_id) {
    return {
      signalType: METRIC_TARGET_WATCHLIST,
      target: watchlist_id
    }
  }

  const newTarget = Array.isArray(slug)
    ? mapToOptions(slug)
    : {
      value: slug,
      label: slug
    }

  return {
    target: newTarget,
    signalType: METRIC_TARGET_ASSETS,
    ethAddress: eth_address
  }
}

const getFormTriggerType = (target, type, operation) => {
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
    case ETH_WALLET_AMOUNT_UP.value: {
      return ETH_WALLET_AMOUNT_UP
    }

    case ETH_WALLET_AMOUNT_DOWN.value: {
      return ETH_WALLET_AMOUNT_DOWN
    }

    case PRICE_PERCENT_CHANGE_UP_MODEL.value: {
      return PRICE_PERCENT_CHANGE_UP_MODEL
    }

    case PRICE_PERCENT_CHANGE_DOWN_MODEL.value: {
      return PRICE_PERCENT_CHANGE_DOWN_MODEL
    }

    case PRICE_ABS_CHANGE_ABOVE.value: {
      return PRICE_ABS_CHANGE_ABOVE
    }
    case PRICE_ABS_CHANGE_BELOW.value: {
      return PRICE_ABS_CHANGE_BELOW
    }
    case PRICE_ABS_CHANGE_INSIDE.value: {
      return PRICE_ABS_CHANGE_INSIDE
    }
    case PRICE_ABS_CHANGE_OUTSIDE.value: {
      return PRICE_ABS_CHANGE_OUTSIDE
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
      return undefined
    }
  }

  return mapped
}

const getFormMetric = type => {
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

export const mapToOptions = items => {
  return items
    ? items.map(item => ({
      label: item,
      value: item
    }))
    : []
}

const getFormTrendingWords = ({ settings: { operation, target } }) => {
  if (!operation) {
    return undefined
  }

  const operationType = getOperationType(operation)

  switch (operationType) {
    case TRENDING_WORDS_WORD_MENTIONED.value: {
      return {
        trendingWordsWithWords: target.word
      }
    }
    default: {
      return undefined
    }
  }
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
    settings: { type, operation, time_window, target, channel }
  } = currentTrigger

  const frequencyModels = getFrequencyFromCooldown(currentTrigger)
  const absolutePriceValues = getAbsolutePriceValues(currentTrigger)

  const { target: newTarget, signalType, ethAddress } = getFormTriggerTarget(
    settings
  )
  const newType = getFormTriggerType(target, type, operation)

  const trendingWordsParams = getFormTrendingWords(currentTrigger)

  return {
    ethAddress: ethAddress,
    cooldown: cooldown,
    isRepeating: isRepeating,
    isActive: isActive,
    isPublic: isPublic,
    metric: getFormMetric(type, operation),
    type: newType,
    timeWindow: time_window ? +time_window.match(/\d+/)[0] : '24',
    timeWindowUnit: time_window
      ? getTimeWindowUnit(time_window)
      : TIME_WINDOW_UNITS[0],
    target: newTarget,
    signalType: signalType,
    percentThreshold: getPercentTreshold(settings) || BASE_PERCENT_THRESHOLD,
    threshold: mapTriggerToFormThreshold(settings) || BASE_THRESHOLD,
    channels: [capitalizeStr(channel)],
    ...frequencyModels,
    ...absolutePriceValues,
    ...trendingWordsParams
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

export const getTargetFromArray = target =>
  target.length === 1 ? target[0].slug : target.map(({ slug }) => slug)

export const mapTriggerTarget = (
  target,
  signalType = {},
  address = '',
  isEthWalletTrigger = false
) => {
  const { value } = signalType
  let newTarget

  switch (value) {
    case METRIC_TARGET_WATCHLIST.value: {
      newTarget = {
        watchlist_id: +target
      }
      break
    }
    default: {
      if (isEthWalletTrigger && address) {
        newTarget = { eth_address: address }
      } else {
        newTarget = Array.isArray(target)
          ? { slug: getTargetFromArray(target) }
          : { slug: target.value }
      }
    }
  }

  return {
    target: newTarget
  }
}

export const mapAssetTarget = (target, isEthWalletTrigger) => {
  if (!isEthWalletTrigger) {
    return undefined
  }

  return {
    asset: { slug: target.value }
  }
}

export const getChannels = ({ channels }) =>
  channels.length ? channels[0].toLowerCase() : undefined

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
  if (items.length === 1) {
    const { value, slug } = items[0]
    return value || slug
  } else {
    return items.map(({ value, slug }) => value || slug)
  }
}

export const getTrendingWordsTarget = ({
  type,
  target,
  trendingWordsWithAssets,
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
        slug: mapTrendingWordsTargets(trendingWordsWithAssets)
      }
    }
    case TRENDING_WORDS_WATCHLIST_MENTIONED.value: {
      return {
        watchlist_id: +target
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

const getTimeWindow = ({ timeWindow, timeWindowUnit }) => {
  return timeWindow && timeWindowUnit
    ? timeWindow + '' + timeWindowUnit.value
    : undefined
}

export const mapFormToPPCTriggerSettings = formProps => {
  const { target, signalType } = formProps
  const newTarget = mapTriggerTarget(target, signalType)
  return {
    type: PRICE_PERCENT_CHANGE,
    ...newTarget,
    channel: getChannels(formProps),
    time_window: getTimeWindow(formProps),
    operation: getTriggerOperation(formProps)
  }
}

export const mapFormToPACTriggerSettings = formProps => {
  const { target, signalType } = formProps
  const newTarget = mapTriggerTarget(target, signalType)
  return {
    type: PRICE_ABSOLUTE_CHANGE,
    ...newTarget,
    channel: getChannels(formProps),
    operation: getTriggerOperation(formProps)
  }
}

export const mapFormToDAATriggerSettings = formProps => {
  const { percentThreshold, target, signalType } = formProps
  const newTarget = mapTriggerTarget(target, signalType)

  return {
    type: DAILY_ACTIVE_ADDRESSES,
    ...newTarget,
    channel: getChannels(formProps),
    time_window: getTimeWindow(formProps),
    percent_threshold: percentThreshold
  }
}

export const mapFormToPVDTriggerSettings = formProps => {
  const { target, threshold, signalType } = formProps
  const newTarget = mapTriggerTarget(target, signalType)
  return {
    type: PRICE_VOLUME_DIFFERENCE,
    ...newTarget,
    channel: getChannels(formProps),
    threshold: threshold
  }
}

export const mapFormToHBTriggerSettings = formProps => {
  const { target, ethAddress, signalType } = formProps
  const newAsset =
    signalType.value === METRIC_TARGET_ASSETS.value
      ? mapAssetTarget(target, true)
      : undefined
  const newTarget = mapTriggerTarget(target, signalType, ethAddress, true)
  return {
    type: ETH_WALLET,
    ...newTarget,
    ...newAsset,
    channel: getChannels(formProps),
    operation: getTriggerOperation(formProps)
  }
}

export const mapFormPropsToTrigger = (formProps, prevTrigger) => {
  const { type, isRepeating } = formProps

  let settings = {}
  switch (type.metric) {
    case PRICE_PERCENT_CHANGE: {
      settings = mapFormToPPCTriggerSettings(formProps)
      break
    }
    case PRICE_ABSOLUTE_CHANGE: {
      settings = mapFormToPACTriggerSettings(formProps)
      break
    }
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
      throw new Error('Can not find a correct mapper for trigger')
    }
  }
  const cooldownParams = getCooldownParams(formProps)

  return {
    ...prevTrigger,
    settings: settings,
    isRepeating: !!isRepeating,
    ...cooldownParams
  }
}

export const getMetricsByType = type => {
  switch (type) {
    case DAILY_ACTIVE_ADDRESSES:
      return ['triggerDailyActiveAdresses', 'historyPrice']
    case PRICE_VOLUME_DIFFERENCE:
      return ['historyPrice', 'volume']
    default:
      return ['historyPrice']
  }
}

export const getTimeRangeForChart = type => {
  return PREVIEWS_TIMERANGE_BY_TYPE[type] || getDefaultTimeRangeValue(90)
}

export const getNearestTypeByMetric = metric => {
  switch (metric.value) {
    case ETH_WALLET_METRIC.value: {
      return ETH_WALLET_AMOUNT_UP
    }
    case PRICE_METRIC.value: {
      return PRICE_PERCENT_CHANGE_UP_MODEL
    }
    case DAILY_ACTIVE_ADDRESSES_METRIC.value: {
      return DAILY_ACTIVE_ADDRESSES_METRIC
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

  return {
    trigger: {
      trigger: checkingTrigger,
      isLoading: loading,
      isError: !!error
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

export const validateTriggerForm = ({
  type,
  threshold,
  percentThreshold,
  timeWindow,
  ethAddress,
  absoluteThreshold,
  absoluteBorderLeft,
  absoluteBorderRight,
  channels,
  frequencyType,
  frequencyTimeValue,
  frequencyTimeType,
  metric,
  target,
  trendingWordsWithAssets,
  trendingWordsWithWords,
  signalType
}) => {
  let errors = {}

  if (type.metric === ETH_WALLET) {
    if (!threshold) errors.threshold = REQUIRED_MESSAGE

    if (ethAddress && !isPossibleEthAddress(ethAddress)) {
      errors.ethAddress = 'Not valid ETH address'
    }
  }

  if (
    type.metric === DAILY_ACTIVE_ADDRESSES ||
    type.metric === PRICE_PERCENT_CHANGE
  ) {
    if (!percentThreshold) {
      errors.percentThreshold = REQUIRED_MESSAGE
    } else if (percentThreshold <= 0) {
      errors.percentThreshold = MUST_BE_MORE_ZERO_MESSAGE
    }
    if (!timeWindow) {
      errors.timeWindow = REQUIRED_MESSAGE
    } else if (timeWindow <= 0) {
      errors.timeWindow = MUST_BE_MORE_ZERO_MESSAGE
    }
  }

  if (type.metric === PRICE_ABSOLUTE_CHANGE_SINGLE_BORDER) {
    if (!absoluteThreshold) {
      errors.absoluteThreshold = REQUIRED_MESSAGE
    }
  }

  if (type.subMetric === PRICE_ABSOLUTE_CHANGE_DOUBLE_BORDER) {
    if (!absoluteBorderLeft) {
      errors.absoluteBorderLeft = REQUIRED_MESSAGE
    }
    if (!absoluteBorderRight) {
      errors.absoluteBorderRight = REQUIRED_MESSAGE
    }
  }

  if (type.metric === PRICE_VOLUME_DIFFERENCE) {
    if (!threshold) {
      errors.threshold = REQUIRED_MESSAGE
    } else if (threshold < 0) {
      errors.threshold = MUST_BE_MORE_ZERO_MESSAGE
    }
  }
  if (channels && channels.length === 0) {
    errors.channels = 'You must setup notification channel'
  }

  if (!frequencyType || !frequencyType.value) {
    errors.frequencyType = REQUIRED_MESSAGE
  }

  if (!frequencyTimeValue || !frequencyTimeValue.value) {
    errors.frequencyTimeValue = REQUIRED_MESSAGE
  }

  if (!frequencyTimeType || !frequencyTimeType.value) {
    errors.frequencyTimeType = REQUIRED_MESSAGE
  }

  if (metric && metric.value === TRENDING_WORDS) {
    if (
      isTrendingWordsByProjects(type) &&
      (!trendingWordsWithAssets || trendingWordsWithAssets.length === 0)
    ) {
      errors.trendingWordsWithAssets = REQUIRED_MESSAGE
    }

    if (
      isTrendingWordsByWords(type) &&
      (!trendingWordsWithWords || trendingWordsWithWords.length === 0)
    ) {
      errors.trendingWordsWithWords = REQUIRED_MESSAGE
    }
  } else {
    if (isWatchlist(signalType)) {
      if (!target) {
        errors.target = REQUIRED_MESSAGE
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

const POSSIBLE_METRICS_FOR_CHART = [
  PRICE_METRIC.value,
  DAILY_ACTIVE_ADDRESSES_METRIC.value,
  PRICE_VOLUME_DIFFERENCE_METRIC.value
]

export const couldShowChart = ({ signalType, metric, target }) => {
  if (isWatchlist(signalType) || Array.isArray(target)) {
    return false
  }

  return metric ? POSSIBLE_METRICS_FOR_CHART.indexOf(metric.value) >= 0 : false
}

export const getFormMetricValue = type => {
  if (type) {
    switch (type.metric) {
      case PRICE_ABSOLUTE_CHANGE: {
        return type.subMetric
      }
      default: {
        return type.metric
      }
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
      return { value: asset.slug, label: asset.slug }
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
    assets: assetsHeldByAddress,
    isLoading: loading
  }
}

export const isPossibleEthAddress = function (address) {
  return !address || isEthStrictAddress(address)
}
