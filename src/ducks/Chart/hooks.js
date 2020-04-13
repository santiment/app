import { useState, useEffect } from 'react'
import { Metric } from '../dataHub/metrics'

const splitByComma = str => str.split(',')

export function useDomainGroups (metrics) {
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
    [metrics]
  )

  return domainGroups
}

export function useNeighbourValueData (data, metrics) {
  const [newData, setNewData] = useState(data)

  useEffect(
    () => {
      const dataLength = data.length
      const metricLength = metrics.length

      if (!dataLength || metricLength < 2) return

      for (let i = 0; i < metricLength; i++) {
        const metricKey = metrics[i].key

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
          if (value) {
            neighbourValue = value
          } else {
            item[metricKey] = neighbourValue
          }
        }
      }

      setNewData(data)
    },
    [data, metrics]
  )

  return newData
}
