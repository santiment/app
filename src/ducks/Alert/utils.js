import { capitalizeStr } from '../../utils/utils'
import { parseIntervalString } from '../../utils/dates'

function formatFrequencyStr(cooldown) {
  const { amount: cooldownCount, format: cooldownPeriod } = parseIntervalString(cooldown || '5m')

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

export function getChannelsTitles(channels) {
  return channels.map((item) => {
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

export function formatChannelsTitles(channels) {
  return channels.map((item) => {
    if (item === 'web_push') {
      return 'Push'
    }
    if (typeof item === 'string') {
      return capitalizeStr(item)
    }
    if ('telegram_channel' in item) {
      return 'Telegram Channel'
    }
    if ('webhook' in item) {
      return 'Webhook'
    }

    return item
  })
}

export function getDescriptionStr({ cooldown, channels, isRepeating }) {
  const frequencyStr = formatFrequencyStr(cooldown)
  const channelsStr = channels.length > 0 ? ` via ${formatChannelsTitles(channels).join(', ')}` : ''

  if (!isRepeating) {
    return `Send me notifications once${channelsStr}.`
  }

  return `Send me notifications every ${frequencyStr}${channelsStr}.`
}

export function getSelectedAssetMetricCardDescription(metric) {
  return `Notify me when an asset’s ${metric.label.toLowerCase()} moves a certain way`
}

function getCountSomeOf(count) {
  const left = count[0].percent_up
  const right = count[1].percent_down

  return [left, right]
}

export function parseOperation(value) {
  const operation = Object.keys(value)[0]
  const count = operation === 'some_of' ? getCountSomeOf(value[operation]) : value[operation]

  return { selectedOperation: operation, selectedCount: count }
}

export function getConditionsStr({
  operation,
  count,
  timeWindow,
  hasPriceIcon = true,
  isPercentIcon = false,
}) {
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

  return formatConditionToCompared({
    condition,
    operation,
    hasPriceIcon,
    isPercentIcon,
    timeWindow,
  })
}

function formatConditionToCompared({
  condition,
  operation,
  hasPriceIcon,
  isPercentIcon,
  timeWindow,
}) {
  let formattedCondition = hasPriceIcon
    ? condition
    : condition.replaceAll('$', isPercentIcon ? '%' : '')

  switch (operation) {
    case 'above_or_equal':
    case 'below_or_equal':
    case 'percent_up':
    case 'percent_down':
    case 'some_of':
      formattedCondition += `compared to ${formatFrequencyStr(timeWindow)} earlier`
      break
    default:
      break
  }

  return formattedCondition
}

export function clipText(text, maxLength) {
  if (text && maxLength) {
    const lengthBorder = maxLength - 3
    if (text.length > lengthBorder) {
      return text.slice(0, lengthBorder) + '...'
    }
  }

  return text
}

export function splitStr(str) {
  const firstWord = str.split(' ')[0]
  const rest = str.replace(`${firstWord} `, '')

  return { firstWord, rest }
}

function validateNotificationsAndTitle({
  invalidSteps,
  settings,
  cooldown,
  title,
  stepIndex,
  onlyValidate,
  notificationsStepIndex,
}) {
  if (onlyValidate && stepIndex > notificationsStepIndex) {
    if (!cooldown || settings.channel.length === 0) {
      invalidSteps.push('notifications')
    }

    if (settings.channel.length > 0 && settings.channel.some((item) => typeof item !== 'string')) {
      const telegramChannel = settings.channel.find(
        (item) => typeof item !== 'string' && 'telegram_channel' in item,
      )
      if (telegramChannel && !telegramChannel.telegram_channel) {
        invalidSteps.push('notifications')
      }
      const webhook = settings.channel.find((item) => typeof item !== 'string' && 'webhook' in item)
      if (webhook && !webhook.webhook) {
        invalidSteps.push('notifications')
      }
    }
  }

  if (!title && !onlyValidate) {
    invalidSteps.push('title')
  }
}

function validateAssetStep({ invalidSteps, settings, cooldown, title, stepIndex, onlyValidate }) {
  if ((stepIndex > 0 && onlyValidate) || !onlyValidate) {
    if (settings.target.slug.length === 0) {
      invalidSteps.push('asset')
    }
  }

  if ((stepIndex > 1 && onlyValidate) || !onlyValidate) {
    if (!settings.metric || Object.keys(settings.operation).length === 0 || !settings.time_window) {
      invalidSteps.push('metric')
    }
  }

  validateNotificationsAndTitle({
    invalidSteps,
    settings,
    cooldown,
    title,
    stepIndex,
    onlyValidate,
    notificationsStepIndex: 2,
  })
}

function validateWatchlistStep({
  invalidSteps,
  settings,
  cooldown,
  title,
  stepIndex,
  onlyValidate,
}) {
  if ((stepIndex > 0 && onlyValidate) || !onlyValidate) {
    if (!settings.target.watchlist_id) {
      invalidSteps.push('watchlist')
    }
  }

  if ((stepIndex > 1 && onlyValidate) || !onlyValidate) {
    if (!settings.metric || Object.keys(settings.operation).length === 0 || !settings.time_window) {
      invalidSteps.push('metric')
    }
  }

  validateNotificationsAndTitle({
    invalidSteps,
    settings,
    cooldown,
    title,
    stepIndex,
    onlyValidate,
    notificationsStepIndex: 2,
  })
}

function validateScreenerStep({
  invalidSteps,
  settings,
  cooldown,
  title,
  stepIndex,
  onlyValidate,
}) {
  if ((stepIndex > 0 && onlyValidate) || !onlyValidate) {
    if (!settings.operation.selector.watchlist_id) {
      invalidSteps.push('watchlist')
    }
  }

  validateNotificationsAndTitle({
    invalidSteps,
    settings,
    cooldown,
    title,
    stepIndex,
    onlyValidate,
    notificationsStepIndex: 1,
  })
}

function validateWalletStep({ invalidSteps, settings, cooldown, title, stepIndex, onlyValidate }) {
  if ((stepIndex > 0 && onlyValidate) || !onlyValidate) {
    if (
      settings.type === 'wallet_movement' &&
      (!settings.target.address || !settings.selector.infrastructure || !settings.selector.slug)
    ) {
      invalidSteps.push('wallet')
    }
    if (
      (settings.type === 'wallet_usd_valuation' || settings.type === 'wallet_assets') &&
      (!settings.target.address || !settings.selector.infrastructure)
    ) {
      invalidSteps.push('wallet')
    }
  }

  validateNotificationsAndTitle({
    invalidSteps,
    settings,
    cooldown,
    title,
    stepIndex,
    onlyValidate,
    notificationsStepIndex: 1,
  })
}

function validateSocialTrendsStep({
  invalidSteps,
  settings,
  cooldown,
  title,
  stepIndex,
  onlyValidate,
}) {
  if ((stepIndex > 0 && onlyValidate) || !onlyValidate) {
    if ('slug' in settings.target && settings.target.slug.length === 0) {
      invalidSteps.push('trend')
    }

    if ('word' in settings.target && settings.target.word.length === 0) {
      invalidSteps.push('trend')
    }

    if ('watchlist_id' in settings.target && !settings.target.watchlist_id) {
      invalidSteps.push('trend')
    }
  }

  validateNotificationsAndTitle({
    invalidSteps,
    settings,
    cooldown,
    title,
    stepIndex,
    onlyValidate,
    notificationsStepIndex: 1,
  })
}

export function validateFormSteps({
  type,
  values,
  setInvalidSteps,
  submitForm,
  onlyValidate,
  stepIndex,
}) {
  const { settings, cooldown, title } = values

  switch (type.title) {
    case 'Asset': {
      let invalidSteps = []

      validateAssetStep({ invalidSteps, settings, cooldown, title, stepIndex, onlyValidate })

      if (invalidSteps.length > 0) {
        setInvalidSteps(invalidSteps)
      } else {
        setInvalidSteps([])
        if (!onlyValidate) {
          submitForm()
        }
      }
      break
    }
    case 'Watchlist': {
      let invalidSteps = []

      validateWatchlistStep({ invalidSteps, settings, cooldown, title, stepIndex, onlyValidate })

      if (invalidSteps.length > 0) {
        setInvalidSteps(invalidSteps)
      } else {
        setInvalidSteps([])
        if (!onlyValidate) {
          submitForm()
        }
      }
      break
    }
    case 'Screener': {
      let invalidSteps = []

      validateScreenerStep({ invalidSteps, settings, cooldown, title, stepIndex, onlyValidate })

      if (invalidSteps.length > 0) {
        setInvalidSteps(invalidSteps)
      } else {
        setInvalidSteps([])
        if (!onlyValidate) {
          submitForm()
        }
      }
      break
    }
    case 'Wallet address': {
      let invalidSteps = []

      validateWalletStep({ invalidSteps, settings, cooldown, title, stepIndex, onlyValidate })

      if (invalidSteps.length > 0) {
        setInvalidSteps(invalidSteps)
      } else {
        setInvalidSteps([])
        if (!onlyValidate) {
          submitForm()
        }
      }
      break
    }
    case 'Social trends': {
      let invalidSteps = []

      validateSocialTrendsStep({ invalidSteps, settings, cooldown, title, stepIndex, onlyValidate })

      if (invalidSteps.length > 0) {
        setInvalidSteps(invalidSteps)
      } else {
        setInvalidSteps([])
        if (!onlyValidate) {
          submitForm()
        }
      }
      break
    }
    default: {
      setInvalidSteps([])
      if (!onlyValidate) {
        submitForm()
      }
    }
  }
}

function calcSeconds(amount, format) {
  let factor
  switch (format) {
    case 'm':
      factor = 60
      break
    case 'h':
      factor = 60 * 60
      break
    case 'd':
      factor = 60 * 60 * 24
      break
    default:
      factor = 1
  }
  return +amount * factor
}

export function getMetricSignalKey(minInterval) {
  const condition = parseIntervalString('5m')
  const base = calcSeconds(condition.amount, condition.format)
  const { amount, format } = parseIntervalString(minInterval)
  const value = calcSeconds(amount, format)
  return value <= base ? 'metric_signal' : 'daily_metric_signal'
}
