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
  items,
  { key, dataKey, historicalTriggersDataKey = dataKey },
  data
) => {
  return items.map(point => {
    const date = mapWithMidnightTime(point.datetime)
    const item = data.find(({ datetime }) => datetime === date)

    const yCoord =
      item && item[dataKey] ? item[dataKey] : point[historicalTriggersDataKey]

    return { date, yCoord, ...point }
  })
}

export const cleanByDatakeys = (timeseries, dataKey) => {
  return timeseries.filter(item => item[dataKey] !== undefined)
}

export const mapToRequestedMetrics = (
  metrics,
  { interval, slug, from, to, timeRange, address }
) =>
  metrics.map(({ key, alias: name = key, reqMeta }) => ({
    name,
    slug,
    from,
    to,
    timeRange,
    interval,
    address,
    ...reqMeta
  }))
