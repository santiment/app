import { useMemo } from 'react'
import { Metric } from '../dataHub/metrics'
import { MirroredMetric } from '../dataHub/metrics/mirrored'

const splitByComma = str => str.split(',')
const lineMetricsFilter = ({ node }) => node === 'line' || node === 'filledLine'
const getDomainGroup = ({ key, domainGroup = key }) => domainGroup
const checkIfAreMirrored = (metricA, metricB) =>
  MirroredMetric[metricA.key] === metricB ||
  MirroredMetric[metricB.key] === metricA

export function useDomainGroups (metrics) {
  return useMemo(
    () => {
      const Domain = Object.create(null)
      const { length } = metrics

      for (let i = 0; i < length; i++) {
        const { key, domainGroup } = metrics[i]

        if (!domainGroup) continue

        if (Domain[domainGroup]) {
          Domain[domainGroup] += `,${key}`
        } else {
          Domain[domainGroup] = metrics.includes(Metric[domainGroup])
            ? `${domainGroup},${key}`
            : key
        }
      }

      const domainKeys = Object.keys(Domain)
      const domainKeysLength = domainKeys.length

      for (let i = 0; i < domainKeysLength; i++) {
        const key = domainKeys[i]

        if (Domain[key].indexOf(',') === -1) {
          delete Domain[key]
        }
      }

      const newDomainGroups = Object.values(Domain).map(splitByComma)

      return newDomainGroups.length > 0 ? newDomainGroups : undefined
    },
    [metrics]
  )
}

export function useClosestValueData (
  rawData,
  metrics,
  isClosestValueActive = true
) {
  return useMemo(
    () => {
      const lineMetrics = metrics.filter(lineMetricsFilter)
      const dataLength = rawData.length
      const metricLength = lineMetrics.length

      if (!isClosestValueActive || !dataLength || metricLength < 2) {
        return rawData
      }

      const data = new Array(dataLength)
      for (let i = 0; i < dataLength; i++) {
        data[i] = Object.assign({}, rawData[i])
      }

      for (let i = 0; i < metricLength; i++) {
        const metricKey = lineMetrics[i].key

        let firstValueIndex = 0
        let lastValueIndex = dataLength

        for (; firstValueIndex < dataLength; firstValueIndex++) {
          if (data[firstValueIndex][metricKey]) {
            break
          }
        }

        if (firstValueIndex === dataLength) {
          continue
        }

        while (!data[--lastValueIndex][metricKey]) {}

        let neighbourValue = data[firstValueIndex][metricKey]

        for (let y = firstValueIndex + 1; y < lastValueIndex; y++) {
          const item = data[y]
          const value = item[metricKey]
          if (value || value === 0) {
            neighbourValue = value
          } else {
            item[metricKey] = neighbourValue
          }
        }
      }

      return data
    },
    [rawData, metrics, isClosestValueActive]
  )
}

export function useTooltipMetricKey (metrics) {
  return useMemo(
    () => {
      const { length } = metrics
      let tooltipKey = metrics[0]

      for (let i = 0; i < length; i++) {
        const metric = metrics[i]

        if (metric === Metric.price_usd) {
          return metric.key
        }

        if (tooltipKey.node !== 'line') {
          tooltipKey = metric
        } else {
          break
        }
      }

      return tooltipKey.key
    },
    [metrics]
  )
}

export function useAxesMetricsKey (metrics, isDomainGroupingActive) {
  return useMemo(
    () => {
      let mainAxisMetric = metrics[0]
      let secondaryAxisMetric = metrics[1]

      const { length } = metrics
      if (length === 0) return []

      if (length === 1) {
        return [mainAxisMetric.key]
      }

      for (let i = 1; i < length; i++) {
        const metric = metrics[i]

        if (metric === Metric.price_usd) {
          secondaryAxisMetric = mainAxisMetric
          mainAxisMetric = metric
          break
        }
      }

      const mainAxisDomain = getDomainGroup(mainAxisMetric)
      let hasSameDomain =
        (isDomainGroupingActive ||
          checkIfAreMirrored(mainAxisMetric, secondaryAxisMetric)) &&
        mainAxisDomain === getDomainGroup(secondaryAxisMetric)

      if (hasSameDomain) {
        for (let i = 1; i < length; i++) {
          const metric = metrics[i]

          if (mainAxisDomain !== getDomainGroup(metric)) {
            secondaryAxisMetric = metric
            hasSameDomain = false
            break
          }
        }
      }

      return hasSameDomain
        ? [mainAxisMetric.key]
        : [mainAxisMetric.key, secondaryAxisMetric.key]
    },
    [metrics, isDomainGroupingActive]
  )
}

function adjustGapLengthByDataSize (size) {
  if (size < 70) return 1

  if (size < 130) return 2

  if (size < 200) return 4

  if (size < 300) return 6

  if (size < 600) return 10

  return 15
}

export function useEdgeGaps (data) {
  return useMemo(
    () => {
      const { length } = data
      if (length < 2) return data

      const lastDatetime = data[length - 1].datetime
      const datetimeDiff = lastDatetime - data[length - 2].datetime
      let gapDatetime = lastDatetime + datetimeDiff

      const gapLength = adjustGapLengthByDataSize(length)
      const gapData = new Array(gapLength)

      for (let i = 0; i < gapLength; i++, gapDatetime += datetimeDiff) {
        gapData[i] = {
          datetime: gapDatetime
        }
      }

      return data.concat(gapData)
    },
    [data]
  )
}
