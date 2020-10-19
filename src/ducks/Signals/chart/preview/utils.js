export const mapWithTimeseries = items =>
  items.map(item => ({
    ...item,
    datetime: +new Date(item.datetime),
    index: item.datetime
  }))

export const mapWithMidnightTime = date => {
  const datetime = new Date(date)
  datetime.setUTCHours(0, 0, 0, 0)
  return +new Date(datetime)
}

export const mapWithTimeseriesAndYCoord = (
  triggered,
  triggersBy,
  timeseries,
  toDayConversion = true
) => {
  const { key, dataKey, historicalTriggersDataKey } = triggersBy
  const mappingKey = historicalTriggersDataKey || dataKey

  const mapped = triggered.map(point => {
    const date = toDayConversion
      ? mapWithMidnightTime(point.datetime)
      : +new Date(point.datetime)
    const item = timeseries.find(({ datetime }) => datetime === date)

    const fromTimeseries = item ? item[dataKey] || item[key] : undefined

    const yCoord = fromTimeseries || point[mappingKey] || point['current']
    return { date, yCoord, ...point }
  })

  return mapped
}

export const cleanByDatakeys = (timeseries, dataKey) => {
  return timeseries.filter(item => item[dataKey] !== undefined)
}

export const makeSameRange = (points, base) => {
  if (!base[0]) {
    return points
  }

  const date = base[0].datetime
  return points.filter(({ datetime }) => +new Date(datetime) > date)
}

export const mapToRequestedMetrics = (metrics, settings) =>
  metrics.map(({ key, alias: name = key, reqMeta }) => ({
    key,
    name,
    ...settings,
    ...reqMeta
  }))

export const getAvailableCooldown = baseCooldown => {
  if (
    baseCooldown &&
    (baseCooldown.indexOf('d') !== -1 || baseCooldown.indexOf('w') !== -1)
  ) {
    return '1d'
  }

  return baseCooldown && baseCooldown.indexOf('m') !== -1 ? '1h' : baseCooldown
}
