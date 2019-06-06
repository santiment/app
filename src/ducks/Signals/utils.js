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
    price_percent_change: 'Moving up %',
    daily_active_addresses: 'Daily Active Addresses',
    price_volume_difference: 'Price/volume difference'
  }
  return { value: type, label: ALL_TYPES[type] }
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
