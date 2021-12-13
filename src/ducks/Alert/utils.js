function formatFrequencyStr (cooldown) {
  const cooldownPeriod = cooldown.slice(-1)
  const cooldownCount = cooldown.slice(0, cooldown.length - 1)

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
