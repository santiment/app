import { useState, useEffect } from 'react'

export function useDomainGroups (metrics, isDomainGroupingActive) {
  const [domainGroups, setDomainGroups] = useState()

  useEffect(
    () => {
      if (!isDomainGroupingActive) {
        setDomainGroups()
      }
    },
    [isDomainGroupingActive]
  )

  useEffect(
    () => {
      if (!isDomainGroupingActive) {
        return
      }

      const Domain = Object.create(null)
      const { length } = metrics

      for (let i = 0; i < length; i++) {
        const { key, domainGroup } = metrics[i]

        if (!domainGroup) continue

        const domain = Domain[domainGroup]

        if (domain) {
          Domain[domainGroup] += `,${key}`
        } else {
          Domain[domainGroup] = `${domainGroup},${key}`
        }
      }

      const newDomainGroups = Object.values(Domain).map(group =>
        group.split(',')
      )

      setDomainGroups(newDomainGroups.length > 0 ? newDomainGroups : undefined)
    },
    [metrics, isDomainGroupingActive]
  )

  return domainGroups
}
