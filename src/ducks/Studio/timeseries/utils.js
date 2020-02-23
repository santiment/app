export const extractTimeseries = name => ({ data }) => data[name]

export const normalizeDatetimes = data => ({
  ...data,
  datetime: +new Date(data.datetime)
})
