import { useState, useEffect } from 'react'
import { Metric } from '../dataHub/metrics'

const splitByComma = (str) => str.split(',')
const lineMetricsFilter = ({ node }) => node === 'line'

export function useDomainGroups(metrics) {
  const [domainGroups, setDomainGroups] = useState()

  useEffect(
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

      setDomainGroups(newDomainGroups.length > 0 ? newDomainGroups : undefined)
    },
    [metrics],
  )

  return domainGroups
}

export function useClosestValueData(
  rawData,
  metrics,
  isClosestValueActive = true,
) {
  const [newData, setNewData] = useState(rawData)

  useEffect(
    () => {
      const lineMetrics = metrics.filter(lineMetricsFilter)
      const dataLength = rawData.length
      const metricLength = lineMetrics.length

      if (!isClosestValueActive || !dataLength || metricLength < 2) {
        setNewData(rawData)
        return
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

      setNewData(data)
    },
    [rawData, metrics, isClosestValueActive],
  )

  return newData
}

export function useTooltipMetricKey(metrics) {
  const [tooltipMetricKey, setTooltipMetricKey] = useState(metrics[0].key)

  useEffect(
    () => {
      const { length } = metrics
      let tooltipKey = metrics[0]

      for (let i = 0; i < length; i++) {
        const metric = metrics[i]

        if (metric === Metric.price_usd) {
          return setTooltipMetricKey(metric.key)
        }

        if (tooltipKey.node !== 'line') {
          tooltipKey = metric
        } else {
          break
        }
      }

      return setTooltipMetricKey(tooltipKey.key)
    },
    [metrics],
  )

  return tooltipMetricKey
}

export function useAxesMetricsKey(metrics) {
  const [axesMetricKeys, setAxesMetricKeys] = useState([])

  useEffect(
    () => {
      let mainAxisMetric = metrics[0]
      let secondaryAxisMetric = metrics[1]

      const { length } = metrics
      if (length === 1) {
        return setAxesMetricKeys([mainAxisMetric.key])
      }

      for (let i = 0; i < length; i++) {
        const metric = metrics[i]

        if (metric === Metric.price_usd) {
          mainAxisMetric = metric
        } else if (
          secondaryAxisMetric.node !== 'line' ||
          secondaryAxisMetric === Metric.price_usd
        ) {
          secondaryAxisMetric = metric
        }
      }

      setAxesMetricKeys([mainAxisMetric.key, secondaryAxisMetric.key])
    },
    [metrics],
  )

  return axesMetricKeys
}
