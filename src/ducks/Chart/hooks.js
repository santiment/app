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
