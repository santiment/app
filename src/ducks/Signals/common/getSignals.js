import { useQuery } from '@apollo/react-hooks'
import { TRIGGERS_QUERY } from './queries'

export const filterByChannels = (signals, type) =>
  signals.filter(({ settings: { channel } }) =>
    Array.isArray(channel) ? channel.indexOf(type) !== -1 : channel === type
  )

export const useSignals = ({ skip = false, filters, mapper } = {}) => {
  const { data = {}, loading, error } = useQuery(TRIGGERS_QUERY, {
    skip: skip
  })

  const { currentUser } = data
  let signals = (currentUser || {}).triggers || []

  if (!loading) {
    if (filters && filters.channel) {
      signals = filterByChannels(signals, filters.channel)
    }
  }

  return {
    data: signals,
    loading,
    error
  }
}
