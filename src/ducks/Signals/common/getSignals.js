import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { TRIGGERS_QUERY } from './queries'

export const filterByChannels = (signals, type) =>
  signals.filter(({ settings: { channel } }) =>
    Array.isArray(channel) ? channel.indexOf(type) !== -1 : channel === type
  )

const DEFAULT_STATE = []

export function useSignals ({ skip = false, filters, mapper } = {}) {
  const { data, loading, error } = useQuery(TRIGGERS_QUERY, {
    skip: skip
  })

  const alerts = useMemo(
    () => {
      if (!data || !data.currentUser) return DEFAULT_STATE
      const { triggers = DEFAULT_STATE } = data.currentUser

      return filters && filters.channel
        ? filterByChannels(triggers, filters.channel)
        : triggers
    },
    [data, filters]
  )

  return {
    data: alerts,
    loading,
    error
  }
}
