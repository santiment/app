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

const getType = type => {
  const ALL_TYPES = {
    price_percent_change: 'Percentage Change',
    daily_active_addresses: 'Daily Active Addresses',
    price_volume_difference: 'Price/volume difference'
  }
  return { value: type, label: ALL_TYPES[type] }
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
    repeating: currentTrigger.repeating,
    active: currentTrigger.active,
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
      type: formProps.type.value
    },
    isPublic: !!formProps.isPublic,
    repeating: formProps.repeating ? formProps.repeating : undefined,
    cooldown: formProps.cooldown ? formProps.cooldown : undefined,
    active: !!formProps.active
  }
}
