import { parseIntervalString } from '../../utils/dates'

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

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatChannelsTitles (channels) {
  return channels.map(item => {
    if (item === 'web_push') {
      return 'Push'
    }
    if (typeof item === 'string') {
      return capitalizeFirstLetter(item)
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

export function getConditionsStr ({ operation, count, timeWindow }) {
  let condition = `Moving down ${count} %`

  switch (operation) {
    case 'above':
      condition = `Goes above $${count}`
      break
    case 'above_or_equal':
      condition = `Goes above or equal $${count}`
      break
    case 'below':
      condition = `Goes below $${count}`
      break
    case 'below_or_equal':
      condition = `Goes below or equal $${count}`
      break
    case 'inside_channel':
      condition = `Goes between $${count[0]} and $${count[1]}`
      break
    case 'outside_channel':
      condition = `Goes outside $${count[0]} and $${count[1]}`
      break
    case 'percent_up':
      condition = `Moving up ${count} %`
      break
    case 'percent_down':
      condition = `Moving down ${count} %`
      break
    case 'some_of':
      condition = `Moving up ${count[0]} % or moving down ${count[1]} %`
      break
    default:
      break
  }

  return `${condition} compared to ${formatFrequencyStr(timeWindow)} earlier`
}
