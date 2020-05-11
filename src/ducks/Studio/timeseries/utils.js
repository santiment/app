import { Metric } from '../../dataHub/metrics'

const OLD_DATE = { datetime: 0 }

const newDataMapper = data => Object.assign({}, data)

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

function findDatetimeBorder (baseTs, cursor, targetDatetime) {
  const baseTsLength = baseTs.length

  do {
    cursor++
  } while (
    cursor < baseTsLength &&
    targetDatetime > new Date(baseTs[cursor].datetime)
  )

  return cursor
}

export const getPreparedMetricSettings = (metrics, settingsMap) => {
  const hasDaaMetric = metrics.includes(Metric.daily_active_addresses)
  const newSettingsMap = new Map(settingsMap)

  if (hasDaaMetric) {
    metrics.forEach(metric => {
      newSettingsMap.set(metric, {
        interval: '1d'
      })
    })
  } else {
    newSettingsMap.forEach((value, key) => {
      delete value['interval']
    })
  }

  return newSettingsMap
}

export function mergeTimeseries (timeseries) {
  const timeseriesAmount = timeseries.length

  if (timeseriesAmount === 1) {
    return timeseries[0]
  }

  // Finding longest timeserie
  let longestTS = timeseries[0]
  for (let i = 0; i < timeseriesAmount; i++) {
    longestTS =
      longestTS.length > timeseries[i].length ? longestTS : timeseries[i]
  }

  let baseTs = longestTS.map(newDataMapper)

  for (let i = 0; i < timeseriesAmount; i++) {
    const timeserie = timeseries[i]

    if (timeserie === longestTS) continue

    const tsLength = timeserie.length

    for (
      let timeserieCursor = 0, baseTsCursor = 0;
      timeserieCursor < tsLength;
      timeserieCursor++, baseTsCursor++
    ) {
      const isBaseInBounds = baseTsCursor < baseTs.length
      const timeserieData = timeserie[timeserieCursor]
      const baseTsData = isBaseInBounds ? baseTs[baseTsCursor] : OLD_DATE

      if (timeserieData.datetime === baseTsData.datetime) {
        Object.assign(baseTsData, timeserieData)
        continue
      }

      const timeserieDatetime = new Date(timeserieData.datetime)
      const baseTsDatetime = new Date(baseTsData.datetime)

      if (timeserieDatetime > baseTsDatetime) {
        // current timeserie's datetime is greater than the base

        baseTsCursor = findDatetimeBorder(
          baseTs,
          baseTsCursor,
          timeserieDatetime
        )

        if (baseTsCursor >= baseTs.length) {
          // Base doesn't have data after this datetime
          baseTs = baseTs.concat(
            timeserie.slice(timeserieCursor).map(newDataMapper)
          )
          break
        } else {
          // Found potentially similar base to datetime
          const foundBaseTs = baseTs[baseTsCursor]
          if (timeserieData.datetime === foundBaseTs.datetime) {
            // Merging timeseries with same datetime
            Object.assign(foundBaseTs, timeserieData)
          } else {
            // Inserting it before found base
            baseTs.splice(baseTsCursor, 0, newDataMapper(timeserieData))
          }
        }
      } else {
        // current timeserie's datetime is less than the base
        const timeserieLeftCursor = timeserieCursor

        timeserieCursor = findDatetimeBorder(
          timeserie,
          timeserieCursor,
          baseTsDatetime
        )

        if (timeserieCursor >= timeserie.length) {
          // No base found with similar datetime
          baseTs.splice(
            baseTsCursor,
            0,
            ...timeserie.slice(timeserieLeftCursor).map(newDataMapper)
          )
          break
        } else {
          // Found potentially similar datetime to base
          baseTs.splice(
            baseTsCursor,
            0,
            ...timeserie
              .slice(timeserieLeftCursor, timeserieCursor)
              .map(newDataMapper)
          )

          const foundTimeserieData = timeserie[timeserieCursor]
          if (baseTsData.datetime === foundTimeserieData.datetime) {
            Object.assign(baseTsData, foundTimeserieData)
          }
        }
      }
    }
  }

  return baseTs
}
