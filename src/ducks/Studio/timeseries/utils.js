// TODO: Remove this after moving to dynamic query aliasing instead of preTransform [@vanguard | March 4, 2020]
export const aliasTransform = (key, dataKey = key) => alias => data =>
  extractTimeseries(key)(data).map(({ datetime, ...value }) => ({
    datetime,
    [alias]: value[dataKey]
  }))

export const extractTimeseries = name => ({ data }) => data[name]

export const normalizeDatetimes = data => ({
  ...data,
  datetime: +new Date(data.datetime)
})
