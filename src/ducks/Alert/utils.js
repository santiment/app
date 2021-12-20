import { parseIntervalString } from '../../utils/dates'
import { getMetric } from '../Studio/Sidebar/utils'
import { capitalizeStr } from '../../utils/utils'

function formatFrequencyStr (cooldown) {
  const { amount: cooldownCount, format: cooldownPeriod } = parseIntervalString(
    cooldown
  )

  switch (cooldownPeriod) {
    case 'm':
      return `${cooldownCount} minute(s)`
    case 'h':
      return `${cooldownCount} hour(s)`
    case 'd':
      return `${cooldownCount} day(s)`
    case 'w':
      return `${cooldownCount} week(s)`
    default:
      return ''
  }
}

export function getChannelsTitles (channels) {
  return channels.map(item => {
    if (typeof item === 'string') {
      return item
    }
    if ('telegram_channel' in item) {
      return 'telegram_channel'
    }
    if ('webhook' in item) {
      return 'webhook'
    }

    return item
  })
}

export function formatChannelsTitles (channels) {
  return channels.map(item => {
    if (item === 'web_push') {
      return 'Push'
    }
    if (typeof item === 'string') {
      return capitalizeStr(item)
    }
    if ('telegram_channel' in item) {
      return 'Telegram'
    }
    if ('webhook' in item) {
      return 'Webhook'
    }

    return item
  })
}

export function getDescriptionStr ({ cooldown, channels }) {
  const frequencyStr = formatFrequencyStr(cooldown)
  const channelsStr =
    channels.length > 0
      ? ` via ${formatChannelsTitles(channels).join(', ')}`
      : ''

  return `Send me notifications every ${frequencyStr}${channelsStr}.`
}

export function getSelectedAssetMetricCardDescription (metric) {
  return `Notify me when an asset’s ${metric.label.toLowerCase()} moves a certain way`
}

function getCountSomeOf (count) {
  const left = count[0].percent_up
  const right = count[1].percent_down

  return [left, right]
}

export function parseOperation (value) {
  const operation = Object.keys(value)[0]
  const count =
    operation === 'some_of'
      ? getCountSomeOf(value[operation])
      : value[operation]

  return { selectedOperation: operation, selectedCount: count }
}

export function getConditionsStr ({ operation, count, timeWindow }) {
  let condition = `moving down ${count} %`

  switch (operation) {
    case 'above':
      condition = `goes above $${count}`
      break
    case 'above_or_equal':
      condition = `goes above or equal $${count}`
      break
    case 'below':
      condition = `goes below $${count}`
      break
    case 'below_or_equal':
      condition = `goes below or equal $${count}`
      break
    case 'inside_channel':
      condition = `goes between $${count[0]} and $${count[1]}`
      break
    case 'outside_channel':
      condition = `goes outside $${count[0]} and $${count[1]}`
      break
    case 'percent_up':
      condition = `moving up ${count} %`
      break
    case 'percent_down':
      condition = `moving down ${count} %`
      break
    case 'some_of':
      condition = `moving up ${count[0]} % or moving down ${count[1]} %`
      break
    default:
      break
  }

  return `${condition} compared to ${formatFrequencyStr(timeWindow)} earlier`
}

export function getTitleStr ({
  slug,
  metric,
  operation,
  timeWindow,
  onlyCondition
}) {
  const selectedMetric = getMetric(metric)
  const { selectedCount, selectedOperation } = parseOperation(operation)
  const conditionStr = getConditionsStr({
    operation: selectedOperation,
    count: selectedCount,
    timeWindow
  })

  if (onlyCondition) {
    return conditionStr
  }

  const slugStr = Array.isArray(slug)
    ? slug.map(item => capitalizeStr(item)).join(', ')
    : capitalizeStr(slug)

  return `${slugStr} ${(selectedMetric && selectedMetric.label) ||
    'Metric'} ${conditionStr}`
}
