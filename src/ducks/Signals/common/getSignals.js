import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { TRIGGERS_QUERY } from './queries'

export const filterByChannels = (signals, type) =>
  signals.filter(({ settings: { channel } }) =>
    Array.isArray(channel) ? channel.indexOf(type) !== -1 : channel === type
  )

export const filterByIsActiveFlag = (signals, statusFilter) =>
  signals.filter(({ isActive }) => {
    switch (statusFilter) {
      case 'enabled':
        return isActive
      case 'disabled':
        return !isActive
      default:
        return 1
    }
  })

const DEFAULT_STATE = []

export function useSignals ({ skip = false, filters, mapper } = {}) {
  const { data, loading, error } = useQuery(TRIGGERS_QUERY, {
    skip: skip
  })

  const alerts = useMemo(() => {
    if (!data || !data.currentUser) return DEFAULT_STATE
    const { triggers = DEFAULT_STATE } = data.currentUser

    if (filters) {
      if (filters.channel) {
        return filterByChannels(triggers, filters.channel)
      }
      if (filters.statusFilter) {
        return filterByIsActiveFlag(triggers, filters.statusFilter)
      }
    }

    return triggers
  }, [data, filters])

  return {
    data: alerts,
    loading,
    error
  }
}
